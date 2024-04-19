<template>
    <NavbarDueño style="z-index: 1000;"/>
    <div class="content_SRDueño">
        <h1>
        LISTA DE SOLICITUDES DE RESERVA
        </h1>
        <div class="selector_owner">
          <div class="selector_orden" @click="toggleDropdown">
            <div class="opciones_selector">{{ orden === 'mas' ? 'Mas antiguos' : 'Mas recientes' }}</div>
            <div v-show="dropdownVisible" class="dropdown_selector">
              <div class="option" @click="cambiarOrden('mas')">Mas antiguos</div>
              <div class="option" @click="cambiarOrden('menos')">Mas recientes</div>
            </div>
          </div>
        </div>
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
        },
        params: {
                    username: username,
                  },
    };
    const apiUrl = process.env.VUE_APP_BASE_URL;
    axios.get(`${apiUrl}/v1/solicitud-reserva/salon/solicitudes`, config)
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
      this.$router.push({ name: 'solicitud-reserva', params: { id: id }});
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    cambiarOrden(direccion) {
      this.orden = direccion;
     
      this.listaSolicitudesFiltrado.sort((a, b) => {
        const orderFactor = direccion === 'mas' ? 1 : -1;
        this.ordenAux = direccion;
        if (a.fecha_emision !== b.fecha_emision) {
            return orderFactor * (a.fecha_emision.toLowerCase() > b.fecha_emision.toLowerCase() ? 1 : -1);
        } else {
            return orderFactor * (b.salon.nombre.localeCompare(a.salon.nombre));
        }
      });
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
      this.cambiarOrden(this.ordenAux);
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

</style>