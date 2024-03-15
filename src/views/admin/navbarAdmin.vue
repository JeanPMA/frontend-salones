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
          <v-list-item prepend-icon="mdi-account" title="Usuarios" value="users" @click="irAListaUsuario"></v-list-item>
            <v-list-item prepend-icon="mdi-share-variant" title="Servicios" value="services" @click="irAListaServicio"></v-list-item>
            <v-list-item prepend-icon="mdi-pencil" title="Tipos SR" value="listSR" @click="irAListaTipoSR"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="Configuración" value="config" @click="irAConfig"></v-list-item>
            <v-list-item prepend-icon="mdi-open-in-new" title="Salir" value="logout" @click="logout"></v-list-item>

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
    name: 'navbarAdminComponent',
    data() { 
    return {
          usuario: '',
          usuarioInfo: '',
      }
    },
    mounted() {   
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwt_decode(token);
      this.usuario = decodedToken.sub;
    },
    methods: {    
    irAListaSalon() {
      this.$router.push({ name: 'lista-salones-admin'});
    },
    irAListaUsuario() {
      this.$router.push({ name: 'lista-usuarios-admin'});
    },
    irAListaServicio() {
      this.$router.push({ name: 'lista-servicios-admin'});
    },
    irAListaTipoSR() {
      this.$router.push({ name: 'lista-tipoSR-admin'});
    },
    irAHome() {
      this.$router.push({ name: 'home'});
    },
    logout() {
      this.$store.dispatch('logout', this.$router);
    },
    async irAConfig() {
        try {
          const token = localStorage.getItem('jwtToken');
          const decodedToken = jwt_decode(token);

          const userRole = decodedToken.roles[0];
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              'X-User-Role': userRole
            }
          };

          const response = await axios.get(`http://localhost:8080/v1/usuario/config/${this.usuario}`, config);

      
          this.usuarioInfo = response.data;
          this.$router.push({ name: 'config-user', params: { id: this.usuarioInfo.id } });

        } catch (error) {
          console.error('Error al obtener detalles del usuario ', error);
        }
    }
  },
}
</script>

<style>
.text-transparent{
  color: white;
}
</style>