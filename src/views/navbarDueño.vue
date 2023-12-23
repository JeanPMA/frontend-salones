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
        <v-list color="transparent">
          <v-list-item prepend-icon="mdi-home" title="Salones" value="myfiles"></v-list-item>
            <v-list-item prepend-icon="mdi-folder" title="Solicitudes" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-pencil" title="Rerservas" value="starred"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="Salir" value="starred"></v-list-item>
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
   
}
</script>

<style>


</style>