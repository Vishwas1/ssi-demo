"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var didMethod_service_1 = __importDefault(require("../services/didMethod.service"));
var create = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var name, didMethod, newDid, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                name = req.query.name;
                if (!name)
                    throw new Error('Name is required!');
                didMethod = new didMethod_service_1.default(name);
                return [4 /*yield*/, didMethod.create()];
            case 1:
                newDid = _a.sent();
                res.status(200).send({ status: 200, message: newDid, error: null });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.status(500).send({ status: 500, message: null, error: e_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var update = function (req, res) {
};
var resolve = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var did_1, didMethod, didDoc, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                did_1 = req.query.did;
                if (!did_1)
                    throw new Error('Did is required!');
                didMethod = new didMethod_service_1.default();
                return [4 /*yield*/, didMethod.resolve(did_1)];
            case 1:
                didDoc = _a.sent();
                res.status(200).send({ status: 200, message: didDoc, error: null });
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.status(500).send({ status: 500, message: null, error: e_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var list = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var didMethod, list_1, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                didMethod = new didMethod_service_1.default();
                return [4 /*yield*/, didMethod.list()];
            case 1:
                list_1 = _a.sent();
                res.status(200).send({ status: 200, message: list_1, error: null });
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.status(500).send({ status: 500, message: null, error: e_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    create: create,
    update: update,
    resolve: resolve,
    list: list
};