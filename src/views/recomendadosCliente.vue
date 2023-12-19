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
            <div class="grid__item" v-for="(item, index) in salonesRecomendados" :key="index" v-show="mostrarImagen(index)">
              <img :src="require('@/img/' + item.imgSrc)" alt="">
              <div class="text-overlay">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
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
 import NavbarCliente from '@/views/navbarCliente.vue'

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
        salonesRecomendados: [
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
    ],
    startIndex: 0,
    imagesPerPage: 9,
    };
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