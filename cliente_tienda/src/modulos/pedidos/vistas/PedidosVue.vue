<template>
  <section>
    <h3></h3>
    <h3>Pedidos</h3>
    <h3></h3>
    <div>
      <RouterLink :to="{ path: 'pedidos/agregar' }">
        <button class="btn btn-sm btn-outline-primary">
          Agregar <i class="fa fa-plus"></i>
        </button>
      </RouterLink>
    </div>
  </section>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Folio</th>
        <th>ID_Cliente</th>
        <th>ID_Arreglo</th>
        <th>Descripcion_del_pedido</th>
        <th>Fecha_y_hora_del_pedido</th>
        <th>Fecha_y_hora_de_entrega</th>
        <th>Direccion_de_entrega</th>
        <th>Precio_sugerido</th>
        <th>ID_personal_asignado</th>
        <th>Entregado</th>
        <th>Pagado</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="pedidos.length == 0">
        <td class="centrado" colspan="6">Sin pedidos registrados</td>
      </tr>
      <tr v-else v-for="(pedido, index) in pedidos" :key="index">
        <td>{{ pedido.Folio }}</td>
        <td>{{ pedido.ID_Cliente }}</td>
        <td>{{ pedido.ID_Arreglo }}</td>
        <td>{{ pedido.Descripcion_del_pedido }}</td>
        <td>{{ pedido.Fecha_y_hora_del_pedido }}</td>
        <td>{{ pedido.Fecha_y_hora_de_entrega }}</td>
        <td>{{ pedido.Direccion_de_entrega }}</td>
        <td>{{ pedido.Precio_sugerido }}</td>
        <td>{{ pedido.ID_personal_asignado }}</td>
        <td>{{ pedido.Entregado }}</td>
        <td>{{ pedido.Pagado }}</td>

        <td class="centrado">
          <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button type="button" class="btn btn-sm btn-outline-primary">
              <RouterLink class="nav-link" :to="{ path: '/pedidos/' + pedido.Folio + '/editar' }"><i
                  class="fa fa-pencil"></i></RouterLink>
            </button>
            <button type="button" class="btn btn-sm btn-outline-danger">
              <RouterLink class="nav-link" :to="{ path: '/pedidos/' + pedido.Folio + '/borrar' }"><i
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
import { usePedidos } from "../controladores/usePedidos";
const { traePedidos, pedidos } = usePedidos();
onMounted(async () => {
  await traePedidos();
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
