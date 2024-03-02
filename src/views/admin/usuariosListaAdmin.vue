<template>
    <NavbarAdmin style="z-index: 1000;"/>
    <div class="content_usuariosListaAdmin" style="margin-left: 50px;"> 
      <div class="listaUsuariosAdmin_title">
          <h2>LISTADO DE USUARIOS</h2>
           
      </div>
      <div class="search_listaAdmin">
        <input v-model="searchTerm" placeholder="Buscar..." />
      </div>
      <div class="filtro-container" :class="{ 'filtro-abierto': mostrarFiltro }">
                <FiltroUsuarios @filtroCambiado="filtrarUsuarios" />
      </div>
      <div class="boton_crearAdmin">
        <RouterLink to="/crear-usuario-admin">
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
              Usuario
            </th>
            <th class="text-center">
              Telefono
            </th>
            <th class="text-center">
              Nombre
            </th>
            <th class="text-center">
              Apellido
            </th>
            <th class="text-center">
              Correo
            </th>
            <th class="text-center">
              Estado
            </th>
            <th class="text-center">
              Rol
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
            <td>{{ item.username }}</td>
            <td>{{ item.telefono }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.apellido }}</td>
            <td>{{ item.correo }}</td>
            <td>{{ item.estado === 1 ? 'Habilitado' : 'Deshabilitado' }}</td>
            <td>{{ item.rol.nombre }}</td>
            <td>
              <div class="botones_Admin">              
                    <a id="eliminar" @click="eliminarUsuario(item.id)">ELIMINAR</a>  
                    <a id="editar" @click="irAUsuario(item.id)">EDITAR</a>
                    <a id="habilitar"  v-if="item.estado === 0"  @click="deshabilitarHabilitarUsuario(item.id, item.estado)">HABILITAR</a> 
                    <a id="deshabilitar" v-if="item.estado === 1" @click="deshabilitarHabilitarUsuario(item.id, item.estado)">DESHABILITAR</a>
              </div> 
            </td>
          </tr>
        </tbody>
      </v-table>
      <div v-if="displayedItems.length == 0">
            <h3>NO EXISTEN USUARIOS</h3>
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
  import FiltroUsuarios from '@/components/filtroRolUsuario.vue';

  export default {
    name: 'usuariosListaAdminComponent',
    components: {
        NavbarAdmin,
        VueNotification,
        FiltroUsuarios,
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
    axios.get('http://localhost:8080/v1/usuario', config)
      .then(response => {
        this.listaUsuariosAdmin = response.data;
        const rolesSeleccionados = JSON.parse(localStorage.getItem('rolesSeleccionados')) || [];
        this.filtrarUsuarios(rolesSeleccionados);
      })
      .catch(error => console.error('Error al obtener datos de la API:', error));
  },
  data() {
    return {
      listaUsuariosAdmin: [],
      listaUsuariosAdminFiltrado: [],
      itemsPerPage: 5,
      currentPage: 1,
      searchTerm: localStorage.getItem('searchTermUsuarioAdmin') || '',
      tamañoAux: 0,
    };
  },
  methods: {
    irAUsuario(id) {   
        this.$router.push({ name: 'editar-usuario-admin', params: { id: id } });
    },
    eliminarUsuario(id) {
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
            axios.delete(`http://localhost:8080/v1/usuario/${id}`, config)
            .then(response => {
              this.$notify({
                title: 'Éxito',
                text: 'El usuario se eliminó correctamente.',
                type: 'success',
              });
              setTimeout(function() {
                    window.location.reload();
                }, 1000);
            })
            .catch(error => {
              this.$notify({
                title: 'Error',
                text: 'Error, el usuario esta siendo utilizado en otras partes. Intentalo mas tarde',
                type: 'error',
              });
            });

      
    },
    deshabilitarHabilitarUsuario(id, estado) {
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
            axios.patch(`http://localhost:8080/v1/usuario/${id}`, data, config)
            .then(response => {
              this.$notify({
                title: 'Éxito',
                text: 'El estado del usuario se actualizó correctamente.',
                type: 'success',
              });
              setTimeout(function() {
                    window.location.reload();
                }, 1000);
            })
            .catch(error => {
              this.$notify({
                title: 'Error',
                text: 'Hubo un problema al actualizar el estado del usuario. Intentalo de nuevo',
                type: 'error',
              });
            });

      
    },
    filtrarUsuarios(rolesSeleccionados) {
      if (rolesSeleccionados.length > 0) {
        this.listaUsuariosAdminFiltrado = this.listaUsuariosAdmin.filter(usuario => {
          return usuario.rol && rolesSeleccionados.some(estado => {        
            return usuario.rol.nombre === estado;
          });
        });
        this.currentPage = 1;
      } else {
        this.listaUsuariosAdminFiltrado = this.listaUsuariosAdmin;
      }
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
      const filteredList = this.listaUsuariosAdminFiltrado.filter(item => {
        const estadoText = item.estado === 1 ? 'Habilitado' : 'Deshabilitado';
        const rol = item.rol.nombre;
        const values = Object.values(item);
        return (
          values.some(value => String(value).toLowerCase().includes(searchTerm)) ||
          estadoText.toLowerCase().includes(searchTerm) ||
          rol.toLowerCase().includes(searchTerm)

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
      localStorage.setItem('searchTermUsuarioAdmin', newSearchTerm);
    }
  }
  };
  </script>
  
<style>
.content_usuariosListaAdmin{
  background-color: white;
  height: 100vh;
}
  .listaUsuariosAdmin_title{
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

/* botones estilos*/

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

.botones_Admin #deshabilitar{
    background-color: #ff0000;
    color: #ffffff;
    border: 2px solid #ff0000;
   transition: 0.3s ease; 
   
  }

.botones_Admin #deshabilitar:hover {
    background-color: transparent;
    color: #ff0000;
   
  }

 
  .botones_Admin #editar{
    background-color: #0040ff;
    border: 2px solid #0040ff;
    color: #ffffff;
   transition: 0.3s ease;   
   
  }

.botones_Admin #editar:hover {
    background-color: transparent;
    color: #0040ff;
   
  }

.boton_crearAdmin{


margin-top: 20px;
display: flex;


}

.boton_crearAdmin a{
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
.boton_crearAdmin #crear{
    background-color: #00aa39;
    border: 2px solid #00aa39;
    color: #ffffff;
   transition: 0.3s ease;   
   
  }

.boton_crearAdmin #crear:hover {
    background-color: transparent;
    color: #00aa39;
}

.content_usuariosListaAdmin .v-pagination{
    margin-top: 0px;
}

@media  screen and (max-width: 1000px) {
  .boton_crearAdmin a{
    margin-left: auto;
    align-items: end;
  }
}

@media  screen and (max-width: 440px) {
  .search_listaAdmin{
    margin: 10px 5px 0px 10px;
  }
}
</style>
  