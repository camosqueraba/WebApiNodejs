"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const peticionesController_js_1 = require("../controllers/peticionesController.js");
const router = (0, express_1.Router)();
router.post("/peticiones", peticionesController_js_1.createTask);
exports.default = router;
