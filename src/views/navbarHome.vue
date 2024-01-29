<template>
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
                    <li><a href="#" v-scroll-to="'#section1'" :class="{ 'active': activeButton === 'button1' }" @click="setActiveButton('button1')">SALONES</a> </li>                 
                    <li><a href="#" v-scroll-to="'#section2'" :class="{ 'active': activeButton === 'button2' }" @click="setActiveButton('button2')">RECOMENDADOS</a></li>
                    <li><a href="#" v-scroll-to="'#section3'" :class="{ 'active': activeButton === 'button3' }" @click="setActiveButton('button3')">CONTACTANOS</a></li>
                  </div>
                  <div class="botones_alter" v-if="isLoggedIn">
                    <h3>{{ username }}</h3>
                    <button @click="logout">Cerrar Sesión</button>
                  </div>

                  <div class="botones_2" v-else>                    
                    <li>
                      <RouterLink to="/login">
                      <a href="#" class="boton boton-1">INICIAR SESIÓN</a>
                      </RouterLink>
                    </li>                    
                    <li>
                      <RouterLink to="/register">
                      <a href="#" class="boton boton-1">REGISTRARSE</a>
                      </RouterLink>
                    </li>
                  </div>
                  
                </ul>
              </nav>
            </div>
        </div>
</template>

<script>
import jwt_decode from 'jwt-decode';

export default {
  name: 'navbarHome',
  data() { 
    return {
    isActive: false,
    currentSection: null,
    isLoggedIn: false,
    username: ""
    }
  },
  mounted() {
    // Comprobar si hay un token al cargar el componente
    this.checkToken();
  },
methods: {
    setActiveButton(button) {
      this.activeButton = this.activeButton === button ? null : button;
    },
    checkToken() {
      const token = localStorage.getItem('jwtToken');
     
      if (token) {
        const decodedToken = jwt_decode(token);
        this.isLoggedIn = true;
        this.username = decodedToken.sub; 
      } else {
        
      }
    },
    logout() {
      this.$store.dispatch('logout', this.$router);
      this.isLoggedIn = false;
      this.username = "";
    }
}
}
</script>

<style>
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

.container__menu nav > ul{
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
.botones_alter{
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 100px;
 align-items: center;
}

.botones_alter h3{
  font-size: 15px;
  text-align: center;
}

.botones_alter button{
  padding-top: 5px;
  transition: all 300ms ease;
}

.botones_alter button:hover{
  color: #ff1100;
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

.botones a.active::after {
  width: 100%; 
}
.botones a.active {
  color: #ff1100;
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
  .boton-1{
      margin-top: 0px;
      padding: 15px;
  }
}


</style>