"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workerService = void 0;
const async_mutex_1 = require("async-mutex");
class WorkerService {
    constructor() {
        this.workers = new Map();
        this.mutex = new async_mutex_1.Mutex();
    }
    async registerWorker(w) {
        await this.mutex.runExclusive(() => {
            this.workers.set(w.workerId, w);
        });
    }
    async setAvailability(workerId, available) {
        await this.mutex.runExclusive(() => {
            const w = this.workers.get(workerId);
            if (w)
                w.available = available;
        });
    }
    async findAvailableWorkerForType(taskType) {
        return await this.mutex.runExclusive(() => {
            for (const w of this.workers.values()) {
                if (w.available && w.capabilities.has(taskType))
                    return w;
            }
            return null;
        });
    }
}
exports.workerService = new WorkerService();
