<template>
<!-- containner__controla todo el navbar -->
<div class="menu_salones">
                <div class="menu">
                  <!-- clase checkbox para diseñor responsivo y click mediante un icono -->
                  <input type="checkbox" id="check__menu">
                  <label  for="check__menu" id="label__check">
                    <!-- clase para controlar estilos del icono -->
                    <font-awesome-icon :icon="['fas', 'user']" />
                  </label>
                  <nav>
                    <ul>
                      <div class="logoBotones">
                        <li><a href="/" id="selected"></a></li>
                        <li><a href="#"></a></li>
                      </div>
                    
                      <div class="botones"> 
                        <li><RouterLink to="/salones"><a href="#">SALONES</a></RouterLink> </li>                 
                        <li><RouterLink to="/recomendados"><a href="#">RECOMENDADOS</a></RouterLink></li>             
                        <li><RouterLink to="/buzon"><a href="#">BUZON</a></RouterLink></li>
                        <li><RouterLink to="/calendar"><a href="#">RESERVAR</a></RouterLink></li>
                      </div>
                    
                      <div class="userMenu">
                        <li><a href="#" >USUARIO</a> 
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
export default {
    name: 'navbarCliente',
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
  
  
  nav > ul{
    list-style: none;
  
    display: flex;
    margin-top: 5px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between; /* Centra horizontalmente */
     /* Centra verticalmente */
    height: 10vh;
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
  
  nav ul li ul{
    width: 150px;
    
    display: flex;
    flex-direction: column;
    background: rgb(255, 255, 255);
    position: absolute;
    top: 35px;
    right: -10px;
   
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
  
  nav ul li ul::before{
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
  
  nav ul li ul li a{
    display: block;
    color: rgb(0, 0, 0);
    
   
    height: 30px;
    margin-top: 10px;
   
    font-size: 14px;
    opacity: 1;
   
  }
  
  nav ul li ul li a:hover{
   
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
  
  
  
  @media  screen and (max-width: 100px) {
    .menu_salones{
        position: fixed;
    }
    
    .btn.btn-1{
        margin-top: 0px;
        padding: 15px;
    }
  }
  
</style>