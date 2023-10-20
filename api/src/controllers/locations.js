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
const organizationLocation_1 = __importDefault(require("../models/organizationLocation"));
const errorHandler_1 = __importDefault(require("../errorHandler"));
const locationsRouter = express_1.default.Router();
// GET all locations
locationsRouter.get('/', (0, errorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let orgId = req.query.orgId;
    let where = {}; // Initialize 'where' with the specified type
    if (orgId) {
        where.organizationId = orgId; // Cast 'orgId' to the appropriate type
    }
    try {
        const locations = yield organizationLocation_1.default.findAll({ where });
        res.json(locations);
    }
    catch (error) {
        next(error);
    }
})));
// GET a location by ID
locationsRouter.get('/:id', (0, errorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const location = yield organizationLocation_1.default.findByPk(id);
        if (!location) {
            return next(new Error('Location not found'));
        }
        res.json(location);
    }
    catch (error) {
        next(error);
    }
})));
// POST a new location
locationsRouter.post('/', (0, errorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const locationData = req.body;
    try {
        const newLocation = yield organizationLocation_1.default.create(locationData);
        res.status(201).json(newLocation);
    }
    catch (error) {
        next(error);
    }
})));
// PUT (update) a location by ID
locationsRouter.put('/:id', (0, errorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const locationData = req.body;
    try {
        const location = yield organizationLocation_1.default.findByPk(id);
        if (!location) {
            return next(new Error('Location not found'));
        }
        yield location.update(locationData);
        res.json(location);
    }
    catch (error) {
        next(error);
    }
})));
// DELETE a location by ID
locationsRouter.delete('/:id', (0, errorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const location = yield organizationLocation_1.default.findByPk(id);
        if (!location) {
            return next(new Error('Location not found'));
        }
        yield location.destroy();
        res.sendStatus(200);
    }
    catch (error) {
        next(error);
    }
})));
exports.default = locationsRouter;
