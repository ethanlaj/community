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
const communication_1 = __importDefault(require("../models/communication"));
const organization_1 = __importDefault(require("../models/organization"));
const organizationLocation_1 = __importDefault(require("../models/organizationLocation"));
const communicationContact_1 = __importDefault(require("../models/communicationContact"));
const errorHandler_1 = __importDefault(require("../errorHandler"));
const communicationsRouter = express_1.default.Router();
// GET all communications
communicationsRouter.get('/', (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const communications = yield communication_1.default.findAll({
        include: [organizationLocation_1.default, organization_1.default],
        order: [['createdAt', 'DESC']],
    });
    res.json(communications);
    return; // Add this
})));
// GET a communication by ID
communicationsRouter.get('/:id', (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const communication = yield communication_1.default.findByPk(id, {
        include: [organizationLocation_1.default],
    });
    if (!communication) {
        res.status(404).send('Communication not found');
        return; // Add this
    }
    res.json(communication);
    return; // Add this
})));
// POST a new communication
communicationsRouter.post('/', (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const communicationData = req.body;
    try {
        const newCommunication = yield communication_1.default.create(Object.assign(Object.assign({}, communicationData), { locationId: communicationData.locationId, organizationId: communicationData.organization.id }));
        if (communicationData.contacts && communicationData.contacts.length > 0) {
            for (const contact of communicationData.contacts) {
                const contactId = contact.id;
                console.log('contactId', contactId);
                console.log('newCommunication.id', newCommunication.id);
                yield communicationContact_1.default.create({
                    communicationId: newCommunication.id,
                    contactId: contactId,
                });
            }
        }
        res.status(201).json(newCommunication);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})));
// PUT (update) a communication by ID
communicationsRouter.put('/:id', (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const communicationData = req.body;
    const communication = yield communication_1.default.findByPk(id);
    if (!communication) {
        res.status(404).send('Communication not found');
        return; // Add this
    }
    yield communication.update(communicationData);
    res.json(communication);
    return; // Add this
})));
// DELETE a communication by ID
communicationsRouter.delete('/:id', (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const communication = yield communication_1.default.findByPk(id);
    if (!communication) {
        res.status(404).send('Communication not found');
        return; // Add this
    }
    yield communication.destroy();
    res.sendStatus(200);
    return; // Add this
})));
exports.default = communicationsRouter;
