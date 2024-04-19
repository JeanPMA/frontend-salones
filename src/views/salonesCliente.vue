<template>
    <header>
      <NavbarCliente/>
    </header>

      <div class="salones_list">
        <div class="salones_title">
          SALONES
        </div>
        <div class="selector_orden" @click="toggleDropdown">
          <div class="opciones_selector">{{ orden === 'mas' ? 'Mas recientes' : 'Mas antiguos' }}</div>
          <div v-show="dropdownVisible" class="dropdown_selector">
            <div class="option" @click="cambiarOrden('mas')">Mas recientes</div>
            <div class="option" @click="cambiarOrden('menos')">Mas antiguos</div>
          </div>
        </div>
        <div class="filtro-container" :class="{ 'filtro-abierto': mostrarFiltro }">
          <FiltroServicios @filtroCambiado="filtrarSalones" />
        </div>
        <div class="salones_grid">
          <div class="grid-container">
            <div class="grid__item" v-for="(item, index) in displayedItems" :key="index" v-show="mostrarImagen(index)" @click="irADetalleSalon(item.id)">
              <img :src="item.banner_url" alt="">
              <div class="text-overlay">
                <h2>{{ item.nombre }}</h2>
                <p><h4>DIRECCION: </h4>{{ item.direccion }}</p>
                <p><h4>CAPACIDAD: </h4>{{ item.capacidad }}</p>
                <p><h4>DESCRIPCION: </h4>{{ item.descripcion }}</p>
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
  import NavbarCliente from '@/views/navbarCliente.vue'
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import jwt_decode from 'jwt-decode';
  import FiltroServicios from '../components/filtroServicios.vue';


  const router = useRouter();
  export default {
    name: 'salonesClienteComponent',
    components: {
      NavbarCliente,
      FiltroServicios,
  },
    methods: {
    ejecutar() {
      
      
    },
    },
    data() { 
    return {
      salones: [],
      salonesFiltrados: [],
      startIndex: 0,
      itemsPerPage: 9,

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
    const config = {
    headers: {
      Authorization:  `Bearer ${token}`,
      'X-User-Role': userRole
    }
    };
    const apiUrl = process.env.VUE_APP_BASE_URL;
    axios.get(`${apiUrl}/v1/salon/auth/all`, config)
      .then(response => {
        this.salones = response.data;
        this.salonesFiltrados = this.salones;

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


      const filteredList = this.salonesFiltrados;
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.tamañoAux = filteredList.length;
     
      return filteredList.slice(startIndex, endIndex);
    },
  },
  methods: {
    mostrarImagen(index) {
      return index >= this.startIndex && index < this.startIndex + this.itemsPerPage;
    },

    irADetalleSalon(id) {
      this.$router.push({ name: 'detalle-salon', params: { id: id } });
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    cambiarOrden(direccion) {
      this.orden = direccion;
     
      this.salonesFiltrados.sort((a, b) => {
        const orderFactor = direccion === 'mas' ? 1 : -1;
        this.ordenAux = direccion;
        return orderFactor * (a.created_at.toLowerCase() < b.created_at.toLowerCase() ? 1 : -1);
      });
    },
    filtrarSalones(serviciosSeleccionados) {
      if (serviciosSeleccionados.length > 0) {
        this.salonesFiltrados = this.salones.filter(salon => {
          return serviciosSeleccionados.every(servicio => {
            return salon.servicios.some(s => s.nombre === servicio);
          });
        });
        this.currentPage = 1;
      } else {
        this.salonesFiltrados = this.salones;
      }
      this.cambiarOrden(this.ordenAux);
    },
    handleResize() {
      const windowWidth = window.innerWidth;
      this.currentPage = 1;
      if (windowWidth >= 1000) {
        this.itemsPerPage = 9;
      } else if (windowWidth >= 700) {
        this.itemsPerPage = 8; 
      } else {
        this.itemsPerPage = 6;
      }
      this.currentPage = 1;
    },
  },
    }
   

  
</script>

<style>


  
  /*GRID DE SALONES*/
.salones_list{
    background-color: white;
    width: 100%;
    margin-top: 80px;
    height: 100%;
    padding-bottom: 40px;
  }
  
.salones_grid{
  margin: 0px 20px 0px 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 10px;
  background-color: transparent;
  place-items: center;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.grid__item{  
  position: relative;
  display: inline-block;
  overflow: hidden;
  height: auto;
  cursor: pointer;
  border-radius: 10px;
  width: 30vw; 
  height: 20vw;
  border: 1px solid #000000;
}

.grid__item h2{
  color: rgb(255, 255, 255); 
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  font-size: 2vw;
}

.grid__item p{
  padding:  0px;
  margin-top: 10px;
  font-size: 1vw;
  text-align: justify;
  overflow: auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
}

.salones_grid .grid-container img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.salones_grid .text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  color: #fff;
  text-align: center;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  max-width: 100%;
}

.grid__item:hover .text-overlay {
  opacity: 1;
}

.salones_title{
  color: rgb(0, 0, 0);
  display: flex;
  padding-top: 50px;
  justify-content: center;
  font-size: 2vw;
}

.salones_list .filtro-container {
  margin-left: 100px;
}

.filtro-abierto {
  margin-left: 200px; 
}

.salones_list .v-pagination{
  color: rgb(0, 0, 0);
}

.selector_orden {
  position: relative;
  width: 200px; 
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 100px;
}

.opciones_selector {
  padding: 8px 12px;
  overflow: auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
}

.dropdown_selector {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.option {
  padding: 8px 12px;
  cursor: pointer;
}

.option:hover {
  background-color: #f0f0f0;
}
.grid__item p{
  padding:  0px;
  margin-top: 10px;
  font-size: 1vw;
  text-align: justify;
 
}

@media  screen and (max-width: 1000px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr); 

  }
  
  .grid__item{
    width: 45vw; 
    height: 18vw;
  }

  .salones_grid .text-overlay{
    padding: 10px 20px 20px 20px;
  }

  .salones_title{
    font-size: 20px;
  }

  .grid__item h2{
    padding-top: 0px;
    padding-bottom: 0px;
  }
}

@media  screen and (max-width: 740px) {
  .salones_list .filtro-container {
    margin-left: 0px;
  }
}

@media  screen and (max-width: 700px) {
  .grid-container {
    grid-template-columns: repeat(1, 1fr); 

  }

  .grid__item{
    width: 80vw; 
    height: 30vw;
  }

  .salones_list{
    margin-top: 70px;
  }
  
  .grid__item h2{
    font-size: 3vw;
    padding-top: 5px;
  }

  .grid__item p{
    font-size: 2vw;
  }
}

@media  screen and (max-width: 640px) {
  .grid__item h2{
    font-size: 3vw;
  }
  
  .grid__item p{
    font-size: 1.5vw;
    margin-top: 5px;
  }
}

@media  screen and (max-width: 380px) {
  .selector_orden {
    margin-left: 10px;
    margin-right: 10px;
    width: auto;
  }
}
</style>