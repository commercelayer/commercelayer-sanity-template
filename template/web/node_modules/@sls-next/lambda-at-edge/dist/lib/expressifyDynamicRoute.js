"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expressifyDynamicRoute = (dynamicRoute) => {
    const expressified = dynamicRoute.replace(/\[\.\.\.(.*)]$/, ":$1*");
    return expressified.replace(/\[(.*?)]/g, ":$1");
};
exports.default = expressifyDynamicRoute;
