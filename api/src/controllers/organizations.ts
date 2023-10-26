import express, { Router, Request, Response } from 'express';
import { Communications, Organizations, OrganizationLocations, Contacts } from '../database/models';

import errorHandler from '../errorHandler';

const organizationsRouter: Router = express.Router();

// GET all organizations
organizationsRouter.get('/', errorHandler(async (_req: Request, res: Response) => {
	try {
		const organizations = await Organizations.findAll({
			include: [
				Contacts,
				OrganizationLocations,
				{
					model: Communications,
					include: [Contacts],
				},
			],
			order: [['createdAt', 'DESC']],
		});

		res.json(organizations);
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
}));

// GET an organization by ID
organizationsRouter.get('/:id', errorHandler(async (req: Request, res: Response): Promise<void> => {
	const id = req.params.id;
	try {
		const organization = await Organizations.findByPk(id, {
			include: [Contacts, OrganizationLocations, Communications],
		});

		if (!organization) {
			res.status(404).send('Organization not found');
		} else {
			res.json(organization);
		}
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
})
);

// POST a new organization
organizationsRouter.post('/', errorHandler(async (req: Request, res: Response) => {
	const organizationData = req.body;
	try {
		const newOrganization = await Organizations.create(organizationData);

		if (req.body.locations)
			await OrganizationLocations.bulkCreate(
				req.body.locations.map((location: any) => ({
					...location,
					organizationId: newOrganization.id,
				}))
			);

		res.status(201).json(newOrganization);
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
})
);

// PUT (update) an organization by ID
organizationsRouter.put('/:id', errorHandler(async (req: Request, res: Response) => {
	const id = req.params.id;
	const organizationData = req.body;
	try {
		const organization = await Organizations.findByPk(id);
		if (!organization) {
			res.status(404).send('Organization not found');
		} else {
			if (req.body.locations) {
				// Delete locations that were removed
				const locations = await OrganizationLocations.findAll({
					where: { organizationId: organization.id },
				});
				for (const location of locations) {
					if (
						!req.body.locations.find(
							(newLocation: any) => newLocation.id === location.id
						)
					)
						await OrganizationLocations.destroy({
							where: { id: location.id },
						});
				}

				// Create or update locations
				for (const newLocation of req.body.locations) {
					if (newLocation.id)
						await OrganizationLocations.update(newLocation, {
							where: { id: newLocation.id },
						});
					else
						await OrganizationLocations.create({
							...newLocation,
							organizationId: organization.id,
						});
				}
			}

			await organization.update(organizationData);
			res.json(organization);
		}
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
})
);

// DELETE an organization by ID
organizationsRouter.delete('/:id', errorHandler(async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const organization = await Organizations.findByPk(id);
		if (!organization) {
			res.status(404).send('Organization not found');
		} else {
			await organization.destroy();
			res.sendStatus(200);
		}
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
})
);

export default organizationsRouter;
