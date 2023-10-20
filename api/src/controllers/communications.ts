import express, { Router, Request, Response } from 'express';
import  Communications  from '../models/communication';
import  Organizations  from '../models/organization';
import  OrganizationLocations  from '../models/organizationLocation';
import  CommunicationContacts  from '../models/communicationContact';
import errorHandler from '../errorHandler';

const communicationsRouter: Router = express.Router();

// GET all communications
communicationsRouter.get('/', errorHandler(async (req: Request, res: Response) => {
  const communications = await Communications.findAll({
    include: [OrganizationLocations, Organizations],
    order: [['createdAt', 'DESC']],
  });
  res.json(communications);
  return; // Add this
}));

// GET a communication by ID
communicationsRouter.get('/:id', errorHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const communication = await Communications.findByPk(id, {
    include: [OrganizationLocations],
  });

  if (!communication) {
    res.status(404).send('Communication not found');
    return; // Add this
  }

  res.json(communication);
  return; // Add this
}));

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
console.log('contactId', contactId);
console.log('newCommunication.id', newCommunication.id);
		  await CommunicationContacts.create({
			communicationId: newCommunication.id,
			contactId: contactId,
		  });
		}
	  }
  
	  res.status(201).json(newCommunication);
	} catch (error) {
	  res.status(500).send((error as Error).message);
	}
  }));

// PUT (update) a communication by ID
communicationsRouter.put('/:id', errorHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const communicationData = req.body;

  const communication = await Communications.findByPk(id);
  if (!communication) {
    res.status(404).send('Communication not found');
    return; // Add this
  }

  await communication.update(communicationData);
  res.json(communication);
  return; // Add this
}));

// DELETE a communication by ID
communicationsRouter.delete('/:id', errorHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  const communication = await Communications.findByPk(id);
  if (!communication) {
    res.status(404).send('Communication not found');
    return; // Add this
  }

  await communication.destroy();
  res.sendStatus(200);
  return; // Add this
}));

export default communicationsRouter;
