import { z } from "zod";


//Validaciones con Zod – construir schema
export const arregloSchema = z.object({
    ID_Arreglo: z.number().int().positive(),
    Descripcion: z.string().min(2).max(300),
    Tipo_de_arreglo: z.number().int().positive().min(1).max(4),
    Estatus: z.number().int().positive().min(1).max(2)
}).or(
    z.object({
        Descripcion: z.string().min(2).max(300),
        Tipo_de_arreglo: z.number().int().positive().min(1).max(4),
    })
);

export const verifyTipo = z.object({
    Tipo_de_arreglo: z.number().int().positive().min(1).max(4),
});


export const verifyId = z.object({
    ID_Arreglo: z.number().int().positive(),
});