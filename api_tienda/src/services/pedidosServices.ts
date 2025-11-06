import { Pedido, PedidoNuevo } from "../types/typesPedidos";
import { estatus, fechaP, pedidoSchema, rangoFechasSchema, verifyID, verifyFolio } from "../schemas/pedidos.schemas";
import conexion from "../conexion";

export const selectPedidos = async () => {
    try {
        const [results] = await conexion.query("SELECT * FROM pedidos");
        return results
    }
    catch (err) {
        return { error: "No se puede obtener los pedidos" };
    }
}

export const selectPedidoPorFolio = async (Folio: number) => {
    try {
        const validacion = verifyFolio.safeParse({ Folio });
        if (!validacion.success) {
            return { error: validacion.error };
        }
        const [res] = await conexion.query("SELECT * FROM pedidos WHERE Folio = ?", [Folio]);
        return res;
    } catch (error) {
        return { error: "No se puede obtener el pedido" };

    }
}

export const nuevoPedido = async (nuevo: PedidoNuevo) => {
    try {
        const validacion = pedidoSchema.safeParse(nuevo);
        if (!validacion.success) {
            // eslint-disable-next-line no-console
            console.error('Validación fallida en nuevoPedido:', validacion.error);
            return { error: validacion.error }
        }
        const
            {
                ID_Cliente,
                ID_Arreglo,
                Descripcion_del_pedido,
                Fecha_y_hora_del_pedido,
                Fecha_y_hora_de_entrega,
                Direccion_de_entrega,
                Precio_sugerido,
                ID_personal_asignado,
                Entregado,
                Pagado
            } = nuevo;
        const [results] = await conexion.query("INSERT INTO pedidos(ID_Cliente, ID_Arreglo, Descripcion_del_pedido, Fecha_y_hora_del_pedido, Fecha_y_hora_de_entrega, Direccion_de_entrega, Precio_sugerido, ID_personal_asignado, Entregado, Pagado) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [ID_Cliente, ID_Arreglo, Descripcion_del_pedido, Fecha_y_hora_del_pedido, Fecha_y_hora_de_entrega, Direccion_de_entrega, Precio_sugerido, ID_personal_asignado, Entregado, Pagado]);
        return results;
    } catch (error) {
        // Registrar error para depuración
        // eslint-disable-next-line no-console
        console.error('Error en servicios.nuevoPedido:', error);
        return { error: "No se puede agregar a pedidos", details: String(error) };
    }
}

export const modificarPedidos = async (modificado: Pedido) => {
    try {
        const validacion = pedidoSchema.safeParse(modificado);
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const
            {
                Folio,
                ID_Cliente,
                ID_Arreglo,
                Descripcion_del_pedido,
                Fecha_y_hora_del_pedido,
                Fecha_y_hora_de_entrega,
                Direccion_de_entrega,
                Precio_sugerido,
                ID_personal_asignado,
                Entregado,
                Pagado
            } = modificado;
        const [results] = await conexion.query("UPDATE pedidos SET ID_Cliente = ?, ID_Arreglo = ?, Descripcion_del_pedido = ?, Fecha_y_hora_del_pedido = ?, Fecha_y_hora_de_entrega = ?, Direccion_de_entrega = ?, Precio_sugerido = ?, ID_personal_asignado = ?, Entregado = ?, Pagado = ? WHERE Folio = ?",
            [ID_Cliente, ID_Arreglo, Descripcion_del_pedido, Fecha_y_hora_del_pedido, Fecha_y_hora_de_entrega, Direccion_de_entrega, Precio_sugerido, ID_personal_asignado, Entregado, Pagado, Folio]);
        return results;
    } catch (err) {
        return { error: "No se puede modificar" }
    }
}

export const borrarPedido = async (folio: number) => {
    try {
        const validacion = verifyFolio.safeParse({Folio: folio});
        if(!validacion.success)
            return {error: validacion.error};
        const [results] = await conexion.query("DELETE FROM pedidos WHERE Folio = ?", [folio]);
        return results;
    } catch (error) {
        return {error: "No se puede borrar el pedido"}
    }
};

// Consultar pedidos por fecha de pedido
export const selectPedidosPorFechaPedido = async (fecha: string) => {
    try {
        const validacion = fechaP.safeParse({ fecha: fecha });
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const [results] = await conexion.query(
            "SELECT * FROM pedidos WHERE DATE(Fecha_y_hora_del_pedido) = ?",
            [fecha]
        );
        return results;
    } catch (err) {
        return { error: "No se pueden obtener los pedidos por fecha de pedido" };
    }
}

// Consultar pedidos por fecha de entrega
export const selectPedidosPorFechaEntrega = async (fecha: string) => {
    try {
        const validacion = fechaP.safeParse({ fecha: fecha });
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const [results] = await conexion.query(
            "SELECT * FROM pedidos WHERE DATE(Fecha_y_hora_de_entrega) = ?",
            [fecha]
        );
        return results;
    } catch (err) {
        return { error: "No se pueden obtener los pedidos por fecha de entrega" };
    }
}

// Consultar pedidos por rango de fechas de pedido
export const selectPedidosPorRangoFechaPedido = async (fechaInicio: string, fechaFin: string) => {
    try {
        const validacion = rangoFechasSchema.safeParse({ inicio: fechaInicio, fin: fechaFin });
        if (!validacion.success) {
            return { error: validacion.error }
        }        
        const [results] = await conexion.query(
            "SELECT * FROM pedidos WHERE DATE(Fecha_y_hora_del_pedido) BETWEEN ? AND ?",
            [fechaInicio, fechaFin]
        );
        return results;
    } catch (err) {
        return { error: "No se pueden obtener los pedidos por rango de fechas de pedido" };
    }
}

// Consultar pedidos por rango de fechas de entrega
export const selectPedidosPorRangoFechaEntrega = async (fechaInicio: string, fechaFin: string) => {
    try {
        const validacion = rangoFechasSchema.safeParse({ inicio: fechaInicio, fin: fechaFin });
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const [results] = await conexion.query(
            "SELECT * FROM pedidos WHERE DATE(Fecha_y_hora_de_entrega) BETWEEN ? AND ?",
            [fechaInicio, fechaFin]
        );
        return results;
    } catch (err) {
        return { error: "No se pueden obtener los pedidos por rango de fechas de entrega" };
    }
}

// Consultar pedidos por estatus de entrega
export const selectPedidosPorEstatusEntrega = async (entregado: string) => {
    try {
        const validacion = estatus.safeParse({ estatus: Number(entregado) });
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const [results] = await conexion.query(
            "SELECT * FROM pedidos WHERE Entregado = ?",
            [entregado]
        );
        return results;
    } catch (err) {
        return { error: "No se pueden obtener los pedidos por estatus de entrega" };
    }
}

// Consultar pedidos por estatus de pago
export const selectPedidosPorEstatusPago = async (pagado: string) => {
    try {
        const validacion = estatus.safeParse({ estatus: Number(pagado) });
        if (!validacion.success) {
            return { error: validacion.error };
        }

        const [results] = await conexion.query(
            "SELECT * FROM pedidos WHERE Pagado = ?",
            [pagado]
        );

        if (pagado === "1") {
            const [totalRows] = await conexion.query(
                "SELECT SUM(Precio_sugerido) as totalPagado FROM pedidos WHERE Pagado = 1"
            );

            const totalPagado = (totalRows as any[])[0]?.totalPagado ?? 0;

            return {
                pedidos: results,
                totalPagado: Number(totalPagado)
            };
        }

        return {
            pedidos: results
        };
    } catch (err) {
        return { error: "No se pueden obtener los pedidos por estatus de pago" };
    }
}

//pedidos por personal
export const selectPersonalPedidos = async (id: number) => {
    try {
        const validacion = verifyID.safeParse({ ID_personal_asignado: id });
        if (!validacion.success) {
            return { error: validacion.error }
        }
        const [results] = await conexion.query(
            "SELECT * FROM pedidos WHERE ID_personal_asignado = ?",
            [id]
        );
        return results;
    } catch (error) {
        return { error: "No se pueden obtener los pedidos del personal" };
    }
}

