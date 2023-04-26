"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const capitalizeAllAndUnderscore = (string) => `${string.toUpperCase().replaceAll(" ", "_")}`;
exports.default = capitalizeAllAndUnderscore;
