<template>
    <NavbarAdmin style="z-index: 1000;"/>
    <div class="content_serviciosListaAdmin" style="margin-left: 50px;"> 
      <div class="listaSRAdmin_title">
          <h2>LISTADO DE TIPO DE SOLICITUD RESERVA</h2>
          
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
        <RouterLink to="/crear-tipoSR-admin">
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
            <td>{{ item.estado === 1 ? 'Habilitado' : 'Deshabilitado' }}</td>
            <td>{{ item.created_at }}</td>
            <td>
              <div class="botones_Admin">
                  <a id="eliminar" @click="eliminarTipoSR(item.id)">ELIMINAR</a>           
                  <a id="editar" @click="irATipoSR(item.id)">EDITAR</a>
                  <a id="habilitar"  v-if="item.estado === 0"  @click="deshabilitarHabilitarTipoSR(item.id, item.estado)">HABILITAR</a> 
                  <a id="deshabilitar" v-if="item.estado === 1" @click="deshabilitarHabilitarTipoSR(item.id, item.estado)">DESHABILITAR</a> 
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
  import axios from 'axios';
import jwt_decode from 'jwt-decode';
import VueNotification from '@kyvg/vue3-notification';

  export default {
    name: 'tipoSRListaAdminComponent',
    components: {
        NavbarAdmin,
        VueNotification,
    },

    data() {
    return {
      tipoSRListaAdmin: [],
      itemsPerPage: 5,
      currentPage: 1,
    };
  },
  mounted() {
    
    const token = localStorage.getItem('jwtToken');
    const decodedToken = jwt_decode(token);

    const userRole = decodedToken.roles[0]; 
    const username = decodedToken.sub;
    const config = {
      headers: {
        Authorization:  `Bearer ${token}`,
        'X-User-Role': userRole
      } ,
      params: {
        username: username,
      },
    };
    axios.get('http://localhost:8080/v1/tipo-sr', config)
      .then(response => {
        this.tipoSRListaAdmin = response.data;
      })
      .catch(error => console.error('Error al obtener datos de la API:', error));
  },
  methods:{
    eliminarTipoSR(id) {
            const token = localStorage.getItem('jwtToken');
            const decodedToken = jwt_decode(token);
            const userRole = decodedToken.roles[0];
            const username = decodedToken.sub;
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
                'X-User-Role': userRole,
              },
              params: {
                username: username,
              },
            }
            axios.delete(`http://localhost:8080/v1/tipo-sr/${id}`, config)
            .then(response => {
              this.$notify({
                title: 'Éxito',
                text: 'El tipo solicitud-reserva se eliminó correctamente.',
                type: 'success',
              });
              setTimeout(function() {
                    window.location.reload();
                }, 1000);
            })
            .catch(error => {
              this.$notify({
                title: 'Error',
                text: 'Error, el tipo solicitud-reserva esta siendo utilizado en otras partes. Intentalo mas tarde',
                type: 'error',
              });
            });

      
    },
    irATipoSR(id) {   
        this.$router.push({ name: 'editar-tipoSR-admin', params: { id: id } });
    },
    deshabilitarHabilitarTipoSR(id, estado) {
            const nuevoEstado = estado === 0 ? 1 : 0;
            const token = localStorage.getItem('jwtToken');
            const decodedToken = jwt_decode(token);
            const userRole = decodedToken.roles[0];
            const username = decodedToken.sub;
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
                'X-User-Role': userRole,
              },
              params: {
                username: username,
              },
            }
            const data = {
              id: id,
              estado: nuevoEstado,
            };
            axios.patch(`http://localhost:8080/v1/tipo-sr/${id}`, data, config)
            .then(response => {
              this.$notify({
                title: 'Éxito',
                text: 'El estado del tipo solicitud-reserva se actualizó correctamente.',
                type: 'success',
              });
              setTimeout(function() {
                    window.location.reload();
                }, 1000);
            })
            .catch(error => {
              this.$notify({
                title: 'Error',
                text: 'Hubo un problema al actualizar el estado del tipo solicitud-reserva. Intentalo de nuevo',
                type: 'error',
              });
            });

      
    },
  },
  computed: {
    totalItems() {
      return this.tipoSRListaAdmin.length;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    displayedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.tipoSRListaAdmin.slice(startIndex, endIndex);
    },
  },
  };
  </script>
  
<style>
  .listaSRAdmin_title{
    padding-top: 50px;
  }
 
  .botones_Admin #eliminar{
    background-color: #00aeff;
    color: #ffffff;
    border: 2px solid #00aeff;
   transition: 0.3s ease; 
   
  }

  .botones_Admin #eliminar:hover {
    background-color: transparent;
    color: #00aeff;
   
  }
  .botones_Admin #habilitar{
    background-color: #2cbd00;
    color: #ffffff;
    border: 2px solid #2cbd00;
   transition: 0.3s ease; 
   
  }

  .botones_Admin #habilitar:hover {
    background-color: transparent;
    color: #2cbd00;
   
  }
</style>
  