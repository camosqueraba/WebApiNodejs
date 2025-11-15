"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveTaskResult = exports.createTask = void 0;
const queueService_js_1 = require("../services/queueService.js");
const dispatcherService_js_1 = require("../services/dispatcherService.js");
const uuid_1 = require("uuid");
const DEFAULT_TIMEOUT = 30000;
const pending = new Map();
const createTask = async (req, res) => {
    const { type, data, timeoutMs } = req.body;
    if (!type)
        return res.status(400).json({ error: "type is required" });
    const requestId = (0, uuid_1.v4)();
    const task = {
        requestId,
        type,
        data,
        receivedAt: Date.now(),
        timeoutMs: timeoutMs ?? DEFAULT_TIMEOUT
    };
    const promise = new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            pending.delete(requestId);
            reject(new Error("timeout"));
        }, task.timeoutMs);
        pending.set(requestId, { resolve, reject, timer });
    });
    await queueService_js_1.queueService.enqueue(task);
    await dispatcherService_js_1.dispatcherService.tryDispatch();
    promise
        .then(result => res.json({ requestId, result }))
        .catch(err => res.status(504).json({ requestId, error: err.message }));
};
exports.createTask = createTask;
const resolveTaskResult = (requestId, payload) => {
    const item = pending.get(requestId);
    if (!item)
        return;
    clearTimeout(item.timer);
    pending.delete(requestId);
    item.resolve(payload);
};
exports.resolveTaskResult = resolveTaskResult;
