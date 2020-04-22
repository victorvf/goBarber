import User from '../models/User';
import File from '../models/File';

import Cache from '../../lib/Cache';

class UserController {
    async index(request, response) {
        const users = await User.findAll({
            order: ['id'],
        });

        return response.json(users);
    }

    async show(request, response) {
        const { id } = request.params;

        const user = await User.findByPk(id);

        if (!user) {
            return response.status(404).json({
                error: 'User not found',
            });
        }

        return response.json(user);
    }

    async store(request, response) {
        const userExists = await User.findOne({
            where: { email: request.body.email },
        });

        if (userExists) {
            return response.status(400).json({
                error: 'User already exists',
            });
        }

        const { id, name, email, provider } = await User.create(request.body);

        if (provider) {
            await Cache.invalidate('providers');
        }

        return response.json({
            id,
            name,
            email,
            provider,
        });
    }

    async update(request, response) {
        const { email, oldPassword } = request.body;
        const user = await User.findByPk(request.userId);

        if (email && email !== user.email) {
            const userExists = await User.findOne({ where: { email } });

            if (userExists) {
                return response.status(401).json({
                    error: 'User already exists',
                });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return response.status(401).json({
                error: 'Password does not match',
            });
        }

        await user.update(request.body);

        const { id, name, provider, avatar } = await User.findByPk(
            request.userId,
            {
                include: [
                    {
                        model: File,
                        as: 'avatar',
                        attributes: ['id', 'path', 'url'],
                    },
                ],
            }
        );

        return response.json({
            id,
            name,
            email: user.email,
            provider,
            avatar,
        });
    }

    async delete(request, response) {
        const user = await User.findByPk(request.params.id);

        if (!user) {
            return response.status(404).json({
                error: 'User not found',
            });
        }

        await user.destroy();

        return response.json({
            message: 'User deleted',
        });
    }
}

export default new UserController();
