const express = require('express');
const router = express.Router();
const { Communication, OrganizationLocation, Organization } = require('../database');
const errorHandler = require('../errorHandler');

// GET all communications
router.get('/', errorHandler(async (req, res) => {
	const communications = await Communication.findAll({
		include: [OrganizationLocation, Organization],
		order: [['createdAt', 'DESC']],
	});
	//console.log(communications);
	res.json(communications);
}));

// GET an communication by ID
router.get('/:id', errorHandler(async (req, res) => {
	const id = req.params.id;
	const communication = await Communication.findByPk(id, {
		include: [OrganizationLocation],
	});

	if (!communication) return res.status(404).send('Communication not found');

	res.json(communication);
}));

// POST a new communication
router.post('/', errorHandler(async (req, res) => {
	const communicationData = req.body;
	const newCommunication = await Communication.create({
		...communicationData,
		locationId: communicationData.locationId,
		organizationId: communicationData.organization.id,
	});

	newCommunication.setContacts(communicationData.contacts.map((c) => c.id));

	res.status(201).json(newCommunication);
}));

// PUT (update) a communication by ID
router.put('/:id', errorHandler(async (req, res) => {
	const id = req.params.id;
	const communicationData = req.body;

	const communication = await Communication.findByPk(id);
	if (!communication) return res.status(404).send('Communication not found');

	await communication.update(communicationData);
	res.json(communication);
}));

// DELETE an communication by ID
router.delete('/:id', errorHandler(async (req, res) => {
	const id = req.params.id;

	const communication = await Communication.findByPk(id);
	if (!communication) return res.status(404).send('Communication not found');

	await communication.destroy();
	res.sendStatus(200);
}));

module.exports = router;
