<template>
    <NavbarAdmin style="z-index: 1000;"/>
    <div class="content_serviciosListaAdmin" style="margin-left: 50px;"> 
      <div class="listaServiciosAdmin_title">
          <h2>LISTADO DE SERVICIOS</h2>
          
      </div>
      <div class="search_listaAdmin">
              <div class="search-container">
                  <input type="text" id="search-input" placeholder="Buscar...">
                  <button id="search-button">Buscar</button>
              </div>
              <div class="admin_filter">
                <span class="icon"><font-awesome-icon :icon="['fas', 'filter']" /></span>                    
                    <a href="#" id="clickeable-label">FILTRO</a>
              </div>
      </div>
      <div class="boton_crearAdmin">
        <RouterLink to="/crear-servicio-admin">
            <a id="crear" >CREAR</a>
        </RouterLink>
      </div>
      <div style="margin-top: 20px;">
      <v-table
        fixed-header
        height="65vh"
      >
        <thead>
          <tr style="font-size: 1.2rem; font-weight: bold; color: blueviolet;">
            <th class="text-center">
              Nombre
            </th>
            <th class="text-center">
              Detalle
            </th>
            <th class="text-center">
              Estado
            </th>
            <th class="text-center">
              Fecha añadido
            </th>
            <th class="text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in displayedItems"
            :key="index"
          >
            <td>{{ item.nombre }}</td>
            <td>{{ item.detalle }}</td>
            <td>{{ item.estado }}</td>
            <td>{{ item.fecha }}</td>
            <td>
              <div class="botones_Admin">
                  <a id="deshabilitar" >DESHABILITAR</a> 
                  <RouterLink to="/editar-servicio-admin">            
                    <a id="editar" >EDITAR</a>
                  </RouterLink>  
              </div> 
            </td>
          </tr>
        </tbody>
      </v-table>

      <v-pagination
        v-model="currentPage"
        :length="totalPages"
      ></v-pagination>
    </div>
</div>
  </template>
  
  <script>
  import NavbarAdmin from '@/views/admin/navbarAdmin.vue';

  export default {
    name: 'serviciosListaAdminComponent',
    components: {
        NavbarAdmin,
    },

    data() {
    return {
      desserts: [
        { nombre: 'SERVICIO', detalle: 'DETALLE SERVICIO', estado: 'HABILITADO', fecha: '10-12-2023'},
        { nombre: 'SERVICIO', detalle: 'DETALLE SERVICIO', estado: 'HABILITADO', fecha: '10-12-2023'},
        { nombre: 'SERVICIO', detalle: 'DETALLE SERVICIO', estado: 'HABILITADO', fecha: '10-12-2023'},
        { nombre: 'SERVICIO', detalle: 'DETALLE SERVICIO', estado: 'HABILITADO', fecha: '10-12-2023'},
        { nombre: 'SERVICIO', detalle: 'DETALLE SERVICIO', estado: 'HABILITADO', fecha: '10-12-2023'},
        { nombre: 'SERVICIO', detalle: 'DETALLE SERVICIO', estado: 'HABILITADO', fecha: '10-12-2023'},
        { nombre: 'SERVICIO', detalle: 'DETALLE SERVICIO', estado: 'HABILITADO', fecha: '10-12-2023'},
        // Agrega más elementos según tus necesidades
      ],
      itemsPerPage: 5,
      currentPage: 1,
    };
  },
  computed: {
    totalItems() {
      return this.desserts.length;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    displayedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.desserts.slice(startIndex, endIndex);
    },
  },
  };
  </script>
  
<style>
  .listaServiciosAdmin_title{
    margin-top: 50px;
  }
 


</style>
  