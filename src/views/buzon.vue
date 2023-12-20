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
                <input type="text" id="search-input" placeholder="Buscar...">
                <button id="search-button">Buscar</button>
             </div>
            <div class="buzon_filter">
              <span class="icon"><font-awesome-icon :icon="['fas', 'filter']" /></span>                    
                  <a href="#" id="clickeable-label">FILTRO</a>
            </div>
          </div>
          
    </div>
    <div class="buzon_grid">
          <div class="grid-container">
            <div class="grid__item" v-for="(item, index) in buzon" :key="index" v-show="mostrarImagen(index)" @click="irACalificación(item.id)">
              <img :src="require('@/img/' + item.imgSrc)" alt="">
              <div class="text-overlay">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
                <a href="#">Detalles <font-awesome-icon :icon="['fas', 'arrow-right']" /></a>
              </div>
            </div>
          </div>
          <div class="buzon_botones">
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

import NavbarCliente from '@/views/navbarCliente.vue'

    export default {
    name: 'buzonComponent',
    components: {
    NavbarCliente,
    },
    methods: {
    ejecutar() {
     
    
    },
    },
    data() { 
    return {
        buzon: [
        {
        imgSrc: "3.png",
        title: "NOTIFICACION",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
        },
        {
        imgSrc: "3.png",
        title: "NOTIFICACION",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
        },
        {
        imgSrc: "3.png",
        title: "NOTIFICACION",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
        },
        {
        imgSrc: "4.png",
        title: "NOTIFICACION",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
        },
        {
        imgSrc: "4.png",
        title: "NOTIFICACION",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
        },
        {
        imgSrc: "4.png",
        title: "NOTIFICACION",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
        },
        {
        imgSrc: "4.png",
        title: "NOTIFICACION",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
        },
        {
        imgSrc: "4.png",
        title: "NOTIFICACION",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
        },
        {
        imgSrc: "4.png",
        title: "NOTIFICACION",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
        },
        {
        imgSrc: "4.png",
        title: "NOTIFICACION",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
        },
        {
        imgSrc: "4.png",
        title: "NOTIFICACION",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
        },
        {
        imgSrc: "4.png",
        title: "NOTIFICACION",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
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
    irACalificación(id) {
    // Redirige a la página de calificacion
      this.$router.push({ name: 'calificar', params: { id: id } });
    },
    },
    }

</script>
  
<style>
 

.header_buzon{
    display: flex;
    flex-direction: column;
   
    
}

.search_buzon{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0px 100px 0px 100px;
    margin-top: 20px;
}

.search-container {
    display: flex;
    
}

#search-input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
    outline: none;
    width: 60vw;
}

#search-button {
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    background-color: #5e5e5e;
    color: #fff;
    outline: none;
}

#search-button:hover {
    background-color: #000000;
}


/*GRID DE BUZON*/

  .buzon_list{
    background-color: white;
    width: 100%;
    margin-top: 80px;
    padding-top: 20px;
  }

  .buzon_grid{
    padding: 20px 50px 50px 50px;
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
  }
  
  .buzon_grid .grid__item{
    
    position: relative;
  
    display: inline-block;
    overflow: hidden;
    height: auto;
    cursor: pointer;
    border-radius: 10px;
    height: 260px;
  
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
  }
  .buzon_grid .grid-container img{
    width: 100%;
    height: 100%;
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
    
    background: rgba(0, 0, 0, 0.5); /* Fondo semitransparente para mayor legibilidad */
    color: #fff;
    text-align: end;
    padding: 20px;
  
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    max-width: 100%;
  }
  
  
  
  
  .buzon_grid .buzon_title{
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
  
.buzon_filter{
    cursor: pointer;
    margin-left: 10px;
    padding-top: 10px;
}




</style>
  