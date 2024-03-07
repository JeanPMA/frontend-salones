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
          ¡Bienvenido a nuestra aplicación para reservas de salones de eventos! 
          Estamos encantados de tenerte aquí para hacer que la planificación de tu evento 
          sea una experiencia sin complicaciones. Descubre la comodidad de encontrar y 
          reservar el lugar perfecto para tu ocasión especial. ¡Haz de cada evento un 
          momento inolvidable con nosotros!
        </p>
    </div>
  </div>
  <div class="content_recomend" id="section2">
    
  <div class="content" >
      <div class="content_title">
          <h2 >
            MAS RECOMENDADOS
          </h2>
      </div>
      <!-- Slider tipo swiper -->
      <swiper
        :modules="modules"
        :slides-per-view="getSlides()"
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
          <swiper-slide v-for="(item, index) in recomendados" :key="index" class="swiper-slide">
            <img :src="item.banner_url" :alt="item.altText">
          </swiper-slide>
       
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


  <div class="content_salones" id="section1" >
    <div class="salones_titleHome" >
      SALONES
    </div>
    <div class="motivation_grid" >
      <div class="grid-containerHome">
        <div class="grid__itemHome" v-for="(item, index) in displayedItems" :key="index" v-show="mostrarImagen(index)">
          <img :src="item.banner_url" alt="">
          <div class="text-overlay">
            <h2>{{ item.nombre }}</h2>
            <p><h4>DIRECCION: </h4>{{ item.direccion }}</p>
            <p><h4>CAPACIDAD: </h4>{{ item.capacidad }}</p>
            <p><h4>DESCRIPCION: </h4>{{ item.descripcion }}</p>
           
          </div>
        </div>
      </div>
    </div>
    <v-pagination
              v-model="currentPage"
              :length="totalPages"
    ></v-pagination>
  </div>

  <div class="form_contact" id="section3">
      <div class="text_logo">
        <div class="text_items">
          <h3>
              CONTACTANOS
          </h3>
          <div class="form_item_one"> 
            <form @submit.prevent="enviarCorreo">
              
              <div class="form_one">
                <input type="text" id="nombre" name="nombre" placeholder="Nombre:" v-model="nombre" @input="bloquearCaracteresNombre" required>
            
                <input type="text" id="apellido" name="apellido" placeholder="Apellido:" v-model="apellido" @input="bloquearCaracteresApellido" required>
                
              </div>

              <div class="form_one">
                <input type="email" id="correo" name="correo" placeholder="Correo Electrónico:" v-model="correo" required>

                <input type="text" id="telefono" name="telefono" placeholder="Telefono:" v-model="telefono" @input="limitesTelefono" required>
           
              </div>

              <div class="form_two">
                <textarea id="mensaje" name="mensaje" rows="4" placeholder="Mensaje:" v-model="mensaje" required></textarea>

                <button type="submit" :disabled="cargando" id="section4">
                  {{ cargando ? 'Enviando...' : 'Enviar' }}
                </button>
              </div>     
            </form>
           
          </div>
            
        </div>
        <div class="logo_item" >
          <img src="../img/5124556.jpg" alt="">
        </div>
      </div>
        <div v-if="cargando" class="overlay"></div>
      
        <div v-if="cargando" class="loader"></div>
</div>

<div class="footer" >
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
import axios from 'axios';


export default {
  name: 'HomeComponent',
  components: {
    Swiper,
    SwiperSlide,
    NavbarHome,
  },
 
  setup() {
      const onSwiper = (swiper) => {
       
      };
      const onSlideChange = () => {
   
      };
      return {
        onSwiper,
        onSlideChange,
        modules: [Autoplay, Pagination, Navigation , A11y, Virtual],
        
      };
    },
  data() { 
    return {
      items: [],
      startIndex: 0,
      itemsPerPage: 9,
      
      recomendados: [],
      currentPage: 1,
      tamañoAux: 0,

      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      mensaje: '',

      cargando: false,
    };
  },
  watch: {
    '$store.state.sectionToScroll': {
      handler: 'handleScrollToSection',
      immediate: true,
    },
  },
  mounted() {
    axios.get('http://localhost:8080/v1/salon/forUser')
      .then(response => {
        this.items = response.data;      
      })
      .catch(error => console.error('Error al obtener datos de la API:', error));

      axios.get('http://localhost:8080/v1/salon/recomendado')
      .then(response => {
        this.recomendados = response.data;
    
      })
      .catch(error => console.error('Error al obtener datos de la API:', error));
    
      window.addEventListener('resize', this.handleResize);
    
      this.handleResize(); 
     
   },
   beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$nextTick(() => {
        if (to.query.scrollTo === 'section4') {
          const section4 = document.querySelector('#section4');
          if (section4) {
            setTimeout(() => {
              section4.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            }, 100);
            const { path, query, hash } = to;
            const newRoute = { path, query: { ...query }, hash };
            delete newRoute.query.scrollTo;
            vm.$router.replace(newRoute);
          }
        }
      });
    });
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


      const filteredList = this.items;
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.tamañoAux = filteredList.length;
     
      return filteredList.slice(startIndex, endIndex);
    },
  },
  methods: {
    mostrarImagen(index) {
      return index >= this.startIndex && index < this.startIndex + this.itemsPerPage;
    },
    bloquearCaracteresNombre() {
      this.nombre = this.nombre.replace(/[^a-zA-Z\s]/g, '');
    },
    bloquearCaracteresApellido() {
      this.apellido = this.apellido.replace(/[^a-zA-Z\s]/g, '');
    },
    limitesTelefono(){
      this.limitarLongitudTelefono();
      this.bloquearETelefono();
    },
    limitarLongitudTelefono() {
        if (this.telefono.length > 8) {
          this.telefono = this.telefono.slice(0, 8);
        }
    },
    bloquearETelefono() {
      this.telefono = this.telefono.replace(/\D/g, '');
    },
    handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1000) {
        this.itemsPerPage = 9;
      } else if (windowWidth >= 600) {
        this.itemsPerPage = 4; 
      } else {
        this.itemsPerPage = 1;
      }
      this.currentPage = 1;
    },
    getSlides() {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1000) {
        return 3; 
      } else if (windowWidth >= 600) {
        return 2; 
      } else {
        return 1;
      }
    },
    handleScrollToSection(sectionId) {
      if (sectionId) {
        const targetSection = `#${sectionId}`;
        this.$scrollTo(targetSection, {
          offset: -100,
          behavior: 'smooth',  
        });
        this.$store.commit('clearSectionToScroll');
      }
    },
    enviarCorreo() {  
      this.cargando = true;
        const datosCorreo = {
          nombre: this.nombre,
          apellido: this.apellido,
          correo: this.correo,
          telefono: this.telefono,
          mensaje: this.mensaje
        };
    axios.post('http://localhost:8080/v1/correo', datosCorreo)
      .then(response => {
          this.limpiarFormulario();
                this.$notify({
                    title: 'Éxito',
                    text: 'Formulario enviado correctamente.',
                    type: 'success',
                 });
          this.cargando = false;
      })
      .catch(error => {
        console.error('Error al enviar el correo', error);
       
                  this.$notify({
                    title: 'Error',
                    text: 'Ups! hubo un problema. Intentelo de nuevo',
                    type: 'error',
                 });
          this.cargando = false;
      });
    },
    limpiarFormulario() {
      this.nombre = '' ;
      this.apellido = '' ;
      this.correo = '' ;
      this.telefono = '' ;
      this.mensaje = '' ;
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
  background-color: white;
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
  background-size: cover; 
  background-repeat: no-repeat; 
 
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
  margin-top: 40px;
  padding-bottom: 20px;
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
  padding-top: 40px;
}

/*GRID DE SALONES*/
.content_salones{
  background-color: #363636;
  width: 100%;
  
}

.motivation_grid{
  padding: 50px 50px 10px 50px;
  margin: 0px 20px 0px 20px;
}

.grid-containerHome {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 10px;
  background-color: transparent;
  place-items: center;
  justify-content: center;
  align-items: center;
}

.grid__itemHome{
  
  position: relative;

  display: inline-block;
  overflow: hidden;
  height: auto;
  cursor: pointer;
  width: 30vw; 
  height: 20vw;
}

.grid__itemHome h2{
  color: rgb(255, 255, 255); 
  padding-top: 5px;
  padding-bottom: 10px;
  text-align: center;
  font-size: 2vw;
}


.grid__itemHome p{
 
  padding:  0px;
  margin-top: 10px;
  font-size: 1vw;
  text-align: justify;
  overflow: auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
}
.motivation_grid .grid-containerHome img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.text-overlay {
 
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  padding: 20px;

  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  max-width: 100%;
}


.grid__itemHome:hover .text-overlay {
  opacity: 1;
}

.salones_titleHome{
  color: white;
  display: flex;
  padding-top: 50px;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

.salones_botones{
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  justify-content: end; 
 
  
}




.content_salones .v-pagination{
    color: white;
    padding-bottom: 10px;
}




/*FORMULARIO DE CONTACTO*/

.form_contact{
  background-color: #490859b2;
  width: 100%;
  font-family: Arial, sans-serif;
  position: relative; 
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

.form_item_one button{
 
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

.form_item_one button:hover {
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

.loader {
  position: fixed;
  top: 50%;
  left: 45%;
  transform: translate(-50%, -50%); 
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  z-index: 300;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 200; 
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (min-width: 1024px){
  .content_recomend img{
      height: 300px;
      width: 100%;
      object-fit: cover;
  }
 
}

@media  screen and (max-width: 1000px) {
  .content{
    padding: 0px 50px 0px 50px;
  }
  .swiper{
    margin-top: 20px;
    padding-bottom: 20px;
  }
  .content_home{
    flex-direction: column;
    padding-top: 20px;
  }
  .logo_home img{
    width: auto;
  }
  .text_home h2 {
    padding-bottom: 10px;
    margin-top: 50px;
   
  }
  .text_home p {
    margin-bottom: 50px;
  }
  .grid-containerHome {
    grid-template-columns: repeat(2, 1fr);
  }
  .logo_item{
    display: none;
  }
  .text_logo{
    padding: 50px 0px 50px 0px;
  }
  .form_item_one {
    max-width: 100%;
    width: auto;
  }
  .form_one{
    width: auto;
  }
  .grid__itemHome{
    width: 40vw; 
    height: 25vw;
  }
  .logo_home img:hover {
    transform: scale(0.9); 
    cursor: pointer; 
  }
  .grid__itemHome p{
    font-size: 1.5vw;
  }
  .grid__itemHome h2{
    padding-bottom: 0px;
    font-size: 2.5vw;
  }
}

@media  screen and (max-width: 870px) {
  .content_home{
    margin-top: 70px;
  }

}
@media  screen and (max-width: 600px) {

  .grid-containerHome {
    grid-template-columns: repeat(1, 1fr);
  }
  .text_items{
    width: 100%;
  }
  .form_one{
    flex-direction: column;
  }
  .text_items h3{
    font-size: 20px;
  }
  #numeros-pagina{
    font-size: 15px;
  }
  #siguiente{
    font-size: 15px;
  }
  #anterior{
    font-size: 15px;
  }
  .grid__itemHome{
    width: 50vw; 
    height: 50vw;
  }
  .motivation_grid{
    padding: 20px 20px 10px 20px;
  }
  .grid__itemHome p{
    font-size: 2vw;
  }
  .grid__itemHome h2{
    padding-bottom: 20px;
    font-size: 3vw;
  }
}
  @media  screen and (max-width: 460px) {

    #numeros-pagina{
      font-size: 10px;
    }
    #siguiente{
      font-size: 10px;
    }
    #anterior{
      font-size: 10px;
    }
  }

</style>