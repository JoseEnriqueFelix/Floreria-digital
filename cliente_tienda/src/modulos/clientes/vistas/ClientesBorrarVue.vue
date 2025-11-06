<template>
  <div class="container mt-5" v-if="clientes[0]">
    <div class="card">
      <div class="card-header">
        <h4>Borrar clientes</h4>
      </div>
      <div v-if="mensaje == 2" class="alert alert-danger" role="alert">
        Este cliente no se puede borrar
      </div>
      <div v-else class="alert alert-warning" role="alert">
        ¿Seguro de borrar información?
        <i class="fa fa-warning"></i>
      </div>
      <div class="card-body">
        <div class="mb-3">
          Id Cliente
          <input type="text" class="form-control" v-model="clientes[0].ID_Cliente" disabled />
        </div>
        <div class="mb-3">
          Nombre
          <input type="text" class="form-control" v-model="clientes[0].Nombre_completo" disabled />
        </div>
        <div class="mb-3">
          Direccion
          <input type="text" class="form-control" v-model="clientes[0].Direccion" disabled />
        </div>
        <div class="mb-3">
          Telefono
          <input type="text" class="form-control" v-model="clientes[0].Telefono" disabled />
        </div>
        <div class="mb-3">
          <button class="btn btn-danger me-2" @click="borrarCliente()">
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
import { useClientes } from "../controladores/useClientes";
import { useRoute, useRouter } from "vue-router";
const { traeClienteId, mensaje, clientes, borrarCliente } = useClientes();
let id = 0;
// Para los parametros de la URL
const route = useRoute();
// para moverme de URL
const routeRedirect = useRouter();
// observador - Watch
watch(
  () => mensaje.value,
  (newValue) => {
    if (newValue === 1) {
      routeRedirect.push("/clientes");
    }
  }
);

const volver = () => {
  routeRedirect.push("/clientes");
}

onMounted(async () => {
  id = Number(route.params.ID_Cliente);
  await traeClienteId(Number(id));
});
</script>

<style scoped></style>
