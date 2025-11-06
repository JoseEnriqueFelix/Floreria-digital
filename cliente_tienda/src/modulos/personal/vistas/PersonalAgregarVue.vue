<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Agregar personal</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos agregados con exito
      </div>
      <div class="card-body">
        <Form :validation-schema="PersonalSchema" @submit="onTodoBien">
          <div class="mb-3">
            Nombre
            <Field name="Nombre_completo" type="text" class="form-control" v-model="personal.Nombre_completo" />
            <ErrorMessage name="Nombre_completo" class="errorValidacion" />
          </div>
          <div class="mb-3">
            Direccion
            <Field name="Direccion" type="text" class="form-control" v-model="personal.Direccion" />
            <ErrorMessage name="Direccion" class="errorValidacion" />
          </div>
          <div class="mb-3">
            Telefono
            <Field name="Telefono" type="text" class="form-control" v-model="personal.Telefono" />
            <ErrorMessage name="Telefono" class="errorValidacion" />
          </div>
          <div class="mb-3">
            Estatus
            <Field name="Estatus" type="number" class="form-control" v-model="personal.Estatus" />
            <ErrorMessage name="Estatus" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <!-- <button class="btn btn-primary" @click="agregarPersonal(personal)">
              Agregar
            </button> -->
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
import type { PersonalNuevo } from "../interfaces/personal-interface";
import { usePersonal } from "../controladores/usePersonal";
import { PersonalSchema } from "../schemas/PersonalSchema";
import { Field, Form, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
import { useForm } from 'vee-validate';
const { resetForm } = useForm();
const { agregarPersonal, mensaje, resetMensaje } = usePersonal();
const routeRedirect = useRouter();

let personal = ref<PersonalNuevo>({
  Nombre_completo: "",
  Direccion: "",
  Telefono: "",
  Estatus: 0,
});

const onTodoBien = async () => {
  await agregarPersonal(personal.value);
  personal.value = {
    Nombre_completo: "",
    Direccion: "",
    Telefono: "",
    Estatus: 0,
  }
  resetForm();
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
