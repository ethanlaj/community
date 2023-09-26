const express = require('express');
const router = express.Router();
const { Organization, Contact, OrganizationLocation, Communication } = require('../database');
const errorHandler = require('../errorHandler');

// GET all organizations
router.get('/', errorHandler(async (req, res) => {
	try {
		const organizations = await Organization.findAll({
			include: [
				Contact,
				OrganizationLocation,
				{
					model: Communication,
					include: [Contact],
					separate: true,
					order: [['createdAt', 'DESC']],
				},
			],
		});

		res.json(organizations);
	} catch (error) {
		res.status(500).send(error.message);
	}
}));

// GET an organization by ID
router.get('/:id', errorHandler(async (req, res) => {
	const id = req.params.id;
	try {
		const organization = await Organization.findByPk(id, {
			include: [Contact, OrganizationLocation],
		});

		if (!organization)
			return res.status(404).send('Organization not found');

		res.json(organization);
	} catch (error) {
		res.status(500).send(error.message);
	}
}));

// POST a new organization
router.post('/', errorHandler(async (req, res) => {
	const organizationData = req.body;
	try {
		const newOrganization = await Organization.create(organizationData);

		if (req.body.locations)
			await OrganizationLocation.bulkCreate(
				req.body.locations.map((location) => ({
					...location,
					organizationId: newOrganization.id,
				}))
			);

		res.status(201).json(newOrganization);
	} catch (error) {
		res.status(500).send(error.message);
	}
}));

// PUT (update) an organization by ID
router.put('/:id', errorHandler(async (req, res) => {
	const id = req.params.id;
	const organizationData = req.body;
	try {
		const organization = await Organization.findByPk(id);
		if (!organization)
			return res.status(404).send('Organization not found');

		if (req.body.locations) {
			// Delete locations that were removed
			const locations = await OrganizationLocation.findAll({
				where: { organizationId: organization.id },
			});
			for (let location of locations) {
				if (
					!req.body.locations.find(
						(newLocation) => newLocation.id === location.id
					)
				)
					await OrganizationLocation.destroy({
						where: { id: location.id },
					});
			}

			// Create or update locations
			for (let newLocation of req.body.locations) {
				if (newLocation.id)
					await OrganizationLocation.update(newLocation, {
						where: { id: newLocation.id },
					});
				else
					await OrganizationLocation.create({
						...newLocation,
						organizationId: organization.id,
					});
			}
		}

		await organization.update(organizationData);
		res.json(organization);
	} catch (error) {
		res.status(500).send(error.message);
	}
}));

// DELETE an organization by ID
router.delete('/:id', errorHandler(async (req, res) => {
	const id = req.params.id;
	try {
		const organization = await Organization.findByPk(id);
		if (!organization)
			return res.status(404).send('Organization not found');

		await organization.destroy();
		res.sendStatus(200);
	} catch (error) {
		res.status(500).send(error.message);
	}
}));

module.exports = router;
