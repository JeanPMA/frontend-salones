<template>
    <header>
      <NavbarCliente/>
    </header>

      <div class="salones_list">
        <div class="salones_title">
          SALONES
        </div>
        <div class="filtro-container" :class="{ 'filtro-abierto': mostrarFiltro }">

        <FiltroServicios @filtroCambiado="filtrarSalones" />

        <div class="salones_grid">
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
              <span v-for="pagina in paginas" :key="pagina" @click="irAPagina(pagina)" :class="{ 'numero-pagina': !isNaN(pagina), 'no-clickeable': isNaN(pagina) }">{{ isNaN(pagina) ? '...' : pagina }}</span>
            </div>
            <button id="siguiente" @click="paginaSiguiente" :disabled="startIndex >= salonesFiltrados.length - imagesPerPage">Siguiente</button>
          </div>
        </div>
      
        </div>
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
    axios.get('http://localhost:8080/v1/salon/auth/all', config)
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
  computed: {
    totalPaginas() {
      return Math.ceil(this.salonesFiltrados.length / this.imagesPerPage);
    },
    paginas() {
      const paginaActual = Math.ceil((this.startIndex + 1) / this.imagesPerPage);
      const paginas = [];

      if (paginaActual > 3) {
        paginas.push('...');
      }

      let inicio = Math.max(1, paginaActual - 1);
      let fin = Math.min(inicio + 2, this.totalPaginas);

      while (inicio <= fin) {
        paginas.push(inicio);
        inicio++;
      }

      if (fin < this.totalPaginas - 1) {
        paginas.push('...');
        paginas.push(this.totalPaginas);
      }

      return paginas;
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
      if (this.startIndex > 0) {
        this.startIndex -= this.imagesPerPage;
      }
    },
    paginaSiguiente() {
      if (this.startIndex + this.imagesPerPage < this.salonesFiltrados.length) {
        this.startIndex += this.imagesPerPage;
      }
    },
    irAPagina(pagina) {
      if (!isNaN(pagina)) {
        this.startIndex = (pagina - 1) * this.imagesPerPage;
      }
      
    },
    irADetalleSalon(id) {
      this.$router.push({ name: 'detalle-salon', params: { id: id } });
    },
    filtrarSalones(serviciosSeleccionados) {
      if (serviciosSeleccionados.length > 0) {
        this.salonesFiltrados = this.salones.filter(salon => {
          return serviciosSeleccionados.every(servicio => {
            return salon.servicios.some(s => s.nombre === servicio);
          });
        });
        this.irAPagina(1);
      } else {
        this.salonesFiltrados = this.salones;
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
.salones_list{
    background-color: #646464;
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
    
    background: rgba(0, 0, 0, 0.5); /* Fondo semitransparente para mayor legibilidad */
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
    color: white;
    display: flex;
    padding-top: 50px;
    justify-content: center;
    font-size: 2vw;
  }
  
  .salones_botones{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    justify-content: end; /* Distribuye los elementos al principio y al final del contenedor */
   
    
  }
  
  .salones_botones #numeros-pagina{
   
    
    padding-left: 5px;
    padding-right: 5px;
    color: white;
    cursor: pointer;
    margin-top: 6px;
  }
  
  #anterior {
    background-color: transparent;
    color: white;
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  #siguiente {
    background-color: transparent;
    color: white;
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  .numero-pagina {
    margin-right: 5px; 
    
    background-color: transparent;
    color: white;
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  
  #anterior:hover {
    background-color: white;
    color: rgb(0, 0, 0);
    
  }
  
  #siguiente:hover {
    background-color: white;
    color: rgb(0, 0, 0);
  }
  
  .numero-pagina:hover {
  
    
    background-color: white;
    color: rgb(0, 0, 0);
  
  }

.filtro-container {
  transition: margin-left 0.5s; 
}

.filtro-abierto {
  margin-left: 200px; 
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
</style>