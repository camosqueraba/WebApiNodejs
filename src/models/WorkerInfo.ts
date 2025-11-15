import { WebSocket } from "ws";

export interface WorkerInfo {
  workerId: string;
  ws: WebSocket;
  capabilities: Set<string>;
  available: boolean;
}