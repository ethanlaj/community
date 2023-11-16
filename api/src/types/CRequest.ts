import { Request } from 'express';
import { Users } from '../database/models';

export interface CRequest extends Request {
	user?: Users;
}