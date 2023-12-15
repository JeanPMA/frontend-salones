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
                        <li><a href="#">SALONES</a> </li>                 
                        <li><a href="#">RECOMENDADOS</a></li>
                        <li><a href="#">CONTACTANOS</a></li>
                        <li><a href="#">BUZON</a></li>
                        <li><a href="#">RESERVAR</a></li>
                      </div>
                    
                      <div class="userMenu">
                        <li><a href="#" >USUARIO</a> 
                          <ul>
                            <li><a href="#">LOG OUT</a></li>
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
    justify-content: space-between; /* Centra horizontalmente */
     /* Centra verticalmente */
    height: 10vh;
    padding-left: 50px;
    padding-right: 50px;
    
    
  }
  
  nav  ul  li{
    display: inline;
      margin: 0 10px; /* Espacio entre elementos de la lista */
      position: relative;
      cursor: pointer;
    justify-content: center;
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
  
  
  nav > ul > li:first-child > a{
      /*background-image: url(../img/OSOS_LOGO_1.png);*/
    background-size: 80px;
    background-repeat: no-repeat;
    background-position: center center;
    padding: 20px 40px;
  }
  
  nav > ul > li:first-child:hover > a{
    /*background-image: url(../img/OSOS_LOGO_1.png);*/
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
    .menu_salones{
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
  
</style>