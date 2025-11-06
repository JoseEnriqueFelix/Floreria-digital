<template>
    <div class="container mt-5" v-if="arreglos[0]">
        <div class="card">
            <div class="card-header">
                <h4>Editar Arreglo Floral</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Datos actualizados con exito
            </div>
            <div class="card-body">
                <Form :validation-schema="arregloSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        ID Arreglo
                        <input type="text" class="form-control" v-model="arreglos[0].ID_Arreglo" disabled />
                    </div>
                    <div class="mb-3">
                        Descripcion
                        <Field name="Descripcion" type="text" class="form-control" v-model="arreglos[0].Descripcion" />
                        <ErrorMessage name="Descripcion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Tipo de arreglo
                        <Field name="Tipo_de_arreglo" type="number" class="form-control"
                            v-model.number="arreglos[0].Tipo_de_arreglo" />
                        <ErrorMessage name="Tipo_de_arreglo" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Estatus
                        <Field name="Estatus" type="number" class="form-control" v-model.number="arreglos[0].Estatus"
                            disabled />
                        <ErrorMessage name="Estatus" class="errorValidacion" />
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
import { onMounted, ref } from "vue";
import { useArreglos } from "../controladores/useArreglos";
import { useRoute, useRouter } from "vue-router";
import { arregloSchema } from "../schemas/ArreglosSchema";
import { Field, Form, ErrorMessage } from "vee-validate";
const { traeArregloId, mensaje, arreglos, actualizarArreglos, resetMensaje } = useArreglos();
let id = 0;
const route = useRoute();
const routeRedirect = useRouter();

onMounted(async () => {
    id = Number(route.params.ID_Arreglo);
    await traeArregloId(id);

    if (arreglos.value.length > 0) {
        arreglos.value[0].Estatus = Number(arreglos.value[0].Estatus);
        arreglos.value[0].Tipo_de_arreglo = Number(arreglos.value[0].Tipo_de_arreglo);
    }
});


const onTodoBien = async () => {
    await actualizarArreglos(arreglos.value[0]);
    setTimeout(() => {
        resetMensaje();
    }, 3000);
};

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
