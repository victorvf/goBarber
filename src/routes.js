import {Router} from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (request, response)=>{
    const user = await User.create({
        name:'Victor',
        email: 'vctor@mail.com',
        password_hash: '123145'
    });

    return response.json(user);
});

export default routes;
