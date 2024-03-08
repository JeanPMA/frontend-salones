<template>

    <div class="content_detalleSalon" v-if="detalleSalon">
        <div class="detalleSalon_title">
            <h2>{{ detalleSalon.nombre }}</h2>
            <img :src="detalleSalon.banner_url" alt="">
        </div>
        
        <div class="detalleSalon_text">
            <div class="item">
                <label>Descripcion:</label>
                <p>{{detalleSalon.descripcion}}</p>
            </div>
            

            <div class="item" v-if="detalleSalon.servicios && detalleSalon.servicios.length > 0">
                <label >Servicios:</label>
                <p>
                  {{ detalleSalon.servicios.map(servicio => servicio.nombre).join(', ') }}
                </p>
            </div>
            <div class="item" v-else>
              <label >Servicios:</label>
              <p>No hay servicios disponibles.</p>
            </div>

            <div class="item">
                <label >Ubicacion:</label>
                <p>{{detalleSalon.direccion}}</p>
            </div>
            
            <div class="item">
                <label >Precio Completo / <br> Precio anticipo:</label>
                <p>{{detalleSalon.tarifa}} </p>
                <p> {{detalleSalon.tarifa}}</p>
            </div>
            

          
           
        </div>
        <div class="imagenes_salon">
          <v-carousel v-if="imagenesSalon.length > 0">
              <v-carousel-item v-for="(imagen, index) in imagenesSalon" :key="index" :src="imagen.imagen_url" cover>
              </v-carousel-item>
              
            </v-carousel>
        </div>
        <div class="button_reservar">
            <a href="#" class="button_reservar button-2" @click="volverAtras">CANCELAR</a>
            <a href="#" class="button_reservar button-1" @click="irASolicitud">RESERVAR</a>
        </div>
       
    </div>
</template>

<script>
 import axios from 'axios';
  import jwt_decode from 'jwt-decode';

export default {
name: 'salonDetalleComponent',
  data() {
    return {
      detalleSalon: null, 
      imagenesSalon: [],
    };
  },
  components: {
      
  },
  mounted() {
      const salonId = this.$route.params.id;

      this.obtenerDetallesSalon(salonId);
      this.obtenerImagenesSalon(salonId);

  },
  methods: {
      volverAtras (){
        this.$router.push({ name: 'salones' });
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
          this.detalleSalon = response.data;
        })
        .catch(error => console.error('Error al obtener detalles del salón:', error));
      },
      async obtenerImagenesSalon(id) {
    try {
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwt_decode(token);

      const userRole = decodedToken.roles[0];
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': userRole
        }
      };

      const response = await axios.get(`http://localhost:8080/v1/imagen-salon/${id}/imagenes`, config);  
      this.imagenesSalon = response.data;
      } catch (error) {
        console.error('Error al imagenes:', error);
      }
    },
      irASolicitud(arg) {
      
        const nombreSalonSeleccionado = this.detalleSalon.nombre;
        
      this.$router.push({ name: 'solicitud', params: { nombreSalon: nombreSalonSeleccionado} });
      
    },
  }
}
</script>

<style>
.content_detalleSalon{
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    height: 100vh;
    display: flex;
    flex-direction: column;

}
.detalleSalon_title{
    text-align: center;
    margin-bottom: 20px;
    margin-top: 20px;
}

.detalleSalon_title img{
    width: 400px;
    height: 200px;
    border-radius: 20px;
    margin-top: 20px;
    border: 1px solid #000000;
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

.content_detalleSalon .item p {
  overflow: auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;

   
}

.item label {
  font-weight: bold;
  text-align: left;
  margin-right: 20px;
  width: 150px;
}

.content_detalleSalon p {
  
  color: #000000;
  margin-left: 10px; 
  text-align: justify;
  background-color: #6666668b;
  padding: 15px 30px 15px 30px;
  border-radius: 5px;
  font-size: 16px;
  flex: 1; 
}

.content_detalleSalon .button_reservar{
    margin: 20px 5px 10px 5px;
    color: rgb(33, 117, 155);
    justify-items: end;
    text-decoration: none;
    padding-bottom: 20px;
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
 .imagenes_salon{
    display: flex;
    margin-left: auto;
    margin-right: auto;
    width: 40vw;
 }  
 @media  screen and (max-width: 1200px) {
  .imagenes_salon{
    width: 60vw;
 }  
 }

 @media  screen and (max-width: 620px) {
  .detalleSalon_title h2{
    padding-top: 20px;
  }
  .content_detalleSalon{
    display: grid;
  }
  .content_detalleSalon .item {
   display: grid;
  }
  .item label{
    margin-right: 0px;
    margin-left: 10px;
  }
  .content_detalleSalon p{
    margin-top: 10px;
  }
  .detalleSalon_title img{
    width: 80vw;
    height: 25vh;
  }
  .detalleSalon_title{
    margin-bottom: 0px;
    }
  .imagenes_salon{
    width: 80vw;
  }  
 }

</style>