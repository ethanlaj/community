function errorHandler(routeHandler) {
	return async function (req, res, next) {
		try {
			await routeHandler(req, res, next);
		} catch (err) {
			switch (err.name) {
			case 'SequelizeValidationError': {
				// handle validation errors
				const validationErrors = err.errors.map((error) => ({
					field: error.path,
					message: error.message,
				}));
				res.status(400).json({ errors: validationErrors });
				break;
			}
			case 'SequelizeUniqueConstraintError':
				// handle unique constraint errors
				res.status(409).json({
					message: 'Conflict: Resource already exists',
				});
				break;

			default:
				// handle all other errors
				console.error('Error:', err);
				res.status(500).json({ message: 'Internal Server Error' });
			}
		}
	};
}

module.exports = errorHandler;
