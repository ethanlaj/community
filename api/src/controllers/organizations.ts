import express, { Router, Response } from 'express';
import { CRequest as Request } from '../types/CRequest';
import { Communications, Organizations, OrganizationLocations, Contacts, Users, EtownOffices } from '../database/models';
import errorHandler from '../errorHandler';
import { CreateUpdateOrganizationDTO } from '../types/CreateUpdateOrganizationDTO';
import { CreateOrganizationBulkDTO } from '../types/CreateOrganizationBulkDTO';
import { OrganizationAliases } from '../database/models/organizationAliases';
import isAuthorized from '../middleware/isAuthorized';
import { setAliases, setLocations } from '../mixins/organizations';
import { Op } from 'sequelize';

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
					include: [
						Contacts,
						{
							model: Users,
							attributes: ['id'],
							include: [{
								model: EtownOffices,
								attributes: ['name'],
							}],
						}
					],
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
			include: [Contacts, OrganizationLocations, Communications, OrganizationAliases],
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

// GET an organization by name
organizationsRouter.get('/name/:name', errorHandler(async (req: Request, res: Response): Promise<void> => {
	const name = req.params.name;
	try {
		const organization = await Organizations.findOne({
			where: {
				name: {
					[Op.like]: name
				}
			},
		});

		if (!organization) {
			res.json(null);
		} else {
			res.json(organization);
		}
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
}));


// POST a new organization
organizationsRouter.post('/', isAuthorized(2), errorHandler(async (req: Request, res: Response) => {
	const { name, organizationLocations, aliases } = req.body as CreateUpdateOrganizationDTO;

	let flag = 0;
	if (req.user!.permissionLevel >= 4) {
		flag = req.body.flag;
	}

	const t = await Organizations.sequelize!.transaction();

	try {
		const newOrganization = await Organizations.create({
			name,
			flag,
		}, { transaction: t });

		if (organizationLocations) {
			await setLocations(newOrganization, organizationLocations, t);
		}

		if (aliases) {
			await setAliases(newOrganization, aliases, t);
		}

		await t.commit();
		res.status(201).json(newOrganization);
	} catch (error) {
		await t.rollback();
		res.status(500).send((error as Error).message);
	}
})
);

// POST multiple organizations
organizationsRouter.post('/bulk', isAuthorized(2), errorHandler(async (req: Request, res: Response) => {
	const organizationsData = req.body as CreateOrganizationBulkDTO[];
	try {
		const organizationNames = organizationsData.map(data => data.name);
		const nameCount = new Map<string, number>();
		organizationNames.forEach(name => {
			nameCount.set(name, (nameCount.get(name) || 0) + 1);
		});
	
		// Find duplicate organization names
		const duplicateNames: string[] = [];
		nameCount.forEach((count, name) => {
			if (count > 1) {
				duplicateNames.push(name);
			}
		});
	
		if (duplicateNames.length > 0) {
			const displayedNames = duplicateNames.slice(0, 3); 
			throw new Error(`Duplicate organization names found in the import file: ${displayedNames.join(', ')} ${duplicateNames.length > 3 ? '...' : ''} (No Organizations created)`);
		}
	
		const existingOrganizations = await Organizations.findAll({
			where: { 
				name: organizationNames 
			}
		});
	
		if (existingOrganizations.length > 0) {
			const existingNames = existingOrganizations.map(org => org.name);
			const displayedNames = existingNames.slice(0, 3); 
			throw new Error(`Organization already exists in the database: ${displayedNames.join(', ')} ${existingNames.length > 3 ? '...' : ''} (No Organizations created)`);
		}

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
		if (error instanceof Error &&( error.message.startsWith('Organization')|| error.message.startsWith('Duplicate'))) {
			res.status(400).send({ error: error.message });
		} else {
			res.status(500).send('An internal server error occurred');
		}
	}
})
);

// PUT (update) an organization by ID
organizationsRouter.put('/:id', isAuthorized(2), errorHandler(async (req: Request, res: Response) => {
	const id = req.params.id;
	const organizationData = req.body as CreateUpdateOrganizationDTO;

	if (req.user!.permissionLevel < 4) {
		delete organizationData.flag;
	}

	const t = await Organizations.sequelize!.transaction();

	try {
		const organization = await Organizations.findByPk(id);
		if (!organization) {
			res.status(404).send('Organization not found');
		} else {
			if (organizationData.organizationLocations) {
				await setLocations(organization, organizationData.organizationLocations, t);
			}

			if (organizationData.aliases) {
				await setAliases(organization, organizationData.aliases, t);
			}

			await organization.update(organizationData, { transaction: t });

			await t.commit();
			res.json(organization);
		}
	} catch (error) {
		await t.rollback();
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
