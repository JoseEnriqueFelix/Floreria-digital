import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

const fechaHoraRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

export const pedidoSchema = toTypedSchema(z.object({
    ID_Cliente: z.number().int().positive(),
    ID_Arreglo: z.number().int().positive(),
    Descripcion_del_pedido: z.string().min(2).max(300),
    Fecha_y_hora_del_pedido: z.string().regex(fechaHoraRegex),
    Fecha_y_hora_de_entrega: z.string().regex(fechaHoraRegex),
    Direccion_de_entrega: z.string().min(2).max(300),
    Precio_sugerido: z.number().int().positive(),
    ID_personal_asignado: z.number().int().positive(),
    Entregado: z.number().int().positive().min(1).max(2),
    Pagado: z.number().int().positive().min(1).max(2)
}));

export const rangoFechasSchema = toTypedSchema(z.object({
    inicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    fin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
}));

export const fechaP = toTypedSchema(z.object({
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
}));

export const estatus = toTypedSchema(z.object({
    estatus: z.number().int().positive().min(1).max(2),
}));

export const verifyID = toTypedSchema(z.object({
    ID_personal_asignado: z.number().int().positive()
}));