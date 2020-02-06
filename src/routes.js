import {Router} from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', UserController.index);
routes.get('/user/:id', UserController.show);
routes.post('/user/create', UserController.store);
routes.put('/user/update', authMiddleware, UserController.update);
routes.delete('/user/:id/delete', UserController.delete);

routes.post('/session', SessionController.store);

export default routes;
