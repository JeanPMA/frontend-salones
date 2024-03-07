<template>
<div class="container__menu">
            <div class="menu">
              <input type="checkbox" id="check__menu">
              <label  for="check__menu" id="label__check">
                <i class="icon__menu"><font-awesome-icon :icon="['fas', 'bars']" /></i>
              </label>
              <nav>
                <ul>
                  <!-- <div class="logoBotones">
                    <li><a href="/" id="selected"></a></li>
                    <li><a href="#"></a></li>
                  </div>-->
                
                  <div class="botones"> 
                    <li><a href="#" @click="scrollToSection('section1')">SALONES</a> </li>                 
                    <li><a href="#" @click="scrollToSection('section2')">RECOMENDADOS</a></li>
                    <li><a href="#" v-scroll-to="'#section3'" >CONTACTANOS</a></li>
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
    this.checkToken();
  },
methods: {
   
    scrollToSection(sectionId) {
      this.$store.commit('setSectionToScroll', sectionId);
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
  margin-bottom: 5px;
  width: 100%;
  
  justify-content: center; 
  height: 10vh;
 
  
  
}

nav  ul  li{
  display: inline;
    margin: 0 10px; 
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
  width: 0; 
  height: 2px; 
  background-color: #ff1100;
  transition: width 0.3s; 
  margin-bottom: -33px;
}

 .botones a:hover::after {
  width: 100%; 
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

@media  screen and (max-width: 870px) {
  .container__menu{
      position: fixed;
  }
  .container__menu header{
      position: fixed;
      padding-bottom: 10px;
  }

  .container__menu nav{
      height: 0%;
      margin-top: 25px;
  }
  .container__menu nav a{
      padding-top: 25px;
      padding-bottom: 25px;
  }
  .container__menu nav > ul{
      flex-direction: column;
      background-color: rgb(255, 255, 255);
      position: fixed;
      left: 0;
      top: 70px;
      width: 100%;
      height: 0px;
      transition: all 200ms ease;
      z-index: 2;
      opacity: 0;
      visibility: hidden;
  }

  .container__menu nav > ul > li{
      width: 100%;
  }

  .container__menu nav > ul > li > a:hover{
      transform: scale(1);
      
  }
  .container__menu nav ul li ul{
      left: 100px;
  }
  .container__menu nav > ul > li:hover ul{
      top: 50px;
  }


  .container__menu #selected{
      transform: scale(1);
      background-size: 40px;
  }

  .container__menu #label__check{
      display: block;
  }

  .container__menu .icon__menu{
      display: flex;
      justify-content: center;
      padding-top: 25px;
      padding-left: 60px;
  }

  .container__menu #check__menu:checked ~ nav > ul{
      height: 250px;
      visibility: visible;
      opacity: 1;
      flex-direction: row;
  }
  .container__menu .botones{
    flex-direction: column;
  }
  .container__menu .boton-1{
      margin-top: 0px;
      padding: 15px;
  }
  .container__menu .botones a::after{
    margin-bottom: 0px;
  }
  .container__menu .botones_2{
    flex-direction: column;
    padding-left: 10px;
  }
  .container__menu nav > ul {
    justify-content: space-around;
 
  }
  
}

@media  screen and (max-width: 400px) {
  .container__menu #check__menu:checked ~ nav > ul{
      height: 400px;
      flex-direction: column;
  }

}

</style>