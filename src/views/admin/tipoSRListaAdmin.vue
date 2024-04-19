<template>
    <NavbarAdmin style="z-index: 1000;"/>
    <div class="content_serviciosListaAdmin" style="margin-left: 50px;"> 
      <div class="listaSRAdmin_title">
          <h2>LISTADO DE TIPO DE SOLICITUD RESERVA</h2>
          
      </div>
      <div class="selector_admin">
          <div class="selector_orden" @click="toggleDropdown">
            <div class="opciones_selector">{{ orden === 'mas' ? 'A-Z' : 'Z-A' }}</div>
            <div v-show="dropdownVisible" class="dropdown_selector">
              <div class="option" @click="cambiarOrden('mas')">A-Z</div>
              <div class="option" @click="cambiarOrden('menos')">Z-A</div>
            </div>
          </div>
        </div>
      <div class="search_listaAdmin">
        <input v-model="searchTerm" placeholder="Buscar..." />

      </div>
     <div class="filtro-container" :class="{ 'filtro-abierto': mostrarFiltro }">
                <FiltroServiciosTipoSR @filtroCambiado="filtrarTipoSR" />
      </div>
      <div class="boton_crearAdmin">
        <RouterLink to="/crear-tipoSR-admin">
            <a id="crear" >CREAR</a>
        </RouterLink>
      </div>
      <div style="margin-top: 10px;">
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
            <td :class="{ 'habilitadoAdmin': item.estado === 1, 'deshabilitadoAdmin': item.estado !== 1 }">
              {{ item.estado === 1 ? 'Habilitado' : 'Deshabilitado' }}
            </td>
            <td>{{ item.created_at }}</td>
            <td>
              <div class="botones_Admin">
                  <a id="eliminar" @click="eliminarTipoSR(item.id)"><font-awesome-icon :icon="['fas', 'trash']" /></a>           
                  <a id="editar" @click="irATipoSR(item.id)"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></a>
                  <a id="habilitar"  v-if="item.estado === 0"  @click="deshabilitarHabilitarTipoSR(item.id, item.estado)"><font-awesome-icon :icon="['fas', 'eye']" /></a> 
                  <a id="deshabilitar" v-if="item.estado === 1" @click="deshabilitarHabilitarTipoSR(item.id, item.estado)"><font-awesome-icon :icon="['fas', 'eye-slash']" /></a> 
              </div> 
            </td>
          </tr>
        </tbody>
      </v-table>
      <div v-if="displayedItems.length == 0">
            <h3>NO EXISTEN TIPO SR</h3>
          </div> 
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
import FiltroServiciosTipoSR from '@/components/filtroEstadoServicesTipoSR.vue';

  export default {
    name: 'tipoSRListaAdminComponent',
    components: {
        NavbarAdmin,
        VueNotification,
        FiltroServiciosTipoSR,

    },

    data() {
    return {
      tipoSRListaAdmin: [],
      tipoSRListaAdminFiltrado: [],
      itemsPerPage: 5,
      currentPage: 1,
      searchTerm: localStorage.getItem('searchTermTipoSRAdmin') || '',
      tamañoAux: 0,

      orden: 'mas',
      dropdownVisible: false,
      ordenAux: 'mas',   
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
    const apiUrl = process.env.VUE_APP_BASE_URL;
    axios.get(`${apiUrl}/v1/tipo-sr`, config)
      .then(response => {
        this.tipoSRListaAdmin = response.data;
        const estadosSeleccionados = JSON.parse(localStorage.getItem('servicesTipoSRSeleccionados')) || [];
        this.filtrarTipoSR(estadosSeleccionados);
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
            const apiUrl = process.env.VUE_APP_BASE_URL;
            axios.delete(`${apiUrl}/v1/tipo-sr/${id}`, config)
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
            const apiUrl = process.env.VUE_APP_BASE_URL;
            axios.patch(`${apiUrl}/v1/tipo-sr/${id}`, data, config)
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
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
 
    cambiarOrden(direccion) {
      this.orden = direccion;

      this.tipoSRListaAdminFiltrado.sort((a, b) => {
        const orderFactor = direccion === 'mas' ? 1 : -1;
        this.ordenAux = direccion;
        return orderFactor * (a.nombre.toLowerCase() > b.nombre.toLowerCase() ? 1 : -1);
      });
    },
    filtrarTipoSR(estadosSeleccionados) {
       
      if (estadosSeleccionados.length > 0) {
        this.tipoSRListaAdminFiltrado = this.tipoSRListaAdmin.filter(stsr => {
          return stsr && estadosSeleccionados.some(estado => {        
            return stsr.estado === estado;
          });
        });
        this.currentPage = 1;
      } else {
        this.tipoSRListaAdminFiltrado = this.tipoSRListaAdmin;
      }
      this.cambiarOrden(this.ordenAux);
    },
  },
  computed: {
    totalItems() {
      return this.tamañoAux;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    displayedItems() {
      const searchTerm = this.searchTerm.toLowerCase();
      if (searchTerm !== this.lastSearchTerm) {
        this.currentPage = 1;
        this.lastSearchTerm = searchTerm;
      }
      const filteredList = this.tipoSRListaAdminFiltrado.filter(item => {
        const estadoText = item.estado === 1 ? 'Habilitado' : 'Deshabilitado';
        const values = Object.values(item);
        return (
          values.some(value => String(value).toLowerCase().includes(searchTerm)) ||
          estadoText.toLowerCase().includes(searchTerm)
        );
      });
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.tamañoAux = filteredList.length;
      return filteredList.slice(startIndex, endIndex);
    },

  },
  watch: {
    searchTerm(newSearchTerm) {
      localStorage.setItem('searchTermTipoSRAdmin', newSearchTerm);
    }
  }
  };
  </script>
  
<style>
.listaSRAdmin_title{
  padding-top: 30px;
}

.content_serviciosListaAdmin .v-pagination{
  margin-top: 0px;
}
</style>
  