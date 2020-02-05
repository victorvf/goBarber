import User from '../models/User';

class UserController{
    async index(request, response){
        const users = await User.findAll();

        return response.json(users);
    };

    async show(request, response){
        const { id } = request.params;

        const user = await User.findByPk(id);

        if(!user){
            return response.status(404).json({error: "User not found"});
        };

        return response.json(user);
    };

    async store(request, response){
        const userExists = await User.findOne({ where: { email: request.body.email }});

        if(userExists){
            return response.status(400).json({error: "User already exists"});
        };

        const {id, name, email, provider} = await User.create(request.body);

        return response.json({
            id,
            name,
            email,
            provider,
        });
    };

    async update(request, response){
        const { name, email } = request.body;
        const user = await User.findByPk(request.params.id);

        if(!user){
            return response.status(404).json({error: "User not found"});
        };

        user.update({
            name,
            email,
        });

        return response.json(user);

    };
    async delete(request, response){
        const user = await User.findByPk(request.params.id);

        if(!user){
            return response.status(404).json({error: "User not found"});
        };

        user.destroy();

        return response.json({message: "User deleted"});
    };
}

export default new UserController();
