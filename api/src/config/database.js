module.exports = {
	development: {
		use_env_variable: "LOCALDB_CONNECTION_STRING",
		dialect: 'mysql',
	},
	production: {
		use_env_variable: "DB_CONNECTION_STRING",
		dialect: 'mysql',
	},
};
