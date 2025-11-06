import { ref } from "vue";
import type {
    Pedido, PedidoNuevo
} from "../interfaces/pedido-interface";
import api from "../../api/api"

type RespuestaPedidos = {
    pedidos: Pedido[];
    totalPagado?: number;
};


export const usePedidos = () => {
    const pedidos = ref<Pedido[]>([]);
    let mensaje = ref(0);

    const traePedidos = async () => {
        const respuesta = await api.get<Pedido[]>("/pedidos");
        pedidos.value = respuesta.data;
    };

    // "/pedidos/rango-fecha-pedido?inicio={}&fin={}"
    const consultarRangoFechasPedidos = async (inicio: String, fin: String) => {
        const respuesta = await api.get<Pedido[]>("/pedidos/rango-fecha-pedido?inicio=" + inicio + "&fin=" + fin);
        pedidos.value = respuesta.data;
    }

    // "/pedidos/rango-fecha-entrega?inicio={}&fin={}"
    const consultarRangoFechasEntregas = async (inicio: String, fin: String) => {
        const respuesta = await api.get<Pedido[]>("/pedidos/rango-fecha-entrega?inicio=" + inicio + "&fin=" + fin);
        pedidos.value = respuesta.data;
    }

    const consultarPorEstatusEntrega = async (entregado: number) => {
        const respuesta = await api.get<Pedido[]>("/pedidos/por-estatus-entrega/" + entregado);
        pedidos.value = respuesta.data;
    }

    const consultarPorEstatusPago = async (pagado: number) => {
        const respuesta = await api.get<RespuestaPedidos>("/pedidos/por-estatus-pago/" + pagado);
        pedidos.value = respuesta.data.pedidos;
    }

    const consultarPorPersonalAsignado = async (IDPersonal: number) => {
        const respuesta = await api.get<Pedido[]>("/pedidos/personal-asignado/" + IDPersonal);
        pedidos.value = respuesta.data;
    }

    const traePedidoId = async (id: number) => {
        const respuesta = await api.get<Pedido[]>("/pedidos/" + id);
        pedidos.value = respuesta.data;
    };

    const agregarPedido = async (pedido: PedidoNuevo) => {
        try {
            const respuesta = await api.post("/pedidos", pedido);
            // Depuración: registrar lo que devuelve el backend
            // (OkPacket u objeto con affectedRows/insertId)
            // eslint-disable-next-line no-console
            console.log('agregarPedido respuesta:', respuesta.data);
            if (respuesta.data && (respuesta.data.affectedRows >= 1 || respuesta.data.insertId)) {
                mensaje.value = 1;
            } else {
                mensaje.value = 2;
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error en agregarPedido:', error);
            mensaje.value = 2;
        }
    }

    const resetMensaje = () => {
        mensaje.value = 0;
    };

    const actualizarPedidos = async (pedido: Pedido) => {
        const respuesta = await api.put("/pedidos", pedido);
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
        else
            mensaje.value = 2;
    }

    const borrarPedidos = async () => {
        try {
            const id = pedidos.value[0]?.Folio;
            if (!id) {
                console.error("Folio inválido o no encontrado");
                return;
            }
            const respuesta = await api.delete(`/pedidos/borrar/${id}`);
            if (respuesta.data?.affectedRows > 0)
                mensaje.value = 1;
            else
                mensaje.value = 2;
        } catch (error) {
            console.error("Error al borrar el pedido", error);
        }
    };

    return {
        pedidos,
        mensaje,
        traePedidoId,
        traePedidos,
        agregarPedido,
        actualizarPedidos,
        borrarPedidos,
        consultarRangoFechasPedidos,
        consultarRangoFechasEntregas,
        consultarPorEstatusEntrega,
        consultarPorEstatusPago,
        consultarPorPersonalAsignado,
        resetMensaje
    };
};
