"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWorkerMessage = void 0;
const workerService_js_1 = require("../services/workerService.js");
const dispatcherService_js_1 = require("../services/dispatcherService.js");
const peticionesController_js_1 = require("../controllers/peticionesController.js");
const handleWorkerMessage = async (ws, msg) => {
    const { messageType, payload } = msg;
    switch (messageType) {
        case "register":
            await workerService_js_1.workerService.registerWorker({
                workerId: payload.workerId,
                ws,
                capabilities: new Set(payload.capabilities),
                available: true
            });
            await dispatcherService_js_1.dispatcherService.tryDispatch();
            break;
        case "availability":
            await workerService_js_1.workerService.setAvailability(payload.workerId, payload.available);
            if (payload.available)
                await dispatcherService_js_1.dispatcherService.tryDispatch();
            break;
        case "taskResult":
            (0, peticionesController_js_1.resolveTaskResult)(payload.requestId, payload.result);
            await workerService_js_1.workerService.setAvailability(payload.workerId, true);
            await dispatcherService_js_1.dispatcherService.tryDispatch();
            break;
    }
};
exports.handleWorkerMessage = handleWorkerMessage;
