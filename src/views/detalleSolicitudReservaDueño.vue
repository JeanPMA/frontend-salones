<template>
    <div class="body_detalleSR" >
        <div class="content_detalleSR"  v-if="detalleSolicitudDueño">
            <font-awesome-icon :icon="['fas', 'circle-info']" />
            <h2>SOLICITUD-RESERVA</h2>
            <div class="info_detalleSR" >
                <div class="detalle_itemSR">
                    
                    <h3><font-awesome-icon :icon="['fas', 'calendar-days']" />Fecha de Evento:</h3>
                    <p>{{detalleSolicitudDueño.fecha_reserva}} </p>
                </div>
                

                <div class="detalle_itemSR">
                    <h3><font-awesome-icon :icon="['fas', 'circle-question']" />Motivo:</h3>
                  <p>{{detalleSolicitudDueño.motivo}}</p>
                </div>
               

                <div class="detalle_itemSR">
                    <h3><font-awesome-icon :icon="['fas', 'bell-concierge']" />Servicios: </h3>
                    <p>{{detalleSolicitudDueño.servicio}}
                    </p>
                </div>
                
                
                <div class="detalle_itemSR">
                    <h3><font-awesome-icon :icon="['fas', 'message']" />Detalle Extra:</h3>
                    <p>{{detalleSolicitudDueño.detalle}} 
                    </p>
                </div>
                

                <div class="detalle_itemSR">
                    <h3><font-awesome-icon :icon="['fas', 'calendar']" />Fecha de solicitud:</h3>
                    <p>{{detalleSolicitudDueño.fecha_emision}}</p>
                </div>
                

                <div class="detalle_itemSR">
                    <h3><font-awesome-icon :icon="['fas', 'diagram-project']" />Estado:</h3>
                    <p>{{detalleSolicitudDueño.tipoSR.nombre}}</p>
                </div>
               
            </div>
            <div class="botones_SolicitudReserva">
                <a id="atras"  @click="volverAtras">VOLVER</a>
                <a id="rechazar" v-if="detalleSolicitudDueño.tipoSR.nombre === 'PENDIENTE'" @click="rechazarReserva"  :disabled="cargando">{{ cargando ? 'RECHAZANDO...' : 'RECHAZAR' }}</a>   
                <a id="cancelar" v-if="detalleSolicitudDueño.tipoSR.nombre === 'ACEPTADO'" @click="cancelarReserva"  :disabled="cargando">{{ cargando ? 'CANCELANDO...' : 'CANCELAR' }}</a>                
                <a id="aceptar" v-if="detalleSolicitudDueño.tipoSR.nombre === 'PENDIENTE'" @click="aceptarReserva"  :disabled="cargando">{{ cargando ? 'ACEPTANDO...' : 'ACEPTAR' }}</a>
                <a id="eliminar" v-if="detalleSolicitudDueño.tipoSR.nombre === 'RECHAZADO' || detalleSolicitudDueño.tipoSR.nombre === 'CANCELADO' || fechaReservaMenorActual"  @click="eliminarReserva"  :disabled="cargando">{{ cargando ? 'ELIMINANDO...' : 'ELIMINAR' }}</a>

            </div>  
        </div>
        <div v-if="cargando" class="overlay"></div>    
        <div v-if="cargando" class="loader"></div>
    </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import VueNotification from '@kyvg/vue3-notification';

export default {
  name: 'detalleSolicitudReservaComponent',
  data() {
    return {
      detalleSolicitudDueño: null, 
      listaTipoSR: [], 
      cargando: false,
    };
  },
  components: {
      VueNotification,
    },
  mounted() {
      const solicitudReservaId = this.$route.params.id;

      this.obtenerDetalleSolicitudDueño(solicitudReservaId);
      this.obtenerListaTipoSR();
  
  },
  computed: {
  fechaReservaMenorActual() {
    const fechaReserva = new Date(this.detalleSolicitudDueño.fecha_reserva);
    const fechaActual = new Date();
    return fechaReserva < fechaActual;
 
  }
  },
  methods: {
 
    volverAtras (){
      if(this.detalleSolicitudDueño.tipoSR.nombre === "PENDIENTE" || this.detalleSolicitudDueño.tipoSR.nombre === "RECHAZADO"){        
        this.$router.push({ name: 'lista-solicitudes'});
      }else{
        this.$router.push({ name: 'lista-reservas'});
      }
        
    },

    obtenerDetalleSolicitudDueño(id) {
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
      axios.get(`${apiUrl}/v1/solicitud-reserva/${id}`, config)
        .then(response => {
          this.detalleSolicitudDueño = response.data;
            
        })
        .catch(error => console.error('Error al obtener detalles del salón:', error));
    },
    obtenerListaTipoSR() {
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwt_decode(token);

      const userRole = decodedToken.roles[0]; 
      const config = {
      headers: {
        Authorization:  `Bearer ${token}`,
        'X-User-Role': userRole
      }
      };
      const apiUrl = process.env.VUE_APP_BASE_URL;
      axios.get(`${apiUrl}/v1/tipo-sr`, config)
        .then(response => {
          this.listaTipoSR = response.data;
          
        })
        .catch(error => console.error('Error al obtener datos de la API:', error));
    },
    rechazarReserva() {
        const elementoRechazar = this.listaTipoSR.find(tipo => tipo.nombre === "RECHAZADO");    
        this.cargando = true;  
            const token = localStorage.getItem('jwtToken');
            const decodedToken = jwt_decode(token);
            const userRole = decodedToken.roles[0];     
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
                'X-User-Role': userRole,
              },
            }
        if (elementoRechazar) {
        const nuevoId = elementoRechazar.id; 
        const nuevoNombre = elementoRechazar.nombre; 
        const data = {
                id : this.$route.params.id,
                tipoSR: {
                    id: nuevoId,
                    nombre: nuevoNombre
                }
        };       
        const apiUrl = process.env.VUE_APP_BASE_URL;
        axios.patch(`${apiUrl}/v1/solicitud-reserva/estado/${this.$route.params.id}`, data, config)
        .then(response => {
          
          this.$router.push({ name: 'lista-solicitudes'});
          this.$notify({
                title: 'Éxito',
                text: 'La solicitud se rechazó correctamente.',
                type: 'success',
              });
          this.cargando = false;
        })
        .catch(error => {
          this.$notify({
                title: 'Error',
                text: 'Hubo un problema al rechazar la solicitud. Intentalo de nuevo',
                type: 'error',
              });
          this.cargando = false;
        });
      }
    },
    aceptarReserva() {
        const elementoAceptar = this.listaTipoSR.find(tipo => tipo.nombre === "ACEPTADO");      
        this.cargando = true;
            const token = localStorage.getItem('jwtToken');
            const decodedToken = jwt_decode(token);
            const userRole = decodedToken.roles[0];     
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
                'X-User-Role': userRole,
              },
            }
        if (elementoAceptar) {
        const nuevoId = elementoAceptar.id; 
        const nuevoNombre = elementoAceptar.nombre; 
        const data = {
                id : this.$route.params.id,
                tipoSR: {
                    id: nuevoId,
                    nombre: nuevoNombre
                }
        };       
        const apiUrl = process.env.VUE_APP_BASE_URL;
        axios.patch(`${apiUrl}/v1/solicitud-reserva/estado/${this.$route.params.id}`, data, config)
        .then(response => {
          
          this.$router.push({ name: 'lista-solicitudes'});
          this.$notify({
                title: 'Éxito',
                text: 'La solicitud se aceptó correctamente.',
                type: 'success',
              });
          this.cargando = false;
        })
        .catch(error => {
          this.$notify({
                title: 'Error',
                text: 'Hubo un problema al aceptar la solicitud. Intentalo de nuevo',
                type: 'error',
              });
          this.cargando = false;
        });
      }
    },
    eliminarReserva() {
            const elementoEliminar = this.listaTipoSR.find(tipo => tipo.nombre === "INVISIBLE");   
            this.cargando = true; 
            const estadoAux = this.detalleSolicitudDueño.tipoSR.nombre;  
            const token = localStorage.getItem('jwtToken');
            const decodedToken = jwt_decode(token);
            const userRole = decodedToken.roles[0];     
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
                'X-User-Role': userRole,
              },
            }
        if (elementoEliminar) {
        const nuevoId = elementoEliminar.id; 
        const nuevoNombre = elementoEliminar.nombre; 
        const data = {
                id : this.$route.params.id,
                tipoSR: {
                    id: nuevoId,
                    nombre: nuevoNombre
                }
        };       
        const apiUrl = process.env.VUE_APP_BASE_URL;
        axios.patch(`${apiUrl}/v1/solicitud-reserva/estado/${this.$route.params.id}`, data, config)
        .then(response => {
          if(estadoAux === "RECHAZADO"){
            this.$router.push({ name: 'lista-solicitudes'});
            this.$notify({
                title: 'Éxito',
                text: 'La solicitud/reserva se eliminó correctamente.',
                type: 'success',
              });
            this.cargando = false;
          }else{
            this.$notify({
                title: 'Éxito',
                text: 'La solicitud/reserva se eliminó correctamente.',
                type: 'success',
              });
            this.$router.push({ name: 'lista-reservas'});
            this.cargando = false;
          }
         
        })
        .catch(error => {
          console.error('Error en la petición PUT:', error);
          this.$notify({
                title: 'Error',
                text: 'Hubo un problema al eliminar la solicitud. Intentalo de nuevo',
                type: 'error',
              });
          this.cargando = false;
        });
      }
    },
    cancelarReserva() {
        const elementoCancelar = this.listaTipoSR.find(tipo => tipo.nombre === "CANCELADO");   
        this.cargando = true;   
            const token = localStorage.getItem('jwtToken');
            const decodedToken = jwt_decode(token);
            const userRole = decodedToken.roles[0];     
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
                'X-User-Role': userRole,
              },
            }
        if (elementoCancelar) {
        const nuevoId = elementoCancelar.id; 
        const nuevoNombre = elementoCancelar.nombre; 
        const data = {
                id : this.$route.params.id,
                tipoSR: {
                    id: nuevoId,
                    nombre: nuevoNombre
                }
        };       
        const apiUrl = process.env.VUE_APP_BASE_URL;
        axios.patch(`${apiUrl}/v1/solicitud-reserva/estado/${this.$route.params.id}`, data, config)
        .then(response => {         
          this.$router.push({ name: 'lista-reservas'});
          this.$notify({
                title: 'Éxito',
                text: 'La reserva se canceló correctamente.',
                type: 'success',
              });
          this.cargando = false;
        })
        .catch(error => {
          this.$notify({
                title: 'Error',
                text: 'Hubo un problema al cancelar la reserva. Intentalo de nuevo',
                type: 'error',
              });
          this.cargando = false;
        });
      }
    },
}

}
</script>

<style>
.body_detalleSR{
  display: flex;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  background-color: #000000a4;
  color: rgb(255, 255, 255);
}

.body_detalleSR h2{
  margin-top: 10px;
}

.content_detalleSR{
  margin: 10px 100px 10px 100px;
  padding: 30px;
  background-color: #0E2C40;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, .5);
}

.body_detalleSR .svg-inline--fa {
  height: 50px;
}

.content_detalleSR .info_detalleSR{
  display: flex;
  flex-direction: column;
  text-align: justify;
  margin-left: 50px;
  margin-right: 50px;
}

.info_detalleSR h3{
  text-align: start;
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  width: 18vw;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.info_detalleSR p{
  color: #1e2b2d;
  margin-top: 5px;
  padding: 15px;
  border-radius: 5px;
  flex: 1; 
  background-color: #ffffff;
  overflow: auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  -webkit-line-clamp: 4;
}

.info_detalleSR .detalle_itemSR{
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}

.body_detalleSR .detalle_itemSR .svg-inline--fa {
  height: 22px;
  margin-right: 10px;
}

/*BOTONES*/
.botones_SolicitudReserva{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  font-weight: bold;
}

.botones_SolicitudReserva a{
  margin-left: 20px;
  margin-right: 20px;
  padding: 8px;
  width: 200px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
}

.botones_SolicitudReserva #rechazar{
  background-color: #ff0000;
  color: #ffffff;
  border: 2px solid #ff0000;
  transition: 0.3s ease; 
}

.botones_SolicitudReserva #rechazar:hover {
  background-color: transparent;
  color: #ff0000;
}

.botones_SolicitudReserva #cancelar{
  background-color: #ff0000;
  color: #ffffff;
  border: 2px solid #ff0000;
  transition: 0.3s ease; 
}

.botones_SolicitudReserva #cancelar:hover {
  background-color: transparent;
  color: #ff0000;
}

.botones_SolicitudReserva #atras{
  background-color: #ffffff;
  color: #000000;
  border: 2px solid #ffffff;
  transition: 0.3s ease; 
}

.botones_SolicitudReserva #atras:hover {
  background-color: transparent;
  color: #ffffff;
}

.botones_SolicitudReserva #aceptar{
  background-color: #0d7703;
  border: 2px solid #0d7703;
  color: #ffffff;
  transition: 0.3s ease;   
}

.botones_SolicitudReserva #aceptar:hover {
  background-color: transparent;
  color: #0d7703;
}

.botones_SolicitudReserva #eliminar{
  background-color: #ff0000;
  color: #ffffff;
  border: 2px solid #ff0000;
  transition: 0.3s ease;   
}

.botones_SolicitudReserva #eliminar:hover {
  background-color: transparent;
  color: #ff0000;
}

@media  screen and (max-width: 800px) {
  .content_detalleSR {
    margin: 10px 20px 10px 20px;
  }
}

@media  screen and (max-width: 700px) {
  .info_detalleSR .detalle_itemSR{
    flex-direction: column;
  }

  .body_detalleSR {
    height: auto;
  }
}

@media  screen and (max-width: 600px) {
  .botones_SolicitudReserva{
    flex-direction: column;
  }

  .botones_SolicitudReserva a{
    width: 80%;
    margin-top: 10px;
  }
}

@media  screen and (max-width: 400px) {
  .content_detalleSR .info_detalleSR{
    margin-left: 0px;
    margin-right: 0px;
  }
}

@media  screen and (max-width: 250px) {
  .botones_SolicitudReserva a{
    margin-left: 5px;
    margin-right: 5px;
  }
}
</style>