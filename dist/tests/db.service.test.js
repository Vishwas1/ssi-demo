"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var db_service_1 = require("../services/db.service");
var user_service_1 = require("../services/user.service");
var application_service_1 = require("../services/application.service");
var chai_1 = require("chai");
describe('DBService', function () {
    var dbService;
    var user1 = {
        fname: "Vishwas",
        lname: "Anand",
        username: "vishwas123",
        password: "hello",
        email: "vishu.anand1@gmail.com",
        phoneNumber: "9444023232",
        id: "User123",
        publicKey: "ak_1231KDSDDWE",
        privateKey: "ecf7152958692782d3"
    };
    var totalRecords = 0;
    beforeEach(function () {
        dbService = new db_service_1.DBService();
    });
    // it('should drop the user table', async () => {
    //     const res = await dbService.dropTable(schemaType.USER)    
    //     expect(res).to.equal('SUCCESS');
    // })
    // it('should create user table', async () => {
    //     const res = await dbService.createTable(schemaType.USER)    
    //     expect(res).to.equal('SUCCESS');
    // })
    // return
    // it('should throw an error since table is already created', async () => {
    //     expect(await dbService.createTable(schemaType.USER)).to.throw('FAIL: Error in dropping db')
    // })
    it('should insert a user in user table', function () { return __awaiter(_this, void 0, void 0, function () {
        var newUser, userInDb, newApp, appInDb, old;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newUser = new user_service_1.User(__assign({}, user1));
                    return [4 /*yield*/, newUser.create()];
                case 1:
                    userInDb = _a.sent();
                    console.log(userInDb);
                    newApp = new application_service_1.Application({ appId: "hello", appSecret: "hi", name: "newApp001" });
                    return [4 /*yield*/, newApp.create()];
                case 2:
                    appInDb = _a.sent();
                    console.log(appInDb);
                    return [4 /*yield*/, newApp.fetch()];
                case 3:
                    old = _a.sent();
                    console.log(old);
                    return [2 /*return*/];
            }
        });
    }); });
    return;
    it('should fetch the user which got created in the last test', function () { return __awaiter(_this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbService.getOne(db_service_1.SchemaType.User, { publicKey: user1.publicKey })];
                case 1:
                    user = _a.sent();
                    chai_1.expect(user.username).equal(user1.username);
                    chai_1.expect(user.publicKey).equal(user1.publicKey);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should delete a user', function () { return __awaiter(_this, void 0, void 0, function () {
        var rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbService.delete(db_service_1.SchemaType.User, { publicKey: user1.publicKey })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, dbService.get(db_service_1.SchemaType.User, {})];
                case 2:
                    rows = _a.sent();
                    chai_1.expect(rows.length).lessThan(totalRecords);
                    totalRecords = rows.length;
                    return [2 /*return*/];
            }
        });
    }); });
    it('should insert another user in user table', function () { return __awaiter(_this, void 0, void 0, function () {
        var newUser, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1.publicKey = user1.publicKey + "ssdasdsdd";
                    newUser = new user_service_1.User(__assign({}, user1));
                    return [4 /*yield*/, dbService.add(db_service_1.SchemaType.User, newUser)];
                case 1:
                    res = _a.sent();
                    totalRecords = totalRecords + 1;
                    chai_1.expect(res.publicKey).equal(newUser.publicKey);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should NOT insert same user in user table', function () { return __awaiter(_this, void 0, void 0, function () {
        var newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newUser = new user_service_1.User(__assign({}, user1));
                    return [4 /*yield*/, chai_1.expect(dbService.add(db_service_1.SchemaType.User, newUser)).to.throw('/Error/g')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should fetch all users from user table', function () { return __awaiter(_this, void 0, void 0, function () {
        var rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dbService.get(db_service_1.SchemaType.User, {})];
                case 1:
                    rows = _a.sent();
                    chai_1.expect(rows.length).equals(totalRecords);
                    return [2 /*return*/];
            }
        });
    }); });
});
