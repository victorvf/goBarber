import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import User from '../models/User';
import Appointment from '../models/Appointment';

import Notification from '../schemas/Notification';

import Cache from '../../lib/Cache';

class CreateAppointmentService {
    async run({ provider_id, user_id, date }) {
        if (provider_id === user_id) {
            throw new Error('only user can create appointment');
        }

        const isProvider = await User.findOne({
            where: {
                id: provider_id,
                provider: true,
            },
        });

        if (!isProvider) {
            throw new Error('user is not a provider');
        }

        const hourStart = startOfHour(parseISO(date));

        if (isBefore(hourStart, new Date())) {
            throw new Error('past dates are not permitted');
        }

        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });

        if (checkAvailability) {
            throw new Error('appointment date is not available');
        }

        const appointment = await Appointment.create({
            user_id,
            date: hourStart,
            provider_id,
        });

        const user = await User.findByPk(user_id);

        if (!user) {
            throw new Error('user not found');
        }

        const formattedDate = format(
            hourStart,
            "'dia' dd 'de' MMMM', às' H:mm'h'",
            { locale: pt }
        );

        await Notification.create({
            content: `Novo agendamento de ${user.name} para ${formattedDate}`,
            provider: provider_id,
        });

        await Cache.invalidatePrefix(`user:${user_id}:appointments`);

        return appointment;
    }
}

export default new CreateAppointmentService();
