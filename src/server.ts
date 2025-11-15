import express from "express";
import peticionesRoutes from "./routes/peticionesRoutes.js";
import { WebSocketServer, WebSocket  } from "ws";
import { handleWorkerMessage }  from "./websockets/workerSocketHandler.js";

const app = express();
app.use(express.json());
app.use("/", peticionesRoutes);

const HTTP_PORT = 3000;
const WS_PORT = 8080;

app.listen(HTTP_PORT, () => {
  console.log(`REST API running at http://localhost:${HTTP_PORT}`);
});

const wss = new WebSocketServer({ port: WS_PORT });
wss.on("connection", ws => {
  ws.on("message", raw => {
    try {
      const msg = JSON.parse(raw.toString());
      handleWorkerMessage(ws, msg);
    } catch (e) {
      console.error("Invalid message", e);
    }
  });
});