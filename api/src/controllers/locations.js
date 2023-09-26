const express = require('express');
const router = express.Router();
const { OrganizationLocation } = require('../database');
const errorHandler = require('../errorHandler');

// GET all locations
router.get('/', errorHandler(async (req, res) => {
	let orgId = req.query.orgId;
	let where = {};
	if (orgId)
		where.organizationId = orgId;

	try {
		const locations = await OrganizationLocation.findAll({ where });

		res.json(locations);
	} catch (error) {
		res.status(500).send(error.message);
	}
}));

// GET an location by ID
router.get('/:id', errorHandler(async (req, res) => {
	const id = req.params.id;
	try {
		const location = await OrganizationLocation.findByPk(id);

		if (!location)
			return res.status(404).send('Location not found');

		res.json(location);
	} catch (error) {
		res.status(500).send(error.message);
	}
}));

// POST a new location
router.post('/', errorHandler(async (req, res) => {
	const locationData = req.body;
	try {
		const newLocation = await OrganizationLocation.create(locationData);

		res.status(201).json(newLocation);
	} catch (error) {
		res.status(500).send(error.message);
	}
}));

// PUT (update) an location by ID
router.put('/:id', errorHandler(async (req, res) => {
	const id = req.params.id;
	const locationData = req.body;
	try {
		const location = await OrganizationLocation.findByPk(id);
		if (!location)
			return res.status(404).send('Location not found');

		await location.update(locationData);
		res.json(location);
	} catch (error) {
		res.status(500).send(error.message);
	}
}));

// DELETE an location by ID
router.delete('/:id', errorHandler(async (req, res) => {
	const id = req.params.id;
	try {
		const location = await OrganizationLocation.findByPk(id);
		if (!location)
			return res.status(404).send('Location not found');

		await location.destroy();
		res.sendStatus(200);
	} catch (error) {
		res.status(500).send(error.message);
	}
}));

module.exports = router;
