"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.init = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const routers_1 = require("@/routers");
const app = (0, express_1.default)();
app
    .use((0, cors_1.default)())
    .use(express_1.default.json())
    .use("/types", routers_1.typesRouter)
    .use("/genres", routers_1.genresRouter)
    .use("/artists", routers_1.artistsRouter)
    .use("/auth", routers_1.authenticationRouter)
    .use("/user", routers_1.usersRouter)
    .use("/booking", routers_1.bookingsRouter);
function init() {
    (0, database_1.connectDB)();
    return Promise.resolve(app);
}
exports.init = init;
async function close() {
    await (0, database_1.disconnectDB)();
}
exports.close = close;
exports.default = app;
