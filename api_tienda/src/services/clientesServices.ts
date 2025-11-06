import { Cliente, ClienteNuevo } from "../types/typesClientes";
import { clienteSchema, verifyIDCliente } from "../schemas/clientes.schemas";
import conexion from "../conexion";

export const selectClientes = async () => {
    try {
        const [results] = await conexion.query("SELECT * FROM clientes");
        return results
    }
    catch (err) {
        return { error: "No se puede obtener los clientes" };
    }
}

export const selectClientePorID = async (ID_Cliente: number) => {
    try {
        const validacion = verifyIDCliente.safeParse({ ID_Cliente });
        if (!validacion.success) {
            return { error: validacion.error };
        }

        const [results] = await conexion.query(
            "SELECT * FROM clientes WHERE ID_Cliente = ?",
            [ID_Cliente]
        );

        return results;
    } catch (err) {
        return { error: "No se puede obtener el cliente" };
    }
};

export const agregarClientes = async (nuevo: ClienteNuevo) => {
    try {
        const validacion = clienteSchema.safeParse(nuevo);
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const { Nombre_completo, Direccion, Telefono } = nuevo;
        const [results] = await conexion.query("INSERT INTO clientes(Nombre_completo, Direccion, Telefono) VALUES(?, ?, ?)", [Nombre_completo, Direccion, Telefono]);
        return results;
    } catch (error) {
        return { error: "No se puede agregar el cliente" };
    }
}

export const modificarClientes = async (modificado: Cliente) => {
    try {
        const validacion = clienteSchema.safeParse(modificado);
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const { Nombre_completo, Direccion, Telefono, ID_Cliente } = modificado;
        const [results] = await conexion.query("UPDATE clientes SET Nombre_completo = ?, Direccion = ?, Telefono = ? WHERE ID_Cliente = ?", [Nombre_completo, Direccion, Telefono, ID_Cliente]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar" }
    }
}

export const borrarClientes = async (ID_Cliente: number) => {
    try {
        const validacion = verifyIDCliente.safeParse({ID_Cliente} );
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const [results] = await conexion.query('DELETE FROM clientes WHERE ID_Cliente = ?', [ID_Cliente]);
        return results;
    } catch (err) {
        return { error: "No se puede borrar el cliente" };
    }
}; 
