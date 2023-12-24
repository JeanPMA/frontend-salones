<template>
    <NavbarDueño style="z-index: 1000;"/>
    <div class="content_solicitudesDueño">
        <h1>
        LISTA DE SOLICITUDES DE RESERVA
        </h1>
    <div class="search_listaSolicitud">
            <div class="search-container">
                <input type="text" id="search-input" placeholder="Buscar...">
                <button id="search-button">Buscar</button>
             </div>
             <div class="solicitudesDueño_filter">
              <span class="icon"><font-awesome-icon :icon="['fas', 'filter']" /></span>                    
                  <a href="#" id="clickeable-label">FILTRO</a>
            </div>
    </div> 
    <div class="dueño_gridSolicitudes">
          <div class="grid-containerDueño">
            <div class="grid__itemSolicitud" v-for="(item, index) in buzon" :key="index" v-show="mostrarImagen(index)" @click="irACalificación(item.id)">
                <div class="text-title" style="display: flex; align-items: center; justify-content: center;">
                    <h2>{{ item.title }}</h2>
                    <img :src="require('@/img/' + item.imgSrc)" alt="">
                   
                </div>
              
              <div class="text-detailSolicitudes">
        
                <p>{{ item.description }}</p>
                <a href="#">Detalles <font-awesome-icon :icon="['fas', 'arrow-right']" /></a>
              </div>
            </div>
          </div>
          <div class="gridSolicitudes_DueñoBtn">
            <button id="anterior" @click="paginaAnterior" :disabled="startIndex === 0">Anterior</button>
            <div id="numeros-pagina">
              <span v-for="pagina in paginas" :key="pagina" @click="irAPagina(pagina)" class="numero-pagina">{{ pagina }}</span>
            </div>
            <button id="siguiente" @click="paginaSiguiente" :disabled="startIndex >= buzon.length - imagesPerPage">Siguiente</button>
          </div>
    </div>
    </div>
    
       
</template>

<script>
import NavbarDueño from '@/views/navbarDueño.vue';


export default {
name: 'listaSolicitudesDueñoComponent',
components: {
    NavbarDueño,
},
data() { 
    return {
        buzon: [
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
        {
        imgSrc: "4.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
        {
        imgSrc: "4.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
        {
        imgSrc: "4.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
        {
        imgSrc: "4.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
        {
        imgSrc: "4.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
        {
        imgSrc: "4.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
        {
        imgSrc: "4.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
        {
        imgSrc: "4.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
        {
        imgSrc: "4.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        },
    ],
    startIndex: 0,
    imagesPerPage: 10,
    };
    },
    computed: {
    paginas() {
    return Array.from({ length: Math.ceil(this.buzon.length / this.imagesPerPage) }, (_, i) => i + 1);

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
.content_solicitudesDueño{
    background-color: #b4b2b2;
}
.content_solicitudesDueño h1{
    padding-top: 30px;
}
.search_listaSolicitud{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0px 100px 0px 100px;
    margin-top: 20px;
}

/*ESTILOS GRID SALONES */
.dueño_gridSolicitudes{
    padding: 20px 50px 50px 50px;
    margin: 0px 20px 0px 20px;
  
  }
  
  .dueño_gridSolicitudes .grid-containerDueño {
    display: grid;
    grid-template-columns: repeat(5, 1fr); 
    gap: 10px;
    background-color: transparent;
    place-items: center;
    justify-content: center;
    align-items: center;
 
  }
  
  .dueño_gridSolicitudes .grid__itemSolicitud{
    
    
    overflow: hidden;
    height: auto;
    cursor: pointer;
    border-radius: 10px;
    
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);
  }
  
  .dueño_gridSolicitudes .grid__itemSolicitud h2{
    color: rgb(255, 255, 255); 
    display: flex;
    position: absolute;
 
    font-size: 1.3vw;
  }
  
  
  .dueño_gridSolicitudes .grid__itemSolicitud p{
   
    padding:  0px;
    margin-top: 10px;
    font-size: 1vw;
    text-align: center;
    margin-bottom: 10px;
  }

  .dueño_gridSolicitudes .grid__itemSolicitud .text-title{
    width: 100%;
    height: 100px;

    
  }
  .dueño_gridSolicitudes .grid-containerDueño .text-title img{
    width: 100%;
    height: 100%;
    
  }
  
  .dueño_gridSolicitudes .grid__itemSolicitud a{
    text-decoration: none;
    color: #000000;
    font-style: italic;
    font-size: 1vw;
    transition: 0.3s ease;
 }

 .dueño_gridSolicitudes .grid__itemSolicitud a:hover{
    
    color: #686868;
   
 }

  
 .dueño_gridSolicitudes .text-detailSolicitudes {
   
    
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
  
  
  
  
 
  .gridSolicitudes_DueñoBtn{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    justify-content: end; /* Distribuye los elementos al principio y al final del contenedor */
   
    
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
    color: rgb(0, 0, 0);
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  .gridSolicitudes_DueñoBtn #siguiente {
    background-color: transparent;
    color: rgb(0, 0, 0);
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  .gridSolicitudes_DueñoBtn .numero-pagina {
    margin-right: 5px; 
    
    background-color: transparent;
    color: rgb(0, 0, 0);
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
  .solicitudesDueño_filter{
    cursor: pointer;
    margin-left: 40px;
    padding-top: 10px;
    text-align: start;
}

</style>