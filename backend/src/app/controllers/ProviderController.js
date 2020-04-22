import User from '../models/User';
import File from '../models/File';

import Cache from '../../lib/Cache';

class ProviderController {
    async index(request, response) {
        const cached = await Cache.get('providers');

        if (cached) {
            return response.json(cached);
        }

        const providers = await User.findAll({
            where: { provider: true },
            order: ['id'],
            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id', 'name', 'path', 'url'],
                },
            ],
        });

        await Cache.set('providers', providers);

        return response.json(providers);
    }
}

export default new ProviderController();
