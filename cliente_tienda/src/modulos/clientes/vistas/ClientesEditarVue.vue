<template>
    <div class="container mt-5" v-if="clientes[0]">
        <div class="card">
            <div class="card-header">
                <h4>Editar cliente</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Datos actualizados con exito
            </div>
            <div class="card-body">
                <Form :validation-schema="clienteSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        ID Cliente
                        <input type="text" class="form-control" v-model="clientes[0].ID_Cliente" disabled />
                    </div>
                    <div class="mb-3">
                        Nombre
                        <Field name="Nombre_completo" type="text" class="form-control"
                            v-model="clientes[0].Nombre_completo" />
                        <ErrorMessage name="Nombre_completo" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Direccion
                        <Field name="Direccion" type="text" class="form-control" v-model="clientes[0].Direccion" />
                        <ErrorMessage name="Direccion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Telefono
                        <Field name="Telefono" type="text" class="form-control" v-model="clientes[0].Telefono" />
                        <ErrorMessage name="Telefono" class="errorValidacion" />
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
import { useClientes } from "../controladores/useClientes";
import { useRoute, useRouter } from "vue-router";
import { clienteSchema } from "../schemas/ClientesSchema";
import { Field, Form, ErrorMessage } from "vee-validate";
const { traeClienteId, mensaje, clientes, actualizarClientes, resetMensaje } = useClientes();
let id = 0;
const route = useRoute();
const routeRedirect = useRouter();
onMounted(async () => {
    id = Number(route.params.ID_Cliente);
    await traeClienteId(id);
});


const onTodoBien = async () => {
    await actualizarClientes(clientes.value[0]);
    setTimeout(() => {
        resetMensaje();
    }, 3000);
};

const volver = () => {
    routeRedirect.push("/clientes");
}
</script>

<style scoped>
.errorValidacion {
    color: red;
    font-weight: bold;
}
</style>
