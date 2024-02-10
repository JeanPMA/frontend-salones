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

            <label>Nueva Imagen:</label>
            <input type="file" @change="handleFileChange" />

            <!-- Mostrar la imagen actual -->
            <img :src="detalleSalonDueño.banner_url" alt="Imagen actual" v-if="detalleSalonDueño.banner_url" />

            <div class="itemSalonDueño">
                <label>Descripcion:</label>
                <textarea type="detalleSalon" v-model="detalleSalonDueño.descripcion" required>{{detalleSalonDueño.descripcion}}</textarea>
               
            </div>
            
            <v-select
              v-model="serviciosSeleccionados"
              ref="miVSelect"
              :items="servicios"
              item-title="nombre"
              item-value="id"
              label="Selecciona los servicios"
              multiple
        
            ></v-select>

           
            <div class="itemSalonDueño">
                <label >Capacidad:</label>
                <input type="capacidadSalon:" v-model="detalleSalonDueño.capacidad" required>

            </div>

            <div class="itemSalonDueño">
                <label >Ubicacion:</label>
                <input type="ubicacionSalon:" v-model="detalleSalonDueño.direccion" required>

            </div>
            
            <div class="itemSalonDueño">
                <label >Tarifa:</label>
                <input type="precioAdelantoSalon" v-model="detalleSalonDueño.tarifa" required>
                <!--<input type="preciCompletoSalon" v-model="detalleSalonDueño.tarifa" required>-->

            </div>
            
            <div class="itemSalonDueño">
                    <label >Estado:</label>
                    <p>{{detalleSalonDueño.estado === 1 ? 'Habilitado' : 'Deshabilitado' }}</p>
                </div>
          
           
        </div>
    
        <div class="buttons_salonDueño">
            <a class="buttons_salonDueño buttonDueño-2" @click="volverAtras">VOLVER</a>
            <a href="#" class="buttons_salonDueño buttonDueño-1" @click="actualizarSalon">GUARDAR</a>
            <a href="#" class="buttons_salonDueño buttonDueño-3" v-if="detalleSalonDueño.estado === 1" @click="deshabilitarHabilitarSalon">DESHABILITAR</a>
            <a href="#" class="buttons_salonDueño buttonDueño-4" v-if="detalleSalonDueño.estado === 0" @click="deshabilitarHabilitarSalon">HABILITAR</a>
        </div>
       
    </div>
</div>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { ref } from 'vue';

export default {
name: 'DetalleSalonDueñoComponent',
data() {
    return {
      detalleSalonDueño: {
        nombre: "",
        direccion: "",
        capacidad: 0,
        descripcion: "",
        tarifa: 0,
        estado: 0,
        banner_url: "", 
      
      },
      nuevaImagen: null,
      detalleSalonDueño: {},     
      serviciosSeleccionados: [],

      servicios: [],
      errorServicios: false,
    };
  },
  mounted() {
      const salonId = this.$route.params.id;

      this.obtenerDetallesSalon(salonId);
      this.obtenerServicios();
  },
methods: {
    volverAtras (){
     this.$router.push({ name: 'lista-salones'});
    },
    handleFileChange(event) {
    const file = event.target.files[0];
    this.nuevaImagen = file;
    },
    async obtenerServicios() {
    try {
      const salonId = this.$route.params.id;
      await this.obtenerDetallesSalon(salonId);
      
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwt_decode(token);
      const userRole = decodedToken.roles[0];
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': userRole,
        },
      };

      const response = await axios.get('http://localhost:8080/v1/servicio', config);
      const serviciosEnBaseDeDatos = response.data;

      if (this.detalleSalonDueño && this.detalleSalonDueño.servicios) {
          const serviciosSeleccionadosIds = this.detalleSalonDueño.servicios.map(servicio => servicio.id);

          serviciosEnBaseDeDatos.forEach(servicio => {
            servicio.selected = serviciosSeleccionadosIds.includes(servicio.id);
          });

          this.servicios = serviciosEnBaseDeDatos;

          await new Promise(resolve => this.$nextTick(resolve));

          this.serviciosSeleccionados = serviciosEnBaseDeDatos.filter(servicio => servicio.selected);
          this.serviciosSeleccionados = this.serviciosSeleccionados.map(item => item.id);

      } else {
        console.error('Detalle de salón dueño no válido:', this.detalleSalonDueño);
      }
    
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    }
  },
  async obtenerDetallesSalon(id) {
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

      const response = await axios.get(`http://localhost:8080/v1/salon/${id}`, config);

  
      this.detalleSalonDueño = response.data;
     

    } catch (error) {
      console.error('Error al obtener detalles de la solicitud:', error);
    }
    },
    actualizarSalon() {
      
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

      const formData = new FormData();
      formData.append("nombre", this.detalleSalonDueño.nombre);
      formData.append("direccion", this.detalleSalonDueño.direccion);
      formData.append("capacidad", this.detalleSalonDueño.capacidad);
      formData.append("descripcion", this.detalleSalonDueño.descripcion);
      formData.append("tarifa", this.detalleSalonDueño.tarifa);
      formData.append("estado", this.detalleSalonDueño.estado);
            
      const vSelectComponent = this.$refs.miVSelect;

      if (vSelectComponent && vSelectComponent.selectedItems) {
        this.serviciosSeleccionados = vSelectComponent.selectedItems.map(item => item.id);
        console.log("if");
      } else {      
        
      }
      console.log(this.serviciosSeleccionados);

      formData.append('servicios', this.serviciosSeleccionados.join(','));     
      if (this.nuevaImagen) {
        formData.append('multipartFile', this.nuevaImagen);
      }

      console.log('Contenido de FormData:');
      for (const entry of formData.entries()) {
        console.log(entry);
      }
      this.$axios.put(`http://localhost:8080/v1/salon/${this.detalleSalonDueño.id}`, formData, config)
        .then(response => {
          console.log('Salón actualizado con éxito:', response.data);
        })
        .catch(error => {
          console.error('Error al actualizar el salón:', error);
        });
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