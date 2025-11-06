<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar cliente</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Datos agregados con exito
            </div>
            <div class="card-body">
                <Form :validation-schema="clienteSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Nombre
                        <Field name="Nombre_completo" type="text" class="form-control"
                            v-model="cliente.Nombre_completo" />
                        <ErrorMessage name="Nombre_completo" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Direccion
                        <Field name="Direccion" type="text" class="form-control" v-model="cliente.Direccion" />
                        <ErrorMessage name="Direccion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Telefono
                        <Field name="Telefono" type="text" class="form-control" v-model="cliente.Telefono" />
                        <ErrorMessage name="Telefono" class="errorValidacion" />
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
import type { ClienteNuevo } from '../interfaces/cliente-interface';
import { useClientes } from '../controladores/useClientes';
import { clienteSchema } from '../schemas/ClientesSchema';
import { Field, Form, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
import { useForm } from 'vee-validate';
const { resetForm } = useForm();
const { agregarCliente, mensaje, resetMensaje } = useClientes();
const routeRedirect = useRouter();

let cliente = ref<ClienteNuevo>({
    Nombre_completo: "",
    Direccion: "",
    Telefono: "",
});

const onTodoBien = async () => {
    await agregarCliente(cliente.value);
    cliente.value = {
        Nombre_completo: "",
        Direccion: "",
        Telefono: "",
    };
    resetForm()
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