"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = __importDefault(require("winston"));
var LoggerWrapper = function () {
    return winston_1.default.createLogger({
        transports: [new winston_1.default.transports.Console()],
        exitOnError: false,
    });
};
exports.logger = LoggerWrapper();
