<template>
  <div class="container mt-5" v-if="personal[0]">
    <div class="card">
      <div class="card-header">
        <h4>Borrar personal</h4>
      </div>
      <div v-if="mensaje == 2" class="alert alert-danger" role="alert">
        Este elemento no se puede borrar
      </div>
      <div v-else class="alert alert-warning" role="alert">
        ¿Seguro de borrar informacion?
        <i class="fa fa-warning"></i>
      </div>
      <div class="card-body">
        <div class="mb-3">
          Id
          <input type="text" class="form-control" v-model="personal[0].ID" disabled />
        </div>
        <div class="mb-3">
          Nombre
          <input type="text" class="form-control" v-model="personal[0].Nombre_completo" disabled />
        </div>
        <div class="mb-3">
          Direccion
          <input type="text" class="form-control" v-model="personal[0].Direccion" disabled />
        </div>
        <div class="mb-3">
          Telefono
          <input type="text" class="form-control" v-model="personal[0].Telefono" disabled />
        </div>
        <div class="mb-3">
          Estatus
          <input type="text" class="form-control" v-model="personal[0].Estatus" disabled />
        </div>
        <div class="mb-3">
          <button class="btn btn-danger me-2" @click="borrarPersonal()">
            Borrar
          </button>
          <button class="btn btn-secondary" @click="volver()">
            <i class="fa fa-arrow-left"></i> Volver
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { usePersonal } from "../controladores/usePersonal";
import { useRoute, useRouter } from "vue-router";
const { traePersonalId, mensaje, personal, borrarPersonal } = usePersonal();
let idPersona = 0;
// Para los parametros de la URL
const route = useRoute();
// para moverme de URL
const routeRedirect = useRouter();
// observador - Watch
watch(
  () => mensaje.value,
  (newId) => {
    routeRedirect.push("/personal");
  }
);

onMounted(async () => {
  idPersona = Number(route.params.ID);
  await traePersonalId(Number(idPersona));
});

const volver = () => {
  routeRedirect.push("/personal");
}
</script>

<style scoped></style>
