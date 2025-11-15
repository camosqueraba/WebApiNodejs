"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueService = void 0;
const async_mutex_1 = require("async-mutex");
class QueueService {
    constructor() {
        this.queue = [];
        this.mutex = new async_mutex_1.Mutex();
    }
    async enqueue(task) {
        await this.mutex.runExclusive(() => {
            this.queue.push(task);
        });
    }
    async dequeueMatching(predicate) {
        return await this.mutex.runExclusive(() => {
            const idx = this.queue.findIndex(predicate);
            if (idx >= 0) {
                return this.queue.splice(idx, 1)[0];
            }
            return null;
        });
    }
    async getAll() {
        return await this.mutex.runExclusive(() => [...this.queue]);
    }
}
exports.queueService = new QueueService();
