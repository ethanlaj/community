/* MODELS SHOULD NOT BE IMPORTED FROM HERE TO OTHER FILES,
 THEY SHOULD ONLY BE IMPORTED FROM database.js */

const ModelContact = require('./contact');
const ModelCommunication = require('./communication');
const ModelEtownOffice = require('./etownOffice');
const ModelOrganization = require('./organization');
const ModelOrganizationLocation = require('./organizationLocation');
const ModelUser = require('./user');

module.exports = {
	ModelContact,
	ModelCommunication,
	ModelEtownOffice,
	ModelOrganization,
	ModelOrganizationLocation,
	ModelUser,
};
