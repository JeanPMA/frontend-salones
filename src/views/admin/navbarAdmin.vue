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
            title="ADMIN"
            subtitle="ADMIN@gmailcom"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list color="">
          <v-list-item prepend-icon="mdi-home" title="Salones" value="myfiles" @click="irAListaSalon"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="Usuarios" value="starred" @click="irAListaUsuario"></v-list-item>
            <v-list-item prepend-icon="mdi-share-variant" title="Servicios" value="starred" @click="irAListaServicio"></v-list-item>
            <v-list-item prepend-icon="mdi-pencil" title="Tipos SR" value="starred" @click="irAListaTipoSR"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="Salir" value="starred" @click="logout"></v-list-item>

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
    name: 'navbarAdminComponent',
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