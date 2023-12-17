<template>

    <div class="content_detalleSalon">
        <div class="detalleSalon_title">
            <h2>SALON DE EVENTOS BLABLABLA</h2>
            <img src="../img/1.png" alt="">
        </div>
        
        <div class="detalleSalon_text">
            <div class="item">
                <label>Descripcion:</label>
                <p>It is a long established fact that a reader will 
                be distracted by the readable content of a page 
                when looking at its layout. The point of using Lorem 
                Ipsum is that it has a more-or-less normal distribution 
                of letters, as opposed to using 'Content 
                here, content here'</p>
            </div>
            

            <div class="item">
                <label >Servicios:</label>
                <p>It is a long established fact that a reader will 
                be distracted by the readable content of a page 
                when looking at its layout. The point of using Lorem 
                Ipsum is that it has a more-or-less normal distribution 
                of letters, as opposed to using 'Content 
                here, content here'</p>
            </div>
            
            <div class="item">
                <label >Ubicacion:</label>
                <p>It is a long established fact that a reader will 
                    be distracted by the readable content of a page 
                    when looking at its layout.</p>
            </div>
            
            <div class="item">
                <label >Precio Completo / <br> Precio anticipo:</label>
                <p>It is a long established fact that a reader will 
                be distracted </p>
                <p> The point of using Lorem 
                Ipsum is that </p>
            </div>
            

          
           
        </div>
    
        <div class="button_reservar">
            <a href="#" class="button_reservar button-2" @click="volverAtras">CANCELAR</a>
            <a href="#" class="button_reservar button-1">RESERVAR</a>
        </div>
       
    </div>
</template>

<script>


export default {
name: 'salonDetalleComponent',
components: {
    
},
methods: {
    volverAtras (){
  // Utiliza el método go para volver atrás en la historia del navegador
  this.$router.go(-1);
},
}
}
</script>

<style>
.content_detalleSalon{
    background-color: black;
    color: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.detalleSalon_title{
    text-align: center;
}

.detalleSalon_title img{
    width: 400px;
    height: 200px;
    border-radius: 20px;
    margin-top: 20px;
}

.detalleSalon_text {
  display: flex;
  flex-direction: column;
  margin: 30px 50px 20px 50px;
  
}

.content_detalleSalon .item {
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
}

.item label {
  font-weight: bold;
  text-align: left;
  margin-right: 20px;
  width: 150px;
}

.content_detalleSalon p {
  
  color: #ffffffa4;
  margin-left: 10px; 
  text-align: justify;
  background-color: #6666668b;
  padding: 15px 30px 15px 30px;
  border-radius: 5px;
  font-size: 16px;
  flex: 1; 
}

.content_detalleSalon .button_reservar{
    margin-right: 10px;
    color: rgb(33, 117, 155);
    justify-items: end;
    text-decoration: none;
  }
.content_detalleSalon .button-1{
    color: rgb(0, 0, 0);
    
    border: 2px solid rgb(45, 45, 45);
    padding: 10px 20px 10px 20px;
    overflow: hidden;
    cursor: pointer;
    transition:  0.3s ease;
    align-items: center;
    width: 100%;
    height: 100%;  
    background-color: rgb(255, 255, 255);
   
}
  
.content_detalleSalon .button-1:hover{
    
    color: #ffffff; 
    background-color: rgb(54, 54, 54);
  }

  .content_detalleSalon .button-2{
   
   color: #ffffff; 
   border: 2px solid rgb(45, 45, 45);
   padding: 10px 20px 10px 20px;
   overflow: hidden;
   cursor: pointer;
   transition:  0.3s ease;
   align-items: center;
   width: 100%;
   height: 100%;  
  background-color: rgb(54, 54, 54);
  text-decoration: none;
}
 
.content_detalleSalon .button-2:hover{
   
   color: rgb(0, 0, 0);
   background-color: rgb(255, 255, 255);
   text-decoration: none;
 }
</style>