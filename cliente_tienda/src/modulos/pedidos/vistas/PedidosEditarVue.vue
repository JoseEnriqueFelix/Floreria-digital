<template>
    <div class="container mt-5" v-if="pedidos[0]">
        <div class="card">
            <div class="card-header">
                <h4>Editar pedido</h4>
            </div>
            <div v-if="mensaje == 2" class="alert alert-danger" role="alert">
                La insercion no ha sido exitosa
            </div>
            <div v-else-if="mensaje == 1" class="alert alert-success" role="alert">
                Pedido actualizado con exito
            </div>
            <div class="card-body">
                <Form :validation-schema="pedidoSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Folio
                        <input type="text" class="form-control" v-model="pedidos[0].Folio" disabled />
                    </div>
                    <div class="mb-3">
                        ID Cliente
                        <Field name="ID_Cliente" type="number" class="form-control" v-model="pedidos[0].ID_Cliente" />
                        <ErrorMessage name="ID_Cliente" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        ID Arreglo
                        <Field name="ID_Arreglo" type="number" class="form-control" v-model="pedidos[0].ID_Arreglo" />
                        <ErrorMessage name="ID_Arreglo" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Descripción del pedido
                        <Field name="Descripcion_del_pedido" type="text" class="form-control"
                            v-model="pedidos[0].Descripcion_del_pedido" />
                        <ErrorMessage name="Descripcion_del_pedido" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Fecha y hora del pedido
                        <Field name="Fecha_y_hora_del_pedido" type="datetime-local" class="form-control"
                            v-model="pedidos[0].Fecha_y_hora_del_pedido" />
                        <ErrorMessage name="Fecha_y_hora_del_pedido" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Fecha y hora de entrega
                        <Field name="Fecha_y_hora_de_entrega" type="datetime-local" class="form-control"
                            v-model="pedidos[0].Fecha_y_hora_de_entrega" />
                        <ErrorMessage name="Fecha_y_hora_de_entrega" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Dirección de entrega
                        <Field name="Direccion_de_entrega" type="text" class="form-control"
                            v-model="pedidos[0].Direccion_de_entrega" />
                        <ErrorMessage name="Direccion_de_entrega" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Precio sugerido
                        <Field name="Precio_sugerido" type="number" class="form-control"
                            v-model="pedidos[0].Precio_sugerido" />
                        <ErrorMessage name="Precio_sugerido" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        ID personal asignado
                        <Field name="ID_personal_asignado" type="number" class="form-control"
                            v-model="pedidos[0].ID_personal_asignado" />
                        <ErrorMessage name="ID_personal_asignado" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Entregado
                        <Field name="Entregado" type="number" class="form-control" v-model="pedidos[0].Entregado" />
                        <ErrorMessage name="Entregado" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Pagado
                        <Field name="Pagado" type="number" class="form-control" v-model="pedidos[0].Pagado" />
                        <ErrorMessage name="Pagado" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary me-2" type="submit">Actualizar</button>
                        <button class="btn btn-secondary" @click="volver()">
                            <i class="fa fa-arrow-left"></i> Volver
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { usePedidos } from '../controladores/usePedidos';
import { pedidoSchema } from '../schemas/PedidosSchema';
import { Field, Form, ErrorMessage } from "vee-validate";
import { useRouter, useRoute } from "vue-router";
const { traePedidoId, mensaje, pedidos, resetMensaje, actualizarPedidos } = usePedidos();
const routeRedirect = useRouter();
const route = useRoute();
let id = 0;

onMounted(async () => {
    id = Number(route.params.Folio);
    await traePedidoId(id);

    if (pedidos.value.length > 0) {
        pedidos.value[0].ID_Cliente = Number(pedidos.value[0].ID_Cliente);
        pedidos.value[0].ID_Arreglo = Number(pedidos.value[0].ID_Arreglo);
        pedidos.value[0].Precio_sugerido = Number(pedidos.value[0].Precio_sugerido);
        pedidos.value[0].ID_personal_asignado = Number(pedidos.value[0].ID_personal_asignado);
        pedidos.value[0].Entregado = Number(pedidos.value[0].Entregado);
        pedidos.value[0].Pagado = Number(pedidos.value[0].Pagado);
        pedidos.value[0].Fecha_y_hora_del_pedido = convertirAFormatoDatetimeLocal(pedidos.value[0].Fecha_y_hora_del_pedido);
        pedidos.value[0].Fecha_y_hora_de_entrega = convertirAFormatoDatetimeLocal(pedidos.value[0].Fecha_y_hora_de_entrega);
    }
});

const onTodoBien = async () => {
    const pedidoParaEnviar = {
        ...pedidos.value[0],
        Fecha_y_hora_del_pedido: convertirAFormatoISO(pedidos.value[0].Fecha_y_hora_del_pedido),
        Fecha_y_hora_de_entrega: convertirAFormatoISO(pedidos.value[0].Fecha_y_hora_de_entrega)
    };

    await actualizarPedidos(pedidoParaEnviar);
    setTimeout(() => {
        resetMensaje();
    }, 3000);
};

const volver = () => {
    routeRedirect.push("/pedidos");
}

function convertirAFormatoDatetimeLocal(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    return `${anio}-${mes}-${dia}T${horas}:${minutos}`;
}

function convertirAFormatoISO(fechaLocal: string): string {
    if (!fechaLocal) return "";
    const fecha = new Date(fechaLocal);
    return fecha.toISOString().slice(0, 19).replace('T', ' ');
}

</script>

<style scoped>
.errorValidacion {
    color: red;
    font-weight: bold;
}
</style>