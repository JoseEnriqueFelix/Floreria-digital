<template>
  <section>
    <h3></h3>
    <h3>Clientes</h3>
    <h3></h3>
    <div>
      <RouterLink :to="{ path: '/clientes/agregar' }">
        <button class="btn btn-sm btn-outline-primary">
          Agregar <i class="fa fa-plus"></i>
        </button>
      </RouterLink>
    </div>
  </section>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID Cliente</th>
        <th>Nombre completo</th>
        <th>Direccion</th>
        <th>Telefono</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="clientes.length == 0">
        <td class="centrado" colspan="6">Sin clientes registrados</td>
      </tr>
      <tr v-else v-for="(cliente, index) in clientes" :key="index">
        <td>{{ cliente.ID_Cliente }}</td>
        <td>{{ cliente.Nombre_completo }}</td>
        <td>{{ cliente.Direccion }}</td>
        <td>{{ cliente.Telefono }}</td>
        <td class="centrado">
          <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button type="button" class="btn btn-sm btn-outline-primary">
              <RouterLink class="nav-link" :to="{ path: '/cliente/' + cliente.ID_Cliente + '/editar' }"><i
                  class="fa fa-pencil"></i></RouterLink>
            </button>
            <button type="button" class="btn btn-sm btn-outline-danger">
              <RouterLink class="nav-link" :to="{ path: '/cliente/' + cliente.ID_Cliente + '/borrar' }"><i
                  class="fa fa-trash"></i></RouterLink>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useClientes } from "../controladores/useClientes";
const { traeClientes, clientes } = useClientes();
onMounted(async () => {
  await traeClientes();
});
</script>

<style scoped>
section {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin-top: 20px;
}

.centrado {
  text-align: center;
}
</style>
