import express, { Router, Request, Response } from 'express';
import { Communications, Organizations, OrganizationLocations, Contacts } from '../database/models';
import errorHandler from '../errorHandler';
import { CreateOrganizationDTO } from '../types/CreateOrganizationDTO';
import { CreateOrganizationBulkDTO } from '../types/CreateOrganizationBulkDTO';
import { OrganizationAliases } from '../database/models/organizationAliases';
import { Sequelize } from 'sequelize';
import isAuthorized from '../middleware/isAuthorized';

const organizationsRouter: Router = express.Router();

// GET all organizations
organizationsRouter.get('/', isAuthorized(1), errorHandler(async (_req: Request, res: Response) => {
	try {
		const organizations = await Organizations.findAll({
			include: [
				Contacts,
				OrganizationLocations,
				{
					model: Communications,
					include: [Contacts],
				},
				OrganizationAliases,
			],
			order: [['createdAt', 'DESC']],
		});

		res.json(organizations);
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
}));

// GET an organization by ID
organizationsRouter.get('/:id', isAuthorized(1), errorHandler(async (req: Request, res: Response): Promise<void> => {
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

// GET an organization by ID
organizationsRouter.get('/name/:name', errorHandler(async (req: Request, res: Response): Promise<void> => {
	const name = req.params.name;
	try {
		const organization = await Organizations.findOne({
			where: Sequelize.literal(`LOWER(name) = LOWER('${name}')`)
		});
 

		if (!organization) {
			res.json(null);
		} else {
			res.json(organization);
		}
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
})
);

// POST a new organization
organizationsRouter.post('/', isAuthorized(2), errorHandler(async (req: Request, res: Response) => {
	const { name, locations, aliases } = req.body as CreateOrganizationDTO;
	try {
		const newOrganization = await Organizations.create({
			name,
		});

		if (locations)
			await OrganizationLocations.bulkCreate(
				locations.map((location: any) => ({
					...location,
					organizationId: newOrganization.id,
				}))
			);

		if (aliases)
			await OrganizationAliases.bulkCreate(
				aliases.map((alias: string) => ({ 
					alias,
					organizationId: newOrganization.id,
				}))
			);

		res.status(201).json(newOrganization);
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
})
);

// POST multiple organizations
organizationsRouter.post('/bulk', isAuthorized(2), errorHandler(async (req: Request, res: Response) => {
	const organizationsData = req.body as CreateOrganizationBulkDTO[];
	try {
		const newOrganizations = await Organizations.bulkCreate(
			Object.values(organizationsData).map((data: CreateOrganizationBulkDTO) => ({
				name: data.name,
				location1: data.location1,
				address1: data.address1,
				location2: data.location2,
				address2: data.address2,
				location3: data.location3,
				address3: data.address3,
				location4: data.location4,
				address4: data.address4,
				location5: data.location5,
				address5: data.address5,
			}))
		);

		for (let i = 0; i < newOrganizations.length; i++) {
			const organization = newOrganizations[i];
			const data = organizationsData[i];

			const locations = [];
			if (data.location1 && data.address1)
				locations.push({
					name: data.location1,
					address: data.address1,
				});
			if (data.location2 && data.address2)
				locations.push({
					name: data.location2,
					address: data.address2,
				});
			if (data.location3 && data.address3)
				locations.push({
					name: data.location3,
					address: data.address3,
				});
			if (data.location4 && data.address4)
				locations.push({
					name: data.location4,
					address: data.address4,
				});
			if (data.location5 && data.address5)
				locations.push({
					name: data.location5,
					address: data.address5,
				});

			if (locations.length > 0)
				await OrganizationLocations.bulkCreate(
					locations.map((location: any) => ({
						...location,
						organizationId: organization.id,
					}))
				);

			if (data.aliases)
				await OrganizationAliases.bulkCreate(
					data.aliases.map((alias: string) => ({ 
						alias,
						organizationId: organization.id,
					}))
				);
		}

		res.status(201).json({
			message: 'Organizations Imported Successfully.',
			data: newOrganizations,
		});
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
})
);

// PUT (update) an organization by ID
organizationsRouter.put('/:id', isAuthorized(2), errorHandler(async (req: Request, res: Response) => {
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
organizationsRouter.delete('/:id', isAuthorized(3), errorHandler(async (req: Request, res: Response) => {
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
