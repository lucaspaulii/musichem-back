"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const users_service_1 = __importDefault(require("../services/users-service"));
const http_status_1 = __importDefault(require("http-status"));
async function signUp(req, res) {
    const { email, password, name, businessName, pictures, description, address, } = req.body;
    const userParams = {
        email,
        password,
        name,
        businessName,
        pictures,
        description,
        address,
    };
    try {
        const user = await users_service_1.default.create(userParams);
        return res.status(http_status_1.default.CREATED).json({
            id: user.id,
            email: user.email,
            name: user.name,
            businessName: user.businessName,
            pictures: user.pictures,
            description: user.description,
            address: user.address,
        });
    }
    catch (error) {
        if (error.name === "DuplicatedEmailError") {
            return res.status(http_status_1.default.CONFLICT).send(error);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
exports.signUp = signUp;
