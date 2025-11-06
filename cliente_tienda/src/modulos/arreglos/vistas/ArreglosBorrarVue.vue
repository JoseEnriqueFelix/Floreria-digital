<template>
  <div class="container mt-5" v-if="arreglos[0]">
    <div class="card">
      <div class="card-header">
        <h4>Borrar arreglo</h4>
      </div>
      <div v-if="mensaje == 2" class="alert alert-danger" role="alert">
        Este arreglo no se puede borrar
      </div>
      <div v-else class="alert alert-warning" role="alert">
        ¿Seguro de borrar informacion?
        <i class="fa fa-warning"></i>
      </div>
      <div class="card-body">
        <div class="mb-3">
          Id Arreglo
          <input type="text" class="form-control" v-model="arreglos[0].ID_Arreglo" disabled />
        </div>
        <div class="mb-3">
          Descripcion
          <input type="text" class="form-control" v-model="arreglos[0].Descripcion" disabled />
        </div>
        <div class="mb-3">
          Tipo de arreglo
          <input type="text" class="form-control" v-model="arreglos[0].Tipo_de_arreglo" disabled />
        </div>
        <div class="mb-3">
          Estatus
          <input type="text" class="form-control" v-model="arreglos[0].Estatus" disabled />
        </div>
        <div class="mb-3">
          <button class="btn btn-danger me-2" @click="borrarArreglo()">
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
import { useArreglos } from "../controladores/useArreglos";
import { useRoute, useRouter } from "vue-router";
const { traeArregloId, mensaje, arreglos, borrarArreglo } = useArreglos();
let id = 0;
// Para los parametros de la URL
const route = useRoute();
// para moverme de URL
const routeRedirect = useRouter();
// observador - Watch
watch(
  () => mensaje.value,
  (newId) => {
    routeRedirect.push("/arreglos");
  }
);

onMounted(async () => {
  id = Number(route.params.ID_Arreglo);
  await traeArregloId(Number(id));
});

const volver = () => {
  routeRedirect.push("/arreglos");
}
</script>

<style scoped></style>
