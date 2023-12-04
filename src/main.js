import { createApp } from 'vue'
import App from './App.vue'
import 'swiper/swiper-bundle.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createRouter, createWebHistory } from 'vue-router'

import Home from "@/views/home.vue";
import LoginComponent from "@/views/login.vue";
import RegisterClientComponent from "@/views/registerClient.vue";

//iconos
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
library.add(faUser, faLock, faEnvelope)



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
   
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router)

app.mount('#app')
