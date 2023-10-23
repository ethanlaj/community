module.exports = {
	development: {
		url: process.env.LOCALDB_CONNECTION_STRING,
		dialect: 'mysql',
	},
	production: {
		url: process.env.DB_CONNECTION_STRING,
		dialect: 'mysql',
	},
};
