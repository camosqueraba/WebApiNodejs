import { queueService }  from "./queueService.js";
import { workerService }  from "./workerService.js";
import { sendJson }  from "../utils/jsonSender.js";

export class DispatcherService {
  async tryDispatch() {
    const queuedTasks = await queueService.getAll();

    for (const task of queuedTasks) {
      const worker = await workerService.findAvailableWorkerForType(task.type);

      if (!worker) continue;

      const removed = await queueService.dequeueMatching(t => t.requestId === task.requestId);
      if (!removed) continue;

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

export const dispatcherService = new DispatcherService();