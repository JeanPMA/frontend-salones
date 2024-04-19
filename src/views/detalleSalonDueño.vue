<template>

    <div class="content_salonDueño">
        <div class="info_salon" v-if="detalleSalonDueño">
          <div class="salonDueño_container">
           
            <div class="salonDueño_column">
              <div class="salonDueño_title">
                  <h2>{{detalleSalonDueño.nombre}}</h2>
              </div>
              
              <div class="salonDueño_detalle">
                  <div class="itemSalonDueño" id="input_form">
                      <label>Nombre:</label>
                      <input type="text" pattern="[a-zA-Z0-9\s]+" maxlength="50" :counter="50" v-model="detalleSalonDueño.nombre" @input="manejarInputNombre" required>
                  </div>
                  <span v-if="mostrarErrorNombre" class="error-message">El nombre no puede estar vacío</span>

                  <div class="itemSalonDueño" id="input_form">
                      <label>Nueva Imagen: <h4>(Ingresar imagen solo en caso de modificación)</h4></label>
                      <input  type="file" @change="handleFileChange"/>
                  </div>

                  <div class="itemSalonDueño">
                      <label>Imagen Actual:</label>
                      <img :src="detalleSalonDueño.banner_url" alt="Imagen actual" v-if="detalleSalonDueño.banner_url" />
                  </div>

                  <div class="itemSalonDueño">
                      <label>Descripcion:</label>
                      <textarea type="detalleSalon"  v-model="detalleSalonDueño.descripcion" maxlength="200" :counter="200" @input="limpiarErrorDescripcion" required>{{detalleSalonDueño.descripcion}}</textarea>                   
                  </div>
                  <span v-if="mostarErrorDescripcion" class="error-message">El detalle no puede estar vacío</span>

                  <div class="itemSalonDueño" id="select_form">
                  <v-select
                    v-model="serviciosSeleccionados"
                    ref="miVSelect"
                    :items="servicios"
                    item-title="nombre"
                    item-value="id"
                    label="Selecciona los servicios"
                    multiple
                    @update:modelValue="handleServiciosChange"
                  ></v-select>
                   </div>
                  <p v-if="errorServicios">Por favor, selecciona al menos 1 opcion.</p>

                
                  <div class="itemSalonDueño" id="input_form">
                      <label >Capacidad:</label>
                      <input  v-model="detalleSalonDueño.capacidad"  maxlength="5" @input="manejarInputCapacidad" required>
                  </div>
                  <span v-if="mostrarErrorCapacidad" class="error-message">La capacidad no puede estar vacía</span>

                  <div class="itemSalonDueño" id="input_form">
                      <label >Dirección:</label>
                      <input  type="text" v-model="detalleSalonDueño.direccion" maxlength="100" @input="limpiarErrorDireccion" required>
                  </div>
                  <span v-if="mostrarErrorDireccion" class="error-message">La dirección no puede estar vacía</span>

                  <div class="itemSalonDueño" id="input_form">
                      <label >Tarifa:</label>
                      <input  v-model="detalleSalonDueño.tarifa" @input="manejarInputTarifa" required>
                  </div>
                  <span v-if="mostrarErrorTarifa" class="error-message">La tarifa no puede estar vacía</span>

                  <div class="itemSalonDueño">
                          <label >Estado:</label>
                          <h3>{{detalleSalonDueño.estado === 1 ? 'Habilitado' : 'Deshabilitado' }}</h3>
                      </div>
                
                
              </div>
          
              <div class="buttons_salonDueño">
                  <a class="buttons_salonDueño buttonDueño-2" @click="volverAtras">VOLVER</a>
                  <a href="#" class="buttons_salonDueño buttonDueño-3" v-if="detalleSalonDueño.estado === 1" @click="deshabilitarHabilitarSalon">DESHABILITAR</a>
                  <a href="#" class="buttons_salonDueño buttonDueño-4" v-if="detalleSalonDueño.estado === 0" @click="deshabilitarHabilitarSalon">HABILITAR</a>
              </div>
              <div class="buttons_salonDueño">
                  <a href="#" class="buttons_salonDueño buttonDueño-1" @click="actualizarSalon">{{ cargando ? 'GUARDANDO...' : 'GUARDAR SALÓN' }}</a>
              </div>
            </div>
          <div class="salonDueño_column">
            <label>Imagenes del Salón</label>
            <v-carousel v-if="imagenesSalon.length > 0">
              <v-carousel-item v-for="(imagen, index) in imagenesSalon" :key="index" :src="imagen.imagen_url" cover>
                <span @click="eliminarImagen(index, imagen.id)" class="delete-button" >
                  <font-awesome-icon :icon="['fas', 'trash']" />
                </span>
              </v-carousel-item>
              
            </v-carousel>
            <div v-else>
              <p>No hay imágenes disponibles.</p>
            </div>
           
            <div class="buttons_salonDueño_lista">
                  <label>Nueva Imagen:</label>
                  <input type="file" @change="imagenFileChange" />
                  <h4>(Presionar el boton en caso de agregar una imagen a la lista)</h4>
                  <a href="#" class="buttonDueñoLista-1" @click="añadirImagen">{{ cargando ? 'AÑADIENDO...' : 'AÑADIR IMAGEN' }}</a>
                
            </div>
            
          
          </div>
        </div>
      <div v-if="cargando" class="overlay"></div>
      
      <div v-if="cargando" class="loader"></div>
    </div>
   
</div>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import VueNotification from '@kyvg/vue3-notification';

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
      imagenSalonCollection: null,
      detalleSalonDueño: {},     
      serviciosSeleccionados: [],
      imagenesSalon: [],

      servicios: [],
      errorServicios: false,

      mostrarErrorNombre: false,
      mostarErrorDescripcion: false,
      errorServicios: false,
      mostrarErrorCapacidad: false,
      mostrarErrorTarifa: false,
      mostrarErrorDireccion: false,

      cargando: false,
    };
  },
  components: {
      VueNotification,
  },
  mounted() {
      const salonId = this.$route.params.id;

      this.obtenerDetallesSalon(salonId);
     
      this.obtenerServicios();
      this.obtenerImagenesSalon(salonId);
  },
methods: {
    volverAtras (){
     this.$router.push({ name: 'lista-salones'});
    },
    manejarInputNombre() {
    this.limpiarErrorNombre();
    this.limitarCaracteresEspeciales();
    },
    limpiarErrorNombre() {
      this.mostrarErrorNombre = false;
    },
    limpiarErrorDescripcion() {
      this.mostarErrorDescripcion = false;
    },
    limitarCaracteresEspeciales() {
      this.detalleSalonDueño.nombre = this.detalleSalonDueño.nombre.replace(/[^a-zA-Z0-9\s]/g, '');
    },
    handleServiciosChange() {
      this.errorServicios = false;
    },
    manejarInputTarifa() {
      this.limpiarErrorTarifa();
      this.limitarLongitudTarifa();
      this.bloquearETarifa();
    },
    limpiarErrorTarifa() {
      this.mostrarErrorTarifa = false;
    },
    bloquearETarifa() {
      this.detalleSalonDueño.tarifa= this.detalleSalonDueño.tarifa.replace(/\D/g, '');
    },
    limitarLongitudTarifa() {
      if (this.detalleSalonDueño.tarifa.length > 5) {
        this.detalleSalonDueño.tarifa= this.detalleSalonDueño.tarifa.slice(0, 5);
      }
    },
    manejarInputCapacidad() {
      this.limpiarErrorCapacidad();
      this.limitarLongitudCapacidad();
      this.bloquearECapacidad();
    },
    limpiarErrorCapacidad() {
      this.mostrarErrorCapacidad = false;
    },
    bloquearECapacidad() {
      this.detalleSalonDueño.capacidad= this.detalleSalonDueño.capacidad.replace(/\D/g, '');
    },
    limitarLongitudCapacidad() {
      if (this.detalleSalonDueño.capacidad.length > 5) {
        this.detalleSalonDueño.capacidad = this.detalleSalonDueño.capacidad.slice(0, 5);
      }
    },
    limpiarErrorDireccion() {
      this.mostrarErrorDireccion = false;
    },
    handleFileChange(event) {
    const file = event.target.files[0];
    this.nuevaImagen = file;
    },
    imagenFileChange(event) {
    const file = event.target.files[0];
    this.imagenSalonCollection = file;
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
      const apiUrl = process.env.VUE_APP_BASE_URL;
      const response = await axios.get(`${apiUrl}/v1/servicio/activo`, config);
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
      const apiUrl = process.env.VUE_APP_BASE_URL;
      const response = await axios.get(`${apiUrl}/v1/salon/${id}`, config);

  
      this.detalleSalonDueño = response.data;
     

    } catch (error) {
      console.error('Error al obtener detalles de la solicitud:', error);
    }
    },
    actualizarSalon() {
            this.mostrarErrorNombre = !this.detalleSalonDueño.nombre;
            this.mostarErrorDescripcion = !this.detalleSalonDueño.descripcion;
            this.errorServicios = this.serviciosSeleccionados.length === 0 ;
            this.mostrarErrorCapacidad = !this.detalleSalonDueño.capacidad;
            this.mostrarErrorTarifa = !this.detalleSalonDueño.tarifa;
            this.mostrarErrorDireccion = !this.detalleSalonDueño.direccion;
            if (this.mostrarErrorNombre || this.mostarErrorDescripcion || this.errorServicios || this.mostrarErrorCapacidad || this.mostrarErrorTarifa || this.mostrarErrorDireccion) {          
              return;
            }
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
      this.cargando = true;
      const formData = new FormData();
      formData.append("nombre", this.detalleSalonDueño.nombre);
      formData.append("direccion", this.detalleSalonDueño.direccion);
      formData.append("capacidad", this.detalleSalonDueño.capacidad);
      formData.append("descripcion", this.detalleSalonDueño.descripcion);
      formData.append("tarifa", this.detalleSalonDueño.tarifa);
      formData.append("estado", this.detalleSalonDueño.estado);
            
    


      formData.append('servicios', this.serviciosSeleccionados.join(','));     
      if (this.nuevaImagen) {
        formData.append('multipartFile', this.nuevaImagen);
      }
      const apiUrl = process.env.VUE_APP_BASE_URL;
      this.$axios.put(`${apiUrl}/v1/salon/${this.detalleSalonDueño.id}`, formData, config)
        .then(response => {
                this.$notify({
                  title: 'Éxito',
                  text: 'La información del salón se actualizó correctamente.',
                  type: 'success',
                });
                setTimeout(function() {
                  window.location.reload();
              }, 1000);
                this.cargando = false;
        })
        .catch(error => {
          this.$notify({
                title: 'Error',
                text: 'Error, nombre de salón modificado ya existente. Intentalo de nuevo',
                type: 'error',
              });
              this.cargando = false;
        });
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
      const apiUrl = process.env.VUE_APP_BASE_URL;
      const response = await axios.get(`${apiUrl}/v1/imagen-salon/${id}/imagenes`, config);  
      this.imagenesSalon = response.data;
      } catch (error) {
        console.error('Error al imagenes:', error);
      }
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
            const apiUrl = process.env.VUE_APP_BASE_URL;
            axios.patch(`${apiUrl}/v1/salon/${this.detalleSalonDueño.id}`, data, config)
            .then(response => {
              this.$notify({
                  title: 'Éxito',
                  text: 'El estado del salón se actualizó correctamente.',
                  type: 'success',
                });
            })
            .catch(error => {
              this.$notify({
                  title: 'Error',
                  text: 'Hubo un problema al actualizar el estado. Intentalo de nuevo',
                  type: 'error',
                });
            });
      
    },
    añadirImagen(){
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
            this.cargando = true;
            const formData = new FormData();
            formData.append('multipartFile', this.imagenSalonCollection);
            formData.append('idSalon', this.detalleSalonDueño.id);
            const apiUrl = process.env.VUE_APP_BASE_URL;
            this.$axios.post(`${apiUrl}/v1/imagen-salon`, formData, config)
              .then(response => {
                this.$notify({
                  title: 'Éxito',
                  text: 'La imagen se guardó correctamente.',
                  type: 'success',
                });
                setTimeout(function() {
                    window.location.reload();
                }, 1000);
                this.cargando = false;
              })
              .catch(error => {
                if (error.response && error.response.status === 401) {
                    this.$notify({
                        title: 'Error',
                        text: 'Error, limite de imagenes por salon alcanzado.',
                        type: 'error',
                    });
                    this.cargando = false;
                } else {
                    this.$notify({
                        title: 'Error',
                        text: 'Hubo un problema al guardar la imagen. Intentalo de nuevo',
                        type: 'error',
                    });
                    this.cargando = false;
                }
              
              });
           
    },
    eliminarImagen(index, imagenId) {
            this.cargando = true;
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
            const apiUrl = process.env.VUE_APP_BASE_URL;
            axios.delete(`${apiUrl}/v1/imagen-salon/${imagenId}`, config)
            .then(response => {
              this.imagenesSalon.splice(index, 1);
              this.$notify({
                  title: 'Éxito',
                  text: 'La imagen se eliminó correctamente.',
                  type: 'success',
                });
              setTimeout(function() {
                  window.location.reload();
              }, 1000);
              this.cargando = false;
            })
            .catch(error => {
              this.$notify({
                  title: 'Error',
                  text: 'Hubo un problema al eliminar la imagen. Intentalo de nuevo',
                  type: 'error',
                });
              this.cargando = false;
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
  position: relative;  
}

.info_salon{
  background-color: rgb(222, 222, 222);
  padding: 30px 180px 30px 150px;
  border-radius: 20px;
}

.salonDueño_title{
  text-align: center;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 20px;
}

.salonDueño_detalle {
  display: flex;
  flex-direction: column;
}

.content_salonDueño .itemSalonDueño {
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
}

.itemSalonDueño label {
  font-weight: bold;
  text-align: start;
  align-self: start;
  margin-right: 20px;
  font-size: 20px;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.itemSalonDueño img {
  width: 300px;
  height: 300px;
  object-fit: cover; 
  margin-left: auto;
  margin-right: auto;
}

.content_salonDueño #input_form input { 
  color: #0000006a;
  text-align: justify;
  background-color: transparent;
  border: 2px solid rgb(0, 0, 0);
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
}

.content_salonDueño #select_form input { 
  align-items: start;
}

.content_salonDueño p{ 
  color: red;
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
  text-align: start;
}

.content_salonDueño .itemSalonDueño h4{ 
  color: #0000006a;
  font-size: 15px;
}

.content_salonDueño .itemSalonDueño h3{ 
  color: #0000006a;
  font-size: 18px;
  text-align: start;
}

.content_salonDueño .itemSalonDueño label{
  text-align: start; 
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
  resize: none;
  width: 100%;
}

.content_salonDueño .buttons_salonDueño{
  margin-right: 10px;
  color: rgb(33, 117, 155);
  justify-items: center;
  text-decoration: none;
  margin-top: 20px;
  border-radius: 5px;
}

.content_salonDueño .buttonDueño-1{
  color: rgb(255, 255, 255);
  border: 2px solid rgb(1, 85, 180);
  padding: 10px 20px 10px 20px;
  overflow: hidden;
  cursor: pointer;
  transition:  0.3s ease;
  align-items: center;
  width: 100%;
  height: 100%;  
  background-color: rgb(1, 85, 180);
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


/* 2DA COLUMNA */
 .salonDueño_container {
    display: flex;
    flex-direction: row;
    gap: 50px; 
    width: 100%;

}

.salonDueño_column {
    flex: 1;
    
}
.salonDueño_container > .salonDueño_column:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
  background-color: transparent; 
  color: red;
  padding: 5px;
  cursor: pointer;
}
.salonDueño_column .buttons_salonDueño_lista{
     display: flex;
    flex-direction: column;
    color: rgb(0, 0, 0);
    justify-items: center;
    text-decoration: none;
    margin-top: 50px;
}


.salonDueño_column label{
  text-align: center;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.content_salonDueño .buttonDueñoLista-1{
    color: rgb(255, 255, 255);
    text-decoration: none;
    border: 2px solid rgb(1, 85, 180);
    padding: 10px 20px 10px 20px;
    overflow: hidden;
    cursor: pointer;
    transition:  0.3s ease;
    align-items: center;
    border-radius: 5px;
    background-color: rgb(1, 85, 180);
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
}
.v-window{
  border: 2px solid rgb(0, 0, 0);

}

.content_salonDueño .buttonDueñoLista-1:hover{ 
    color: #000000; 
    background-color: transparent;
  }
.content_salonDueño .buttons_salonDueño_lista h4{
    color: #0000006a;
    font-size: 15px;
    margin-top: 10px;
  }

@media  screen and (max-width: 1000px) {
    .info_salon {
      padding: 30px 20px 30px 20px;
    }
}

@media  screen and (max-width: 730px) {
    .salonDueño_container{
      flex-direction: column;
    }
}
@media  screen and (max-width: 350px) {
    .info_salon {
      padding: 30px 5px 30px 5px;
    }
    .content_salonDueño .buttonDueñoLista-1{
      width: auto;
    }
    .content_salonDueño .buttons_salonDueño{
      display: flex;
      flex-direction: column;
      margin-top: 5px;
    }
    .itemSalonDueño img{
      width: 90vw;
    }
}
</style>