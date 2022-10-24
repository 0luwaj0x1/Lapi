"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var locationController_1 = __importDefault(require("../controller/locationController"));
var routes = (0, express_1.Router)();
routes.use('/location', locationController_1.default);
routes.get('*', function (req, res, Response) {
    res.status(404).send({ message: 'not found' });
});
exports.default = routes;
