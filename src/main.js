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


//iconos
import { faUser, faLock, faEnvelope, faFilter } from '@fortawesome/free-solid-svg-icons'
library.add(faUser, faLock, faEnvelope, faFilter)



const routes = [
    {
        path:'/', component: Home,
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

app.mount('#app')
