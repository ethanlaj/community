import { Response, NextFunction } from 'express';
import { CRequest } from '../types/CRequest';

// Factory function to create middleware
const isAuthorized = (minLevel: number) => {
	return async (req: CRequest, res: Response, next: NextFunction) => {
		const user = req.user;
		if (!user) {
			return res.status(500).send('Invalid use of isAuthorized middleware. No user found on request.');
		}

		try {
			if (user.permissionLevel >= minLevel) {
				next();
			} else {
				res.status(403).send('Forbidden: Insufficient privileges.');
			}
		} catch (error) {
			res.status(500).send('Internal Server Error');
		}
	};
};

export default isAuthorized;
