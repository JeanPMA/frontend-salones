<template>

    <div class="content_salonDueño">
        <div class="info_salon">
        <div class="salonDueño_title">
            <h2>SALON DE EVENTOS BLABLABLA</h2>
            <img src="../img/1.png" alt="">
        </div>
        
        <div class="salonDueño_detalle">
            <div class="itemSalonDueño">
                <label>Nombre:</label>
                <input type="nombreSalon" value="SALON DE EVENTOS BLABLABLA" required>
            </div>
            <div class="itemSalonDueño">
                <label>Descripcion:</label>
                <textarea type="detalleSalon" required>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content  here, content here'</textarea>
               
            </div>
            

            <div class="itemSalonDueño">
                <label >Servicios:</label>
                <input type="servicosSalon" value="It is a long established fact that a reader will be distracted by the readable content of a page " required>
                
            </div>
            
            <div class="itemSalonDueño">
                <label >Ubicacion:</label>
                <input type="ubicacionSalon:" value="It is a long established fact that a reader will be distracte when looking at its layout." required>

            </div>
            
            <div class="itemSalonDueño">
                <label >Precios:</label>
                <input type="precioAdelantoSalon" value="It is a long established fact that a reader will " required>
                <input type="preciCompletoSalon" value="The point of using Lorem " required>

            </div>
            

          
           
        </div>
    
        <div class="buttons_salonDueño">
            <a href="#" class="buttons_salonDueño buttonDueño-2" @click="volverAtras">VOLVER</a>
            <a href="#" class="buttons_salonDueño buttonDueño-1">GUARDAR</a>
            <a href="#" class="buttons_salonDueño buttonDueño-3">DESHABILITAR</a>
        </div>
       
    </div>
</div>
</template>

<script>


export default {
name: 'DetalleSalonDueñoComponent',
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
.content_salonDueño{
    background-color: rgb(196, 196, 196);
    color: rgb(0, 0, 0);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   
}
.info_salon{
    background-color: rgb(255, 255, 255);
    margin: 20px 20px 20px 20px;
    padding: 30px;
    border-radius: 20px;
}
.salonDueño_title{
    text-align: center;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 20px;
}

.salonDueño_title img{
    width: 400px;
    height: 200px;
    border-radius: 20px;
    margin-top: 20px;
}

.salonDueño_detalle {
  display: flex;
  flex-direction: column;
  
 width: 70vw;
}

.content_salonDueño .itemSalonDueño {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.itemSalonDueño label {
  font-weight: bold;
  text-align: left;
  margin-right: 20px;
  font-size: 20px;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.content_salonDueño input{
  
  color: #0000006a;
 
  text-align: justify;
  background-color: transparent;
  border: 2px solid rgb(0, 0, 0);
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  flex: 1; 
  width: 100%;
  margin-top: 10px;
}
.content_salonDueño textarea{
  
  color: #0000006a;
  height: 150px;
  text-align: justify;
  background-color: transparent;
  border: 2px solid rgb(0, 0, 0);
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 10px;
  resize: none;
  width: 100%;
}

.content_salonDueño .buttons_salonDueño{
    margin-right: 10px;
    color: rgb(33, 117, 155);
    justify-items: center;
    text-decoration: none;
    margin-top: 10px;
    border-radius: 5px;
    
  }
.content_salonDueño .buttonDueño-1{
    color: rgb(255, 255, 255);
    
    border: 2px solid rgb(0, 32, 176);
    padding: 10px 20px 10px 20px;
    overflow: hidden;
    cursor: pointer;
    transition:  0.3s ease;
    align-items: center;
    width: 100%;
    height: 100%;  
    background-color: rgb(0, 32, 176);
   
}
  
.content_salonDueño .buttonDueño-1:hover{
    
    color: #000000; 
    background-color: transparent;
  }

  .content_salonDueño .buttonDueño-2{
   
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
 
.content_salonDueño .buttonDueño-2:hover{
   
   color: rgb(0, 0, 0);
   background-color: rgb(255, 255, 255);
   text-decoration: none;
 }
 
  .content_salonDueño .buttonDueño-3{
   
   color: #ffffff; 
   border: 2px solid rgb(255, 0, 0);
   padding: 10px 20px 10px 20px;
   overflow: hidden;
   cursor: pointer;
   transition:  0.3s ease;
   align-items: center;
   width: 100%;
   height: 100%;  
  background-color: rgb(255, 0, 0);
  text-decoration: none;
}
 
.content_salonDueño .buttonDueño-3:hover{
   
   color: rgb(255, 0, 0);
   background-color: transparent;
   text-decoration: none;
 }
</style>