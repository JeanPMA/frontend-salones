<template>
    <header>
      <NavbarCliente/>
    </header>
    <div class="salonesRecomendados_list">
        <div class="salonesRecomendados_title">
            SALONES MAS RECOMENDADOS
        </div>
        <div class="salonesRecomendados_filter">
            <span class="icon"><font-awesome-icon :icon="['fas', 'filter']" /></span>                   
             <a href="#" id="clickeable-label">FILTRO</a>
        </div>
          
        
    
        <div class="salonesRecomendados_grid">
          <div class="grid-container">
            <div class="grid__item" v-for="(item, index) in salonesRecomendados" :key="index" v-show="mostrarImagen(index)" @click="irADetalleSalon(item.id)">
              <img :src="item.banner_url" alt="">
              <div class="text-overlay">
                <h2>{{ item.nombre }}</h2>
                <p>{{ item.descripcion }}</p>
              </div>
            </div>
          </div>
          <div class="salones_botones">
            <button id="anterior" @click="paginaAnterior" :disabled="startIndex === 0">Anterior</button>
            <div id="numeros-pagina">
              <span v-for="pagina in paginas" :key="pagina" @click="irAPagina(pagina)" class="numero-pagina">{{ pagina }}</span>
            </div>
            <button id="siguiente" @click="paginaSiguiente" :disabled="startIndex >= salonesRecomendados.length - imagesPerPage">Siguiente</button>
          </div>
        </div>
      
        
      </div>
</template>

<script>
 import NavbarCliente from '@/views/navbarCliente.vue';
 import axios from 'axios';
  import jwt_decode from 'jwt-decode';

    export default {
    name: 'recomendadosClienteComponent',
    components: {
    NavbarCliente,
    },
    methods: {
    ejecutar() {
    
    
    },
    },
    data() { 
      return {
          salonesRecomendados: [],
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
    axios.get('http://localhost:8080/v1/salon', config)
      .then(response => {
        this.salonesRecomendados = response.data;
      })
      .catch(error => console.error('Error al obtener datos de la API:', error));
  },
    computed: {
    paginas() {
    return Array.from({ length: Math.ceil(this.salonesRecomendados.length / this.imagesPerPage) }, (_, i) => i + 1);

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
    },
    }



</script>

<style>

  
  /*GRID DE SALONES*/
.salonesRecomendados_list{
    background-color: #646464;
    width: 100%;
    margin-top: 80px;
  }
  
  .salonesRecomendados_grid{
    padding: 20px 50px 50px 50px;
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


</style>