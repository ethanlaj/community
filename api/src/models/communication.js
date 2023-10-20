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
const organization_1 = __importDefault(require("./organization"));
const organizationLocation_1 = __importDefault(require("./organizationLocation"));
const contact_1 = __importDefault(require("./contact"));
const user_1 = __importDefault(require("./user"));
const communicationContact_1 = __importDefault(require("./communicationContact"));
const communicationUser_1 = __importDefault(require("./communicationUser"));
let Communications = class Communications extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Communications.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Communications.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => organization_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Communications.prototype, "organizationId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => organizationLocation_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Communications.prototype, "locationId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Communications.prototype, "note", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => organization_1.default, 'organizationId'),
    __metadata("design:type", organization_1.default)
], Communications.prototype, "organization", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => organizationLocation_1.default, 'locationId'),
    __metadata("design:type", organizationLocation_1.default)
], Communications.prototype, "organizationLocation", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => contact_1.default, () => communicationContact_1.default, 'CommunicationId', 'ContactId'),
    __metadata("design:type", Array)
], Communications.prototype, "contacts", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_1.default, () => communicationUser_1.default, 'CommunicationId', 'UserId'),
    __metadata("design:type", Array)
], Communications.prototype, "users", void 0);
Communications = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Communications' })
], Communications);
exports.default = Communications;
