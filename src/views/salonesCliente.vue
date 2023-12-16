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
            <div class="grid__item" v-for="(item, index) in salones" :key="index" v-show="mostrarImagen(index)">
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
            <button id="siguiente" @click="paginaSiguiente" :disabled="startIndex >= salones.length - imagesPerPage">Siguiente</button>
          </div>
        </div>
      
        
      </div>

</template>

<script>
  import NavbarCliente from '@/views/navbarCliente.vue'

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
      salones: [
        {
          imgSrc: "2.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "2.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "2.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "2.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "2.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "2.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "2.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "2.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "2.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "2.png",
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
  },
    }
   

  
</script>

<style>


/************ Default Css ************/
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 75px;
  }
  
  body {
    font-weight: 400;
    overflow-x: hidden;
    position: relative;
    background-color: #121212 !important;
    
    font-family: 'Centra', sans-serif !important;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    
    line-height: normal;
  }
  
  
  
  
  
  
  /*  BOTON */
  .btn{
    margin-right: 10px;
    color: rgb(33, 117, 155);
    justify-items: end;
  }
  .btn-1{
   
    background: linear-gradient(90deg, #ffffff 50%, #ff1900 50%);
    color: #000000; 
    border: 4px solid rgb(45, 45, 45);
    padding: 10px 20px 10px 20px;
    overflow: hidden;
    cursor: pointer;
    transition: background-position 0.3s ease;
    align-items: center;
    width: 100%;
    height: 100%;  
    background-size: 200% 100%;
  }
  
  .btn-1:hover{
    background-position: -100% 0;
    color: white;
    
  }
  
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