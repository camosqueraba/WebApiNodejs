export interface TaskRequest {
  requestId: string;
  type: string;
  data: any;
  receivedAt: number;
  timeoutMs: number;
}