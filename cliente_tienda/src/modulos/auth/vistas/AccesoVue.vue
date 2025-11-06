<template>
    <div class="contenedor">
        <div class="pestanas">
            <button @click="modoActual = 'signin'" :class="{ activa: modoActual === 'signin' }" class="pestana">
                Iniciar Sesión
            </button>
            <button @click="modoActual = 'signup'" :class="{ activa: modoActual === 'signup' }" class="pestana">
                Registrarse
            </button>
        </div>

        <form @submit.prevent="manejarSubmit" class="formulario">
            <h2>{{ modoActual === 'signin' ? 'Inicio de sesión' : 'Registro de usuario' }}</h2>

            <div class="grupo">
                <label>Correo:</label>
                <input type="email" v-model="correo" required>
            </div>

            <div class="grupo">
                <label>Contraseña:</label>
                <input type="password" v-model="clave" required>
            </div>

            <div class="error" v-if="error">{{ error }}</div>

            <button type="submit">
                {{ modoActual === 'signin' ? 'Iniciar sesión' : 'Registrar usuario' }}
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import "../../../firebase/config.js"

const correo = ref('');
const clave = ref('');
const error = ref<string | null>(null);
const router = useRouter();
const modoActual = ref<'signin' | 'signup'>('signin');

const manejarSubmit = async () => {
    error.value = null;

    if (modoActual.value === 'signin') {
        await entradaUsuario();
    } else {
        await registrarUsuario();
    }
}

const entradaUsuario = async () => {
    try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, correo.value, clave.value);
        router.push("/");
    } catch (err: any) {
        switch (err.code) {
            case 'auth/user-not-found':
                error.value = "Usuario no encontrado";
                break;
            case 'auth/wrong-password':
                error.value = "Contraseña incorrecta";
                break;
            default:
                error.value = "Ocurrió un error al iniciar sesión";
                break;
        }
    }
}

const registrarUsuario = async () => {
    try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, correo.value, clave.value);
        router.push("/");
    } catch (err: any) {
        switch (err.code) {
            case 'auth/email-already-in-use':
                error.value = "Este correo ya está registrado";
                break;
            case 'auth/weak-password':
                error.value = "La contraseña debe tener al menos 6 caracteres";
                break;
            default:
                error.value = "Ocurrió un error durante el registro";
                break;
        }
    }
}
</script>

<style scoped>
.contenedor {
    max-width: 400px;
    margin: 0px auto;
    padding: 20px;
}

.pestanas {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 2px solid #DDD;
}

.pestana {
    flex: 1;
    padding: 10px;
    background-color: #f5f5f5;
    border: none;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
}

.pestana:hover {
    background-color: #e0e0e0;
}

.pestana.activa {
    background-color: #4CAF50;
    color: white;
    border-bottom: 2px solid #4CAF50;
}

.formulario {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.grupo {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.grupo:nth-child(2) {
    gap: 3em;
}

.error {
    color: red;
    font-size: 0.9em;
    margin-top: 0.5em;
}

input {
    padding: 8px;
    border: 1px solid #DDD;
    border-radius: 5px;
}

button[type="submit"] {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button[type="submit"]:hover {
    background-color: #45a049;
}
</style>