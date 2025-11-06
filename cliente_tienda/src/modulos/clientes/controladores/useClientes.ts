import { ref } from "vue";
import type {
    Cliente,
    ClienteNuevo,
} from "../interfaces/cliente-interface";
import api from "../../api/api"

export const useClientes = () => {
    const clientes = ref<Cliente[]>([]);
    let mensaje = ref(0);

    const traeClientes = async () => {
        const respuesta = await api.get<Cliente[]>("/clientes");
        clientes.value = respuesta.data;
    };

    const traeClienteId = async (id: number) => {
        const respuesta = await api.get<Cliente[]>("/clientes/" + id);
        clientes.value = respuesta.data;
    };

    const actualizarClientes = async (cliente: Cliente) => {
        const respuesta = await api.put("/clientes", cliente);
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    };

    const borrarCliente = async () => {
        try {
            const id = clientes.value[0]?.ID_Cliente;
            if (!id) {
                console.error("ID inválido o no encontrado");
                return;
            }
            const respuesta = await api.delete(`/clientes/borrar/${id}`);
            if (respuesta.data?.affectedRows > 0) {
                mensaje.value = 1;
            }
            else
                mensaje.value = 2
        } catch (error) {
            console.error("Error al borrar el cliente:", error);
        }
    };

    const agregarCliente = async (cliente: ClienteNuevo) => {
        const respuesta = await api.post("/clientes", cliente);
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    }

    const resetMensaje = () => {
        mensaje.value = 0;
    };



    return {
        clientes,
        mensaje,
        traeClientes,
        traeClienteId,
        actualizarClientes,
        borrarCliente,
        agregarCliente,
        resetMensaje
    };
};
