"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJson = sendJson;
exports.sendError = sendError;
exports.serializeForSocket = serializeForSocket;
/**
 * Envía una respuesta JSON estandarizada desde el servidor HTTP.
 *
 * @param res Express Response
 * @param status HTTP status code
 * @param data  Datos a enviar
 */
function sendJson(res, status, data) {
    res.status(status).json({
        ok: status >= 200 && status < 300,
        data
    });
}
/**
 * Envía un mensaje de error estandarizado en formato JSON.
 *
 * @param res Express Response
 * @param status HTTP error status
 * @param message Texto claro del error
 * @param details Detalles opcionales
 */
function sendError(res, status, message, details) {
    res.status(status).json({
        ok: false,
        error: {
            message,
            details
        }
    });
}
/**
 * Utilidad para sockets: serializa y devuelve JSON seguro.
 *
 * @param payload Objeto a serializar
 */
function serializeForSocket(payload) {
    try {
        return JSON.stringify(payload);
    }
    catch (error) {
        return JSON.stringify({
            ok: false,
            error: "Failed to serialize socket payload"
        });
    }
}
