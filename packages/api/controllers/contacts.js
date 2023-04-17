const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Contact, Organization } = require("../database");
const errorHandler = require("../errorHandler");

router.get("/", errorHandler(async (req, res) => {
	let orgId = req.query.orgId;

	try {
		const contacts = await Contact.findAll({
			include: {
				model: Organization,
				where: orgId ? { id: orgId } : {},
				required: orgId ? true : false,
			},
		});

		res.status(200).json(contacts);
	} catch (error) {
		res.status(500).send(error.message);
	}
}));

router.get("/:id", errorHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const contact = await Contact.findByPk(id, {
			include: Organization,
		});

		if (!contact) {
			res.status(404).json({ message: "Contact not found" });
		} else {
			res.status(200).json(contact);
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
}));

router.post("/", errorHandler(async (req, res) => {
	const { name, email, phone } = req.body;
	const { organizations } = req.body;
	try {
		const newContact = await Contact.create({
			name,
			email,
			phone,
		});

		if (organizations && organizations.length > 0) {
			const orgs = await Organization.findAll({
				where: {
					id: {
						[Op.in]: organizations,
					},
				},
			});

			await newContact.setOrganizations(orgs);
		}

		res.status(201).json(newContact);
	} catch (error) {
		res.status(500).send(error.message);
	}
}));

router.put("/:id", errorHandler(async (req, res) => {
	const { id } = req.params;
	const { name, email, phone } = req.body;

	try {
		const contact = await Contact.findByPk(id);
		if (!contact)
			return res.status(404).json({ message: "Contact not found" });

		contact.name = name || contact.name;
		contact.email = email || contact.email;
		contact.phone = phone || contact.phone;
		await contact.save();

		if (req.body.organizations) {
			const orgs = await Organization.findAll({
				where: {
					id: {
						[Op.in]: req.body.organizations,
					},
				},
			});

			await contact.setOrganizations(orgs);
		}

		res.status(200).json(contact);
	} catch (error) {
		res.status(500).send(error.message);
	}
}));

router.delete("/:id", errorHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const contact = await Contact.findByPk(id);
		if (!contact)
			return res.status(404).json({ message: "Contact not found" });

		await contact.destroy();
		res.status(204).json();
	} catch (error) {
		res.status(500).send(error.message);
	}
}));

module.exports = router;
