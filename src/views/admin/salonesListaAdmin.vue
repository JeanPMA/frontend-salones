<template>
    <NavbarAdmin style="z-index: 1000;"/>
    <div class="content_salonesListaAdmin" style="margin-left: 50px;"> 
      <div class="listaSalonesAdmin_title">
          <h2>LISTADO DE SALONES</h2>
          
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
        <FiltroServicios @filtroCambiado="filtrarSalones" />
      </div>
   
      <div class="boton_crearAdmin">
        <RouterLink to="/crear-salon-admin">
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
            <th class="text-center" >
              Nombre Salon
            </th>
            <th class="text-center">
              Propietario
            </th>
            <th class="text-center">
              Direccion
            </th>
            <th class="text-center">
              Estado
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
            <td>{{ item.usuario.nombre }}</td>
            <td>{{ item.direccion }}</td>
            <td :class="{ 'habilitadoAdmin': item.estado === 1, 'deshabilitadoAdmin': item.estado !== 1 }">
              {{ item.estado === 1 ? 'Habilitado' : 'Deshabilitado' }}
            </td>
            <td>
              <div class="botones_Admin">
                  <a id="eliminar" @click="eliminarSalon(item.id)"><font-awesome-icon :icon="['fas', 'trash']" /></a>  
                  <a id="editar" @click="irASalon(item.id)"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></a>
                  <a id="habilitar"  v-if="item.estado === 0"  @click="deshabilitarHabilitarSalon(item.id, item.estado)"><font-awesome-icon :icon="['fas', 'eye']" /></a> 
                  <a id="deshabilitar" v-if="item.estado === 1" @click="deshabilitarHabilitarSalon(item.id, item.estado)"><font-awesome-icon :icon="['fas', 'eye-slash']" /></a>
              </div> 
            </td>
          </tr>
          
        </tbody>
        
      </v-table>
        <div v-if="displayedItems.length == 0">
            <h3>NO EXISTEN SALONES</h3>
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
  import FiltroServicios from '@/components/filtroServicios.vue';

  export default {
    name: 'salonesListaAdminComponent',
    components: {
        NavbarAdmin,
        VueNotification,
        FiltroServicios,
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
    axios.get('http://localhost:8080/v1/salon', config)
      .then(response => {
        this.listaSalonesAdministrador = response.data;
        
        const serviciosSeleccionados = JSON.parse(localStorage.getItem('serviciosSeleccionados')) || [];
        this.filtrarSalones(serviciosSeleccionados);
      })
      .catch(error => console.error('Error al obtener datos de la API:', error));
    },
    data() {
      return {
        listaSalonesAdministrador: [],
        listaSalonesAdminFiltrado: [],
        itemsPerPage: 5,
        currentPage: 1,
        searchTerm: localStorage.getItem('searchTermSalonesAdmin') || '',
        tamañoAux: 0,

        orden: 'mas',
        dropdownVisible: false,
        ordenAux: 'mas', 
          
      };
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

      const filteredList = this.listaSalonesAdminFiltrado.filter(item => {
        const estadoText = item.estado === 1 ? 'Habilitado' : 'Deshabilitado';
        const propietario = item.usuario.nombre;
        const values = Object.values(item);
        return (
          values.some(value => String(value).toLowerCase().includes(searchTerm)) ||
          estadoText.toLowerCase().includes(searchTerm) ||
          propietario.toLowerCase().includes(searchTerm)
        );
      });
     
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.tamañoAux = filteredList.length;
     
      return filteredList.slice(startIndex, endIndex);
    },
  },
  methods:{
    deshabilitarHabilitarSalon(id, estado) {
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
            axios.patch(`http://localhost:8080/v1/salon/${id}`, data, config)
            .then(response => {
              this.$notify({
                title: 'Éxito',
                text: 'El estado del salón se actualizó correctamente.',
                type: 'success',
              });
              setTimeout(function() {
                    window.location.reload();
                }, 1000);
            })
            .catch(error => {
              this.$notify({
                title: 'Error',
                text: 'Hubo un problema al actualizar el estado del salón. Intentalo de nuevo',
                type: 'error',
              });
            });

    },
    irASalon(id) {   
        this.$router.push({ name: 'editar-salon-admin', params: { id: id } });
    },
    eliminarSalon(id) {
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
            axios.delete(`http://localhost:8080/v1/salon/${id}`, config)
            .then(response => {
              this.$notify({
                title: 'Éxito',
                text: 'El salón se eliminó correctamente.',
                type: 'success',
              });
              setTimeout(function() {
                    window.location.reload();
                }, 1000);
            })
            .catch(error => {
              this.$notify({
                title: 'Error',
                text: 'Error, el salón esta siendo utilizado en otras partes. Intentalo mas tarde',
                type: 'error',
              });
            });

      
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    cambiarOrden(direccion) {
      this.orden = direccion;
      this.listaSalonesAdminFiltrado.sort((a, b) => {
        const orderFactor = direccion === 'mas' ? 1 : -1;
        this.ordenAux = direccion;
        return orderFactor * (a.nombre.toLowerCase() > b.nombre.toLowerCase() ? 1 : -1);
      });
    },
    filtrarSalones(serviciosSeleccionados) {
      if (serviciosSeleccionados.length > 0) {
        this.listaSalonesAdminFiltrado = this.listaSalonesAdministrador.filter(salon => {
          return serviciosSeleccionados.every(servicio => {
            return salon.servicios.some(s => s.nombre === servicio);
          });
        });
        this.currentPage = 1;
      } else {
        this.listaSalonesAdminFiltrado = this.listaSalonesAdministrador;
      }
      this.cambiarOrden(this.ordenAux);
    },
  },
  watch: {
    searchTerm(newSearchTerm) {
      localStorage.setItem('searchTermSalonesAdmin', newSearchTerm);
    }
  }
  };
  </script>
  
<style>
.content_salonesListaAdmin{
  background-color: white;
  height: 100vh;
}

.listaSalonesAdmin_title{
  padding-top: 30px;
}

/*BOTONES*/
.boton_crearSalonAdmin{
  margin-top: 20px;
  display: flex;
}

.boton_crearSalonAdmin a{
  margin-left: 80%;
  padding: 6px;
  width: 150px;
  height: 35px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
}

.content_salonesListaAdmin .filtro-container .filtro_servicios a{
  color: black;
}

.content_salonesListaAdmin .filtro-container .filtro_servicios span{
  color: black;
}

.content_salonesListaAdmin .filtro-container .filtro_servicios label{
  color: black;
}

.content_salonesListaAdmin .v-pagination{
  margin-top: 0px;
}

.search_listaAdmin input{
  width: 100%;
  padding: 10px;
  
  color: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 10px;
}

</style>
  