"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const peticionesRoutes_js_1 = __importDefault(require("./routes/peticionesRoutes.js"));
const ws_1 = require("ws");
const workerSocketHandler_js_1 = require("./websockets/workerSocketHandler.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", peticionesRoutes_js_1.default);
const HTTP_PORT = 3000;
const WS_PORT = 8080;
app.listen(HTTP_PORT, () => {
    console.log(`REST API running at http://localhost:${HTTP_PORT}`);
});
const wss = new ws_1.WebSocketServer({ port: WS_PORT });
wss.on("connection", ws => {
    ws.on("message", raw => {
        try {
            const msg = JSON.parse(raw.toString());
            (0, workerSocketHandler_js_1.handleWorkerMessage)(ws, msg);
        }
        catch (e) {
            console.error("Invalid message", e);
        }
    });
});
