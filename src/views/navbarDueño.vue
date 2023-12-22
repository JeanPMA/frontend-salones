<template>
    <div class="content_navbarDueño">
        <v-card>
      <v-layout>
        <v-navigation-drawer
            app
          expand-on-hover
          rail
          disable-resize-watcher="true"
        >
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              title="Jean Pool Mauricio Alcon"
              subtitle="jean@gmailcom"
            ></v-list-item>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home" title="Salones" value="myfiles"></v-list-item>
            <v-list-item prepend-icon="mdi-folder" title="Solicitudes" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-pencil" title="Rerservas" value="starred"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="Salir" value="starred"></v-list-item>

          </v-list>
        </v-navigation-drawer>
  
        <v-main style=""></v-main>
      </v-layout>
    </v-card>
    </div>
    
</template>

<script>
export default {
    name: 'navbarDueñoComponent',
}
</script>

<style>
.content_navbarDueño{
    z-index: 1;
}
</style>