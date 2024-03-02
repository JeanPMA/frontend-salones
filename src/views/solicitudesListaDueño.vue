<template>
    <NavbarDueño style="z-index: 1000;"/>
    <div class="content_solicitudesDueño">
        <h1>
        LISTA DE SOLICITUDES DE RESERVA
        </h1>
    <div class="search_listaSolicitud">
            <div class="search-container">
              <input v-model="searchTerm" placeholder="Buscar..." />
             </div>
              <div class="filtro-container" :class="{ 'filtro-abierto': mostrarFiltroSR }">
                <FiltroEstadoSR @filtroCambiado="filtrarSR" />
              </div>
    </div> 
    <div class="dueño_gridSolicitudes">
          <div class="grid-containerDueño">
            <div class="grid__itemSolicitud" v-for="(item, index) in displayedItems" :key="index" v-show="mostrarImagen(index)" @click="irADetalleSR(item.id)">
                <div class="text-title">
                    <h2>{{ item.salon.nombre }}</h2>
                    
                    <img :src="item.salon.banner_url" alt="">
                   
                </div>
              
              <div class="text-detailSolicitudes">
                <h4>Detalle:</h4>
                <p>{{ item.detalle }}</p>
                <h4>Estado:</h4>
                <p>{{ item.tipoSR.nombre }}</p>
                <h4>Fecha Reserva:</h4>
                <p>{{ item.fecha_reserva }}</p>
                <h4>Motivo:</h4>
                <p>{{ item.motivo }}</p>
                <a href="#">Detalles <font-awesome-icon :icon="['fas', 'arrow-right']" /></a>
              </div>
            </div>
          </div>
          <div v-if="displayedItems.length == 0">
            <h3>NO EXISTEN SOLICITUDES</h3>
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
import FiltroEstadoSR from '../components/filtroEstadoSR.vue';


export default {
name: 'listaSolicitudesDueñoComponent',
components: {
    NavbarDueño,
    FiltroEstadoSR,
},
    data() { 
    return {
        listaSolicitudes: [],
        listaSolicitudesFiltrado: [],
        startIndex: 0,
        itemsPerPage: 10,
        searchTerm: localStorage.getItem('searchTermSolicitudDueño') || '',
        tamañoAux: 0,

        currentPage: 1,
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
        },
        params: {
                    username: username,
                  },
    };
    axios.get('http://localhost:8080/v1/solicitud-reserva/salon/solicitudes', config)
      .then(response => {
        this.listaSolicitudes = response.data;
        const estadosSeleccionados = JSON.parse(localStorage.getItem('SREstadoSeleccionado')) || [];
        this.filtrarSR(estadosSeleccionados);
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

      const filteredList = this.listaSolicitudesFiltrado.filter(item => {
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
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      return filteredList.slice(startIndex, endIndex);
    },
    },
    methods: {
    mostrarImagen(index) {
    return index >= this.startIndex && index < this.startIndex + this.itemsPerPage;
    },
    irADetalleSR(id) {
    // Redirige a la página de calificacion
      this.$router.push({ name: 'solicitud-reserva', params: { id: id }});
    },
    filtrarSR(estadosSeleccionados) {
      const estadosFiltrar = estadosSeleccionados.includes("ACEPTADO") || estadosSeleccionados.includes("CANCELADO")
        ? estadosSeleccionados.filter(estado => estado !== "ACEPTADO" && estado !== "CANCELADO")
        : estadosSeleccionados;

      if (estadosFiltrar.length > 0) {
        this.listaSolicitudesFiltrado = this.listaSolicitudes.filter(sr => {
          return sr.tipoSR && estadosFiltrar.includes(sr.tipoSR.nombre);
        });
        this.currentPage = 1;
      } else {
        this.listaSolicitudesFiltrado = this.listaSolicitudes;
      }
    },
    handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1100) {
        this.itemsPerPage = 10;
      } else if (windowWidth >= 860) {
        this.itemsPerPage = 8;
      } else if (windowWidth >= 600) {
        this.itemsPerPage = 4;
      } else {
        this.itemsPerPage = 3;
      }
      this.currentPage = 1;
    },
    },
    watch: {
    searchTerm(newSearchTerm) {
      localStorage.setItem('searchTermSolicitudDueño', newSearchTerm);
    }
  }
}
</script>

<style>
.content_solicitudesDueño{
  background-color: #646464;
}
.content_solicitudesDueño h1{
    padding-top: 30px;
    color: white;
}
.search_listaSolicitud{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0px 100px 0px 100px;
    margin-top: 20px;
}

.content_solicitudesDueño .filtro-container a{
  color: rgb(255, 255, 255);
}

.content_solicitudesDueño .filtro-container span{
  color: rgb(255, 255, 255);
}
.content_solicitudesDueño .filtro-container label{
  color: rgb(255, 255, 255);
}

/*ESTILOS GRID SOLICITUDES */
.dueño_gridSolicitudes{
    padding: 20px 50px 50px 50px;
    margin: 0px 20px 0px 20px;
  
  }
  
  .dueño_gridSolicitudes .grid-containerDueño {
    display: grid;
    grid-template-columns: repeat(5, 2fr); 
    gap: 20px;
    background-color: transparent;
  
    justify-content: center;
    align-items: center;
 
  }
  
  .dueño_gridSolicitudes .grid__itemSolicitud{
    
    display: flex;
    flex-direction: column;
    overflow: hidden;
    cursor: pointer;
    border-radius: 10px;
    width: 16vw; 
    height: 50vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);
  }
  
  .dueño_gridSolicitudes .grid__itemSolicitud h2{
    color: rgb(255, 255, 255); 
    display: flex;
    position: absolute;
    font-size: 1.3vw;
    z-index: 2;
  }
  
  
  .dueño_gridSolicitudes .grid__itemSolicitud p{
    overflow: auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    padding:  0px;
    font-size: 1vw;
    text-align: justify;
    margin-bottom: 10px;
  }
  .dueño_gridSolicitudes .grid__itemSolicitud h4{
   text-align: justify;

 }
 .dueño_gridSolicitudes .grid__itemSolicitud .text-title{
    flex: 0.5;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .dueño_gridSolicitudes .grid__itemSolicitud .text-title::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1; 
}

  .dueño_gridSolicitudes .grid-containerDueño .text-title img{
    width: 100%;
    height: 100%;
    object-fit: cover; 
    position: relative;
    filter: blur(2px) brightness(0.5); 
    
  }
  
  .dueño_gridSolicitudes .grid__itemSolicitud a{
    text-decoration: none;
    color: #000000;
    font-style: italic;
    font-size: 1vw;
    text-align: end;
    transition: 0.3s ease;
    margin-top: auto;
 }

 .dueño_gridSolicitudes .grid__itemSolicitud a:hover{
    color: #686868;
 }

  
 .dueño_gridSolicitudes .text-detailSolicitudes {    
    display: flex;
    flex-direction: column;
    flex: 1;
    top: 0;
    left: 0;
    overflow: hidden;
    background: rgb(222, 222, 222);
    color: #000000;
    text-align: end;
    padding: 10px; 
    opacity: 1;
    transition: opacity 0.3s ease-in-out; 
  }

  .gridSolicitudes_DueñoBtn{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    justify-content: end; 
  }
  
  .gridSolicitudes_DueñoBtn #numeros-pagina{  
    padding-left: 5px;
    padding-right: 5px;
    color: white;
    cursor: pointer;
    margin-top: 6px;
  }
  
  .gridSolicitudes_DueñoBtn #anterior {
    background-color: transparent;
    color: white;
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  .gridSolicitudes_DueñoBtn #siguiente {
    background-color: transparent;
    color: white;
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  .gridSolicitudes_DueñoBtn .numero-pagina {
    margin-right: 5px; 
    
    background-color: transparent;
    color: white;
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  
  .gridSolicitudes_DueñoBtn #anterior:hover {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    
  }
  
 .gridSolicitudes_DueñoBtn #siguiente:hover {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
  }
  
  .gridSolicitudes_DueñoBtn .numero-pagina:hover {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
  
  }

  .content_solicitudesDueño .v-pagination{
    color: white;
    margin-bottom: 10px;
  }

  @media  screen and (max-width: 1100px) {
    .dueño_gridSolicitudes .grid-containerDueño {
      grid-template-columns: repeat(4, 2fr); 
    }
    .dueño_gridSolicitudes .grid__itemSolicitud{
      width: 20vw; 
      height: 44vh;
    }
    .dueño_gridSolicitudes .grid__itemSolicitud h4{
      font-size: 1.5vw;
    }
    .dueño_gridSolicitudes .grid__itemSolicitud p{
      font-size: 1.2vw;
    }
    .dueño_gridSolicitudes .grid__itemSolicitud a{
      font-size: 15px;
    }
  }
  @media  screen and (max-width: 860px) {
    .dueño_gridSolicitudes{
      padding: 20px 50px 50px 70px;
    }
    .dueño_gridSolicitudes .grid-containerDueño {
      grid-template-columns: repeat(2, 2fr); 
    }
    .dueño_gridSolicitudes .grid__itemSolicitud{
      width: 35vw; 
      height: 44vh;
    }
    .dueño_gridSolicitudes .grid__itemSolicitud h4{
      font-size: 2vw;
    }
    .dueño_gridSolicitudes .grid__itemSolicitud p{
      font-size: 1.5vw;
    }
    .dueño_gridSolicitudes .grid__itemSolicitud h2{
      font-size: 2.5vw;
    }
  }

  @media  screen and (max-width: 700px) {
    .content_solicitudesDueño  h1{
      font-size: 30px;
      margin-left: 55px;
    }
  }

  @media  screen and (max-width: 600px) {

    .dueño_gridSolicitudes .grid-containerDueño {
      grid-template-columns: repeat(1, 2fr); 
    }
    .dueño_gridSolicitudes .grid__itemSolicitud{
      width: 70vw; 
      height: 44vh;
    }
    .dueño_gridSolicitudes .grid__itemSolicitud h4{
      font-size: 3vw;
    }
    .dueño_gridSolicitudes .grid__itemSolicitud p{
      font-size: 2.5vw;
    }
    .dueño_gridSolicitudes .grid__itemSolicitud h2{
      font-size: 4vw;
    }
  }

  @media  screen and (max-width: 400px) {
  .dueño_gridSolicitudes .grid__itemSolicitud h4{
    font-size: 4vw;
  }
  .dueño_gridSolicitudes .grid__itemSolicitud p{
    font-size: 3.5vw;
  }
  .dueño_gridSolicitudes .grid__itemSolicitud h2{
    font-size: 5vw;
  }
}
</style>