import express, { Router, Request, Response, NextFunction } from 'express';
import { OrganizationLocations } from '../models';
import errorHandler from '../errorHandler';
import { FindOptions } from 'sequelize';

const locationsRouter: Router = express.Router();

// GET all locations
locationsRouter.get('/', errorHandler(async (req: Request, res: Response, next: NextFunction) => {
	const orgId = Number(req.query.orgId);
	const findOptions: FindOptions = {};

	if (orgId) {
		findOptions.where = {
			organizationId: orgId
		};
	}

	try {
		const locations = await OrganizationLocations.findAll(findOptions);

		res.json(locations);
	} catch (error) {
		next(error);
	}
})
);

// GET a location by ID
locationsRouter.get('/:id', errorHandler(async (req: Request, res: Response, next: NextFunction) => {
	const id = req.params.id;
	try {
		const location = await OrganizationLocations.findByPk(id);

		if (!location) {
			return next(new Error('Location not found'));
		}

		res.json(location);
	} catch (error) {
		next(error);
	}
})
);

// POST a new location
locationsRouter.post('/', errorHandler(async (req: Request, res: Response, next: NextFunction) => {
	const locationData = req.body;
	try {
		const newLocation = await OrganizationLocations.create(locationData);

		res.status(201).json(newLocation);
	} catch (error) {
		next(error);
	}
})
);

// PUT (update) a location by ID
locationsRouter.put('/:id', errorHandler(async (req: Request, res: Response, next: NextFunction) => {
	const id = req.params.id;
	const locationData = req.body;
	try {
		const location = await OrganizationLocations.findByPk(id);

		if (!location) {
			return next(new Error('Location not found'));
		}

		await location.update(locationData);
		res.json(location);
	} catch (error) {
		next(error);
	}
})
);

// DELETE a location by ID
locationsRouter.delete('/:id', errorHandler(async (req: Request, res: Response, next: NextFunction) => {
	const id = req.params.id;
	try {
		const location = await OrganizationLocations.findByPk(id);

		if (!location) {
			return next(new Error('Location not found'));
		}

		await location.destroy();
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
})
);

export default locationsRouter;
