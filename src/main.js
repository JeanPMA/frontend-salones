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

//iconos
import { faUser, faLock, faEnvelope, faFilter, faArrowRight, faRankingStar, faCircleInfo, faCalendarDays, faBellConcierge, faInfo, faCalendar, faDiagramProject, faCircleQuestion, faMessage, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
library.add(faUser, faLock, faEnvelope, faFilter, faArrowRight, faRankingStar, faCircleInfo, faCalendarDays, faBellConcierge, faInfo, faCalendar, faDiagramProject, faCircleQuestion, faMessage, faSquarePlus)

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
        iconfont: 'mdi', // o 'fa' para Font Awesome
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
            // Verificar si el usuario ya ha iniciado sesión
            if (isLoggedIn()) {
              // Redirigir al usuario a otra ruta, por ejemplo, '/'
              next('/')
            } else {
              // Permitir el acceso a la ruta de login
              next()
            }
          }
    },
    {
        path:'/register', component: RegisterClientComponent,
        beforeEnter: (to, from, next) => {
            // Verificar si el usuario ya ha iniciado sesión
            if (isLoggedIn()) {
              // Redirigir al usuario a otra ruta, por ejemplo, '/'
              next('/')
            } else {
              // Permitir el acceso a la ruta de login
              next()
            }
          }
    },
    {
        path:'/salones', component: SalonesClientComponent,
    },
    {
        path:'/recomendados', component: RecomendadosClientComponent,
    },
    {
        path:'/buzon', component: BuzonComponent,
    },
    {
        path:'/calendar', component: CalendarComponent,
    },
    {
        path:'/detalle-salon/', component: SalonComponent, name: 'detalle-salon',//falta parametro id
    },
    {
        path:'/solicitud', component: SolicitudComponent, name: 'solicitud',//falta
    },
    {
        path:'/calificar', component: CalificaciónComponent, name: 'calificar',//falta
    },
    {
        path:'/detalle-buzon', component: DetalleBuzonComponent, name: 'detalle-buzon',//falta
    },
    {
        path:'/lista-solicitudes', component: SolicitudesListaDueñoComponent, name: 'lista-solicitudes',
    },
    {
        path:'/lista-salones', component: SalonesListaDueñoComponent, name: 'lista-salones',
    },
    {
        path:'/crear-salon', component: CrearSalonDueñoComponent, name: 'crear-salon',
    },
    {
        path:'/lista-reservas', component: ReservasListaDueñoComponent, name: 'lista-reservas',
    },
    {
        path:'/salon', component: DetalleSalonDueñoComponent, name: 'salon',//falta parametro id
    },
    {
        path:'/solicitud-reserva', component: DetalleSolicitudReservaDueñoComponent, name: 'solicitud-reserva',//falta parametro id
    },
    //ADMIN
    {
        path:'/lista-salones-admin', component: SalonesListaAdminComponent, name: 'lista-salones-admin',
    },
    {
        path:'/crear-salon-admin', component: CrearSalonComponent, name: 'crear-salon-admin',
    },
    {
        path:'/editar-salon-admin', component: EditarSalonComponent, name: 'editar-salon-admin',
    },
    {
        path:'/lista-usuarios-admin', component: UsuariosListaAdminComponent, name: 'lista-usuarios-admin',
    },
    {
        path:'/crear-usuario-admin', component: CrearUsuarioComponent, name: 'crear-usuario-admin',
    },
    {
        path:'/editar-usuario-admin', component: EditarUsuarioComponent, name: 'editar-usuario-admin',
    },
    {
        path:'/lista-servicios-admin', component: ServiciosListaAdminComponent, name: 'lista-servicios-admin',
    },
    {
        path:'/crear-servicio-admin', component: CrearServicioComponent, name: 'crear-servicio-admin',
    },
    {
        path:'/editar-servicio-admin', component: EditarServicioComponent, name: 'editar-servicio-admin',
    },
    {
        path:'/lista-tipoSR-admin', component: TipoSRListaAdminComponent, name: 'lista-tipoSR-admin',
    },
    {
        path:'/crear-tipoSR-admin', component: CrearTipoSRComponent, name: 'crear-tipoSR-admin',
    },
    {
        path:'/editar-tipoSR-admin', component: EditarTipoSRComponent, name: 'editar-tipoSR-admin',
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
//vueX
app.use(store);



app.component('font-awesome-icon', FontAwesomeIcon);
app.use(VueScrollTo, {
    duration: 0,
});


app.config.globalProperties.$axios = axios
app.use(router)
app.use(vuetify)
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