import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionsController';
import UserController from './controllers/UsersController';
import SessionController from './controllers/SessionsController';

const routes = express.Router();

const classesController = new ClassesController();
const connectionsController = new ConnectionController();
const userController = new UserController();
const sessionController = new SessionController();

routes.get('/users', userController.index);
routes.post('/users', userController.create);

routes.post('/sessions', sessionController.create);

routes.post("/classes", classesController.create);
routes.get("/classes", classesController.index);

routes.post("/connections", connectionsController.create);
routes.get("/connections", connectionsController.index);


export default routes;