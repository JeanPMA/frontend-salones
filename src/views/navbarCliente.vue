<template>
<!-- containner__controla todo el navbar -->
<div class="menu_salones">
                <div class="menu">
                  <!-- clase checkbox para diseñor responsivo y click mediante un icono -->
                  <input type="checkbox" id="check__menu">
                  <label  for="check__menu" id="label__check">
                    <!-- clase para controlar estilos del icono -->
                    <i class="icon__menu"><font-awesome-icon :icon="['fas', 'bars']" /></i>
                  </label>
                  <nav>
                    <ul>

                    
                      <div class="botones"> 
                        <li><RouterLink to="/salones"><a href="#">SALONES</a></RouterLink> </li>                 
                        <li><RouterLink to="/recomendados"><a href="#">RECOMENDADOS</a></RouterLink></li>             
                        <li><RouterLink to="/buzon"><a href="#">BUZON</a></RouterLink></li>
                        <li><RouterLink to="/calendar"><a href="#">RESERVAR</a></RouterLink></li>
                      </div>
                    
                      <div class="userMenu">
                        <li><a href="#" >{{this.usuario}}</a> 
                          <ul>
                            <li><a href="#" @click="logout">LOG OUT</a></li>
                            <li><a href="#">CONFIGURACION</a></li>
                          </ul>
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
    name: 'navbarCliente',
    data() { 
    return {
          usuario: '',
      }
    },
    mounted() {   
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwt_decode(token);
      this.usuario = decodedToken.sub;
    },
    methods: {
      logout() {
      // Llamar a la acción de logout del store
        this.$store.dispatch('logout', this.$router);
      },
    }
}
</script>

<style>
/*BARRA DE NAVEGACION LOGIN CLIENTE*/
header{
    width: 100%;
    position: fixed;
    
    top: 0;
    left: 0;
    background: rgb(180, 180, 180);
    z-index: 2;
    color: #000000;
  }
  .menu_salones{
    width: 100%;
   
    background: rgb(255, 255, 255);
    
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
    z-index: 3;
    position: fixed;
  }
  
  
  .menu_salones nav > ul{
    list-style: none;
  
    display: flex;
    margin-top: 5px;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    height: 90px;
    padding-left: 50px;
    padding-right: 50px;
    
    
  }
  
  
 .menu_salones .botones{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
  
 .menu_salones .botones a{
    justify-content: center;
    text-decoration: none;
  }
  
 .menu_salones .botones a::after {
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
  
  .menu_salones .botones a:hover::after {
    width: 100%; /* Ancho completo al pasar el cursor sobre el elemento */
  }
  
  
  
  
 .menu_salones .botones a:hover {
    color: #ff1100;
  }
  
  
  
  .logoBotones{
    padding-right: 0px;
  }


  .userMenu{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    
  }
  
  .userMenu a{
    justify-content: center;
    text-decoration: none;
    
  }
  
  .userMenu > li > a::after {
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
  
   .userMenu a:hover::after {
    width: 100%; /* Ancho completo al pasar el cursor sobre el elemento */
    
  }
 
  .userMenu a:hover {
    color: #ff1100;
   
  }

  .userMenu li ul{
    transition: 0.3s ease-in;
  }

  
  
  @media  screen and (max-width: 973px) {
    
    
    .logoBotones{
      padding-right: 10px;
    }
  }
  
  
  
  

  
  /*  SUBMENU */
  
  .menu_salones nav ul li ul{
    width: 150px;
    
    display: flex;
    flex-direction: column;
    background: rgb(255, 255, 255);
    position: absolute;
    top: 35px;
    right: -30px;
   
   visibility: hidden;
    z-index: 2;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
   
    transition: all 200ms ease;
    opacity: 1;
  }
  
  nav ul li:hover ul{
    
    visibility: visible;
    opacity: 1;
    z-index: 2;
   
   
  }
  
  .menu_salones nav ul li ul::before{
    content: '';
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid rgb(221, 225, 234);
    
    position: absolute;
    top: -12px;
    left: 90px;
  }
  
  .menu_salones nav ul li ul li a{
    display: block;
    color: rgb(0, 0, 0);
    
   
    height: 30px;
    margin-top: 10px;
   
    font-size: 14px;
    opacity: 1;
   
  }
  
  .menu_salones nav ul li ul li a:hover{
   
    color: #000000;
    
    
    font-size: 14px;
    
  }

  .userMenu > li > ul > li > a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0; 
    height: 2px; 
    background-color: #ff1100; 
    transition: width 0.3s; 
    margin-bottom: 5px;
   
  }
  
  .userMenu > li > ul > li > a:hover::after {
    width: 100%; /* Ancho completo al pasar el cursor sobre el elemento */
  }

  
  /*  ELEMENTOS RESPONSIVOS */
  
  
  
  @media  screen and (max-width: 700px) {
  .menu_salones{
      position: fixed;
  }
  .menu_salones header{
      position: fixed;
      padding-bottom: 10px;
  }

  .menu_salones nav{
      height: 0%;
      margin-top: 25px;
  }
  .menu_salones nav a{
      padding-top: 10px;
      padding-bottom: 10px;
  }
  .menu_salones nav > ul{
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

  .menu_salones nav > ul > li{
      width: 100%;
  }

  .menu_salones nav > ul > li > a:hover{
      transform: scale(1);
      
  }
  .menu_salones nav ul li ul{
    top: 55px;
    right: -40px;
  }
  .menu_salones nav ul li ul li a{
    height: auto; 
    margin-top: auto;
  }
  .menu_salones nav > ul > li:hover ul{
      top: 50px;
  }


  .menu_salones #selected{
      transform: scale(1);
      background-size: 40px;
  }

  .menu_salones #label__check{
      display: block;
  }

  .menu_salones .icon__menu{
      display: flex;
      justify-content: center;
      padding-top: 25px;
      padding-left: 60px;
  }

  .menu_salones #check__menu:checked ~ nav > ul{
      height: 350px;
      visibility: visible;
      opacity: 1;
      flex-direction: column;
  }
  .menu_salones .botones{
    flex-direction: column;
  }
  .menu_salones .botones a::after{
    margin-bottom: 0px;
  }

  .menu_salones .userMenu > li > a::after{
    margin-bottom: 0px;
  }
  .menu_salones nav > ul {
    justify-content: center;
 
  }

}
  
</style>