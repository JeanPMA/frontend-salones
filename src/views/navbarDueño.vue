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
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Jean Pool Mauricio Alcon"
            subtitle="jeanpoolmauricioalcon@gmailcom"
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
export default {
    name: 'navbarDueñoComponent',
    methods: {
    
    irAListaSolicitud() {
    // Redirige a la página de detalle del salón
      this.$router.push({ name: 'lista-solicitudes'});
    },
    irAListaSalon() {
    // Redirige a la página de detalle del salón
      this.$router.push({ name: 'lista-salones'});
    },
    irAListaReserva() {
    // Redirige a la página de detalle del salón
      this.$router.push({ name: 'lista-reservas'});
    },
    irAHome() {
    // Redirige a la página de detalle del salón
      this.$router.push({ name: 'home'});
    },
    logout() {
    // Llamar a la acción de logout del store
      this.$store.dispatch('logout', this.$router);
    },
  },
}
</script>

<style>

.text-transparent{
    color: white;
}
</style>