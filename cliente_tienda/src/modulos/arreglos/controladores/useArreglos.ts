import { ref } from "vue";
import type {
    Arreglo, createArreglo
} from "../interfaces/arreglo-interface";
import api from "../../api/api"

export const useArreglos = () => {
    const arreglos = ref<Arreglo[]>([]);
    let mensaje = ref(0);

    const traeArreglos = async () => {
        const respuesta = await api.get<Arreglo[]>("/arreglos");
        arreglos.value = respuesta.data;
    };

    const traeArreglosTipo = async (tipo: number) => {
        const respuesta = await api.get<Arreglo[]>("/arreglos/tipos/" + tipo);
        arreglos.value = respuesta.data;
    }

    const traeArregloId = async (id: number) => {
        const respuesta = await api.get<Arreglo[]>("/arreglos/" + id);
        arreglos.value = respuesta.data;
    };

    const actualizarArreglos = async (arreglo: Arreglo) => {
        const respuesta = await api.put("/arreglos", arreglo);
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    };

    const borrarArreglo = async () => {
        try {
            const id = arreglos.value[0]?.ID_Arreglo;
            if (!id) {
                console.error("ID inválido o no encontrado");
                return;
            }
            const respuesta = await api.patch(`/arreglos/borrar/${id}`);
            if (respuesta.data?.affectedRows > 0) {
                mensaje.value = 1;
            }
            else
                mensaje.value = 2
        } catch (error) {
            console.error("Error al borrar el arreglo:", error);
        }
    };

    const agregarArreglo = async (arreglo: createArreglo) => {
        const respuesta = await api.post("/arreglos", arreglo);
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    }

    const resetMensaje = () => {
        mensaje.value = 0;
    };

    return {
        arreglos,
        mensaje,
        traeArreglos,
        traeArreglosTipo,
        traeArregloId,
        borrarArreglo,
        actualizarArreglos,
        agregarArreglo,
        resetMensaje
    };
};
