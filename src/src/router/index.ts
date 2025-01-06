import { createRouter, createWebHashHistory, RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import LogIn from '../views/LogIn.vue'
import { authState } from '@/store/auth' // Importar el estado de autenticacion.
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import createStore from '../store/index'; // Import the Vuex store
import Swal from 'sweetalert2';
import { auth, userRef } from '@/firebajse';
import { doc, getDoc } from 'firebase/firestore';


// definir un guard para verificar la autenticacion del usuario.
const authGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  // verificar si el usuario esta autenticado
  const isLoggedIn = authState.isLoggedIn;
  if (isLoggedIn) {
    next(); // si el usario esta autenticadol, permite el acceso a la ruta solicitada.
  } else {
    next('/');
  }
}; 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: LogIn
    // component: () => import(/* webpackChunkName: "about" */ '../views/MostrarFichaMedica.vue')
  },
  {
    path: '/CambiarContra',
    name: 'CambiarContra',
    component: () => import(/* webpackChunkName: "about" */ '../views/CambiarContraseña.vue'),
  },
  {
    path: '/crearUsuario',
    name: 'Crear usuario',
    component: () => import(/* webpackChunkName: "about" */ '../views/CrearUsuario.vue'),
    meta: {
      requiresAuth: true,
      requiresRole: 'Doctor'
    }// aplicar el guard en esta ruta para probar...
  },
  {
    path: '/agendar',
    name: 'agendar',
    component: () => import(/* webpackChunkName: "about" */ '../views/AgendarCita.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/caja-dia',
    name: 'Caja del dia',
    component: () => import(/* webpackChunkName: "about" */ '../views/CajaDia.vue'),
    meta: {
      requiresAuth: true,
      requiresRole: 'Doctor'
    }
  },
  {
    path: '/realizar-cobro',
    name: 'Realizarcobro',
    component: () => import(/* webpackChunkName: "about" */ '../views/RealizarCobro.vue'),
    meta: {
      requiresAuth: true,
    }// aplicar el guard en esta ruta para probar...
  },
  {
    path: '/historial-ganancias',
    name: 'Historial_Ganancias',
    component: () => import(/* webpackChunkName: "about" */ '../views/HistorialGanancias.vue'),
    meta: {
      requiresAuth: true,
      requiresRole: 'Doctor'
    }// aplicar el guard en esta ruta para probar...
  },
  {
    path: '/ficha-medica',
    name: 'FichaMedica',
    component: () => import(/* webpackChunkName: "about" */ '../views/IngresarFichaMedica.vue'),
    meta: {
      requiresAuth: true,
    }// aplicar el guard en esta ruta para probar...
  },
  {
    path: '/buscar',
    name: 'Buscar Expediente',
    component: () => import(/* webpackChunkName: "about" */ '../views/BuscarExpediente.vue'),
    meta: {
      requiresAuth: true,
    }// aplicar el guard en esta ruta para probar...
  },
  {
    path: '/FichaMedica/:idDocumento',
    name: 'MostrarFichaMedica',
    component: () => import(/* webpackChunkName: "about" */ '../views/MostrarFichaMedica.vue'),
    props: true,
    meta: {
      requiresAuth: true,
    }// aplicar el guard en esta ruta para probar...
  },
  {
    path: '/ActualizarFicha/:idDocumento',
    name: 'ActualizarFicha',
    component: () => import(/* webpackChunkName: "about" */ '../views/ActualizarFicha.vue'),
    props: true,
    meta: {
      requiresAuth: true,
    }// aplicar el guard en esta ruta para probar...
  },
  {
    path: '/InformacionGeneral',
    name: 'InformacionGeneral',
    component: () => import(/* webpackChunkName: "about" */ '../views/infoClinica.vue'),
    meta: {
      requiresAuth: true,
    }// aplicar el guard en esta ruta para probar...
  },
  {
    path: '/InformacionUsuarios',
    name: 'InformacionUsuarios',
    component: () => import(/* webpackChunkName: "about" */ '../views/infoUsuarios.vue'),
    meta: {
      requiresAuth: true,
      requiresRole: 'Doctor'
    }// aplicar el guard en esta ruta para probar...
  },
  {
    path: '/actualizarUsuario/:idDocumento',
    name: 'actualizarUsuario',
    component: () => import(/* webpackChunkName: "about" */ '../views/ActualizarUsuario.vue'),
    props: true,
  },
  {
    path: '/HistorialMedico/:idDocumento',
    name: 'HistorialMedico',
    component: () => import(/* webpackChunkName: "about" */ '../views/HistorialMedico.vue'),
    props: true,
    meta: {
      requiresAuth: true,
      requiresRole: 'Doctor',
    }// aplicar el guard en esta ruta para probar...
  },
  {
    path: '/ConfigSeguros',
    name: 'ConfigSeguros',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SegurosConfig.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/ConfigFichas',
    name: 'ConfigFichas',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/FichasConfig.vue'),
    meta: {
      requiresAuth: true,
      requiresRole: 'Doctor'
    }
  },
  {
    path: '/Medicamentos_Recetar/:idDocumento',
    name: 'Medicamentos_Recetar',
    component: () => import(/* webpackChunkName: "about" */ '../views/MedicinaView.vue'),
    props: true,
    meta: {
      requiresAuth: true,
      requiresRole: 'Doctor',
    }
  },
  {
    path: '/CitaActual/:idDocumento',
    name: 'CitaActual',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ingresar_CitaActual.vue'),
    props: true,
    meta: {
      requiresAuth: true,
      requiresRole: 'Doctor',
    }
  },
  {
    path: '/MostrarCitaActual/:idDocumento/:Fecha',
    name: 'MostrarCA',
    component: () => import(/* webpackChunkName: "about" */ '../views/MostrarCitaActual.vue'),
    props: true,
    meta: {
      requiresAuth: true,
      requiresRole: 'Doctor',
    }// aplicar el guard en esta ruta para probar...
  },
  {
    path: '/Configuraciones',
    name: 'Configuraciones',
    component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue'),
    props: true,
    meta: {
      requiresAuth: true,
      // requiresRole: 'Doctor',
    }
  },
  {
    path: '/RecetaMedica/:idDocumento',
    name: 'RecetaMedica',
    component: () => import(/* webpackChunkName: "about" */ '../views/RecetaMedica.vue'),
    props: true,
    meta: {
      requiresAuth: true,
      requiresRole: 'Doctor'
    }// aplicar el guard en esta ruta para probar...
  },
  {
    path: '/ActualizarCitaActual/:idDocumento/:Fecha',
    name: 'ActualizarCitaActual',
    component: () => import(/* webpackChunkName: "about" */ '../views/Actualizar_CA.vue'),
    props: true, 
    meta: {
      requiresAuth: true,
      requiresRole: 'Doctor',
    }// aplicar el guard en esta ruta para probar...
  },
  {
    path: '/ControlVistas',
    name: 'ControlVistas',
    component: () => import(/* webpackChunkName: "about" */ '../views/ControlVistas.vue'),
    props: true, 
    // meta: {
    //   requiresAuth: true,
    //   // requiresRole: 'Doctor',
    // }// aplicar el guard en esta ruta para probar...
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/* eslint-disable arrow-body-style */
async function getCurrentUser () {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!createStore.getters.getUserRole) {
          // Cargar el rol desde Firestore si aún no está en Vuex
          const userDocRef = doc(userRef, user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userRole = userDoc.data().role;
            createStore.commit("setUserRole", userRole); // Guarda el rol en Vuex
          }
        }
      }
      unsubscribe(); // Dejar de escuchar para evitar múltiples llamadas
      resolve(user); // Resolver con el usuario autenticado
    });
  });
}

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const currentUser = await getCurrentUser(); // Obtener el usuario autenticado

    if (currentUser) {
      // const userRole = store.getters.getUserRole; // Obtener el rol del usuario desde Vuex o localStorage
      const userRole = localStorage.getItem('userRole');
      
      if (to.meta.requiresRole) {
        if (userRole === to.meta.requiresRole) {
          next(); // Continuar si el rol coincide
        } else {
          Swal.fire({
            toast: true,
            timer: 4000,
            icon: "warning",
            position: "top-end",
            timerProgressBar: true,
            showConfirmButton: false,
            title: "Acceso Denegado",
          });
          next("/agendar"); // Redirigir si el rol no coincide
        }
      } else {
        next(); // Si no se requiere rol específico, continuar
      }
    } else {
      Swal.fire({
        toast: true,
        timer: 4000,
        icon: "warning",
        position: "top-end",
        timerProgressBar: true,
        showConfirmButton: false,
        title: "Acceso denegado. Por favor, inicia sesión.",
      });
      next("/agendar"); // Redirigir a login si no está autenticado
    }
  } else {
    next(); // Continuar en caso de que no se requiera autenticación
  }
});

export default router
