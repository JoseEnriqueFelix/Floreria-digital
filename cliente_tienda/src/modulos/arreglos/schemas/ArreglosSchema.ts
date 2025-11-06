import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";


//Validaciones con Zod – construir schema
export const arregloSchema = toTypedSchema(z.object({
    ID_Arreglo: z.number().int().positive(),
    Descripcion: z.string().min(2).max(300),
    Tipo_de_arreglo: z.number().int().positive().min(1).max(4),
    Estatus: z.number().int().positive().min(1).max(2)
}).or(
    z.object({
        Descripcion: z.string().min(2).max(300),
        Tipo_de_arreglo: z.number().int().positive().min(1).max(4),
        Estatus: z.number().int().positive().min(1).max(2)
    })
));

export const arregloNuevo = toTypedSchema(z.object({
    Descripcion: z.string().min(2).max(300),
    Tipo_de_arreglo: z.number().int().positive().min(1).max(4),
}));

export const verifyTipo = toTypedSchema(z.object({
    Tipo_de_arreglo: z.number().int().positive().min(1).max(4),
}));

export const verifyID = toTypedSchema(z.object({
    ID_Arreglo: z.number().int().positive(),
}));