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
const sequelize_1 = require("sequelize");
const contact_1 = __importDefault(require("../models/contact"));
const organization_1 = __importDefault(require("../models/organization"));
const errorHandler_1 = __importDefault(require("../errorHandler"));
const contactsRouter = express_1.default.Router();
contactsRouter.get('/', (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orgId = req.query.orgId;
    try {
        const contacts = yield contact_1.default.findAll({
            include: {
                model: organization_1.default,
                where: orgId ? { id: orgId } : {},
                required: orgId ? true : false,
            },
        });
        res.status(200).json(contacts);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})));
contactsRouter.get('/:id', (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('id from params', id);
    try {
        const contact = yield contact_1.default.findByPk(id, {
            include: organization_1.default,
        });
        if (!contact) {
            res.status(404).json({ message: 'Contact not found' });
        }
        else {
            res.status(200).json(contact);
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})));
contactsRouter.post('/', (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, organizations } = req.body;
    try {
        const newContact = yield contact_1.default.create({
            name,
            email,
            phone,
        });
        if (organizations && organizations.length > 0) {
            const orgs = yield organization_1.default.findAll({
                where: {
                    id: {
                        [sequelize_1.Op.in]: organizations,
                    },
                },
            });
            yield newContact.$set('organizations', orgs);
        }
        res.status(201).json(newContact);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})));
contactsRouter.put('/:id', (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, phone, organizations } = req.body;
    try {
        const contact = yield contact_1.default.findByPk(id);
        if (!contact) {
            res.status(404).json({ message: 'Contact not found' });
            return;
        }
        contact.name = name || contact.name;
        contact.email = email || contact.email;
        contact.phone = phone || contact.phone;
        yield contact.save();
        if (organizations) {
            const orgs = yield organization_1.default.findAll({
                where: {
                    id: {
                        [sequelize_1.Op.in]: organizations,
                    },
                },
            });
            yield contact.$set('organizations', orgs);
        }
        res.status(200).json(contact);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})));
contactsRouter.delete('/:id', (0, errorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const contact = yield contact_1.default.findByPk(id);
        if (!contact) {
            res.status(404).json({ message: 'Contact not found' });
            return;
        }
        yield contact.destroy();
        res.status(204).json();
    }
    catch (error) {
        res.status(500).send(error.message);
        return;
    }
})));
exports.default = contactsRouter;
