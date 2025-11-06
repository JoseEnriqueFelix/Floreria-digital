<template>
    <div class="container mt-5" v-if="pedidos[0]">
        <div class="card">
            <div class="card-header">
                <h4>Borrar pedido</h4>
            </div>
            <div v-if="mensaje == 2" class="alert alert-danger" role="alert">
                Este pedido no se puede borrar
            </div>
            <div v-else class="alert alert-warning" role="alert">
                ¿Seguro de borrar información?
                <i class="fa fa-warning"></i>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Folio
                    <input type="text" class="form-control" v-model="pedidos[0].Folio" disabled />
                </div>
                <div class="mb-3">
                    ID Cliente
                    <input type="number" class="form-control" v-model="pedidos[0].ID_Cliente" disabled />
                </div>
                <div class="mb-3">
                    ID Arreglo
                    <input type="number" class="form-control" v-model="pedidos[0].ID_Arreglo" disabled />
                </div>
                <div class="mb-3">
                    Descripción del pedido
                    <input type="text" class="form-control" v-model="pedidos[0].Descripcion_del_pedido" disabled />
                </div>
                <div class="mb-3">
                    Fecha y hora del pedido
                    <input type="text" class="form-control" v-model="pedidos[0].Fecha_y_hora_del_pedido" disabled />
                </div>
                <div class="mb-3">
                    Fecha y hora de entrega
                    <input type="text" class="form-control" v-model="pedidos[0].Fecha_y_hora_de_entrega" disabled />
                </div>
                <div class="mb-3">
                    Dirección de entrega
                    <input type="text" class="form-control" v-model="pedidos[0].Direccion_de_entrega" disabled />
                </div>
                <div class="mb-3">
                    Precio sugerido
                    <input type="number" class="form-control" v-model="pedidos[0].Precio_sugerido" disabled />
                </div>
                <div class="mb-3">
                    ID personal asignado
                    <input type="number" class="form-control" v-model="pedidos[0].ID_personal_asignado" disabled />
                </div>
                <div class="mb-3">
                    Entregado
                    <input type="number" class="form-control" v-model="pedidos[0].Entregado" disabled />
                </div>
                <div class="mb-3">
                    Pagado
                    <input type="number" class="form-control" v-model="pedidos[0].Pagado" disabled />
                </div>
                <div class="mb-3">
                    <button class="btn btn-danger me-2" @click="borrarPedidos()">
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
import { usePedidos } from "../controladores/usePedidos";
import { useRoute, useRouter } from "vue-router";
const { traePedidoId, mensaje, pedidos, borrarPedidos } = usePedidos();
let id = 0;
const route = useRoute();
const routeRedirect = useRouter();

watch(
    () => mensaje.value,
    (newValue) => {
        if (newValue === 1) {
            routeRedirect.push("/pedidos");
        }
    }
);

const volver = () => {
    routeRedirect.push("/pedidos");
}

onMounted(async () => {
    id = Number(route.params.Folio);
    await traePedidoId(Number(id));
});
</script>

<style scoped></style>
