import express, { Router, Request, Response } from 'express';

const healthRouter: Router = express.Router();

healthRouter.get('/', async (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default healthRouter;
