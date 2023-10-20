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
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(routeHandler) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield routeHandler(req, res, next);
            }
            catch (err) { // Explicitly define `any` type to avoid TS errors on `err.name` and `err.errors`
                switch (err.name) {
                    case 'SequelizeValidationError': {
                        // handle validation errors
                        const validationErrors = err.errors.map((error) => ({
                            field: error.path,
                            message: error.message,
                        }));
                        res.status(400).json({ errors: validationErrors });
                        break;
                    }
                    case 'SequelizeUniqueConstraintError':
                        res.status(409).json({
                            message: 'Conflict: Resource already exists',
                        });
                        break;
                    default:
                        console.error('Error:', err);
                        res.status(500).json({ message: 'Internal Server Error' });
                }
            }
        });
    };
}
exports.default = errorHandler;
