import { Request } from 'express';

export interface CRequest extends Request {
	userEmail?: string;
}