import User from '../models/User';
import File from '../models/File';

class ProviderController{
    async index(request, response){
        const providers = await User.findAll({
            where: {provider: true},
            order: ['id'],
            attributes: ['id', 'name', 'email'],
            include: [{
                model: File,
                as: 'avatar',
                attributes: ['id', 'name', 'path', 'url']
            }]
        });

        response.json(providers);
    };
};

export default new ProviderController();
