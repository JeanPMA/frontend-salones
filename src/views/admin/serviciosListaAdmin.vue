<template>
    <NavbarAdmin style="z-index: 1000;"/>
    <div class="content_serviciosListaAdmin" style="margin-left: 50px;"> 
      <div class="listaServiciosAdmin_title">
          <h2>LISTADO DE SERVICIOS</h2>
          
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
                <FiltroServiciosTipoSR @filtroCambiado="filtrarServicios" />
      </div>
      <div class="boton_crearAdmin">
        <RouterLink to="/crear-servicio-admin">
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
            <td :class="{ 'habilitadoAdmin': item.estado === 1, 'deshabilitadoAdmin': item.estado !== 1 }">
              {{ item.estado === 1 ? 'Habilitado' : 'Deshabilitado' }}
            </td>
            <td>{{ item.created_at }}</td>
            <td>
              <div class="botones_Admin">
                  <a id="eliminar" @click="eliminarServicio(item.id)"><font-awesome-icon :icon="['fas', 'trash']" /></a>        
                    <a id="editar" @click="irAServicio(item.id)"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></a> 
                  <a id="habilitar"  v-if="item.estado === 0"  @click="deshabilitarHabilitarServicio(item.id, item.estado)"><font-awesome-icon :icon="['fas', 'eye']" /></a> 
                  <a id="deshabilitar" v-if="item.estado === 1" @click="deshabilitarHabilitarServicio(item.id, item.estado)"><font-awesome-icon :icon="['fas', 'eye-slash']" /></a>
                 
              </div> 
            </td>
          </tr>
        </tbody>
      </v-table>
      <div v-if="displayedItems.length == 0">
            <h3>NO EXISTEN SERVICIOS</h3>
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
    name: 'serviciosListaAdminComponent',
    components: {
        NavbarAdmin,
        VueNotification,
        FiltroServiciosTipoSR,
    },

    data() {
    return {
      listaServiciosAdmin: [],
      listaServiciosAdminFiltrado: [],
      itemsPerPage: 5,
      currentPage: 1,
      searchTerm: localStorage.getItem('searchTermServicioAdmin') || '',
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
    axios.get(`${apiUrl}/v1/servicio`, config)
      .then(response => {
        this.listaServiciosAdmin = response.data;
        const estadosSeleccionados = JSON.parse(localStorage.getItem('servicesTipoSRSeleccionados')) || [];
        this.filtrarServicios(estadosSeleccionados);
      })
      .catch(error => console.error('Error al obtener datos de la API:', error));
  },
  methods:{
    irAServicio(id) {   
        this.$router.push({ name: 'editar-servicio-admin', params: { id: id } });
    },
    eliminarServicio(id) {
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
            axios.delete(`${apiUrl}/v1/servicio/${id}`, config)
            .then(response => {
              this.$notify({
                title: 'Éxito',
                text: 'El servicio se eliminó correctamente.',
                type: 'success',
              });
              setTimeout(function() {
                    window.location.reload();
                }, 1000);
            })
            .catch(error => {
              this.$notify({
                title: 'Error',
                text: 'Error, el servicio esta siendo utilizado en otras partes. Intentalo mas tarde',
                type: 'error',
              });
            });

      
    },
    deshabilitarHabilitarServicio(id, estado) {
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
            axios.patch(`${apiUrl}/v1/servicio/${id}`, data, config)
            .then(response => {
              this.$notify({
                title: 'Éxito',
                text: 'El estado del servicio se actualizó correctamente.',
                type: 'success',
              });
              setTimeout(function() {
                    window.location.reload();
                }, 1000);
            })
            .catch(error => {
              this.$notify({
                title: 'Error',
                text: 'Hubo un problema al actualizar el estado del servicio. Intentalo de nuevo',
                type: 'error',
              });
            });

      
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    cambiarOrden(direccion) {
      this.orden = direccion;
     
      this.listaServiciosAdminFiltrado.sort((a, b) => {
        const orderFactor = direccion === 'mas' ? 1 : -1;
        this.ordenAux = direccion;
        return orderFactor * (a.nombre.toLowerCase() > b.nombre.toLowerCase() ? 1 : -1);
      });
    
    },
    filtrarServicios(estadosSeleccionados) {
      if (estadosSeleccionados.length > 0) {
        this.listaServiciosAdminFiltrado = this.listaServiciosAdmin.filter(stsr => {
          return stsr && estadosSeleccionados.some(estado => {        
            return stsr.estado === estado;
          });
        });
        this.currentPage = 1;   
      } else {
        this.listaServiciosAdminFiltrado = this.listaServiciosAdmin;
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
      const filteredList = this.listaServiciosAdminFiltrado.filter(item => {
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
      localStorage.setItem('searchTermServicioAdmin', newSearchTerm);
    }
  }
  };
  </script>
  
<style>
.content_serviciosListaAdmin{
  background-color: white;
  height: 100vh;
}

.listaServiciosAdmin_title{
  padding-top: 30px;
}
 
.content_serviciosListaAdmin .v-pagination{
  margin-top: 0px;
}

</style>
  