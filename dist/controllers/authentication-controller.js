"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.singIn = void 0;
const authentication_service_1 = __importDefault(require("@/services/authentication-service"));
const http_status_1 = __importDefault(require("http-status"));
async function singIn(req, res) {
    const { email, password } = req.body;
    try {
        const result = await authentication_service_1.default.signIn({ email, password });
        return res.status(http_status_1.default.OK).send(result);
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_1.default.UNAUTHORIZED).send({});
    }
}
exports.singIn = singIn;
async function signOut(req, res) {
    const { userId } = req;
    try {
        await authentication_service_1.default.signOut(userId);
        return res.status(http_status_1.default.OK).send('logged out successfuly');
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send({});
    }
}
exports.signOut = signOut;
