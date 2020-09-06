"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var appCtrl = __importStar(require("../controllers/app"));
var auth_1 = __importDefault(require("../middleware/auth"));
var router = express_1.Router();
// router.post('/register', verifyAuth, appCtrl.registerApp)
router.post('/register', auth_1.default, appCtrl.registerApp);
router.post('/oauth', appCtrl.validateApp);
router.post('/login', auth_1.default, appCtrl.login);
// router.post('/list', verifyAuth, appCtrl.getAppList)
router.post('/list', auth_1.default, appCtrl.getAppList);
exports.default = router;
