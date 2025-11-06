<template>
    <div class="container mt-5" v-if="personal[0]">
        <div class="card">
            <div class="card-header">
                <h4>Editar personal</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Datos actualizados con exito
            </div>
            <div class="card-body">
                <Form :validation-schema="PersonalSchema" @submit="onTodoBien">
                    <div class="mb-3">
                        Id
                        <input type="text" class="form-control" v-model="personal[0].ID" disabled />
                    </div>
                    <div class="mb-3">
                        Nombre
                        <Field name="Nombre_completo" type="text" class="form-control"
                            v-model="personal[0].Nombre_completo" />
                        <ErrorMessage name="Nombre_completo" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Direccion
                        <Field name="Direccion" type="text" class="form-control" v-model="personal[0].Direccion" />
                        <ErrorMessage name="Direccion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Telefono
                        <Field name="Telefono" type="text" class="form-control" v-model="personal[0].Telefono" />
                        <ErrorMessage name="Telefono" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Estatus
                        <Field name="Estatus" type="number" class="form-control" v-model.number="personal[0].Estatus"
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
import { usePersonal } from "../controladores/usePersonal";
import { useRoute, useRouter } from "vue-router";
import { PersonalSchema } from "../schemas/PersonalSchema";
import { Field, Form, ErrorMessage } from "vee-validate";
const { traePersonalId, mensaje, personal, actualizarPersonal, resetMensaje } = usePersonal();
let idPersona = 0;
const route = useRoute();
const routeRedirect = useRouter();
onMounted(async () => {
    idPersona = Number(route.params.ID);
    await traePersonalId(idPersona);

    // Asegura que Estatus sea un número (en caso de que llegue como string)
    if (personal.value.length > 0) {
        personal.value[0].Estatus = Number(personal.value[0].Estatus);
    }
});


const onTodoBien = async () => {
    await actualizarPersonal(personal.value[0]);
    setTimeout(() => {
        resetMensaje();
    }, 3000);
};

const volver = () => {
    routeRedirect.push("/personal");
}
</script>

<style scoped>
.errorValidacion {
    color: red;
    font-weight: bold;
}
</style>
