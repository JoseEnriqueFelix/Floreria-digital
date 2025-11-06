<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Nuevo Arreglo</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Datos agregados con exito
            </div>
            <div class="card-body">
                <Form :validation-schema="arregloNuevo" @submit="onTodoBien">
                    <div class="mb-3">
                        Descripción
                        <Field name="Descripcion" type="text" class="form-control" v-model="arreglo.Descripcion" />
                        <ErrorMessage name="Descripcion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Tipo de arreglo
                        <Field name="Tipo_de_arreglo" type="number" class="form-control"
                            v-model="arreglo.Tipo_de_arreglo" />
                        <ErrorMessage name="Tipo_de_arreglo" class="errorValidacion" />
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
import { ref } from "vue";
import type { createArreglo } from "../interfaces/arreglo-interface";
import { useArreglos } from '../controladores/useArreglos';
import { arregloNuevo } from '../schemas/ArreglosSchema';
import { Field, Form, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
import { useForm } from 'vee-validate';
const { resetForm } = useForm();
const { agregarArreglo, mensaje, resetMensaje } = useArreglos();
const routeRedirect = useRouter();

let arreglo = ref<createArreglo>({
    Descripcion: "",
    Tipo_de_arreglo: 0,
})


const onTodoBien = async () => {
    await agregarArreglo(arreglo.value);
    arreglo.value = {
        Descripcion: "",
        Tipo_de_arreglo: 0,
    }
    resetForm();
    setTimeout(() => {
        resetMensaje();
    }, 3000);
}

const volver = () => {
    routeRedirect.push("/arreglos");
}
</script>

<style scoped>
.errorValidacion {
    color: red;
    font-weight: bold;
}
</style>