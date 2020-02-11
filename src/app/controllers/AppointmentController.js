import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class AppointmentController{
    async index(request, response){
        const { page = 1 } = request.query;

        const appointments = Appointment.findAll({
            where:{
                user_id: request.userId,
                canceled_at: null
            },
            attributes: ['id', 'date'],
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

        return response.json(appointment);
    };
};

export default new AppointmentController();
