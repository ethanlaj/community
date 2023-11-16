import express, { Router, Request, Response } from 'express';
import {
	Communications,
	Organizations,
	OrganizationLocations,
	Contacts,
	Users,
	EtownOffices,
} from '../database/models';
import errorHandler from '../errorHandler';
import { CreateUpdateCommunicationDTO } from '../types/CreateUpdateCommunicationDTO';
import { setContacts, setOrganizations, setUsers } from '../mixins/communications';
import isAuthorized from '../middleware/isAuthorized';

const communicationsRouter: Router = express.Router();

// GET all communications
communicationsRouter.get('/', isAuthorized(1), errorHandler(async (req: Request, res: Response) => {
	const communications = await Communications.findAll({
		include: [OrganizationLocations, Organizations],
		order: [['createdAt', 'DESC']],
	});
	res.json(communications);
	return; 
})
);

// GET a communication by ID
communicationsRouter.get('/:id', isAuthorized(1), errorHandler(async (req: Request, res: Response) => {
	const id = req.params.id;
	const communication = await Communications.findByPk(id, {
		include: [Contacts, Organizations, 
			{
				model: Users,
				include: [EtownOffices]
			},
			{
				model: OrganizationLocations,
				include: [Organizations]
			}],
	});

	if (!communication) {
		res.status(404).send('Communication not found');
		return; 
	}

	res.json(communication);
	return; 
})
);

// POST a new communication
communicationsRouter.post('/', isAuthorized(2), errorHandler(async (req: Request, res: Response) => {
	const communicationData = req.body as CreateUpdateCommunicationDTO;

	const t = await Communications.sequelize!.transaction();

	try {
		const newCommunication = await Communications.create({
			...communicationData,
			locationId: communicationData.locationId,
		}, { transaction: t });

		if (communicationData.contactIds) {
			await setContacts(newCommunication, communicationData.contactIds, t);
		}

		if (communicationData.organizationIds) {
			await setOrganizations(newCommunication, communicationData.organizationIds, t);
		}

		if (communicationData.userIds) {
			await setUsers(newCommunication, communicationData.userIds, t);
		}

		await t.commit();
		res.status(201).json(newCommunication);
	} catch (error) {
		await t.rollback();
		res.status(500).send((error as Error).message);
	}
})
);

// PUT (update) a communication by ID
communicationsRouter.put('/:id', isAuthorized(2), errorHandler(async (req: Request, res: Response) => {
	const id = req.params.id;
	const communicationData = req.body as CreateUpdateCommunicationDTO;

	const communication = await Communications.findByPk(id);
	if (!communication) {
		res.status(404).send('Communication not found');
		return;
	}

	const t = await Communications.sequelize!.transaction();

	try {
		const promises = [];
		if (communicationData.contactIds) {
			promises.push(setContacts(communication, communicationData.contactIds, t));
		}
		if (communicationData.organizationIds) {
			promises.push(setOrganizations(communication, communicationData.organizationIds, t));
		}
		if (communicationData.userIds) {
			promises.push(setUsers(communication, communicationData.userIds, t));
		}
		
		promises.push(communication.update(communicationData, { transaction: t }));

		await Promise.all(promises);
		await t.commit();
		res.json(communication);
	} catch (error) {
		await t.rollback();
		res.status(500).send((error as Error).message);
	}
})
);

// DELETE a communication by ID
communicationsRouter.delete('/:id', isAuthorized(3), errorHandler(async (req: Request, res: Response) => {
	const id = req.params.id;

	const communication = await Communications.findByPk(id);
	if (!communication) {
		res.status(404).send('Communication not found');
		return;
	}

	await communication.destroy();
	res.sendStatus(200);
	return;
})
);

export default communicationsRouter;
