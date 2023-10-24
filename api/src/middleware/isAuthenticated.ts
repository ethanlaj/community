import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { CRequest } from '../types/CRequest';

// Create a JWKS client
const client = jwksClient({
	jwksUri: 'https://login.microsoftonline.com/1d884f12-a0d7-42f0-8b15-3a91c853bcb5/discovery/keys',
});

// Function to get signing key
function getSigningKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback): void {
	client.getSigningKey(header.kid as string, (err, key) => {
		const signingKey = key?.getPublicKey();
		callback(err, signingKey);
	});
}

// Middleware to validate token and extract email
const isAuthenticated = async (req: CRequest, res: Response, next: NextFunction): Promise<void> => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		res.status(401).send({ msg: 'Unauthorized: No token provided' });
		return;
	}

	const token = authHeader.split(' ')[1];

	jwt.verify(token, getSigningKey, { algorithms: ['RS256'] }, (err, decoded) => {
		if (err) {
			res.status(401).send({ msg: 'Unauthorized: Invalid token' });
			return;
		}

		// Here 'decoded' is of type object | undefined, we need to handle the 'undefined' case
		if (!decoded || typeof decoded === 'string') {
			res.status(401).send({ msg: 'Unauthorized: Invalid token' });
			return;
		}

		// Type guard to ensure 'decoded' has an 'upn' or 'email' field
		console.log(decoded);
		if ('preferred_username' in decoded) {
			// Here you can cast 'decoded' to a more specific type if you have one
			const userEmail = decoded.preferred_username;

			// Attach the userEmail to the request object so it can be accessed downstream
			req.userEmail = userEmail;

			next();
		} else {
			res.status(401).send({ msg: 'Unauthorized: Invalid token payload' });
		}
	});
};

export default isAuthenticated;