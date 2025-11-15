import { Request, Response } from "express";
import { queueService } from "../services/queueService.js";
import { dispatcherService } from "../services/dispatcherService.js";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_TIMEOUT = 30000;
const pending = new Map();

export const createTask = async (req: Request, res: Response) => {
  const { type, data, timeoutMs } = req.body;
  if (!type) return res.status(400).json({ error: "type is required" });

  const requestId = uuidv4();
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

  await queueService.enqueue(task);
  await dispatcherService.tryDispatch();

  promise
    .then(result => res.json({ requestId, result }))
    .catch(err => res.status(504).json({ requestId, error: err.message }));
};

export const resolveTaskResult = (requestId: string, payload: any) => {
  const item = pending.get(requestId);
  if (!item) return;

  clearTimeout(item.timer);
  pending.delete(requestId);

  item.resolve(payload);
};