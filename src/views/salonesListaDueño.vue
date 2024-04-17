<template>
    <NavbarDueño style="z-index: 1000;"/>
    <div class="content_salonesDueño">
        <h1>
        LISTA DE SALONES
        </h1>
        <div class="selector_owner">
          <div class="selector_orden" @click="toggleDropdown">
            <div class="opciones_selector">{{ orden === 'mas' ? 'A-Z' : 'Z-A' }}</div>
            <div v-show="dropdownVisible" class="dropdown_selector">
              <div class="option" @click="cambiarOrden('mas')">A-Z</div>
              <div class="option" @click="cambiarOrden('menos')">Z-A</div>
            </div>
          </div>
        </div>
        
        <div class="search_listaSolicitud">
            <div class="search-container">
              <input v-model="searchTerm" placeholder="Buscar..." />
             </div>
             <div class="filtro-container" :class="{ 'filtro-abierto': mostrarFiltro }">
                <FiltroServicios @filtroCambiado="filtrarSalones" />
             </div>
        </div> 
        <div class="boton_crearSalonDueño">
          <RouterLink to="/crear-salon">
              <a id="crear" >CREAR SALON</a>
          </RouterLink>
        </div>
        <div class="dueño_gridSalones">
          <div class="grid-containerSalonesDueño">
            <div class="grid__itemSalon" v-for="(item, index) in displayedItems" :key="index" v-show="mostrarImagen(index)" @click="irASalon(item.id)">
                <div class="text-titleSalon" >
                    <h2>{{ item.nombre }}</h2>
                    <img :src="item.banner_url" alt="">
                   
                </div>
              
              <div class="text-detailSalones">
                <h4>Descripcion:</h4>
                <p>{{ item.descripcion }}</p>
                <h4>Estado:</h4>
                <p>{{ item.estado === 1 ? 'Habilitado' : 'Deshabilitado' }}</p>
                <h4>Tarifa:</h4>
                <p>{{ item.tarifa }}</p>
                <h4>Ubicacion:</h4>
                <p>{{ item.direccion }}</p>
                <h4>Servicios:</h4>
                <p v-if="item.servicios.length > 0">
                  {{ item.servicios.map(servicio => servicio.nombre).join(', ') }}
                </p>
                <p v-if="item.servicios.length == 0"> NO EXISTEN SERVICIOS</p> 
                <a href="#">Detalles <font-awesome-icon :icon="['fas', 'arrow-right']" /></a>
              </div>
            </div>
          </div>
          <div v-if="displayedItems.length == 0">
            <h3>NO EXISTEN SALONES</h3>
          </div> 

        </div>
        <v-pagination
            v-model="currentPage"
            :length="totalPages"
         ></v-pagination>
    </div>
</template>

<script>
import NavbarDueño from '@/views/navbarDueño.vue';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import FiltroServicios from '../components/filtroServicios.vue';


export default {
name: 'listaSalonesDueñoComponent',
components: {
    NavbarDueño,
    FiltroServicios,
},
data() { 
    return {
        salonesListaDueño: [],
        salonesFiltrados: [],
        startIndex: 0,
        itemsPerPage: 3,
        searchTerm: localStorage.getItem('searchTermSalonesDueño') || '',
        tamañoAux: 0,

        currentPage: 1,
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
    axios.get('http://localhost:8080/v1/salon/listado', config)
      .then(response => {
        this.salonesListaDueño = response.data;
        this.salonesFiltrados = this.salonesListaDueño;

        const serviciosSeleccionados = JSON.parse(localStorage.getItem('serviciosSeleccionados')) || [];
        this.filtrarSalones(serviciosSeleccionados);
      })
      .catch(error => console.error('Error al obtener datos de la API:', error));

      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },
    beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
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

      const filteredList = this.salonesFiltrados.filter(item => {
        const estadoText = item.estado === 1 ? 'Habilitado' : 'Deshabilitado';
        const values = Object.values(item);
        return (
          values.some(value => String(value).toLowerCase().includes(searchTerm)) ||
          estadoText.toLowerCase().includes(searchTerm) 
        );
      });
      this.tamañoAux = filteredList.length;
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      
      return filteredList.slice(startIndex, endIndex);
    },
    },
    methods: {
    mostrarImagen(index) {
    return index >= this.startIndex && index < this.startIndex + this.itemsPerPage;
    },
    irASalon(id) {
      this.$router.push({ name: 'salon', params: { id: id } });
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    cambiarOrden(direccion) {
      this.orden = direccion;
     
      this.salonesFiltrados.sort((a, b) => {
        const orderFactor = direccion === 'mas' ? 1 : -1;
        this.ordenAux = direccion;
        return orderFactor * (a.nombre.toLowerCase() > b.nombre.toLowerCase() ? 1 : -1);
      });
    },
    filtrarSalones(serviciosSeleccionados) {
      if (serviciosSeleccionados.length > 0) {
        this.salonesFiltrados = this.salonesListaDueño.filter(salon => {
          return serviciosSeleccionados.every(servicio => {
            return salon.servicios.some(s => s.nombre === servicio);
          });
        });
        this.currentPage = 1;
      } else {
        this.salonesFiltrados = this.salonesListaDueño;
      }
      this.cambiarOrden(this.ordenAux);
    },
    handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1020) {
        this.itemsPerPage = 3;
      } else if (windowWidth >= 500) {
        this.itemsPerPage = 2;
      } else {
        this.itemsPerPage = 1;
      }
      this.currentPage = 1;
    },
    },
    watch: {
    searchTerm(newSearchTerm) {
      localStorage.setItem('searchTermSalonesDueño', newSearchTerm);
    }
  }
}
</script>

<style>
.content_salonesDueño{
  background-color: white;
  height: 100%;
}

.content_salonesDueño h1{
  padding-top: 30px;
  color: rgb(0, 0, 0);
}

.content_salonesDueño h3{
  padding-top: 30px;
  color: rgb(0, 0, 0);
}

/*ESTILOS GRID SALONES */
.dueño_gridSalones{
    padding: 20px 30px 40px 80px;
    margin: 0px 20px 0px 20px;
  
  }
  
.dueño_gridSalones .grid-containerSalonesDueño {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px;
  place-items: center;
  justify-content: center;
  align-items: center;
}

.dueño_gridSalones .grid__itemSalon{
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  border-radius: 10px;
  width: 30vw; 
  height: 700px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .5);
}

.dueño_gridSalones .grid__itemSalon h2{
  color: rgb(255, 255, 255); 
  position: absolute;
  font-size: 2.5vw;
}

.dueño_gridSalones .grid__itemSalon h4{    
  font-size: 1vw;
  text-align: start;
}

.dueño_gridSalones .grid__itemSalon p{
  overflow: auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  -webkit-line-clamp: 4;
  font-size: 1vw;
  text-align: justify;
  margin-bottom: 10px;
}

.dueño_gridSalones .grid__itemSalon .text-titleSalon{
  flex: 0.8;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.dueño_gridSalones .grid__itemSalon .text-titleSalon::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; 
}

.dueño_gridSalones .grid__itemSalon .text-titleSalon img{
  width: 100%;
  height: 100%;
  object-fit: cover; 
  position: relative;
  filter: blur(1px) brightness(0.3); 
}

.dueño_gridSalones .grid__itemSalon .text-titleSalon h2{
  z-index: 2;
}

.dueño_gridSalones .text-detailSalones a{
  text-decoration: none;
  color: #000000;
  font-style: italic;
  font-size: 15px;
  transition: 0.3s ease;
  margin-top: auto;
}

.dueño_gridSalones .text-detailSalones a:hover{
  color: #686868;
}


.dueño_gridSalones .text-detailSalones {
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  flex: 1;
  overflow: hidden;
  background: rgb(222, 222, 222); 
  color: #000000;
  text-align: end;
  padding: 20px;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.boton_crearSalonDueño{
  margin-top: 10px;
  margin-left: 60px;
  display: flex;
}

.boton_crearSalonDueño a{
 padding: 10px;
 width: 200px;
 height: 35px;
 border: none;
 border-radius: 5px;
 cursor: pointer;
 font-size: 14px;
 text-decoration: none;
}

.boton_crearSalonDueño #crear{
  background-color: rgb(1, 85, 180);
  color: rgb(255, 255, 255);  
  border: 2px solid rgb(1, 85, 180); 
  transition: 0.3s ease;   
}

.boton_crearSalonDueño #crear:hover {
  background-color: transparent;
  color: #000000;
}

.search_listaSolicitud{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0px 100px 0px 100px;
  margin-top: 20px;
}

.search_listaSolicitud .search-container input{
  width: 100%;
  padding: 10px;
  color: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 10px;
}

.content_salonesDueño .v-pagination{
  color: rgb(0, 0, 0);
  margin-bottom: 10px;
}

@media  screen and (max-width: 1200px) {
  .dueño_gridSalones .grid__itemSalon p{
    font-size: 1.5vw;
  }
  .dueño_gridSalones .grid__itemSalon h4{
    font-size: 1.5vw;
  }
  .dueño_gridSalones .grid__itemSalon h2{
    font-size: 3vw;
  }
}

@media  screen and (max-width: 1020px) {
  .dueño_gridSalones .grid-containerSalonesDueño {
    grid-template-columns: repeat(2, 1fr); 
  }
  .content_salonesDueño .v-pagination{
    margin-left: 50px;
  }
  .dueño_gridSalones .grid__itemSalon{
    width: 40vw; 

  }
  .dueño_gridSalones .grid__itemSalon p{
    font-size: 2vw;
  }
  .dueño_gridSalones .grid__itemSalon h4{
    font-size: 2vw;
  }
}

@media  screen and (max-width: 770px) {
  .content_salonesDueño .v-pagination{
    margin-left: 60px;
  }
}

@media  screen and (max-width: 700px) {
  .search_listaSolicitud{
    justify-content: center;
    margin: 0px 10px 0px 60px;
    margin-top: 20px;
  }
  .dueño_gridSalones .grid__itemSalon p{
    font-size: 2.5vw;
  }
  .dueño_gridSalones .grid__itemSalon h4{
    font-size: 2.5vw;
  }
}

@media  screen and (max-width: 500px) {
  .dueño_gridSalones .grid-containerSalonesDueño {
    grid-template-columns: repeat(1, 1fr); 
  }
  .content_salonesDueño h1{
    font-size: 30px;
    margin-left: 55px;
  }
  .dueño_gridSalones .grid__itemSalon{
    width: 80vw; 

  }
  .dueño_gridSalones .grid__itemSalon h2{
    font-size: 5vw;
  }
  .dueño_gridSalones .grid__itemSalon p{
    font-size: 4vw;
  }
  .dueño_gridSalones .grid__itemSalon h4{
    font-size: 4vw;
  }
}

@media  screen and (max-width: 400px) {
  .dueño_gridSalones .grid__itemSalon{
    height: 70vh;
  }
}

@media  screen and (max-width: 400px) {
  .selector_owner{
    margin-left: 55px;
  }
}

</style>