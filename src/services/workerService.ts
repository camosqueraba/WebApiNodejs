import { Mutex } from "async-mutex";
import { WorkerInfo } from "../models/WorkerInfo.js";

class WorkerService {
  private workers = new Map<string, WorkerInfo>();
  private mutex = new Mutex();

  async registerWorker(w: WorkerInfo) {
    await this.mutex.runExclusive(() => {
      this.workers.set(w.workerId, w);
    });
  }

  async setAvailability(workerId: string, available: boolean) {
    await this.mutex.runExclusive(() => {
      const w = this.workers.get(workerId);
      if (w) w.available = available;
    });
  }

  async findAvailableWorkerForType(taskType: string): Promise<WorkerInfo | null> {
    return await this.mutex.runExclusive(() => {
      for (const w of this.workers.values()) {
        if (w.available && w.capabilities.has(taskType)) return w;
      }
      return null;
    });
  }
}

export const workerService = new WorkerService();