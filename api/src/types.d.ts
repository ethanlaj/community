import { Request, Response, NextFunction } from 'express';

export type ExpressAsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
