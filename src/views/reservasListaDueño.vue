<template>
    <NavbarDueño style="z-index: 1000;"/>
    <div class="content_reservasDueño">
        <h1>
        LISTA DE RESERVAS
        </h1>
    <div class="search_listaReserva">
             <div class="search-container">
              <input v-model="searchTerm" placeholder="Buscar..." />
             </div>
             <div class="filtro-container" :class="{ 'filtro-abierto': mostrarFiltroSR }">
                <FiltroEstadoSR @filtroCambiado="filtrarSR" />
             </div>
    </div> 
    <div class="dueño_gridSalones">
          <div class="grid-containerReservas">
            <div class="grid__itemSolicitud" v-for="(item, index) in displayedItems" :key="index" v-show="mostrarImagen(index)" @click="irADetalleSR(item.id)">
                <div class="text-titleReserva" style="display: flex; align-items: center; justify-content: center;">
                    <h2>{{ item.salon.nombre }}</h2>
                    <img :src="item.salon.banner_url" alt="">
                   
                </div>
              
              <div class="text-detailReservas">
        
                <p>{{ item.detalle }}</p>
                <p>{{ item.tipoSR.nombre }}</p>
                <a href="#">Detalles <font-awesome-icon :icon="['fas', 'arrow-right']" /></a>
              </div>
            </div>
          </div>
          <div v-if="displayedItems.length == 0">
            <h3>NO EXISTEN RESERVAS</h3>
          </div> 
          <div class="gridReserva_DueñoBtn">
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
        imagesPerPage: 8,
        searchTerm: localStorage.getItem('searchTermReservaDueño') || '',
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
    irADetalleSR(id) {
    // Redirige a la página de calificacion
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
        this.irAPagina(1);
      } else {
        this.listaReservasFiltrado = this.listaReservas;
      }
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

.content_reservasDueño{
    background-color: #b4b2b2;
}
.content_reservasDueño h1{
    padding-top: 30px;
}
.search_listaReserva{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0px 100px 0px 100px;
    margin-top: 20px;
}
/*ESTILOS GRID SOLICITUDES */
.dueño_gridSalones{
    padding: 20px 50px 50px 50px;
    margin: 0px 20px 0px 20px;
  
  }
  
  .dueño_gridSalones .grid-containerReservas {
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 20px;
    background-color: transparent;
    
    justify-content: center;
    align-items: center;
 
  }
  
  .dueño_gridSalones .grid__itemSolicitud{
    
    
    overflow: hidden;
    height: auto;
    cursor: pointer;
    border-radius: 10px;
    
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);
  }
  
  .dueño_gridSalones .grid__itemSolicitud h2{
    color: rgb(255, 255, 255); 
    display: flex;
    position: absolute;
 
    font-size: 1.3vw;
  }
  
  
  .dueño_gridSalones .grid__itemSolicitud p{
   
    padding:  0px;
    margin-top: 10px;
    font-size: 1vw;
    text-align: center;
    margin-bottom: 10px;
  }

  .dueño_gridSalones .grid__itemSolicitud .text-titleReserva{
    width: 100%;
    height: 100px;

    
  }
  .dueño_gridSalones .grid-containerReservas .text-titleReserva img{
    width: 100%;
    height: 100%;
    
  }
  
  .dueño_gridSalones .grid__itemSolicitud a{
    text-decoration: none;
    color: #000000;
    font-style: italic;
    font-size: 1vw;
    transition: 0.3s ease;
 }

 .dueño_gridSalones .grid__itemSolicitud a:hover{
    
    color: #686868;
   
 }

  
 .dueño_gridSalones .text-detailReservas {
   
    
    top: 0;
    left: 0;
    width: 100%;
   
    
    background: rgb(222, 222, 222); /* Fondo semitransparente para mayor legibilidad */
    color: #000000;
    text-align: end;
    padding: 10px;
  
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    max-width: 100%;
  }
  
  
  
  
 
  .gridReserva_DueñoBtn{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    justify-content: end; /* Distribuye los elementos al principio y al final del contenedor */
   
    
  }
  
  .gridReserva_DueñoBtn #numeros-pagina{
   
    
    padding-left: 5px;
    padding-right: 5px;
    color: white;
    cursor: pointer;
    margin-top: 6px;
  }
  
  .gridReserva_DueñoBtn #anterior {
    background-color: transparent;
    color: rgb(0, 0, 0);
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  .gridReserva_DueñoBtn #siguiente {
    background-color: transparent;
    color: rgb(0, 0, 0);
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  .gridReserva_DueñoBtn .numero-pagina {
    margin-right: 5px; 
    
    background-color: transparent;
    color: rgb(0, 0, 0);
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  
  .gridReserva_DueñoBtn #anterior:hover {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    
  }
  
 .gridReserva_DueñoBtn #siguiente:hover {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
  }
  
  .gridReserva_DueñoBtn .numero-pagina:hover {
  
    
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
  
  }

</style>