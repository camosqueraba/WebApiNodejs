import { registerWorker, freeWorker } from "../services/workerService.js";
import { pendingJobs } from "../services/queueService.js";
import { dispatchJobs } from "../services/dispatcherService.js";

export function workerSocketHandler(wss) {

    wss.on("connection", ws => {

        let workerId = null;

        ws.on("message", data => {

            let msg = JSON.parse(data.toString());

            if (msg.type === "register") {
                workerId = msg.workerId;
                registerWorker(workerId, ws, msg.supportedTypes);
                console.log(`Worker registered: ${workerId}`);
                dispatchJobs();
                return;
            }

            if (msg.type === "result") {
                freeWorker(workerId);

                const job = pendingJobs.get(msg.jobId);
                if (!job) return;

                clearTimeout(job.timeoutTimer);
                job.res.json({ result: msg.result });

                pendingJobs.delete(msg.jobId);

                dispatchJobs();
            }
        });

        ws.on("close", () => {
            console.log(`Worker disconnected ${workerId}`);
        });

    });

}