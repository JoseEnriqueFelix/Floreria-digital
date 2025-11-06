import { z } from "zod";

const telefonoRegEx = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9]+)+$/
);

//Validaciones con Zod – construir schema
export const personaSchema = z.object({
    Nombre_completo: z.string().min(2).max(100),
    Direccion: z.string().min(2).max(300),
    Telefono: z.string().regex(telefonoRegEx),
    Estatus: z.number().int().positive().min(1).max(2)
}).or(
    z.object({
        Nombre_completo: z.string().min(2).max(100),
        Direccion: z.string().min(2).max(300),
        Telefono: z.string().regex(telefonoRegEx)
    })
).or(
    z.object({
        ID: z.number().int().positive(),
        Nombre_completo: z.string().min(2).max(100),
        Direccion: z.string().min(2).max(300),
        Telefono: z.string().regex(telefonoRegEx),
        Estatus: z.number().int().positive().min(1).max(2)
    })
);

export const verifyEstatus = z.object({
    Estatus: z.number().int().positive().min(1).max(2)
});

export const verifyID = z.object({
    ID: z.number().int().positive(),
})
/*.refine(data => data.direccion == "TEC DE CULLACAN", {
    message: "La dirección debe ser del Tec de Cullacán",
    path: ["direccion"]
});*/