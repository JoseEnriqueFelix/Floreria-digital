import { getAuth, onAuthStateChanged } from 'firebase/auth'
import PersonalBorrarVue from '../modulos/personal/vistas/PersonalBorrarVue.vue'
import PersonalAgregarVue from '../modulos/personal/vistas/PersonalAgregarVue.vue'
import PersonalVue from '../modulos/personal/vistas/PersonalVue.vue'
import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import PersonalEditarVue from '../modulos/personal/vistas/PersonalEditarVue.vue'
import ClientesVue from '@/modulos/clientes/vistas/ClientesVue.vue'
import ClientesEditarVue from '@/modulos/clientes/vistas/ClientesEditarVue.vue'
import ClientesBorrarVue from '@/modulos/clientes/vistas/ClientesBorrarVue.vue'
import ArreglosVue from '@/modulos/arreglos/vistas/ArreglosVue.vue'
import ArreglosBorrarVue from '@/modulos/arreglos/vistas/ArreglosBorrarVue.vue'
import ArreglosEditarVue from '@/modulos/arreglos/vistas/ArreglosEditarVue.vue'
import ArreglosAgregarVue from '@/modulos/arreglos/vistas/ArreglosAgregarVue.vue'
import PedidosVue from '@/modulos/pedidos/vistas/PedidosVue.vue'
import ClientesAgregarVue from '@/modulos/clientes/vistas/ClientesAgregarVue.vue'
import PedidosAgregarVue from '@/modulos/pedidos/vistas/PedidosAgregarVue.vue'
import PedidosEditarVue from '@/modulos/pedidos/vistas/PedidosEditarVue.vue'
import PedidosBorrarVue from '@/modulos/pedidos/vistas/PedidosBorrarVue.vue'
import HomeVue from '@/modulos/principal/vistas/HomeVue.vue'
import AccesoVue from '@/modulos/auth/vistas/AccesoVue.vue'

const requireAuth = (to: RouteLocationNormalizedLoadedGeneric, from: RouteLocationNormalizedLoadedGeneric, next: NavigationGuardNext) => {
  const auth = getAuth();

  const checkAuthState = () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
      });
    });
  };

  checkAuthState()
    .then((user) => {
      if (user) {
        next();
      } else {
        next('/acceso');
      }
    })
    .catch((error) => {
      console.error('Error en la autenticación:', error);
      next('/acceso');
    });
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: HomeVue,
      beforeEnter: requireAuth
    },
    {
      path: "/acceso",
      name: "acceso",
      component: AccesoVue
    },
    {
      path: "/personal",
      name: "personal",
      component: PersonalVue,
      beforeEnter: requireAuth,
    },
    {
      path: "/personal/agregar",
      name: "personalAgregar",
      component: PersonalAgregarVue,
      beforeEnter: requireAuth,
    },
    {
      path: "/personal/:ID/borrar",
      name: "personalBorrar",
      component: PersonalBorrarVue,
      beforeEnter: requireAuth,
    },
    {
      path: "/personal/:ID/editar",
      name: "personalEditar",
      component: PersonalEditarVue,
      beforeEnter: requireAuth,
    },
    {
      path: "/clientes",
      name: "clientes",
      component: ClientesVue,
      beforeEnter: requireAuth,
    },
    {
      path: "/clientes/agregar",
      name: "clientesAgregar",
      component: ClientesAgregarVue,
      beforeEnter: requireAuth,
    },
    {
      path: "/cliente/:ID_Cliente/editar",
      name: "clienteEditar",
      component: ClientesEditarVue,
      beforeEnter: requireAuth,
    },
    {
      path: "/cliente/:ID_Cliente/borrar",
      name: "clienteBorrar",
      component: ClientesBorrarVue,
      beforeEnter: requireAuth,
    },
    {
      path: "/arreglos",
      name: "arreglos",
      component: ArreglosVue,
      beforeEnter: requireAuth,
    },
    {
      path: "/arreglos/:ID_Arreglo/borrar",
      name: "arreglosBorrar",
      component: ArreglosBorrarVue,
      beforeEnter: requireAuth,
    },
    {
      path: "/arreglos/:ID_Arreglo/editar",
      name: "arreglosEditar",
      component: ArreglosEditarVue,
      beforeEnter: requireAuth,
    },
    {
      path: "/arreglos/agregar",
      name: "arreglosAgregar",
      component: ArreglosAgregarVue,
      beforeEnter: requireAuth,
    },
    {
      path: "/pedidos",
      name: "pedidos",
      component: PedidosVue,
      beforeEnter: requireAuth,
    },
    {
      path: "/pedidos/agregar",
      name: "pedidosAgregar",
      component: PedidosAgregarVue,
      beforeEnter: requireAuth,
    },
    {
      path: "/pedidos/:Folio/editar",
      name: "pedidosEditar",
      component: PedidosEditarVue,
      beforeEnter: requireAuth,
    },
    {
      path: "/pedidos/:Folio/borrar",
      name: "pedidosBorrar",
      component: PedidosBorrarVue,
      beforeEnter: requireAuth,
    },
  ],
})

export default router
