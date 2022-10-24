"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("../routes"));
var createServer = function () {
    var app = (0, express_1.default)();
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use(routes_1.default);
    app.disable('x-powered-by');
    app.get('/health', function (_req, res) {
        res.send('UP');
    });
    return app;
};
exports.createServer = createServer;
