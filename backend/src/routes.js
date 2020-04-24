import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';

import multerConfig from './config/multer';
import redisConfig from './config/redis';

import ValidadeUserStore from './app/validators/UserStore';
import ValidadeUserUpdate from './app/validators/UserUpdate';
import ValidadeSessionStore from './app/validators/SessionStore';
import ValidadeAppointmentStore from './app/validators/AppointmentStore';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis(redisConfig);

const bruteForce = new Brute(bruteStore);

routes.post(
    '/session',
    bruteForce.prevent,
    ValidadeSessionStore,
    SessionController.store
);
routes.post('/user/create', ValidadeUserStore, UserController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/user/:id', UserController.show);
routes.put('/user/update', ValidadeUserUpdate, UserController.update);
routes.delete('/user/:id/delete', UserController.delete);

routes.post('/file/create', upload.single('file'), FileController.store);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:id/available', AvailableController.index);

routes.get('/appointments', AppointmentController.index);
routes.post(
    '/appointment/create',
    ValidadeAppointmentStore,
    AppointmentController.store
);
routes.delete('/appointment/:id/delete', AppointmentController.delete);

routes.get('/schedules', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notification/:id/update', NotificationController.update);

export default routes;
