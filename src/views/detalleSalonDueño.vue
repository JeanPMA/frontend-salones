<template>

    <div class="content_salonDueño">
        <div class="info_salon" v-if="detalleSalonDueño">
        <div class="salonDueño_title">
            <h2>{{detalleSalonDueño.nombre}}</h2>
            <img src="../img/1.png" alt="">
        </div>
         
        <div class="salonDueño_detalle">
            <div class="itemSalonDueño">
                <label>Nombre:</label>
                <input type="nombreSalon" v-model="detalleSalonDueño.nombre" required>
            </div>
            <div class="itemSalonDueño">
                <label>Descripcion:</label>
                <textarea type="detalleSalon" required>{{detalleSalonDueño.descripcion}}</textarea>
               
            </div>
            

            <div class="itemSalonDueño">
                <label >Servicios:</label>
                <input type="servicosSalon" v-model="detalleSalonDueño.servicios.nombre" required>
                
            </div>
            
            <div class="itemSalonDueño">
                <label >Ubicacion:</label>
                <input type="ubicacionSalon:" v-model="detalleSalonDueño.direccion" required>

            </div>
            
            <div class="itemSalonDueño">
                <label >Precios:</label>
                <input type="precioAdelantoSalon" v-model="detalleSalonDueño.tarifa" required>
                <input type="preciCompletoSalon" v-model="detalleSalonDueño.tarifa" required>

            </div>
            
            <div class="itemSalonDueño">
                    <label >Estado:</label>
                    <p>{{detalleSalonDueño.estado === 1 ? 'Habilitado' : 'Deshabilitado' }}</p>
                </div>
          
           
        </div>
    
        <div class="buttons_salonDueño">
            <a href="#" class="buttons_salonDueño buttonDueño-2" @click="volverAtras">VOLVER</a>
            <a href="#" class="buttons_salonDueño buttonDueño-1">GUARDAR</a>
            <a href="#" class="buttons_salonDueño buttonDueño-3" v-if="detalleSalonDueño.estado === 1" @click="deshabilitarHabilitarSalon">DESHABILITAR</a>
            <a href="#" class="buttons_salonDueño buttonDueño-4" v-if="detalleSalonDueño.estado === 0" @click="deshabilitarHabilitarSalon">HABILITAR</a>
        </div>
       
    </div>
</div>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default {
name: 'DetalleSalonDueñoComponent',
data() {
    return {
      detalleSalonDueño: null,   

      

    };
  },
  mounted() {
      const salonId = this.$route.params.id;

      this.obtenerDetallesSalon(salonId);
     // this.obtenerListaTipoSR();
  },
methods: {
    volverAtras (){
    // Utiliza el método go para volver atrás en la historia del navegador
     this.$router.push({ name: 'lista-salones'});
    },
    obtenerDetallesSalon(id) {
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwt_decode(token);

      const userRole = decodedToken.roles[0];
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': userRole
        }
      };

      axios.get(`http://localhost:8080/v1/salon/${id}`, config)
        .then(response => {
          this.detalleSalonDueño = response.data;
          console.log(this.detalleSalonDueño);
        })
        .catch(error => console.error('Error al obtener detalles de la solicitud:', error));
    },
    deshabilitarHabilitarSalon() {
            this.detalleSalonDueño.estado = this.detalleSalonDueño.estado === 0 ? 1 : 0;

            const token = localStorage.getItem('jwtToken');
            const decodedToken = jwt_decode(token);
            const userRole = decodedToken.roles[0];
            const username = decodedToken.sub;
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
                'X-User-Role': userRole,
              },
              params: {
                username: username,
              },
            }
            const data = { 
              id: this.detalleSalonDueño.id, 
              estado: this.detalleSalonDueño.estado 
            }
        
            axios.patch(`http://localhost:8080/v1/salon/${this.detalleSalonDueño.id}`, data, config)
            .then(response => {
            
              //this.$router.push({ name: 'lista-salones'});
            })
            .catch(error => {
              console.error('Error en la petición PUT:', error);
            });
      
    }
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

.content_salonDueño p{
  
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
 .content_salonDueño .buttonDueño-4{
   
   color: #ffffff; 
   border: 2px solid rgb(0, 255, 42);
   padding: 10px 20px 10px 20px;
   overflow: hidden;
   cursor: pointer;
   transition:  0.3s ease;
   align-items: center;
   width: 100%;
   height: 100%;  
  background-color: rgb(0, 255, 42);
  text-decoration: none;
}
 
.content_salonDueño .buttonDueño-4:hover{
   
   color: rgb(0, 255, 42);
   background-color: transparent;
   text-decoration: none;
 }
</style>