import { arregloSchema, verifyTipo, verifyId } from "../schemas/arreglos.schemas";
import conexion from "../conexion";
import { ArregloNuevo, Arreglo } from "../types/typesArreglos";

export const selectArreglos = async () => {
    try {
        const [results] = await conexion.query("SELECT * FROM arreglosflorales WHERE Estatus = 1");
        return results
    }
    catch (err) {
        return { error: "No se puede obtener el arreglo" };
    }
}

export const selectArreglosId = async (ID_Arreglo: number) => {
    try {
        const validacion = verifyId.safeParse({ID_Arreglo});
        if (!validacion.success) {
            return { error: "No se puede obtener el arreglo" };
        }
        const [results] = await conexion.query("SELECT * FROM arreglosflorales WHERE ID_Arreglo = ?", [ID_Arreglo]);
        return results
    }
    catch (err) {
        return { error: "No se puede obtener el arreglo" };
    }
}

export const selectArreglosTipo = async (tipo: Number) => {
    try {
        const validacion = verifyTipo.safeParse({ Tipo_de_arreglo: tipo });
        if (!validacion.success) {
            return { error: "No se puede obtener el arreglo" };
        }
        const [results] = await conexion.query("SELECT * FROM arreglosflorales WHERE Estatus = 1 AND Tipo_de_arreglo = ?", [tipo]);
        return results
    }
    catch (err) {
        return { error: "No se puede obtener el arreglo" };
    }
}

export const agregarArreglos = async (nuevo: ArregloNuevo) => {
    try {
        const validacion = arregloSchema.safeParse(nuevo);
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const { Descripcion, Tipo_de_arreglo } = nuevo;
        const [results] = await conexion.query("INSERT INTO arreglosflorales (Descripcion, Tipo_de_arreglo, Estatus) VALUES (?, ?, 1)", [Descripcion, Tipo_de_arreglo]);
        return results;
    } catch (error) {
        return { error: "No se puede agregar el arreglo" };
    }
}

export const modificarArreglos = async (modificado: Arreglo) => {
    try {
        const validacion = arregloSchema.safeParse(modificado);
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const { ID_Arreglo, Descripcion, Tipo_de_arreglo, Estatus } = modificado;
        const [results] = await conexion.query("UPDATE arreglosflorales SET Descripcion = ?, Tipo_de_arreglo = ?, Estatus = ? WHERE ID_Arreglo = ?", [Descripcion, Tipo_de_arreglo, Estatus, ID_Arreglo]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar" }
    }
}

export const borrarArreglos = async (ID_Arreglo: number) => {
    try {
        const validacion = verifyId.safeParse({ ID_Arreglo });
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const [results] = await conexion.query('UPDATE arreglosflorales set Estatus = 2 WHERE ID_Arreglo = ?', [ID_Arreglo]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar el arreglo" };
    }
};
