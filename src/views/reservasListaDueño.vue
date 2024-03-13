<template>
    <NavbarDueño style="z-index: 1000;"/>
    <div class="content_SRDueño">
        <h1>
        LISTA DE RESERVAS
        </h1>
    <div class="search_listaSolicitud">
             <div class="search-container">
              <input v-model="searchTerm" placeholder="Buscar..." />
             </div>
             <div class="filtro-container" :class="{ 'filtro-abierto': mostrarFiltroSR }">
                <FiltroEstadoSR @filtroCambiado="filtrarSR" />
             </div>
    </div> 
    <div class="dueño_gridSR">
          <div class="grid-containerSR">
            <div class="grid__itemSR" v-for="(item, index) in displayedItems" :key="index" v-show="mostrarImagen(index)" @click="irADetalleSR(item.id)">
                <div class="text-titleSR">
                    <h2>{{ item.salon.nombre }}</h2>
                    <img :src="item.salon.banner_url" alt="">
                   
                </div>
              
              <div class="text-detailSR">
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
            <h3>NO EXISTEN RESERVAS</h3>
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
name: 'listaReservasDueñoComponent',

components: {
    NavbarDueño,
    FiltroEstadoSR,
},
data() { 
    return {
        listaReservas: [],
        listaReservasFiltrado: [],
        startIndex: 0,
        itemsPerPage: 10,
        searchTerm: localStorage.getItem('searchTermReservaDueño') || '',
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
    axios.get('http://localhost:8080/v1/solicitud-reserva/salon/reservas', config)
      .then(response => {
        this.listaReservas = response.data;
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

      const filteredList = this.listaReservasFiltrado.filter(item => {
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
      this.$router.push({ name: 'solicitud-reserva' ,params: { id: id }});
    },
    filtrarSR(estadosSeleccionados) {
      const estadosFiltrar = estadosSeleccionados.includes("PENDIENTE") || estadosSeleccionados.includes("RECHAZADO")
        ? estadosSeleccionados.filter(estado => estado !== "PENDIENTE" && estado !== "RECHAZADO")
        : estadosSeleccionados;

      if (estadosFiltrar.length > 0) {
        this.listaReservasFiltrado = this.listaReservas.filter(sr => {
          return sr.tipoSR && estadosFiltrar.includes(sr.tipoSR.nombre);
        });
        this.currentPage = 1;
      } else {
        this.listaReservasFiltrado = this.listaReservas;
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
      localStorage.setItem('searchTermReservaDueño', newSearchTerm);
    }
  }
}
</script>
<style>

.content_SRDueño{
  background-color: white;
}
.content_SRDueño h1{
  padding-top: 30px;
  color: rgb(0, 0, 0);
}

/*ESTILOS GRID SOLICITUDES-RESERVAS */
.dueño_gridSR{
  padding: 20px 50px 50px 50px;
  margin: 0px 20px 0px 20px;
}

.dueño_gridSR .grid-containerSR {
  display: grid;
  grid-template-columns: repeat(5, 2fr); 
  gap: 20px;
  background-color: transparent;
  justify-content: center;
  align-items: center;
}

.dueño_gridSR .grid__itemSR{
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  border-radius: 10px;
  width: 16vw; 
  height: 50vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, .5);
}

.dueño_gridSR .grid__itemSR h2{
  color: rgb(255, 255, 255); 
  display: flex;
  position: absolute;
  font-size: 1.3vw;
  z-index: 2;
}

.dueño_gridSR .grid__itemSR p{
  overflow: auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  padding:  0px;
  font-size: 1vw;
  text-align: justify;
  margin-bottom: 10px;
}

.dueño_gridSR .grid__itemSR h4{
  text-align: justify;
}

.dueño_gridSR .grid__itemSR .text-titleSR{
  flex: 0.5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.dueño_gridSR .grid__itemSR .text-titleSR::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; 
}

.dueño_gridSR .grid-containerSR .text-titleSR img{
  width: 100%;
  height: 100%;
  object-fit: cover; 
  position: relative;
  filter: blur(2px) brightness(0.5); 
}

.dueño_gridSR .grid__itemSR a{
  text-decoration: none;
  color: #000000;
  font-style: italic;
  font-size: 1vw;
  text-align: end;
  transition: 0.3s ease;
  margin-top: auto;
}

.dueño_gridSR .grid__itemSR a:hover{   
  color: #686868;
}

.dueño_gridSR .text-detailSR {  
  display: flex;
  flex-direction: column;
  flex: 1;
  top: 0;
  left: 0;
  width: 100%;     
  background: rgb(222, 222, 222); 
  color: #000000;
  text-align: end;
  padding: 10px;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.content_SRDueño .v-pagination{
  color: rgb(0, 0, 0);
  margin-bottom: 10px;
}

@media  screen and (max-width: 1100px) {
  .dueño_gridSR .grid-containerSR{
    grid-template-columns: repeat(4, 2fr); 
  }

  .dueño_gridSR .grid__itemSR{
    width: 20vw; 
    height: 44vh;
  }

  .dueño_gridSR .grid__itemSR h4{
    font-size: 1.5vw;
  }

  .dueño_gridSR .grid__itemSR p{
    font-size: 1.2vw;
  }

  .dueño_gridSR .grid__itemSR a{
    font-size: 15px;
  }
}

@media  screen and (max-width: 860px) {
  .dueño_gridSR{
    padding: 20px 50px 50px 70px;
  }

  .dueño_gridSR .grid-containerSR{
    grid-template-columns: repeat(2, 2fr); 
  }

  .dueño_gridSR .grid__itemSR{
    width: 35vw; 
    height: 44vh;
  }

  .dueño_gridSR .grid__itemSR h4{
    font-size: 2vw;
  }

  .dueño_gridSR .grid__itemSR p{
    font-size: 1.5vw;
  }

  .dueño_gridSR .grid__itemSR h2{
    font-size: 2.5vw;
  }
}

@media  screen and (max-width: 700px) {
  .content_SRDueño  h1{
    font-size: 30px;
    margin-left: 55px;
  }
}

@media  screen and (max-width: 600px) {
  .dueño_gridSR .grid-containerSR{
    grid-template-columns: repeat(1, 2fr); 
  }

  .dueño_gridSR .grid__itemSR{
    width: 70vw; 
    height: 44vh;
  }

  .dueño_gridSR .grid__itemSR h4{
    font-size: 3vw;
  }

  .dueño_gridSR .grid__itemSR p{
    font-size: 2.5vw;
  }

  .dueño_gridSR .grid__itemSR h2{
    font-size: 4vw;
  }

  .dueño_gridSR{
    padding: 20px 50px 50px 100px;
  }
}

@media  screen and (max-width: 400px) {
  .dueño_gridSR .grid__itemSR h4{
    font-size: 4vw;
  }

  .dueño_gridSR .grid__itemSR p{
    font-size: 3.5vw;
  }
  
  .dueño_gridSR .grid__itemSR h2{
    font-size: 5vw;
  }
}
</style>