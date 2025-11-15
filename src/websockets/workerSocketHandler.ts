import { workerService } from "../services/workerService.js";
import { dispatcherService } from "../services/dispatcherService.js";
import { resolveTaskResult } from "../controllers/peticionesController.js";

export const handleWorkerMessage = async (ws:any, msg:any) => {
  const { messageType, payload } = msg;

  switch (messageType) {
    case "register":
      await workerService.registerWorker({
        workerId: payload.workerId,
        ws,
        capabilities: new Set(payload.capabilities),
        available: true
      });
      await dispatcherService.tryDispatch();
      break;

    case "availability":
      await workerService.setAvailability(payload.workerId, payload.available);
      if (payload.available) await dispatcherService.tryDispatch();
      break;

    case "taskResult":
      resolveTaskResult(payload.requestId, payload.result);
      await workerService.setAvailability(payload.workerId, true);
      await dispatcherService.tryDispatch();
      break;
  }
};