import { z } from "zod";

const telefonoRegEx = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9]+)+$/
);

//Validaciones con Zod – construir schema
export const clienteSchema = z.object({
    ID_Cliente: z.number().int().positive(),
    Nombre_completo: z.string().min(2).max(100),
    Direccion: z.string().min(2).max(300),
    Telefono: z.string().regex(telefonoRegEx)
}).or(
    z.object({
        Nombre_completo: z.string().min(2).max(100),
        Direccion: z.string().min(2).max(300),
        Telefono: z.string().regex(telefonoRegEx),
    })
);

export const verifyIDCliente = z.object({
    ID_Cliente: z.number().int().positive(),
})