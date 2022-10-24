import { Router, Request, Response } from 'express';
import locacationController from '../controller/locationController';

const routes = Router();

routes.use('/location', locacationController);

routes.get('*', function (req: Request, res, Response) {
  res.status(404).send({ message: 'not found' });
});

export default routes;
