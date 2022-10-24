"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var http_1 = require("../config/http");
var helpers_1 = require("../helpers");
var getCoordinate = function (postcode) { return __awaiter(void 0, void 0, void 0, function () {
    var url, data, _a, longitude, latitude;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                url = 'https://api.postcodes.io/postcodes';
                return [4 /*yield*/, axios_1.default.get("".concat(url, "/").concat(postcode))];
            case 1:
                data = (_b.sent()).data;
                _a = data.result, longitude = _a.longitude, latitude = _a.latitude;
                return [2 /*return*/, { latitude: latitude, longitude: longitude }];
        }
    });
}); };
var getNearbyLocations = function (_a) {
    var longitude = _a.longitude, latitude = _a.latitude;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, http_1.api.get("/search?ll=".concat(latitude, ",").concat(longitude))];
        });
    });
};
var locacationController = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var postcode, coordinate_1, data, fommatedPlaces, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                postcode = request.query.postcode;
                if (!postcode) {
                    response
                        .status(422)
                        .send({ message: 'please pass a postcode query parameter' });
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, getCoordinate(postcode)];
            case 2:
                coordinate_1 = _c.sent();
                return [4 /*yield*/, getNearbyLocations(coordinate_1)];
            case 3:
                data = (_c.sent()).data;
                fommatedPlaces = data.results.map(function (place) {
                    var _a, _b;
                    return {
                        id: place.fsq_id,
                        name: place.name,
                        address: place.location.address,
                        image: "".concat((_a = place.categories[0]) === null || _a === void 0 ? void 0 : _a.icon.prefix).concat((_b = place.categories[0]) === null || _b === void 0 ? void 0 : _b.icon.suffix),
                        distance: "".concat((0, helpers_1.getDistanceBetweenTwoPoints)(coordinate_1, place.geocodes.main), " km"),
                    };
                });
                (0, helpers_1.convertToCSV)(fommatedPlaces);
                response.setHeader('Content-Type', 'text/csv');
                response.attachment('../attachement/places.csv');
                response.send(fommatedPlaces);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _c.sent();
                response
                    .status((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.status)
                    .send(((_b = error_1.response) === null || _b === void 0 ? void 0 : _b.data.error) || error_1.message);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.default = locacationController;
