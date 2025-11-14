import express from 'express';
import bodyParser from 'body-parser';
import peticionesRoutes from './routes/peticionesRoutes.js';
import http from 'http';
import { WebSocketServer } from 'ws';
import 'dotenv/config.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/peticiones", peticionesRoutes);


try
{
    const PORT = process.env.PORT || 3000;
       
    const server = http.createServer(app);
    console.log("typeof server:", typeof server);
    console.log("constructor:", server.constructor?.name);

    const webSocketServer = new WebSocketServer({ server }); // comparte el mismo servidor HTTP

    webSocketServer.on('connection', (ws) => {
        console.log('Cliente WebSocket conectado');

        ws.on('message', (msg) => {
            console.log("WS recibió:", msg);
            ws.send(`Eco desde servidor: ${msg}`);
        });

        ws.on('close', () => {
            console.log('Cliente WS desconectado');
        });
    });

    // Función para enviar mensajes a todos los clientes WebSocket
    function broadcastWS(message) {
        webSocketServer.clients.forEach(client => {
            if (client.readyState === client.OPEN) {
                client.send(message);
            }
        });
    }
    

    server.listen(PORT, () => {
        console.log('Servidor node activo Puerto: ' + PORT);
    });
    
}
catch (error)
{
    console.log("Error al iniciar el servidor: " + error);
}





