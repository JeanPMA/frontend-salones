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
          
        
    
        <div class="salonesRecomendados_grid">
          <div class="grid-container">
            <div class="grid__item" v-for="(item, index) in salonesFiltrados" :key="index" v-show="mostrarImagen(index)" @click="irADetalleSalon(item.id)">
              <img :src="item.banner_url" alt="">
              <div class="text-overlay">
                <h2>{{ item.nombre }}</h2>
                <p><h4>DIRECCION: </h4>{{ item.direccion }}</p>
                <p><h4>CAPACIDAD: </h4>{{ item.capacidad }}</p>
                <p><h4>DESCRIPCION: </h4>{{ item.descripcion }}</p>
              </div>
            </div>
          </div>
          <div v-if="salonesFiltrados.length == 0">
            <h3>NO EXISTEN SALONES</h3>
          </div> 
          <div class="salones_botones">
            <button id="anterior" @click="paginaAnterior" :disabled="startIndex === 0">Anterior</button>
            <div id="numeros-pagina">
              <span v-for="pagina in paginas" :key="pagina" @click="irAPagina(pagina)" class="numero-pagina">{{ pagina }}</span>
            </div>
            <button id="siguiente" @click="paginaSiguiente" :disabled="startIndex >= salonesFiltrados.length - imagesPerPage">Siguiente</button>
          </div>
        </div>
      
        </div>
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
          imagesPerPage: 9,
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
        console.log(this.salonesRecomendados);
        const serviciosSeleccionados = JSON.parse(localStorage.getItem('serviciosSeleccionados')) || [];
        this.filtrarSalones(serviciosSeleccionados);
      })
      .catch(error => console.error('Error al obtener datos de la API:', error));
      window.addEventListener('resize', this.handleResize);
    
       this.handleResize();
  },
    computed: {
    paginas() {
    return Array.from({ length: Math.ceil(this.salonesFiltrados.length / this.imagesPerPage) }, (_, i) => i + 1);

    },
    },
    methods: {
    mostrarImagen(index) {
    return index >= this.startIndex && index < this.startIndex + this.imagesPerPage;
    },
    actualizarNumerosPagina(pagina) {
    this.startIndex = (pagina - 1) * this.imagesPerPage;
    },
    paginaAnterior() {
    this.startIndex -= this.imagesPerPage;
    
    },
    paginaSiguiente() {
    this.startIndex += this.imagesPerPage;
    
    },
    irAPagina(pagina) {
    this.actualizarNumerosPagina(pagina);
    
    },
    irADetalleSalon(id) {
    // Redirige a la página de detalle del salón
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
        this.imagesPerPage = 9;
      } else if (windowWidth >= 700) {
        this.imagesPerPage = 8; // o el valor que desees para esta condición
      } else {
        this.imagesPerPage = 6;
      }
    },
    },
    }



</script>

<style>

  
  /*GRID DE SALONES*/
.salonesRecomendados_list{
    background-color: #646464;
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
  
  

  
  .salonesRecomendados_title{
    color: white;
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