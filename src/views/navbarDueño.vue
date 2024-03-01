<template>
    <v-card>
    <v-layout>
      <v-navigation-drawer
        class="bg-blue-grey-darken-4"
        expand-on-hover
        rail
        theme="dark"
        permanent
      >
        <v-list>
          <v-list-item

            :title="usuario"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list color="">
          <v-list-item prepend-icon="mdi-home" title="Salones" value="myfiles" @click="irAListaSalon"></v-list-item>
            <v-list-item prepend-icon="mdi-folder" title="Solicitudes" value="shared" @click="irAListaSolicitud"></v-list-item>
            <v-list-item prepend-icon="mdi-pencil" title="Reservas" value="starred" @click="irAListaReserva"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="Salir" value="logout" @click="logout"></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            
          </div>
        </template>
      </v-navigation-drawer>
      <v-main style=""></v-main>
    </v-layout>
  </v-card>
    
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';
export default {
    name: 'navbarDueñoComponent',
    data() { 
    return {
          usuario: '',
      }
    },
    mounted() {   
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwt_decode(token);
      this.usuario = decodedToken.sub;
    },
    methods: {
    
    irAListaSolicitud() {
      this.$router.push({ name: 'lista-solicitudes'});
    },
    irAListaSalon() {
      this.$router.push({ name: 'lista-salones'});
    },
    irAListaReserva() {
      this.$router.push({ name: 'lista-reservas'});
    },
    irAHome() {
      this.$router.push({ name: 'home'});
    },
    logout() {
      this.$store.dispatch('logout', this.$router);
    },
  },
}
</script>

<style>

.text-transparent{
    color: white;
}

.v-navigation-drawer__content{
  z-index: 5;
}
</style>