import { Response } from "express";

/**
 * Envía una respuesta JSON estandarizada desde el servidor HTTP.
 * 
 * @param res Express Response
 * @param status HTTP status code
 * @param data  Datos a enviar
 */
export function sendJson(res: Response, status: number, data: unknown): void {
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
export function sendError(
    res: Response,
    status: number,
    message: string,
    details?: unknown
): void {
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
export function serializeForSocket(payload: unknown): string {
    try {
        return JSON.stringify(payload);
    } catch (error) {
        return JSON.stringify({
            ok: false,
            error: "Failed to serialize socket payload"
        });
    }
}
