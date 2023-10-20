"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const communication_1 = __importDefault(require("./communication"));
const user_1 = __importDefault(require("./user"));
let CommunicationUsers = class CommunicationUsers extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => communication_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], CommunicationUsers.prototype, "CommunicationId", void 0);
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.ForeignKey)(() => user_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], CommunicationUsers.prototype, "UserId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], CommunicationUsers.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], CommunicationUsers.prototype, "updatedAt", void 0);
CommunicationUsers = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'CommunicationUsers' })
], CommunicationUsers);
exports.default = CommunicationUsers;
