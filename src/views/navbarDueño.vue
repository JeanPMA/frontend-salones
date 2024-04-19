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
    name: 'navbarDueñoComponent',
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
          const apiUrl = process.env.VUE_APP_BASE_URL;
          const response = await axios.get(`${apiUrl}/v1/usuario/config/${this.usuario}`, config);

      
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

.v-navigation-drawer__content{
  z-index: 5;
}
</style>