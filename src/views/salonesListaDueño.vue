<template>
    <NavbarDueño style="z-index: 1000;"/>
    <div class="content_salonesDueño">
        <h1>
        LISTA DE SALONES
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
        <div class="boton_crearSalonDueño">
          <RouterLink to="/crear-salon">
              <a id="crear" >CREAR SALON</a>
          </RouterLink>
        </div>
        <div class="dueño_gridSalones">
          <div class="grid-containerSalonesDueño">
            <div class="grid__itemSalon" v-for="(item, index) in buzon" :key="index" v-show="mostrarImagen(index)" @click="irASalon(item.id)">
                <div class="text-titleSalon" style="display: flex; align-items: center; justify-content: center;">
                    <h2>{{ item.title }}</h2>
                    <img :src="require('@/img/' + item.imgSrc)" alt="">
                   
                </div>
              
              <div class="text-detailSalones">
                <h4>Descripcion:</h4>
                <p>{{ item.description }}</p>
                <h4>Estado:</h4>
                <p>{{ item.estado }}</p>
                <h4>Fecha de creacion:</h4>
                <p>{{ item.creacion }}</p>
                <h4>Ubicacion:</h4>
                <p>{{ item.ubicacion }}</p>
                <a href="#">Detalles <font-awesome-icon :icon="['fas', 'arrow-right']" /></a>
              </div>
            </div>
          </div>
          <div class="gridSalones_DueñoBtn">
            <button id="anterior" @click="paginaAnterior" :disabled="startIndex === 0">Anterior</button>
            <div id="numeros-pagina">
              <span v-for="pagina in paginas" :key="pagina" @click="irAPagina(pagina)" class="numero-pagina">{{ pagina }}</span>
            </div>
            <button id="siguiente" @click="paginaSiguiente" :disabled="startIndex >= buzon.length - imagesPerPage">Siguiente</button>
          </div>
    </div>
    </div> 
    </div>
</template>

<script>
import NavbarDueño from '@/views/navbarDueño.vue';


export default {
name: 'listaSalonesDueñoComponent',
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
        estado: "ACTIVO",
        creacion: "24 de diciembre de 2023",
        ubicacion: "Av. petrolera km8 sobre la acera norte",
        },
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        estado: "ACTIVO",
        creacion: "24 de diciembre de 2023",
        ubicacion: "Av. petrolera km8 sobre la acera norte",
        },
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        estado: "ACTIVO",
        creacion: "24 de diciembre de 2023",
        ubicacion: "Av. petrolera km8 sobre la acera norte",
        },
        {
        imgSrc: "4.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        estado: "ACTIVO",
        creacion: "24 de diciembre de 2023",
        ubicacion: "Av. petrolera km8 sobre la acera norte",
        },
        {
        imgSrc: "4.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        estado: "ACTIVO",
        creacion: "24 de diciembre de 2023",
        ubicacion: "Av. petrolera km8 sobre la acera norte",
        },
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        estado: "ACTIVO",
        creacion: "24 de diciembre de 2023",
        ubicacion: "Av. petrolera km8 sobre la acera norte",
        },
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        estado: "ACTIVO",
        creacion: "24 de diciembre de 2023",
        ubicacion: "Av. petrolera km8 sobre la acera norte",
        },
        {
        imgSrc: "3.png",
        title: "SALON DE EVENTOS",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        estado: "ACTIVO",
        creacion: "24 de diciembre de 2023",
        ubicacion: "Av. petrolera km8 sobre la acera norte",
        },
    ],
    startIndex: 0,
    imagesPerPage: 3,
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
    irASalon(id) {
    // Redirige a la página de calificacion
      this.$router.push({ name: 'salon', params: { id: id } });
    },
    },
}
</script>

<style>
.content_salonesDueño{
    background-color: #b4b2b2;
}
.content_salonesDueño h1{
    padding-top: 30px;
}

/*ESTILOS GRID SALONES */
.dueño_gridSalones{
    padding: 20px 10px 40px 10px;
    margin: 0px 20px 0px 20px;
  
  }
  
  .dueño_gridSalones .grid-containerSalonesDueño {
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 20px;
    background-color: transparent;
    place-items: center;
    justify-content: center;
    align-items: center;
 
  }
  
  .dueño_gridSalones .grid__itemSalon{
   
    
    overflow: hidden;
    height: auto;
    cursor: pointer;
    border-radius: 10px;
    
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);
  }
  
  .dueño_gridSalones .grid__itemSalon h2{
    color: rgb(255, 255, 255); 
    display: flex;
    position: absolute;
 
    font-size: 1.3vw;
  }

  .dueño_gridSalones .grid__itemSalon h4{

    
    font-size: 1vw;
    text-align: start;
    
  }
  
  .dueño_gridSalones .grid__itemSalon p{
   
  

    font-size: 1vw;
    text-align: justify;
    margin-bottom: 10px;
  }

  .dueño_gridSalones .grid__itemSalon .text-titleSalon{
    width: 100%;
    height: 150px;

    
  }
  .dueño_gridSalones .grid-containerSalonesDueño .text-titleSalon img{
    width: 100%;
    height: 100%;
    
  }
  
  .dueño_gridSalones .grid__itemSalon a{
    text-decoration: none;
    color: #000000;
    font-style: italic;
    font-size: 1vw;
    transition: 0.3s ease;
 }

 .dueño_gridSalones .grid__itemSalon a:hover{
    
    color: #686868;
   
 }

  
 .dueño_gridSalones .text-detailSalones {
   
    
    top: 0;
    left: 0;
    width: 100%;
    height: 40vh;
    
    background: rgb(222, 222, 222); /* Fondo semitransparente para mayor legibilidad */
    color: #000000;
    text-align: end;
    padding: 20px;
  
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    max-width: 100%;
  }
  
  
  
  
 
  .gridSalones_DueñoBtn{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    justify-content: end; /* Distribuye los elementos al principio y al final del contenedor */
   
    
  }
  
  .gridSalones_DueñoBtn #numeros-pagina{
   
    
    padding-left: 5px;
    padding-right: 5px;
    color: white;
    cursor: pointer;
    margin-top: 6px;
  }
  
  .gridSalones_DueñoBtn #anterior {
    background-color: transparent;
    color: rgb(0, 0, 0);
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  .gridSalones_DueñoBtn #siguiente {
    background-color: transparent;
    color: rgb(0, 0, 0);
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  .gridSalones_DueñoBtn .numero-pagina {
    margin-right: 5px; 
    
    background-color: transparent;
    color: rgb(0, 0, 0);
    padding: 5px;
    border: 2px solid #000000;
    transition: 0.3s ease;
  }
  
  
  .gridSalones_DueñoBtn #anterior:hover {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    
  }
  
 .gridSalones_DueñoBtn #siguiente:hover {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
  }
  
  .gridSalones_DueñoBtn .numero-pagina:hover {
  
    
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
  
  }
  .solicitudesDueño_filter{
    cursor: pointer;
    margin-left: 40px;
    padding-top: 10px;
    text-align: start;
}
.boton_crearSalonDueño{


margin-top: 20px;
display: flex;


}

.boton_crearSalonDueño a{

 padding: 10px;
 width: 200px;
 height: 35px;
 border: none;
 border-radius: 8px;
 cursor: pointer;
 font-size: 14px;
 text-decoration: none;
}
.boton_crearSalonDueño #crear{
  background-color: transparent;
    color: #000000;
   
    border: 2px solid #000000;
    
   transition: 0.3s ease;   
   
  }

.boton_crearSalonDueño #crear:hover {
  background-color: #000000;
  color: #ffffff;
}
</style>