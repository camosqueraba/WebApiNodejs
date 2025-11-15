import { Mutex } from "async-mutex";
import { TaskRequest }  from "../models/TaskRequest.js";

class QueueService {
  private queue: TaskRequest[] = [];
  private mutex = new Mutex();

  async enqueue(task: TaskRequest) {
    await this.mutex.runExclusive(() => {
      this.queue.push(task);
    });
  }

  async dequeueMatching(predicate: (t: TaskRequest) => boolean): Promise<TaskRequest | null> {
    return await this.mutex.runExclusive(() => {
      const idx = this.queue.findIndex(predicate);
      if (idx >= 0) {
        return this.queue.splice(idx, 1)[0];
      }
      return null;
    });
  }

  async getAll(): Promise<TaskRequest[]> {
    return await this.mutex.runExclusive(() => [...this.queue]);
  }
}

export const queueService = new QueueService();