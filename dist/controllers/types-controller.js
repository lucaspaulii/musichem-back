"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypes = void 0;
const types_service_1 = __importDefault(require("@/services/types-service"));
const http_status_1 = __importDefault(require("http-status"));
async function getTypes(req, res) {
    try {
        const types = await types_service_1.default.getAll();
        return res.status(http_status_1.default.OK).send(types);
    }
    catch (error) {
        return res.status(http_status_1.default.NOT_FOUND).send({});
    }
}
exports.getTypes = getTypes;
