import { PersonalNuevo, Personal } from "../types/typesPersonal";
import { personaSchema, verifyEstatus, verifyID } from "../schemas/personal.schemas";
import conexion from "../conexion";


export const selectPersonal = async (estatus: number) => {
    try {
        const validacion = verifyEstatus.safeParse({ Estatus: estatus });
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const [results] = await conexion.query("SELECT * FROM personal WHERE Estatus = ?", [estatus]);
        return results
    }
    catch (err) {
        return { error: "No se puede obtener el personal" };
    }
}

export const selectAllPersonal = async () => {
    try {
        const [results] = await conexion.query("SELECT * FROM personal");
        return results;
    } catch (err) {
        return { error: "No se puede obtener el personal" };
    }
};

export const selectPersonalId = async (id: number) => {
    try {
        const validacion = verifyID.safeParse({ID: id});
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const [results] = await conexion.query("SELECT * FROM personal WHERE ID = ?", [id]);
        return results;
    } catch (err) {
        return { error: "No se puede obtener el personal con ese ID" };
    }
};

export const agregarPersonal = async (nuevo: PersonalNuevo) => {
    try {
        const validacion = personaSchema.safeParse(nuevo);
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const { Nombre_completo, Direccion, Telefono, Estatus } = nuevo;
        const [results] = await conexion.query("INSERT INTO personal(Nombre_completo, Direccion, Telefono, Estatus) VALUES(?, ?, ?, ?)", [Nombre_completo, Direccion, Telefono, Estatus]);
        return results;
    } catch (error) {
        return { error: "No se puede agregar al personal" };
    }
}

export const modificarPersonal = async (modificado: Personal) => {
    try {
        const validacion = personaSchema.safeParse(modificado);
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const { Nombre_completo, Direccion, Telefono, Estatus, ID } = modificado;
        const [results] = await conexion.query("UPDATE personal SET Nombre_completo = ?, Direccion = ?, Telefono = ?, Estatus = ? WHERE ID = ?", [Nombre_completo, Direccion, Telefono, Estatus, ID]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar" }
    }
}

export const borrarPersonal = async (ID: number) => {
    try {
        const validacion = verifyID.safeParse({ID: ID});
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const [results] = await conexion.query('UPDATE personal set Estatus = 2 WHERE ID = ?', [ID]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar el personal" };
    }
}; 
