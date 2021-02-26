"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isDynamicRoute = (route) => {
    return /\/\[[^\/]+?\](?=\/|$)/.test(route);
};
exports.default = isDynamicRoute;
