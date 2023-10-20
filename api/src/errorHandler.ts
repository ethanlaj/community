// errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ExpressAsyncHandler } from './types';  // Adjust the path as needed if you created a new types.ts file

function errorHandler(routeHandler: ExpressAsyncHandler): ExpressAsyncHandler {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
			await routeHandler(req, res, next);
		} catch (err: any) {  // Explicitly define `any` type to avoid TS errors on `err.name` and `err.errors`
			switch (err.name) {
			case 'SequelizeValidationError': {
				// handle validation errors
				const validationErrors = err.errors.map((error: any) => ({   
					field: error.path,
					message: error.message,
				}));
				res.status(400).json({ errors: validationErrors });
				break;
			}
			case 'SequelizeUniqueConstraintError':
				res.status(409).json({
					message: 'Conflict: Resource already exists',
				});
				break;

			default:
				console.error('Error:', err);
				res.status(500).json({ message: 'Internal Server Error' });
			}
		}
	};
}

export default errorHandler;
