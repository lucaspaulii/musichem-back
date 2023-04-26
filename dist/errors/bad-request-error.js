"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badRequestError = void 0;
function badRequestError() {
    return {
        name: "BadRequestError",
        message: "Your request is invalid",
    };
}
exports.badRequestError = badRequestError;
