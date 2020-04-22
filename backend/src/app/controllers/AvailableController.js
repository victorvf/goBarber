import AvailableAppointmentService from '../services/AvailableAppointmentService';

class AvailableController {
    async index(request, response) {
        const { date } = request.query;

        if (!date) {
            return response.status(400).json({
                error: 'invalid date',
            });
        }

        const searchDate = Number(date);

        const available = await AvailableAppointmentService.run({
            provider_id: request.params.id,
            date: searchDate,
        });

        return response.json(available);
    }
}

export default new AvailableController();
