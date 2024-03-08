import { createApp } from 'vue'
import App from './App.vue'
import 'swiper/swiper-bundle.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createRouter, createWebHistory } from 'vue-router'
import VueScrollTo from 'vue-scrollto';

import Home from "@/views/home.vue";
import LoginComponent from "@/views/login.vue";
import RegisterClientComponent from "@/views/registerClient.vue";
import SalonesClientComponent from "@/views/salonesCliente.vue";
import RecomendadosClientComponent from "@/views/recomendadosCliente.vue";
import BuzonComponent from "@/views/buzon.vue";
import CalendarComponent from "@/views/calendar.vue";
import SalonComponent from "@/views/salonDetalle.vue";
import SolicitudComponent from "@/views/solicitud.vue";
import CalificaciónComponent from "@/views/calificaciónReserva.vue";
import DetalleBuzonComponent from "@/views/detalleBuzon.vue";
import SolicitudesListaDueñoComponent from "@/views/solicitudesListaDueño.vue";
import SalonesListaDueñoComponent from "@/views/salonesListaDueño.vue";
import ReservasListaDueñoComponent from "@/views/reservasListaDueño.vue";
import DetalleSalonDueñoComponent from "@/views/detalleSalonDueño.vue";
import DetalleSolicitudReservaDueñoComponent from "@/views/detalleSolicitudReservaDueño.vue";
import CrearSalonDueñoComponent from "@/views/crearSalonDueño.vue";

import SalonesListaAdminComponent from "@/views/admin/salonesListaAdmin.vue";
import CrearSalonComponent from "@/views/admin/crearSalon.vue";
import EditarSalonComponent from "@/views/admin/editarSalon.vue";
import UsuariosListaAdminComponent from "@/views/admin/usuariosListaAdmin.vue";
import CrearUsuarioComponent from "@/views/admin/crearUsuario.vue";
import EditarUsuarioComponent from "@/views/admin/editarUsuario.vue";
import ServiciosListaAdminComponent from "@/views/admin/serviciosListaAdmin.vue";
import CrearServicioComponent from "@/views/admin/crearServicio.vue";
import EditarServicioComponent from "@/views/admin/editarServicio.vue";
import TipoSRListaAdminComponent from "@/views/admin/tipoSRListaAdmin.vue";
import CrearTipoSRComponent from "@/views/admin/crearTipoSR.vue";
import EditarTipoSRComponent from "@/views/admin/editarTipoSR.vue";



import 'vuetify/styles';
import { createVuetify } from 'vuetify/lib/framework.mjs';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import Vuetify from 'vuetify/lib/framework';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.min.css';

import store from './store/store';
import axios from 'axios';
import Vuex from 'vuex';
import jwt_decode from 'jwt-decode';
import Notifications from '@kyvg/vue3-notification'


//iconos
import { faUser, faLock, faEnvelope, faFilter, faArrowRight, faRankingStar, faCircleInfo, faCalendarDays, faBellConcierge, faInfo, faCalendar, faDiagramProject, faCircleQuestion, faMessage, faSquarePlus, faBars, faTrash, faPenToSquare, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
library.add(faUser, faLock, faEnvelope, faFilter, faArrowRight, faRankingStar, faCircleInfo, faCalendarDays, faBellConcierge, faInfo, faCalendar, faDiagramProject, faCircleQuestion, faMessage, faSquarePlus, faBars, faTrash, faPenToSquare, faEye, faEyeSlash )

//config axios
axios.defaults.withCredentials = true;
const token = localStorage.getItem('jwtToken');
    if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    


//config vuetify
const vuetify = createVuetify({
    components,
    directives,
    icons: {
        iconfont: 'mdi', 
      },
})


//config rutas
const routes = [
    {
        path:'/', component: Home, name: 'home',
    },
    {
        path:'/login', component: LoginComponent,
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
              next('/')
            } else {
              next()
            }
          }
    },
    {
        path:'/register', component: RegisterClientComponent,
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
              next('/')
            } else {
              next()
            }
          }
    },
    {
        path:'/salones', component: SalonesClientComponent, name: 'salones',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_USER'] },
    },
    {
        path:'/recomendados', component: RecomendadosClientComponent,
        meta: { requiresAuth: true, allowedRoles: ['ROLE_USER'] },
    },
    {
        path:'/buzon', component: BuzonComponent, name: 'buzon',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_USER'] },
    },
    {
        path:'/calendar', component: CalendarComponent,
        meta: { requiresAuth: true, allowedRoles: ['ROLE_USER'] },
    },
    {
        path:'/detalle-salon/:id', component: SalonComponent, name: 'detalle-salon',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_USER'] },
    },
    {
        path:'/solicitud/:nombreSalon?/:fechaPorDefecto?', component: SolicitudComponent, name: 'solicitud',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_USER'] },     
    },
    {
        path:'/calificar/:id', component: CalificaciónComponent, name: 'calificar',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_USER'] },
    },
    {
        path:'/detalle-buzon/:id', component: DetalleBuzonComponent, name: 'detalle-buzon',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_USER'] },
    },
    {
        path:'/lista-solicitudes', component: SolicitudesListaDueñoComponent, name: 'lista-solicitudes',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_OWNER'] },
    },
    {
        path:'/lista-salones', component: SalonesListaDueñoComponent, name: 'lista-salones',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_OWNER'] },
    },
    {
        path:'/crear-salon', component: CrearSalonDueñoComponent, name: 'crear-salon',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_OWNER'] },
    },
    {
        path:'/lista-reservas', component: ReservasListaDueñoComponent, name: 'lista-reservas',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_OWNER'] },
    },
    {
        path:'/salon/:id', component: DetalleSalonDueñoComponent, name: 'salon',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_OWNER'] },
    },
    {
        path:'/solicitud-reserva/:id', component: DetalleSolicitudReservaDueñoComponent, name: 'solicitud-reserva',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_OWNER'] },
    },
    //ADMIN
    {
        path:'/lista-salones-admin', component: SalonesListaAdminComponent, name: 'lista-salones-admin',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_ADMIN'] },
    },
    {
        path:'/crear-salon-admin', component: CrearSalonComponent, name: 'crear-salon-admin',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_ADMIN'] },
    },
    {
        path:'/editar-salon-admin/:id', component: EditarSalonComponent, name: 'editar-salon-admin',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_ADMIN'] },
    },
    {
        path:'/lista-usuarios-admin', component: UsuariosListaAdminComponent, name: 'lista-usuarios-admin',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_ADMIN'] },
    },
    {
        path:'/crear-usuario-admin', component: CrearUsuarioComponent, name: 'crear-usuario-admin',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_ADMIN'] },
    },
    {
        path:'/editar-usuario-admin/:id', component: EditarUsuarioComponent, name: 'editar-usuario-admin',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_ADMIN'] },
    },
    {
        path:'/lista-servicios-admin', component: ServiciosListaAdminComponent, name: 'lista-servicios-admin',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_ADMIN'] },
    },
    {
        path:'/crear-servicio-admin', component: CrearServicioComponent, name: 'crear-servicio-admin',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_ADMIN'] },
    },
    {
        path:'/editar-servicio-admin/:id', component: EditarServicioComponent, name: 'editar-servicio-admin',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_ADMIN'] },
    },
    {
        path:'/lista-tipoSR-admin', component: TipoSRListaAdminComponent, name: 'lista-tipoSR-admin',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_ADMIN'] },
    },
    {
        path:'/crear-tipoSR-admin', component: CrearTipoSRComponent, name: 'crear-tipoSR-admin',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_ADMIN'] },
    },
    {
        path:'/editar-tipoSR-admin/:id', component: EditarTipoSRComponent, name: 'editar-tipoSR-admin',
        meta: { requiresAuth: true, allowedRoles: ['ROLE_ADMIN'] },
    },
    {
        path: '/:catchAll(.*)',
        name: 'not-found',
        beforeEnter: (to, from, next) => {
            if (window.history.length >= 2) {
                window.history.go(-1);
              } else {
                next('/');
              }
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    
})

const app = createApp(App);



//vueX
app.use(store);

//permisos
router.beforeEach((to, from, next) => {

    
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const allowedRoles = to.meta.allowedRoles;
  
    if (requiresAuth) {
      const currentUserRole = getCurrentUserRole();
  
      if (!currentUserRole) {
        next('/login');
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(currentUserRole)) {
        if (window.history.length >= 1) {
            window.history.go(-1);      
          } else {   
                window.history.back();
          }
          window.location.reload();
      } else {
 
        next();
      }
    }  else {

      next();
    }
  });
    
function getCurrentUserRole() {
    const token = localStorage.getItem('jwtToken');

  if (token) {
    const decodedToken = jwt_decode(token);
    const userRole = decodedToken.roles && decodedToken.roles.length > 0 ? decodedToken.roles[0] : null;
    return userRole;
  }

  return null;
}

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(VueScrollTo, {
    duration: 0,
});
window.addEventListener('beforeunload', () => {
    store.dispatch('refreshFilterServicios');
  });

app.config.globalProperties.$axios = axios
app.use(router)
app.use(vuetify)
app.use(Notifications)

app.mount('#app')


function isLoggedIn() {
    const token = localStorage.getItem('jwtToken');
    return token && isValidToken(token);
}
function isValidToken(token) {
    try {
      const decodedToken = jwt_decode(token); 
      return true; 
    } catch (error) {
      console.error('Error al validar el token:', error.message);
      return false; 
    }
}