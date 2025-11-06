<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar pedido</h4>
            </div>
            <div v-if="mensaje == 2" class="alert alert-danger" role="alert">
                La insercion no ha sido exitosa
            </div>
            <div v-else-if="mensaje == 1" class="alert alert-success" role="alert">
                Pedido agregado con exito
            </div>
            <div class="card-body">
                <Form :validation-schema="pedidoSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        ID Cliente
                        <Field name="ID_Cliente" type="number" class="form-control"
                            v-model.number="pedido.ID_Cliente" />
                        <ErrorMessage name="ID_Cliente" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        ID Arreglo
                        <Field name="ID_Arreglo" type="number" class="form-control"
                            v-model.number="pedido.ID_Arreglo" />
                        <ErrorMessage name="ID_Arreglo" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Descripción del pedido
                        <Field name="Descripcion_del_pedido" type="text" class="form-control"
                            v-model="pedido.Descripcion_del_pedido" />
                        <ErrorMessage name="Descripcion_del_pedido" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Fecha y hora del pedido
                        <Field name="Fecha_y_hora_del_pedido" type="datetime-local" class="form-control"
                            v-model="pedido.Fecha_y_hora_del_pedido" />
                        <ErrorMessage name="Fecha_y_hora_del_pedido" class="errorValidacion" />

                    </div>
                    <div class="mb-3">
                        Fecha y hora de entrega
                        <Field name="Fecha_y_hora_de_entrega" type="datetime-local" class="form-control"
                            v-model="pedido.Fecha_y_hora_de_entrega" />
                        <ErrorMessage name="Fecha_y_hora_de_entrega" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Dirección de entrega
                        <Field name="Direccion_de_entrega" type="text" class="form-control"
                            v-model="pedido.Direccion_de_entrega" />
                        <ErrorMessage name="Direccion_de_entrega" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Precio sugerido
                        <Field name="Precio_sugerido" type="number" class="form-control"
                            v-model.number="pedido.Precio_sugerido" />
                        <ErrorMessage name="Precio_sugerido" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        ID personal asignado
                        <Field name="ID_personal_asignado" type="number" class="form-control"
                            v-model.number="pedido.ID_personal_asignado" />
                        <ErrorMessage name="ID_personal_asignado" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Entregado
                        <Field name="Entregado" type="number" class="form-control" v-model.number="pedido.Entregado" />
                        <ErrorMessage name="Entregado" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Pagado
                        <Field name="Pagado" type="number" class="form-control" v-model.number="pedido.Pagado" />
                        <ErrorMessage name="Pagado" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary me-2" type="submit">Agregar</button>
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
import { ref } from 'vue';
import type { PedidoNuevo } from '../interfaces/pedido-interface';
import { usePedidos } from '../controladores/usePedidos';
import { pedidoSchema } from '../schemas/PedidosSchema';
import { Field, Form, ErrorMessage, useForm } from "vee-validate";
import { useRouter } from "vue-router";
const { resetForm } = useForm();
const { agregarPedido, mensaje, resetMensaje } = usePedidos();
const routeRedirect = useRouter();

let pedido = ref<PedidoNuevo>({
    ID_Cliente: 0,
    ID_Arreglo: 0,
    Descripcion_del_pedido: "",
    Fecha_y_hora_del_pedido: "",
    Fecha_y_hora_de_entrega: "",
    Direccion_de_entrega: "",
    Precio_sugerido: 0,
    ID_personal_asignado: 0,
    Entregado: 2, // Inicializar como 2 (No)
    Pagado: 2,    // Inicializar como 2 (No)
});

const onTodoBien = async () => {
    const pedidoParaEnviar = {
        ...pedido.value,
        Fecha_y_hora_del_pedido: pedido.value.Fecha_y_hora_del_pedido ?
            new Date(pedido.value.Fecha_y_hora_del_pedido)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ') : "",
        Fecha_y_hora_de_entrega: pedido.value.Fecha_y_hora_de_entrega ?
            new Date(pedido.value.Fecha_y_hora_de_entrega)
                .toISOString()
                .slice(0, 19)
                .replace('T', ' ') : ""

    };
    await agregarPedido(pedidoParaEnviar);
    pedido.value = {
        ID_Cliente: 0,
        ID_Arreglo: 0,
        Descripcion_del_pedido: "",
        Fecha_y_hora_del_pedido: "",
        Fecha_y_hora_de_entrega: "",
        Direccion_de_entrega: "",
        Precio_sugerido: 0,
        ID_personal_asignado: 0,
        Entregado: 2,
        Pagado: 2,
    };
    resetForm();
    setTimeout(() => {
        resetMensaje();
    }, 3000);
};

const volver = () => {
    routeRedirect.push("/pedidos");
}
</script>

<style scoped>
.errorValidacion {
    color: red;
    font-weight: bold;
}
</style>