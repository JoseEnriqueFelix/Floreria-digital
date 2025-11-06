import { ref } from "vue";
import type {
  Personal,
  PersonalNuevo,
} from "../interfaces/personal-interface";
import api from "../../api/api"

export const usePersonal = () => {
  const personal = ref<Personal[]>([]);
  const personalBaja = ref<Personal[]>([]);
  let mensaje = ref(0);

  const traePersonal = async () => {
    const respuesta = await api.get<Personal[]>("/personal/estatus/1");
    personal.value = respuesta.data;
  };

  const traePersonalBaja = async () => {
    const respuesta = await api.get<Personal[]>("/personal/estatus/2");
    personalBaja.value = respuesta.data;
  }

  const agregarPersonal = async (personal: PersonalNuevo) => {
    const respuesta = await api.post("/personal", personal);
    if (respuesta.data.affectedRows >= 1) {
      mensaje.value = 1;
    }
  };

  const traePersonalId = async (id: number) => {
    const respuesta = await api.get<Personal[]>("/personal/" + id);
    personal.value = respuesta.data;
  };

  const actualizarPersonal = async (personal: Personal) => {
    const respuesta = await api.put("/personal", personal);
    if (respuesta.data.affectedRows >= 1) {
      mensaje.value = 1;
    }
  };

  const borrarPersonal = async () => {
    try {
      const id = personal.value[0]?.ID;
      if (!id) {
        console.error("ID inválido o no encontrado");
        return;
      }
      const respuesta = await api.patch(`/personal/borrar/${id}`);
      if (respuesta.data?.affectedRows > 0) {
        mensaje.value = 1;
      }
      else
        mensaje.value = 2
    } catch (error) {
      console.error("Error al borrar el personal:", error);
    }
  };

  const resetMensaje = () => {
    mensaje.value = 0;
  };



  return {
    personal,
    personalBaja,
    mensaje,
    traePersonal,
    traePersonalBaja,
    traePersonalId,
    agregarPersonal,
    actualizarPersonal,
    borrarPersonal,
    resetMensaje
  };
};
