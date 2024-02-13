<template>
    <NavbarAdmin style="z-index: 1000;"/>
    <div class="content_salonesListaAdmin" style="margin-left: 50px;"> 
      <div class="listaSalonesAdmin_title">
          <h2>LISTADO DE SALONES</h2>
          
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
        <RouterLink to="/crear-salon-admin">
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
            <td>{{ item.estado === 1 ? 'Habilitado' : 'Deshabilitado' }}</td>
            <td>
              <div class="botones_Admin">
                  <a id="eliminar" @click="eliminarSalon(item.id)">ELIMINAR</a>  
                  <a id="editar" @click="irASalon(item.id)">EDITAR</a>
                  <a id="habilitar"  v-if="item.estado === 0"  @click="deshabilitarHabilitarSalon(item.id, item.estado)">HABILITAR</a> 
                  <a id="deshabilitar" v-if="item.estado === 1" @click="deshabilitarHabilitarSalon(item.id, item.estado)">DESHABILITAR</a>
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

  export default {
    name: 'salonesListaAdminComponent',
    components: {
        NavbarAdmin,
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
        console.log(this.listaSalonesAdministrador);
      })
      .catch(error => console.error('Error al obtener datos de la API:', error));
    },
    data() {
      return {
        listaSalonesAdministrador: [],
        itemsPerPage: 5,
        currentPage: 1,
      };
    },
  computed: {
    totalItems() {
      return this.listaSalonesAdministrador.length;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    displayedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.listaSalonesAdministrador.slice(startIndex, endIndex);
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
              console.log('Salon deshabilitada:', id);  
              window.location.reload();
            })
            .catch(error => {
              console.error('Error en la petición:', error);
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
              console.log('salon eliminado:', id);  
              window.location.reload();
            })
            .catch(error => {
              console.error('Error en la petición:', error);
            });

      
    },
  }
  };
  </script>
  
<style>
.content_salonesListaAdmin{
  background-color: white;
}
  .listaSalonesAdmin_title{
    padding-top: 50px;
  }
  .v-data-table__th{
  font-size: 1.2rem; 
  font-weight: bold;
  color: rgb(0, 153, 255);
}
.search_listaAdmin{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0px 100px 0px 100px;
    margin-top: 20px;
}
.admin_filter{
    cursor: pointer;
    margin-left: 40px;
    padding-top: 10px;
    text-align: start;
}
/* botones estilos*/
.botones_Admin{

   width: 100px;
   
}

.botones_Admin a{
    margin-left: 5px;
    margin-right: 5px;
    padding: 8px;
    width: 150px;
    height: 35px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;
    text-decoration: none;
}


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

</style>
  