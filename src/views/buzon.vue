<template>
   <header>
      <NavbarCliente/>
    </header>
    <div class="buzon_list">
      <div class="header_buzon">
          <div class="buzon_title">
            BUZON DE RESPUESTAS
          </div>

          <div class="search_buzon">
            <div class="search-container">
              <input v-model="searchTerm" placeholder="Buscar..." />
             </div>
             <div class="filtro-container" :class="{ 'filtro-abierto': mostrarFiltroSR }">
                <FiltroEstadoSR @filtroCambiado="filtrarSR" />
              </div>
          </div>
          
    </div>
    <div class="buzon_grid">
          <div class="grid-container">
            <div class="grid__item" v-for="(item, index) in displayedItems" :key="index" v-show="mostrarImagen(index)" @click="irACalificación(item.id)">
              <img :src="item.salon.banner_url" alt="">
              <div class="text-overlay">
                <h2>{{ item.salon.nombre }}</h2>
                <p><h4>RESERVA: </h4>{{ item.fecha_reserva }}</p>
                <p><h4>servicios: </h4>{{ item.servicio }}</p>
                <p><h4>ESTADO: </h4>{{ item.tipoSR.nombre }}</p>
                <p><h4>DETALLE: </h4>{{ item.detalle }}</p>
                <a href="#">Detalles <font-awesome-icon :icon="['fas', 'arrow-right']" /></a>
              </div>
            </div>
          </div>
          <div v-if="displayedItems.length == 0">
            <h3>NO EXISTEN SOLICITUDES</h3>
          </div> 
          <div class="buzon_botones">
            <button id="anterior" @click="paginaAnterior" :disabled="startIndex === 0">Anterior</button>
            <div id="numeros-pagina">
              <span v-for="pagina in paginas" :key="pagina" @click="irAPagina(pagina)" class="numero-pagina">{{ pagina }}</span>
            </div>
            <button id="siguiente" @click="paginaSiguiente" :disabled="startIndex >= displayedItems.length - imagesPerPage">Siguiente</button>
          </div>
    </div>
    </div>
    
</template>
  
<script>

import NavbarCliente from '@/views/navbarCliente.vue'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import FiltroEstadoSR from '../components/filtroEstadoSR.vue';

    export default {
    name: 'buzonComponent',
    components: {
      NavbarCliente,
      FiltroEstadoSR,
    },
    
    data() { 
    return {
        buzon: [],
        buzonFiltrado: [],
        startIndex: 0,
        imagesPerPage: 10,
        searchTerm: localStorage.getItem('searchTermBuzon') || '',
        tamañoAux: 0,
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
    axios.get('http://localhost:8080/v1/solicitud-reserva/buzon', config)
      .then(response => {
        this.buzon = response.data;
        const estadosSeleccionados = JSON.parse(localStorage.getItem('SREstadoSeleccionado')) || [];
        this.filtrarSR(estadosSeleccionados);
        console.log(this.buzon);
      })
      .catch(error => console.error('Error al obtener datos de la API:', error));
      window.addEventListener('resize', this.handleResize);
    
       this.handleResize();
  },
    computed: {
    paginas() {
    return Array.from({ length: Math.ceil(this.displayedItems.length / this.imagesPerPage) }, (_, i) => i + 1);

    },
    displayedItems() {
      const searchTerm = this.searchTerm.toLowerCase();
      if (searchTerm !== this.lastSearchTerm) {
        this.irAPagina(1);
      }

      const filteredList = this.buzonFiltrado.filter(item => {
        const estado = item.tipoSR.nombre;
        const salon = item.salon.nombre;
        const values = Object.values(item);
        return (
          values.some(value => String(value).toLowerCase().includes(searchTerm)) ||
          estado.toLowerCase().includes(searchTerm) ||
          salon.toLowerCase().includes(searchTerm)

        );
      });
      this.tamañoAux = filteredList.length;
     
      return filteredList;
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
    irACalificación(id) {
    // Redirige a la página de calificacion
      this.$router.push({ name: 'detalle-buzon', params: { id: id } });
    },
    filtrarSR(estadosSeleccionados) {
      if (estadosSeleccionados.length > 0) {
        this.buzonFiltrado = this.buzon.filter(sr => {
          return sr.tipoSR && estadosSeleccionados.some(estado => {        
            return sr.tipoSR.nombre === estado;
          });
        });
        this.irAPagina(1);
      } else {
        this.buzonFiltrado = this.buzon;
      }
    },
    handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1040) {
        this.imagesPerPage = 10;
      } else if (windowWidth >= 700) {
        this.imagesPerPage = 9;
      } else if (windowWidth >= 580) {
        this.imagesPerPage = 6;
      } else if (windowWidth >= 430) {
        this.imagesPerPage = 4;
      } else {
        this.imagesPerPage = 6;
      }
    },
    },
    watch: {
    searchTerm(newSearchTerm) {
      localStorage.setItem('searchTermBuzon', newSearchTerm);
    }
  }
    }

</script>
  
<style>
 

.header_buzon{
    display: flex;
    flex-direction: column;
   
    
}

.search_buzon{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0px 100px 0px 100px;
    margin-top: 20px;
}
.search_buzon .search-container input{
    width: 100%;
    padding: 10px;
    border: 2px solid #000000;
    border-radius: 10px;
}
.search-container {
    display: flex;
    
}
.filtro-container{
  margin-top: 10px;
}




/*GRID DE BUZON*/

  .buzon_list{
    background-color: white;
    width: 100%;
    margin-top: 80px;
    padding-bottom: 40px;
    height: 100%;

  }

  .buzon_grid{
    margin: 0px 20px 0px 20px;
    
  }
  
  .buzon_grid .grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr); 
    gap: 10px;
    background-color: transparent;
    place-items: center;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  .buzon_grid .grid__item{ 
    position: relative; 
    display: inline-block;
    overflow: hidden;
    height: auto;
    cursor: pointer;
    border-radius: 10px;
    width: 18vw; 
    height: 25vw;
  }
  
  .buzon_grid .grid__item h2{
    color: rgb(255, 255, 255); 
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    font-size: 1vw;
  }
  
  
  .buzon_grid .grid__item p{
   
    padding:  0px;
    margin-top: 10px;
    font-size: 1vw;
    text-align: justify;
    margin-bottom: 10px;
    overflow: auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
  }
  .buzon_grid .grid-container img{
    width: 100%;
    height: 100%;
    object-fit: cover;

  }
  
  .buzon_grid .grid__item a{
    text-decoration: none;
    color: #ffffff;
    font-style: italic;
    font-size: 1vw;
    transition: 0.3s ease;
 }

 .buzon_grid .grid__item a:hover{
    
    color: #686868;
   
 }

  
 .buzon_grid .text-overlay {
   
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
    background: rgba(0, 0, 0, 0.7); /* Fondo semitransparente para mayor legibilidad */
    color: #fff;
    text-align: end;
    padding: 20px;
  
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    max-width: 100%;
  }
  
  
  
  
  .buzon_title{
    color: rgb(0, 0, 0);
    display: flex;
    padding-top: 50px;
    justify-content: center;
    font-size: 2vw;
  }
  
  .buzon_botones{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    justify-content: end; /* Distribuye los elementos al principio y al final del contenedor */
   
    
  }
  
  .buzon_botones #numeros-pagina{
   
    
    padding-left: 5px;
    padding-right: 5px;
    color: white;
    cursor: pointer;
    margin-top: 6px;
  }
  
  .buzon_botones #anterior {
    background-color: transparent;
    color: rgb(0, 0, 0);
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  .buzon_botones #siguiente {
    background-color: transparent;
    color: rgb(0, 0, 0);
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  .buzon_botones .numero-pagina {
    margin-right: 5px; 
    
    background-color: transparent;
    color: rgb(0, 0, 0);
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  
  .buzon_botones #anterior:hover {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    
  }
  
 .buzon_botones #siguiente:hover {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
  }
  
  .buzon_botones .numero-pagina:hover {
  
    
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
  
  }
  
  @media  screen and (max-width: 1040px) {
    .buzon_list{
    margin-top: 70px;
    }
  .buzon_grid .grid-container {
    grid-template-columns: repeat(3, 1fr); 

  }
  .buzon_grid .grid__item{
    width: 30vw; 
    height: 25vw;
  }
  .buzon_title{
    font-size: 20px;
  }
  .buzon_grid .grid__item h2{
    font-size: 2vw;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .buzon_grid .grid__item p{
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
  @media  screen and (max-width: 700px) {
  .buzon_grid .grid-container {
      grid-template-columns: repeat(2, 1fr); 

    }
  .buzon_grid .grid__item{
      width: 45vw; 
      height: 30vw;
    }
    .search_buzon{
      justify-content: center;
      margin: 0px 10px 0px 10px;
      margin-top: 20px;
    }
    .buzon_grid .grid__item h2{
      font-size: 2.3vw;
    }
    .buzon_grid .grid__item p{
      font-size: 1.3vw;
    }
    .buzon_grid .text-overlay{
      padding: 10px 20px 20px 20px;
    }
    .buzon_grid .grid__item a{
      font-size: 1.3vw;

    }
  }
  @media  screen and (max-width: 580px) {
  .buzon_grid .grid-container {
      grid-template-columns: repeat(1, 1fr); 

    }
  .buzon_grid .grid__item{
      width: 80vw; 
      height: 30vw;
    }
    .buzon_grid .grid__item h2{
      font-size: 2.8vw;
    }
    .buzon_grid .grid__item p{
      font-size: 1.3vw;
    }
    .buzon_grid .grid__item a{
      font-size: 1.3vw;

    }
    .buzon_grid .grid__item p{
    -webkit-line-clamp: 2;
    }
    .buzon_grid .grid__item p{
      margin-top: 2px;
      margin-bottom: 2px;
    }
    .buzon_grid .text-overlay{
      padding: 10px 20px 10px 20px;
    }
  }
  @media  screen and (max-width: 340px) {
    .buzon_grid .grid__item{
      height: 40vw;
    }
  }

</style>
  