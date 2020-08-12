import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionsController';
import AccountController from './controllers/AccountController';

const routes = express.Router();

const classesController = new ClassesController();
const connectionsController = new ConnectionController();
const accountController = new AccountController();

routes.post("/classes", classesController.create);
routes.get("/classes", classesController.index);

routes.post("/connections", connectionsController.create);
routes.get("/connections", connectionsController.index);

routes.get("/accounts", accountController.getToken);
routes.get("/accounts/credentials", accountController.getCredentials);
routes.post("/accounts", accountController.createAccount);




export default routes;