<template>
  <header>
    <NavbarHome/>
  </header>

  <div class="content_home">
    <div class="logo_home">
        <img src="../img/celebrando-bengalas-noche.jpg" alt="">
    </div>

    <div class="text_home">
        <h2>
          BIENVENIDO
        </h2>
        <p id="texto-tipeado">
          Lorem Ipsum is simply dummy text of the printing and 
          typesetting industry. Lorem Ipsum has been the industrys
           standard dummy text ever since the 1500s, when an unknown 
           printer took a galley of type and scrambled it to make a type 
           specimen book
        </p>
    </div>
  </div>
  <div class="content_recomend" id="section2">
    
  <div class="content " >
      <div class="content_title">
          <h2 >
            MAS RECOMENDADOS
          </h2>
      </div>
      <!-- Slider tipo swiper -->
      <swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="50"
        :loop="true"
        parallax
        :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        }"
       :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
       }"
       :pagination="{ 
          clickable: true, 
          hideOnClick: true
        }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        init="false"
        >
      
          <!-- Slides -->
          <swiper-slide class="swiper-slide"><img src="../img/1.png" alt=""></swiper-slide>
          <swiper-slide class="swiper-slide"><img src="../img/2.png" alt=""></swiper-slide>
          <swiper-slide class="swiper-slide"><img src="../img/3.png" alt=""></swiper-slide>
          <swiper-slide class="swiper-slide"><img src="../img/4.png" alt=""></swiper-slide>
          <swiper-slide class="swiper-slide"><img src="../img/5.png" alt=""> </swiper-slide>
       
        <!-- clase slide paginacion 
        <div class="swiper-pagination"></div>-->
      
        <!-- botones previo y siguiente del slide -->
        <swiper-button-prev class="swiper-button-prev"></swiper-button-prev>
        <swiper-button-next class="swiper-button-next"></swiper-button-next>
        
        <!-- scrollbar del slide 
        <div class="swiper-scrollbar"></div> -->
      
    </swiper>
  </div>
      

  </div>

  <div class="content_salones" id="section1">
    <div class="salones_title">
      SALONES
    </div>
    <div class="motivation_grid">
      <div class="grid-container">
        <div class="grid__item" v-for="(item, index) in items" :key="index" v-show="mostrarImagen(index)">
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
        <button id="siguiente" @click="paginaSiguiente" :disabled="startIndex >= items.length - imagesPerPage">Siguiente</button>
      </div>
    </div>
  </div>

  <div class="form_contact" id="section3">
      <div class="text_logo">
        <div class="text_items">
          <h3>
              CONTACTANOS
          </h3>
          <div class="form_item_one"> 
            <form action="#" method="post">
              
              <div class="form_one">
                <input type="text" id="nombre" name="nombre" placeholder="Nombre:" required>
              
                
                <input type="text" id="apellido" name="apellido" placeholder="Apellido:" required>
                
              </div>

              <div class="form_one">
                <input type="email" id="email" name="email" placeholder="Correo Electrónico:" required>
          
                

                <input type="telefono" id="telefono" name="telefono" placeholder="Telefono:" required>
           
              </div>

              <div class="form_two">
                <textarea id="mensaje" name="mensaje" rows="4" placeholder="Mensaje:" required></textarea>
               


                <input type="submit" value="Enviar">
              </div>     
            </form>

          </div>
            
        </div>
        <div class="logo_item">
          <img src="../img/5124556.jpg" alt="">
        </div>
      </div>
</div>

<div class="footer">
  <div class="footer_logo">
      <h3>
        LOGO
      </h3>
  </div>
  <div class="footer_copyright">
    <i class="fa-regular fa-copyright icon__coyright"></i>
        <h2>
                2023  | All Rights Reserved
        </h2>
    </div>
  <div class="footer_social">
      <a href="">
      <i class="fa-brands fa-facebook icon__menu"></i>
      </a>
      <a href="">
      <i class="fa-brands fa-instagram icon__menu"></i>
      </a>
      <a href="">
      <i class="fa-brands fa-tiktok icon__menu"></i>
      </a>
  </div>

</div>
</template>

<script>
import {Swiper, SwiperSlide} from 'swiper/vue';
import NavbarHome from '@/views/navbarHome.vue'
import 'swiper/css';
import { Pagination, Scrollbar, A11y, Autoplay, Virtual, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default {
  name: 'HomeComponent',
  components: {
    Swiper,
    SwiperSlide,
    NavbarHome,
  },
 
  setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange,
        modules: [Autoplay, Pagination, Navigation , A11y, Virtual],
        
      };
    },
  data() { 
    return {
      items: [
        {
          imgSrc: "1.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "1.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "1.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "1.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "1.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "1.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "1.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "1.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "1.png",
          title: "SALON DE EVENTOS",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imgSrc: "1.png",
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
      return Array.from({ length: Math.ceil(this.items.length / this.imagesPerPage) }, (_, i) => i + 1);
    
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
  
};
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
.boton{
  margin-right: 10px;
  color: rgb(33, 117, 155);
  justify-items: end;
}
.boton-1{
 
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

.boton-1:hover{
  background-position: -100% 0;
  color: white;
  
}



/*BODY*/

.content_home{
  background-image: url('../img/5026563.jpg');
  background-size: cover; /* Escala la imagen para cubrir todo el fondo del botón */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
 
  padding: 10px 20px;
  border: none;
 
  color: #000;
  margin-top: 85px;
  height: 600px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
}

.logo_home{
  overflow: hidden;
  width: 100%;
  height: 500px;
  border-radius: 53px;
}

.logo_home img{
  width: 100%;
  height:100%;
  border-radius: 53px;
  transition: transform 0.3s;
  transform-origin: center center;
}

.logo_home img:hover {
  transform: scale(1.2); 
  cursor: pointer; 
}

.text_home{
  padding-left: 20px;
  padding-right: 10px;
  width: 100%;
}

.text_home p{
  font-size: 20px;
  text-align: center;
}

.text_home h2{
  padding-bottom: 50px;
  font-size: 30px;
  text-align: center;
}


/* SECCION RECOMENDADOS*/
.content_recomend{
  
  background-color: rgb(136, 115, 115);
}
.content{
  background-color: rgb(0, 0, 0);

  z-index: 1;
  padding: 0px 100px 0px 100px;
  
}
.swiper {
  width: 100%;
  position: relative;
  z-index: 0;
  display: flex;
  --swiper-theme-color: #000000;
  overflow: hidden;
  
}
.swiper img{
  height: 200px;
  width: 100%;
  object-fit: contain;
  
}



.swiper-button-prev{  
  --swiper-navigation-size: 50px;
  color: white;
  
  height: 80px;
  width: 40px;
  margin-top: -40px;
  opacity: 0.6;
  border-radius: 8px;
  transition: opacity 0.3s;
}
.swiper-button-prev:hover{
  opacity: 1;
  color: rgb(0, 0, 0);
 

}  
.swiper-button-next{
  --swiper-navigation-size: 50px;
  color: white;
  
  height: 50px;
  width: 40px;
  margin-top: -30px;
  opacity: 0.6;
  border-radius: 8px;
  transition: opacity 0.3s;
}
.swiper-button-next:hover{
  opacity: 1;
  color: rgb(0, 0, 0);
 
}  

.swiper-pagination{
  margin-bottom: 30px;
  background: transparent;
  
}

.swiper-scrollbar{
  margin-bottom: 20px;
  background: transparent;
}

@media (min-width: 1024px){
  .content_recomend img{
      height: 300px;
      width: 100%;
      object-fit: contain;
  }
  
}

.swiper-pagination{
  --swiper-pagination-color: white;
  --swiper-pagination-bullet-size: 6px;
  --swiper-pagination-bullet-inactive-color: black;
  --swiper-pagination-bullet-inactive-opacity: 0.22;
  --swiper-pagination-bullet-opacity: 1;
  --swiper-pagination-bullet-horizontal-gap: 2px;
 
}

.swiper-pagination-bullet{
  
  box-shadow: inset 0 0 0 1px #fff;
}

.swiper-pagination-bullet-active{
  box-shadow: 0 0 0 1px rgb(0, 0, 0, 0.25);
}

.content_recomend .content .content_title{
  text-align: center;
  color: white;
  margin-top: 40px;
}

/*GRID DE SALONES*/
.content_salones{
  background-color: #363636;
  width: 100%;
  
}

.motivation_grid{
  padding: 50px;
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

}

.grid__item h2{
  color: rgb(255, 255, 255); 
  padding-top: 40px;
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
.motivation_grid .grid-container img{
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
 font-size: 3vw;
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






/*FORMULARIO DE CONTACTO*/

.form_contact{
  background-color: #490859b2;
  width: 100%;
  font-family: Arial, sans-serif;
}

.text_logo{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 100px 0px 100px 0px;
  color: rgb(0, 0, 0);
}

.form_item_one {
  max-width: 800px;
  margin: 20px;
  
  background: transparent;
  border-radius: 5px;
  
}

.form_item_one h2 {
  text-align: center;
}



.form_item_one input[type="text"],
.form_item_one input[type="email"],
.form_item_one input[type="telefono"],
.form_item_one textarea {
  color: white;
  border: 1px solid #cccccc64;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.081);
  
}



.form_item_one input[type="text"]::placeholder ,
.form_item_one input[type="email"]::placeholder ,
.form_item_one input[type="telefono"]::placeholder ,
.form_item_one textarea::placeholder {
  color: #ffffff; 
  font-family: Arial, sans-serif;
  opacity: 0.8;
}

.form_item_one input[type="submit"] {
 
  background: #333;
  border: 2px solid #333;
  color: #fff;
  padding: 15px;
  margin-left: 10px;
  margin-top: 10px;

  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  transition: 0.3s ease-in-out;
  font-size: 18px;
}

.form_item_one input[type="submit"]:hover {
  background: transparent;
  border: 2px solid #333;

}


.form_item_one form{
  display: flex;
  flex-direction: column;
}

.form_one{
  display: flex;
  flex-direction: row;
  width: 100%;
  
}

.form_one input{
  margin: 10px;
  padding: 25px 30px 25px 15px;
}

.form_two textarea{
  margin: 10px;
  padding: 25px 30px 25px 15px;
  resize: none;
}

.form_two{
  display: flex;
  flex-direction: column;
}


.logo_item img{
  width: 500px;
  height: 400px;
  border-radius: 50px;
}

.text_items h3{
  color: white;
  font-size: 2.5vw;
  margin-left: 40px;
}

/*FOOTER*/

.footer{
  background-color: black;
  
  
  width: 100%;
  
  display: flex;
  flex-direction: row;
}


.footer_copyright{
  
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content:center; 
  align-items: center;
}
.footer_copyright h2{
  color: white;
  margin: 20px 0px 20px 0px;
  font-size: 20px;
}


.footer .footer_social .icon__menu {
  font-size: 26px;
  color: rgb(255, 255, 255);
  cursor: pointer;
  width:  26px;
  height: 100%;
  padding: 0px 50px 0px 50px;
  
  padding-left: 20px;
}

.footer .footer_logo{
  color: white;
  margin: 20px 0px 20px 20px;
}

.footer .footer_social{
  display: flex;
  flex-direction: row;
  margin: 20px 20px 20px 0px;
}
.footer .icon__coyright{
  color: white;
  margin-right: 10px;
}
</style>