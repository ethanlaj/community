module.exports = {
	development: {
		url: process.env.LOCALDB_CONNECTION_STRING,
		dialect: 'mysql',
	},
	production: {
		url: process.env.DATABASE_URL,
		dialect: 'mysql',
	},
};
