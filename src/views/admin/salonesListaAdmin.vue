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
      <div class="boton_crearSalonAdmin">
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
            <td>{{ item.propietario }}</td>
            <td>{{ item.direccion }}</td>
            <td>{{ item.estado }}</td>
            <td>
              <div class="botones_ListaSalonAdmin">
                  <a id="deshabilitar" >DESHABILITAR</a> 
                  <RouterLink to="/editar-salon-admin">            
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
    name: 'salonesListaAdminComponent',
    components: {
        NavbarAdmin,
    },

    data() {
    return {
      desserts: [
        { nombre: 'SALON DE EVENTOS', propietario: 'Juan Perez', direccion:'Av. petrolera km 8', estado: 'Habilitado'},
        { nombre: 'SALON DE EVENTOS', propietario: 'Juan Perez', direccion:'Av. petrolera km 8', estado: 'Habilitado'},
        { nombre: 'SALON DE EVENTOS', propietario: 'Juan Perez', direccion:'Av. petrolera km 8', estado: 'Habilitado'},
        { nombre: 'SALON DE EVENTOS', propietario: 'Juan Perez', direccion:'Av. petrolera km 8', estado: 'Habilitado'},
        { nombre: 'SALON DE EVENTOS', propietario: 'Juan Perez', direccion:'Av. petrolera km 8', estado: 'Habilitado'},
        { nombre: 'SALON DE EVENTOS', propietario: 'Juan Perez', direccion:'Av. petrolera km 8', estado: 'Habilitado'},
        { nombre: 'SALON DE EVENTOS', propietario: 'Juan Perez', direccion:'Av. petrolera km 8', estado: 'Habilitado'},
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
.botones_ListaSalonAdmin{

   width: 100px;
   
}

.botones_ListaSalonAdmin a{
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

.botones_ListaSalonAdmin #deshabilitar{
    background-color: #ff0000;
    color: #ffffff;
    border: 2px solid #ff0000;
   transition: 0.3s ease; 
   
  }

.botones_ListaSalonAdmin #deshabilitar:hover {
    background-color: transparent;
    color: #ff0000;
   
  }

 
  .botones_ListaSalonAdmin #editar{
    background-color: #0040ff;
    border: 2px solid #0040ff;
    color: #ffffff;
   transition: 0.3s ease;   
   
  }

.botones_ListaSalonAdmin #editar:hover {
    background-color: transparent;
    color: #0040ff;
   
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
.boton_crearSalonAdmin #crear{
    background-color: #00aa39;
    border: 2px solid #00aa39;
    color: #ffffff;
   transition: 0.3s ease;   
   
  }

.boton_crearSalonAdmin #crear:hover {
    background-color: transparent;
    color: #00aa39;
}
</style>
  