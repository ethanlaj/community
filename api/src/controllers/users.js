const express = require('express');
const router = express.Router();
const { User } = require('../database');
const errorHandler = require('../errorHandler');

// Post a new user
router.post('/', errorHandler(async (req, res) => {
	const userData = req.body;
	try {
		const newUser = await User.create(userData);

		// if the officeId is provided in the request body
		if (req.body.officeId) {
			newUser.officeId = req.body.officeId;
			await newUser.save();
		}

		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).send(error.message);
	}
}));

module.exports = router;