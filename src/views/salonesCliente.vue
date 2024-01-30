<template>
    <header>
      <NavbarCliente/>
    </header>

      <div class="salones_list">
        <div class="salones_title">
          SALONES
        </div>
        <div class="salones_filter">
          <span class="icon"><font-awesome-icon :icon="['fas', 'filter']" /></span>                   
            <a href="#" id="clickeable-label">FILTRO</a>
        </div>
          
        
    
        <div class="salones_grid">
          <div class="grid-container">
            <div class="grid__item" v-for="(item, index) in salones" :key="index" v-show="mostrarImagen(index)" @click="irADetalleSalon(item.id)">
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
            <button id="siguiente" @click="paginaSiguiente" :disabled="startIndex >= salones.length - imagesPerPage">Siguiente</button>
          </div>
        </div>
      
        
      </div>

</template>

<script>
  import NavbarCliente from '@/views/navbarCliente.vue'
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import jwt_decode from 'jwt-decode';

  const router = useRouter();
  export default {
    name: 'salonesClienteComponent',
    components: {
      NavbarCliente,
  },
    methods: {
    ejecutar() {
      
      
    },
    },
    data() { 
    return {
      salones: [],
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
        this.salones = response.data;
      })
      .catch(error => console.error('Error al obtener datos de la API:', error));
  },
  computed: {
    paginas() {
      return Array.from({ length: Math.ceil(this.salones.length / this.imagesPerPage) }, (_, i) => i + 1);
    
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
.salones_list{
    background-color: #646464;
    width: 100%;
    margin-top: 80px;
  }
  
  .salones_grid{
    padding: 20px 50px 50px 50px;
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
  }
  
  .grid__item{
    
    position: relative;
  
    display: inline-block;
    overflow: hidden;
    height: auto;
    cursor: pointer;
    border-radius: 10px;
  
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
  }
  .salones_grid .grid-container img{
    width: 100%;
    height: 100%;
  }
  
  
  .text-overlay {
   
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
  
.salones_filter{
    cursor: pointer;
    margin-left: 100px;
    text-align: start;
}

#clickeable-label{
    text-decoration: none;
    color: #000000;
    padding-left: 5px;
}
</style>