<template>
    <header>
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
      </header>

      <div class="salones_list">
        <div class="salones_title">
          SALONES
        </div>
        <div class="salones_filter">
            <span class="icon"><i class="fa-solid fa-filter"></i></span>                     
            <a href="#" id="clickeable-label">FILTRO</a>
        </div>
          

        <div class="salones_grid">
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

</template>

<script>
    import salonesConfig  from "../js/salonesCliente.js"; 
    export default {
    name: 'salonesClienteComponent',
    methods: {
    ejecutar() {
      // Llamar a la función de animación uno
      salonesConfig();
    },
    }
    }
   

  
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
  
  /*GRID DE SALONES*/
.salones_list{
    background-color: #646464;
    width: 100%;
    margin-top: 80px;
  }
  
  .salones_grid{
    padding: 20px 50px 50px 50px;
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
    border-radius: 10px;
  
  }
  
  .grid__item h2{
    color: rgb(255, 255, 255); 
    padding-top: 10px;
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
  .salones_grid .grid-container img{
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
   font-size: 2vw;
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
  
.salones_filter{
    cursor: pointer;
    margin-left: 100px;
    text-align: start;
}

#clickeable-label{
    text-decoration: none;
    color: #000000;
}
</style>