"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatcherService = exports.DispatcherService = void 0;
const queueService_js_1 = require("./queueService.js");
const workerService_js_1 = require("./workerService.js");
class DispatcherService {
    async tryDispatch() {
        const queuedTasks = await queueService_js_1.queueService.getAll();
        for (const task of queuedTasks) {
            const worker = await workerService_js_1.workerService.findAvailableWorkerForType(task.type);
            if (!worker)
                continue;
            const removed = await queueService_js_1.queueService.dequeueMatching(t => t.requestId === task.requestId);
            if (!removed)
                continue;
            worker.available = false;
            /* sendJson(worker.ws, 200,{
              messageType: "task",
              
              payload: {
                requestId: task.requestId,
                type: task.type,
                data: task.data
              }
            }); */
            console.log(`Task ${task.requestId} dispatched to worker ${worker.workerId}`);
        }
    }
}
exports.DispatcherService = DispatcherService;
exports.dispatcherService = new DispatcherService();
