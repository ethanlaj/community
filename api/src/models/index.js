"use strict";
/* MODELS SHOULD NOT BE IMPORTED FROM HERE TO OTHER FILES,
 THEY SHOULD ONLY BE IMPORTED FROM database.ts */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.OrganizationLocationModel = exports.OrganizationModel = exports.EtownOfficeModel = exports.CommunicationModel = exports.ContactModel = void 0;
const contact_1 = require("./contact");
Object.defineProperty(exports, "ContactModel", { enumerable: true, get: function () { return contact_1.ContactModel; } });
const communication_1 = require("./communication");
Object.defineProperty(exports, "CommunicationModel", { enumerable: true, get: function () { return communication_1.CommunicationModel; } });
const etownOffice_1 = require("./etownOffice");
Object.defineProperty(exports, "EtownOfficeModel", { enumerable: true, get: function () { return etownOffice_1.EtownOfficeModel; } });
const organization_1 = require("./organization");
Object.defineProperty(exports, "OrganizationModel", { enumerable: true, get: function () { return organization_1.OrganizationModel; } });
const organizationLocation_1 = require("./organizationLocation");
Object.defineProperty(exports, "OrganizationLocationModel", { enumerable: true, get: function () { return organizationLocation_1.OrganizationLocationModel; } });
const user_1 = require("./user");
Object.defineProperty(exports, "UserModel", { enumerable: true, get: function () { return user_1.UserModel; } });
