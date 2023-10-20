import express, { Router, Request, Response } from 'express';
import {
	Communications,
	Organizations,
	OrganizationLocations,
	CommunicationContacts,
} from '../models';
import errorHandler from '../errorHandler';

const communicationsRouter: Router = express.Router();

// GET all communications
communicationsRouter.get('/', errorHandler(async (req: Request, res: Response) => {
	const communications = await Communications.findAll({
		include: [OrganizationLocations, Organizations],
		order: [['createdAt', 'DESC']],
	});
	res.json(communications);
	return; 
})
);

// GET a communication by ID
communicationsRouter.get('/:id', errorHandler(async (req: Request, res: Response) => {
	const id = req.params.id;
	const communication = await Communications.findByPk(id, {
		include: [OrganizationLocations],
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
communicationsRouter.post('/', errorHandler(async (req: Request, res: Response) => {
	const communicationData = req.body;

	try {
		const newCommunication = await Communications.create({
			...communicationData,
			locationId: communicationData.locationId,
			organizationId: communicationData.organization.id,
		});

		if (communicationData.contacts && communicationData.contacts.length > 0) {
			for (const contact of communicationData.contacts) {
				const contactId = contact.id;

				await CommunicationContacts.create({
					CommunicationId: newCommunication.id,
					ContactId: contactId,
				});
			}
		}

		res.status(201).json(newCommunication);
	} catch (error) {
		res.status(500).send((error as Error).message);
	}
})
);

// PUT (update) a communication by ID
communicationsRouter.put('/:id', errorHandler(async (req: Request, res: Response) => {
	const id = req.params.id;
	const communicationData = req.body;

	const communication = await Communications.findByPk(id);
	if (!communication) {
		res.status(404).send('Communication not found');
		return;
	}

	await communication.update(communicationData);
	res.json(communication);
	return;
})
);

// DELETE a communication by ID
communicationsRouter.delete('/:id', errorHandler(async (req: Request, res: Response) => {
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
