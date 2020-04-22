import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

import CreateAppointmentService from '../services/CreateAppointmentService';
import CancelAppointmentService from '../services/CancelAppointmentService';

import Cache from '../../lib/Cache';

class AppointmentController {
    async index(request, response) {
        const { page = 1 } = request.query;

        const cacheKey = `user:${request.userId}:appointments:${page}`;
        const cached = await Cache.get(cacheKey);

        if (cached) {
            return response.json(cached);
        }

        const appointments = await Appointment.findAll({
            where: {
                user_id: request.userId,
                canceled_at: null,
            },
            attributes: ['id', 'date', 'past', 'cancelable'],
            limit: 20,
            offset: (page - 1) * 20,
            order: ['date'],
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url'],
                        },
                    ],
                },
            ],
        });

        await Cache.set(cacheKey, appointments);

        return response.json(appointments);
    }

    async store(request, response) {
        const { provider_id, date } = request.body;

        const appointment = await CreateAppointmentService.run({
            provider_id,
            user_id: request.userId,
            date,
        });

        return response.json(appointment);
    }

    async delete(request, response) {
        const appointment = await CancelAppointmentService.run({
            appointment_id: request.params.id,
            user_id: request.userId,
        });

        return response.json(appointment);
    }
}

export default new AppointmentController();
