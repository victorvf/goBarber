import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class AppointmentController{
    async index(request, response){
        const { page = 1 } = request.query;

        const appointments = await Appointment.findAll({
            where:{
                user_id: request.userId,
                canceled_at: null
            },
            attributes: ['id', 'date', 'past', 'cancelable'],
            limit: 20,
            offset: (page - 1) * 20,
            order: ['date'],
            include: [{
                model: User,
                as: 'provider',
                attributes: ['id', 'name'],
                include: [
                    {
                        model: File,
                        as: 'avatar',
                        attributes: ['id', 'path', 'url']
                    }
                ]
            }]
        });

        return response.json(appointments);
    };

    async store(request, response){
        const schema = Yup.object().shape({
            date: Yup.date().required(),
            provider_id: Yup.number().required()
        });

        if(!(await schema.isValid(request.body))){
            return response.status(400).json({
                error: "validation fails"
            });
        };

        const { provider_id, date } = request.body;

        if(provider_id === request.userId){
            return response.status(401).json({
                error: 'only user can create appointment'
            });
        };

        const isProvider = await User.findOne({
            where: {
                id: provider_id,
                provider: true
            }
        });

        if(!isProvider){
            return response.status(400).json({
                error: 'user is not a provider'
            });
        };

        const hourStart = startOfHour(parseISO(date));

        if(isBefore(hourStart, new Date())){
            return response.status(400).json({
                error: 'past dates are not permitted'
            });
        };

        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart
            }
        });

        if(checkAvailability){
            return response.status(400).json({
                error: 'appointment date is not available'
            });
        };

        const appointment = await Appointment.create({
            user_id: request.userId,
            date: hourStart,
            provider_id
        });

        const user = await User.findByPk(request.userId);

        if(!user){
            return response.status(404).json({
                error: 'user not found'
            });
        };

        const formattedDate = format(
            hourStart,
            "'dia' dd 'de' MMMM', às' H:mm'h'",
            { locale: pt}
        );

        await Notification.create({
            content:`Novo agendamento de ${user.name} para ${formattedDate}`,
            provider: provider_id,
        });

        return response.json(appointment);
    };

    async delete(request, response){
        const appointment = await Appointment.findByPk(request.params.id, {
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['name', 'email']
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['name']
                }
            ]
        });

        if(!appointment){
            return response.status(404).json({
                error: 'appointment not found'
            });
        };

        if(appointment.user_id !== request.userId){
            return response.status(401).json({
                error: "you don't have permission to cancel this appointment"
            });
        };

        const dateWithSub = subHours(appointment.date, 2);

        if(isBefore(dateWithSub, new Date())){
            return response.status(401).json({
                error: "you can only cancel appointments 2 hours in advance"
            });
        }

        appointment.canceled_at = new Date();

        await appointment.save();

        await Queue.add(CancellationMail.key, {
            appointment
        });

        return response.json(appointment);
    };
};

export default new AppointmentController();
