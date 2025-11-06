<template>
  <section>
    <h3></h3>
    <h3>Personal</h3>
    <div>
      <RouterLink :to="{ path: '/personal/agregar' }">
        <button class="btn btn-sm btn-outline-primary">
          Agregar <i class="fa fa-plus"></i>
        </button>
      </RouterLink>
    </div>
  </section>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre completo</th>
        <th>Direccion</th>
        <th>Telefono</th>
        <th>Estatus</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="personal.length == 0">
        <td class="centrado" colspan="6">Sin personal registrado</td>
      </tr>
      <tr v-else v-for="(persona, index) in personal" :key="index">
        <td>{{ persona.ID }}</td>
        <td>{{ persona.Nombre_completo }}</td>
        <td>{{ persona.Direccion }}</td>
        <td>{{ persona.Telefono }}</td>
        <td>{{ persona.Estatus }}</td>
        <td class="centrado">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button type="button" class="btn btn-sm btn-outline-primary">
              <RouterLink
                class="nav-link"
                :to="{ path: '/personal/' + persona.ID + '/editar' }"
                ><i class="fa fa-pencil"></i
              ></RouterLink>
            </button>
            <button type="button" class="btn btn-sm btn-outline-danger">
              <RouterLink
                class="nav-link"
                :to="{ path: '/personal/' + persona.ID + '/borrar' }"
                ><i class="fa fa-trash"></i
              ></RouterLink>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { usePersonal } from "../controladores/usePersonal";
const { traePersonal, personal } = usePersonal();
onMounted(async () => {
  await traePersonal();
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
