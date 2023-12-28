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

import SalonesListaAdminComponent from "@/views/admin/salonesListaAdmin.vue";
import CrearSalonComponent from "@/views/admin/crearSalon.vue";
import EditarSalonComponent from "@/views/admin/editarSalon.vue";



import 'vuetify/styles';
import { createVuetify } from 'vuetify/lib/framework.mjs';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import Vuetify from 'vuetify/lib/framework';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.min.css';


//iconos
import { faUser, faLock, faEnvelope, faFilter, faArrowRight, faRankingStar, faCircleInfo, faCalendarDays, faBellConcierge, faInfo, faCalendar, faDiagramProject, faCircleQuestion, faMessage } from '@fortawesome/free-solid-svg-icons'
library.add(faUser, faLock, faEnvelope, faFilter, faArrowRight, faRankingStar, faCircleInfo, faCalendarDays, faBellConcierge, faInfo, faCalendar, faDiagramProject, faCircleQuestion, faMessage)


const vuetify = createVuetify({
    components,
    directives,
    icons: {
        iconfont: 'mdi', // o 'fa' para Font Awesome
      },
})

const routes = [
    {
        path:'/', component: Home, name: 'home',
    },
    {
        path:'/login', component: LoginComponent,
    },
    {
        path:'/register', component: RegisterClientComponent,
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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(VueScrollTo, {
    duration: 0,
});
app.use(router)
app.use(vuetify)
app.mount('#app')
