<template>
  <section>
    <h3></h3>
    <h3>Arreglos Florales</h3>
    <h3></h3>
    <div>
      <RouterLink :to="{ path: '/arreglos/agregar' }">
        <button class="btn btn-sm btn-outline-primary">
          Agregar <i class="fa fa-plus"></i>
        </button>
      </RouterLink>
    </div>
  </section>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID Arreglo</th>
        <th>Descripcion</th>
        <th>Tipo de arreglo</th>
        <th>Estatus</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="arreglos.length == 0">
        <td class="centrado" colspan="6">Sin arreglos registrados</td>
      </tr>
      <tr v-else v-for="(arreglo, index) in arreglos" :key="index">
        <td>{{ arreglo.ID_Arreglo }}</td>
        <td>{{ arreglo.Descripcion }}</td>
        <td>{{ arreglo.Tipo_de_arreglo }}</td>
        <td>{{ arreglo.Estatus }}</td>
        <td class="centrado">
          <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button type="button" class="btn btn-sm btn-outline-primary">
              <RouterLink class="nav-link" :to="{ path: '/arreglos/' + arreglo.ID_Arreglo + '/editar' }"><i
                  class="fa fa-pencil"></i></RouterLink>
            </button>
            <button type="button" class="btn btn-sm btn-outline-danger">
              <RouterLink class="nav-link" :to="{ path: '/arreglos/' + arreglo.ID_Arreglo + '/borrar' }"><i
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
import { useArreglos } from "../controladores/useArreglos";
const { traeArreglos, arreglos } = useArreglos();
onMounted(async () => {
  await traeArreglos();
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
