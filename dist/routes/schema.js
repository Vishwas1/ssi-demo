"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var schema_1 = __importDefault(require("../controllers/schema"));
var router = express_1.Router();
// GET:  /api/did/create?name=
router.post('/create', schema_1.default.create);
// POST: /api/did/update
// Only owner should be able to update
router.post('/update', schema_1.default.update);
// GET:  /api/did/resolve?did=
router.get('/get', schema_1.default.get);
router.get('/:schemaId', schema_1.default.getRaw);
router.get('/list', schema_1.default.list);
exports.default = router;
