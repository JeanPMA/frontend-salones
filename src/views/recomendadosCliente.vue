<template>
    <header>
      <NavbarCliente/>
    </header>
    <div class="salonesRecomendados_list">
        <div class="salonesRecomendados_title">
            SALONES MAS RECOMENDADOS
        </div>
        <div class="filtro-container" :class="{ 'filtro-abierto': mostrarFiltro }">

          <FiltroServicios @filtroCambiado="filtrarSalones" />
          
        </div>
    
        <div class="salonesRecomendados_grid">
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
 import NavbarCliente from '@/views/navbarCliente.vue';
 import axios from 'axios';
import jwt_decode from 'jwt-decode';
import FiltroServicios from '../components/filtroServicios.vue';


    export default {
    name: 'recomendadosClienteComponent',
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
          salonesRecomendados: [],
          salonesFiltrados: [],
          startIndex: 0,
          itemsPerPage: 9,

          currentPage: 1,
          tamañoAux: 0,
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
    axios.get('http://localhost:8080/v1/salon/auth/recomendado', config)
      .then(response => {
        this.salonesRecomendados = response.data;
        this.salonesFiltrados = this.salonesRecomendados;
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
    filtrarSalones(serviciosSeleccionados) {
      if (serviciosSeleccionados.length > 0) {
        this.salonesFiltrados = this.salonesRecomendados.filter(salon => {
          return serviciosSeleccionados.every(servicio => {
            return salon.servicios.some(s => s.nombre === servicio);
          });
        });
        this.irAPagina(1);
      } else {
        this.salonesFiltrados = this.salonesRecomendados;
      }
    },
    handleResize() {
      const windowWidth = window.innerWidth;
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
.salonesRecomendados_list{
    background-color: white;
    width: 100%;
    margin-top: 80px;
    height: 100%;
    padding-bottom: 40px;
  }
  
  .salonesRecomendados_grid{
    margin: 0px 20px 0px 20px;
  }
  
  
  .salonesRecomendados_grid .grid-container img{
    width: 100%;
    height: 100%;
  }
  
.salonesRecomendados_list .filtro-container {
  margin-left: 100px;
}

  .salonesRecomendados_title{
    color: rgb(0, 0, 0);
    display: flex;
    padding-top: 50px;
    justify-content: center;
    font-size: 2vw;
  }

  
  .salonesRecomendados_filter{
      text-align: start;
      cursor: pointer;
      margin-left: 100px;
  }

  .salonesRecomendados_list .v-pagination{
    color: rgb(0, 0, 0);
  }

  @media  screen and (max-width: 1000px) {
    .salonesRecomendados_title{
      font-size: 20px;
    }
  }
  @media  screen and (max-width: 900px) {
    .text-overlay{
      padding: 10px 20px 20px 20px;
    }
  }
  @media  screen and (max-width: 700px) {

    .salonesRecomendados_list{
      margin-top: 70px;
     }
  }
</style>