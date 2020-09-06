"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var did_1 = __importDefault(require("../controllers/did"));
var router = express_1.Router();
// GET:  /api/did/create?name=
router.get('/create', did_1.default.create);
// POST: /api/did/update
router.post('/update', did_1.default.update);
// GET:  /api/did/resolve?did=
router.get('/resolve', did_1.default.resolve);
router.get('/list', did_1.default.list);
exports.default = router;
