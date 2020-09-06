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
Object.defineProperty(exports, "__esModule", { value: true });
var lds_sdk_1 = require("lds-sdk");
var db_service_1 = require("./db.service");
var didMethod_service_1 = __importDefault(require("./didMethod.service"));
var Attribute = /** @class */ (function () {
    function Attribute(name) {
        this.name = name;
        this.type = "string";
    }
    Attribute.prototype.get = function () {
        var obj = {};
        var name = this.name;
        delete this.name;
        obj[name] = this;
        return obj;
    };
    return Attribute;
}());
var SchemaTemplate = /** @class */ (function () {
    function SchemaTemplate(_a) {
        var _b = _a.id, id = _b === void 0 ? "" : _b, _c = _a.modelVersion, modelVersion = _c === void 0 ? "v1.0" : _c, _d = _a.author, author = _d === void 0 ? "" : _d, _e = _a.name, name = _e === void 0 ? "" : _e, _f = _a.description, description = _f === void 0 ? "" : _f, properties = _a.properties;
        var _this = this;
        this.type = "https://w3c-ccg.github.io/vc-json-schemas/schema/1.0/schema.json";
        this.modelVersion = modelVersion;
        this.id = id;
        this.name = name;
        this.author = author;
        this.authored = "";
        this.schema = {};
        this.schema.$schema = "http://json-schema.org/draft-07/schema#";
        this.schema.type = "object";
        this.schema.description = description;
        this.schema.properties = [];
        this.schema.required = properties; // TODO: right now all requried... later we can change this.
        this.schema.additionalProperties = false;
        properties.forEach(function (eachAttr) {
            var attrObj = new Attribute(eachAttr);
            _this.schema.properties.push(attrObj.get());
        });
    }
    SchemaTemplate.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return SchemaTemplate;
}());
var Schema = /** @class */ (function () {
    function Schema(name, owner) {
        if (name === void 0) { name = ""; }
        var _this = this;
        this.create = function (attributes) { return __awaiter(_this, void 0, void 0, function () {
            var meth, didDoc, newSchema;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        meth = new didMethod_service_1.default();
                        return [4 /*yield*/, meth.resolve(this.owner)];
                    case 1:
                        didDoc = _a.sent();
                        console.log(didDoc);
                        if (!didDoc || Object.keys(didDoc).length == 0)
                            throw new Error("Did can not resolve: " + this.owner);
                        this.id = this.getId();
                        this.attributes = JSON.stringify(attributes);
                        this.version = '1.0';
                        return [4 /*yield*/, this.dbSerice.add(db_service_1.SchemaType.Schema, this)];
                    case 2:
                        newSchema = _a.sent();
                        return [2 /*return*/, newSchema];
                }
            });
        }); };
        this.get = function (schemaId) { return __awaiter(_this, void 0, void 0, function () {
            var didInDb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbSerice.getOne(db_service_1.SchemaType.Schema, { id: schemaId, owner: this.owner })];
                    case 1:
                        didInDb = _a.sent();
                        return [2 /*return*/, didInDb];
                }
            });
        }); };
        this.getRaw = function (schemaId) { return __awaiter(_this, void 0, void 0, function () {
            var didInDb, attributesArray, raw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbSerice.getOne(db_service_1.SchemaType.Schema, { id: schemaId })];
                    case 1:
                        didInDb = _a.sent();
                        attributesArray = JSON.parse(didInDb.attributes).split(",");
                        raw = this.raw(didInDb.id, didInDb.version, didInDb.owner, "Sample description", attributesArray);
                        return [2 /*return*/, raw];
                }
            });
        }); };
        this.list = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Insdei list...........');
                        return [4 /*yield*/, this.dbSerice.getAll(db_service_1.SchemaType.Schema, {})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.credentialName = name;
        this.owner = owner;
        this.id = "";
        this.prefix = 'sch_';
        this.attributes = '';
        this.version = "";
        this.dbSerice = new db_service_1.DBService();
    }
    Schema.prototype.getId = function () {
        var uuid = this.prefix + lds_sdk_1.getChallange();
        return uuid.substring(0, 20);
    };
    Schema.prototype.raw = function (id, modelVersion, author, description, properties) {
        var newTemplate = new SchemaTemplate({ id: id, modelVersion: modelVersion, author: author, description: description, properties: properties });
        return newTemplate.toString();
    };
    return Schema;
}());
exports.default = Schema;
