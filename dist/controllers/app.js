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
var application_service_1 = require("../services/application.service");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
var lds_sdk_1 = require("lds-sdk");
var registerApp = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var id, name, appObj, createdAppInDb, _a, _b, e_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                id = res.locals.data.id;
                console.log(req.body);
                name = req.body.name;
                if (!name)
                    throw new Error('App name is required!');
                appObj = new application_service_1.Application({ name: name, userId: id });
                _b = (_a = JSON).parse;
                return [4 /*yield*/, appObj.create()];
            case 1:
                createdAppInDb = _b.apply(_a, [_c.sent()]);
                res.status(200).send({ status: 200, message: createdAppInDb, error: null });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _c.sent();
                res.status(500).send({ status: 500, message: null, error: e_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.registerApp = registerApp;
var validateApp = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, appId, appSecret, app, appsInDb, appInDb_1, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, appId = _a.appId, appSecret = _a.appSecret;
                app = new application_service_1.Application({ appId: appId, appSecret: appSecret });
                return [4 /*yield*/, app.fetch()];
            case 1:
                appsInDb = _b.sent();
                if (appsInDb.length == 0)
                    throw new Error("App " + appId + " does not exists. Please register.");
                appInDb_1 = appsInDb[0];
                if ((appInDb_1.appId === appId) && (appInDb_1.appSecret === appSecret)) {
                    jsonwebtoken_1.default.sign(appInDb_1, config_1.jwtSecret, { expiresIn: config_1.jwtExpiryInMilli }, function (err, token) {
                        if (err)
                            throw new Error(err);
                        res.status(200).send({ status: 200, message: {
                                oauthToken: token,
                                appId: appInDb_1.appId,
                                appSecret: appInDb_1.appSecret,
                            }, error: null });
                    });
                }
                else {
                    throw new Error('Unauthorized application');
                }
                return [3 /*break*/, 3];
            case 2:
                e_2 = _b.sent();
                res.status(500).send({ status: 500, message: null, error: e_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.validateApp = validateApp;
var login = function (req, res) {
    config_1.logger.debug('AuthServer: Inside login route');
    try {
        var appData = res.locals.data;
        if (!appData) {
            throw new Error("App data not found");
        }
        config_1.logger.debug('AuthServer: login: AppData = ' + JSON.stringify(appData));
        var _a = req.body, domainName = _a.domainName, redirect_uri = _a.redirect_uri;
        config_1.logger.debug('AuthServer: login: req.body = ' + JSON.stringify({ domainName: domainName, redirect_uri: redirect_uri }));
        if (!domainName || !redirect_uri)
            throw new Error('domainName and redirect_uri is required');
        var challenge = lds_sdk_1.getChallange();
        var param_1 = { appId: appData.appId, domainName: domainName, redirect_uri: redirect_uri, challenge: challenge };
        config_1.logger.debug('Param = ' + JSON.stringify(param_1));
        jsonwebtoken_1.default.sign(param_1, config_1.jwtSecret, { expiresIn: config_1.jwtExpiryInMilli }, function (err, token) {
            if (err)
                throw new Error(err);
            param_1['challengeToken'] = token;
            var query = "?";
            Object.keys(param_1).forEach(function (k) {
                query += k + "=" + param_1[k] + "&";
            });
            query = query.slice(0, query.length - 1);
            config_1.logger.debug('Before redirecting to the login page....');
            var encodedURi = encodeURI("http://localhost:5001/login" + query);
            config_1.logger.debug('encodedURi = ' + encodedURi);
            res.status(200).send({ status: 200, message: {
                    url: encodedURi
                }, error: null });
        });
    }
    catch (e) {
        res.status(500).send({ status: 500, message: null, error: e.message });
    }
};
exports.login = login;
var getAppList = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var name, id, appObj, list;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(res.locals.data);
                name = req.body.name;
                id = res.locals.data.id;
                if (!id)
                    throw new Error('UserId is required!');
                appObj = new application_service_1.Application({ userId: id, name: name });
                return [4 /*yield*/, appObj.fetch()];
            case 1:
                list = _a.sent();
                res.status(200).send({ status: 200, message: {
                        count: list.length,
                        list: list
                    }, error: null });
                return [2 /*return*/];
        }
    });
}); };
exports.getAppList = getAppList;
