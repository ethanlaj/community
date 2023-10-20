"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const organization_1 = __importDefault(require("../models/organization"));
const contact_1 = __importDefault(require("../models/contact"));
const organizationLocation_1 = __importDefault(require("../models/organizationLocation"));
const communication_1 = __importDefault(require("../models/communication"));
const errorHandler_1 = __importDefault(require("../errorHandler"));
const organizationsRouter = express_1.default.Router();
// GET all organizations
organizationsRouter.get('/', (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizations = yield organization_1.default.findAll({
            include: [
                contact_1.default,
                organizationLocation_1.default,
                {
                    model: communication_1.default,
                    include: [contact_1.default],
                    separate: true,
                    order: [['createdAt', 'DESC']],
                },
            ],
        });
        res.json(organizations);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})));
// GET an organization by ID
organizationsRouter.get('/:id', (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const organization = yield organization_1.default.findByPk(id, {
            include: [contact_1.default, organizationLocation_1.default],
        });
        if (!organization) {
            res.status(404).send('Organization not found');
        }
        else {
            res.json(organization);
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})));
// POST a new organization
organizationsRouter.post('/', (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const organizationData = req.body;
    try {
        const newOrganization = yield organization_1.default.create(organizationData);
        if (req.body.locations)
            yield organizationLocation_1.default.bulkCreate(req.body.locations.map((location) => (Object.assign(Object.assign({}, location), { organizationId: newOrganization.id }))));
        res.status(201).json(newOrganization);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})));
// PUT (update) an organization by ID
organizationsRouter.put('/:id', (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const organizationData = req.body;
    try {
        const organization = yield organization_1.default.findByPk(id);
        if (!organization) {
            res.status(404).send('Organization not found');
        }
        else {
            if (req.body.locations) {
                // Delete locations that were removed
                const locations = yield organizationLocation_1.default.findAll({
                    where: { organizationId: organization.id },
                });
                for (let location of locations) {
                    if (!req.body.locations.find((newLocation) => newLocation.id === location.id))
                        yield organizationLocation_1.default.destroy({
                            where: { id: location.id },
                        });
                }
                // Create or update locations
                for (let newLocation of req.body.locations) {
                    if (newLocation.id)
                        yield organizationLocation_1.default.update(newLocation, {
                            where: { id: newLocation.id },
                        });
                    else
                        yield organizationLocation_1.default.create(Object.assign(Object.assign({}, newLocation), { organizationId: organization.id }));
                }
            }
            yield organization.update(organizationData);
            res.json(organization);
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})));
// DELETE an organization by ID
organizationsRouter.delete('/:id', (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const organization = yield organization_1.default.findByPk(id);
        if (!organization) {
            res.status(404).send('Organization not found');
        }
        else {
            yield organization.destroy();
            res.sendStatus(200);
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})));
exports.default = organizationsRouter;
