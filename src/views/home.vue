<template>
<header>
    <!-- containner__controla todo el navbar -->
         <div class="container__menu">
            <div class="menu">
              <!-- clase checkbox para diseñor responsivo y click mediante un icono -->
              <input type="checkbox" id="check__menu">
              <label  for="check__menu" id="label__check">
                <!-- clase para controlar estilos del icono -->
                <i class="fa-solid fa-bars icon__menu"></i>
              </label>
              <nav>
                <ul>
                  <div class="logoBotones">
                    <li><a href="/" id="selected"></a></li>
                    <li><a href="#"></a></li>
                  </div>
                
                  <div class="botones"> 
                    <li><a href="#">SALONES</a> </li>                 
                    <li><a href="#">RECOMENDADOS</a></li>
                    <li><a href="#">CONTACTANOS</a></li>
                  </div>
                  <div class="botones_2">
                    <li><a href="#" class="btn btn-1">INICIAR SESIÓN</a></li>
                    <li><a href="#" class="btn btn-1">REGISTRARSE</a></li>
                  </div>
                  
                </ul>
              </nav>
            </div>
        </div>
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
          
        </p>
    </div>
  </div>
  <div class="content_recomend">
    
    <div class="content">
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

  <div class="content_salones">
    <div class="salones_title">
      SALONES
    </div>
    <div class="motivation_grid">
      <div class="grid-container">
          <div class="grid__item">
              
              <img src="../img/1.png" alt="">
              <div class="text-overlay">
                <h2>SALON DE EVENTOS</h2>
                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book.  </p>
              </div>
          </div>  
          
          <div class="grid__item">
              
              <img src="../img/2.png" alt="">
              <div class="text-overlay">
                <h2>SALON DE EVENTOS</h2>
                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                   when an unknown printer took a galley of type and scrambled it to make a type specimen book.  </p>
              </div>
              
          </div>  
          
          <div class="grid__item">
              
              <img src="../img/3.png" alt="">
              <div class="text-overlay">
                <h2>SALON DE EVENTOS</h2>
                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book.  </p>
              </div>
              
          </div>  
          
          <div class="grid__item">
              
            <img src="../img/3.png" alt="">
            <div class="text-overlay">
              <h2>SALON DE EVENTOS</h2>
              <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.  </p>
            </div>
            
        </div> 

        <div class="grid__item">
              
          <img src="../img/3.png" alt="">
          <div class="text-overlay">
            <h2>SALON DE EVENTOS</h2>
            <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.  </p>
          </div>
          
      </div> 

      <div class="grid__item">
              
        <img src="../img/3.png" alt="">
        <div class="text-overlay">
          <h2>SALON DE EVENTOS</h2>
          <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.  </p>
        </div>
        
    </div> 

    <div class="grid__item">
              
      <img src="../img/3.png" alt="">
      <div class="text-overlay">
        <h2>SALON DE EVENTOS</h2>
        <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.  </p>
      </div>
      
    </div> 
          
    <div class="grid__item">
              
              <img src="../img/3.png" alt="">
              <div class="text-overlay">
                <h2>SALON DE EVENTOS</h2>
                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book.  </p>
              </div>
              
    </div> 

            
          
          
          
        </div>
        <div class="salones_botones">
          <button id="anterior">Anterior</button>
          <div id="numeros-pagina"></div>
          <button id="siguiente">Siguiente</button>
        </div>
        
    </div>
  </div>

  <div class="form_contact">
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

import swiperConfig  from "../js/home.js"; 
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




/*BARRA DE NAVEGACIO NO LOGIN*/
header{
  width: 100%;
  position: fixed;
  
  top: 0;
  left: 0;
  background: rgb(180, 180, 180);
  z-index: 2;
  color: #000000;
}
.container__menu{
  width: 100%;
  height: 85px;
  background: rgb(255, 255, 255);
  
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
  z-index: 3;
  position: fixed;
}

.menu{
  max-width: 100%;
  margin: auto;
  height: 100%;
  
}

nav{
  height: 100%;
  
 
}

nav > ul{
  list-style: none;

  display: flex;
  margin-top: 5px;
  width: 100%;
  flex-direction: row;
  justify-content: center; /* Centra horizontalmente */
   /* Centra verticalmente */
  height: 10vh;
 
  
  
}

nav  ul  li{
  display: inline;
    margin: 0 10px; /* Espacio entre elementos de la lista */
    position: relative;
    cursor: pointer;
  justify-content: center;
}

.botones{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.botones a{
  justify-content: center;
  text-decoration: none;
}

.botones a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0; /* Ancho inicial de 0 */
  height: 2px; /* Grosor del borde inferior */
  background-color: #ff1100; /* Color del borde inferior */
  transition: width 0.3s; /* Duración de la animación */
  margin-bottom: -33px;
}

 .botones a:hover::after {
  width: 100%; /* Ancho completo al pasar el cursor sobre el elemento */
}

nav a{
  text-decoration: none;
  color: #333; 
  transition: color 0.3s; 
  width: 100%;
  height: 100%;
  display: flex;
  
  text-decoration: none;
  
  text-align: center;
  align-items: center;
}

#item{
  text-align: center;
}


.botones a:hover {
  color: #ff1100;
}

.botones_2{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-left: 150px;
}

.logoBotones{
  padding-right: 150px;
}
@media  screen and (max-width: 973px) {
  .botones_2{

    padding-left: 10px;
  }
  
  .logoBotones{
    padding-right: 10px;
  }
}


nav > ul > li:first-child > a{
  
  background-size: 80px;
  background-repeat: no-repeat;
  background-position: center center;
  padding: 20px 40px;
}

nav > ul > li:first-child:hover > a{
 
  background-size: 80px;
  background-repeat: no-repeat;
  background-position: center center;
}
#selected{
  background-color: white;
 height: 0px;
}
/*  SUBMENU */

nav ul li ul{
  width: 200px;
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255);
  position: absolute;
  top: 90px;
  left: -10px;
 
  visibility: hidden;
  z-index: 2;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
 
  transition: all 300ms ease;
  opacity: 1;
}

nav ul li:hover ul{
  display: block;
  visibility: visible;
  opacity: 1;
  z-index: 2;
 
  top: 70px;
}

nav ul li ul::before{
  content: '';
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid rgb(221, 225, 234);
  
  position: absolute;
  top: -12px;
  left: 20px;
}

nav ul li ul li a{
  display: block;
  color: rgb(0, 0, 0);
  background-color: rgb(221, 225, 234);
 
  padding-left: 14px;
  margin-top: 10px;
  font-size: 14px;
  opacity: 1;
 
}

nav ul li ul li a:hover{
  background: rgb(221, 225, 234);
  color: #000000;
  transform: scale(1.1);
  padding-left: 30px;
  font-size: 14px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
}

/*  ELEMENTOS RESPONSIVOS */

.icon__menu{
  font-size: 26px;
  color: rgb(0, 0, 0);
  cursor: pointer;
  width:  26px;
  height: 100%;
  display: none;
  align-items: center;
  padding-left: 20px;
  
}

#label__check{
  width: 26px;
  height: 100%;
  display: none;
}

#check__menu{
  display: none;
}

@media  screen and (max-width: 100px) {
  .container__menu{
      position: fixed;
  }
  header{
      position: fixed;
      padding-bottom: 10px;
  }

  nav{
      height: 0%;
      margin-top: 100px;
  }

  nav > ul{
      flex-direction: column;
      background-color: rgb(255, 255, 255);
      position: fixed;
      left: 0;
      margin-top: 30px;
      top: 70px;
      width: 100%;
      height: 0px;
      transition: all 300ms ease;
      z-index: 2;
      opacity: 0;
      visibility: hidden;
  }

  nav > ul > li{
      width: 100%;
  }

  nav > ul > li > a:hover{
      transform: scale(1);
      
  }
  nav ul li ul{
      left: 90px;
  }
  nav > ul > li:hover ul{
      top: 50px;
  }

  nav > ul > li:first-child a{
      
      background-position: 20px;
      background-size: 30px;
  }

  #selected{
      transform: scale(1);
      background-size: 40px;
  }

  #label__check{
      display: block;
  }

  .icon__menu{
      display: flex;
  }

  #check__menu:checked ~ nav > ul{
      height: 500px;
      visibility: visible;
      opacity: 1;
  }
  .btn.btn-1{
      margin-top: 0px;
      padding: 15px;
  }
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
  border-radius: 30px;
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
  margin-top: -50px;
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
  margin-top: -50px;
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
  background-color: #7d009c65;
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