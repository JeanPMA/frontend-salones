<template>
    <div class="body_detalle">
        <div class="content_detalleBuzon" v-if="detalleSolicitud">
            <font-awesome-icon :icon="['fas', 'circle-info']" />
            <h2>DETALLE</h2>
            <div class="info_detalle">
                <div class="detalle_item">
                    
                    <h3><font-awesome-icon :icon="['fas', 'calendar-days']" />Fecha de Evento:</h3>
                    <p>{{detalleSolicitud.fecha_reserva}}</p>
                </div>
                

                <div class="detalle_item">
                    <h3><font-awesome-icon :icon="['fas', 'circle-question']" />Motivo:</h3>
                  <p>{{detalleSolicitud.motivo}}</p>
                </div>
               

                <div class="detalle_item">
                    <h3><font-awesome-icon :icon="['fas', 'bell-concierge']" />Servicios: </h3>
                    <p>{{detalleSolicitud.servicio}}</p>
                </div>
                
                
                <div class="detalle_item">
                    <h3><font-awesome-icon :icon="['fas', 'message']" />Detalle Extra:</h3>
                    <p>{{detalleSolicitud.detalle}}</p>
                </div>
                

                <div class="detalle_item">
                    <h3><font-awesome-icon :icon="['fas', 'calendar']" />Fecha de solicitud:</h3>
                    <p>{{detalleSolicitud.fecha_emision}}</p>
                </div>
                

                <div class="detalle_item">
                    <h3><font-awesome-icon :icon="['fas', 'diagram-project']" />Estado:</h3>
                    <p>{{detalleSolicitud.tipoSR.nombre}}</p>
                </div>
               
            </div>
            <div class="botones_detalle">
                <a id="atras"  @click="volverAtras">ATRAS</a>
                <a v-if="detalleSolicitud.tipoSR.nombre === 'ACEPTADO' || detalleSolicitud.tipoSR.nombre === 'PENDIENTE'" id="cancelar" @click="cancelarReserva" :disabled="cargando">{{ cargando ? 'CANCELANDO...' : 'CANCELAR RESERVA' }}</a>               
                <a v-if="detalleSolicitud.tipoSR.nombre === 'ACEPTADO' && detalleSolicitud.puntuacion === null" id="calificar" @click="irACalificación()" :disabled="cargando">CALIFICAR</a>
                <a v-if="detalleSolicitud.tipoSR.nombre === 'INVISIBLE' || detalleSolicitud.tipoSR.nombre === 'RECHAZADO' ||  detalleSolicitud.tipoSR.nombre === 'CANCELADO'" id="eliminar" @click="eliminarReserva" :disabled="cargando">{{ cargando ? 'ELIMINANDO...' : 'ELIMINAR' }}</a>
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
  name: 'detalleBuzonComponent',
  data() {
    return {
      detalleSolicitud: null,   
      listaTipoSR: [], 
      cargando: false,
    };
  },
  components: {
      VueNotification,
    },
  mounted() {
      const solicitudId = this.$route.params.id;

      this.obtenerDetallesSolicitud(solicitudId);
      this.obtenerListaTipoSR();
  },
  methods: {
    
    irACalificación() {
      this.$router.push({ name: 'calificar'});
    },
    volverAtras (){
      this.$router.push({ name: 'buzon'});
    },
    obtenerDetallesSolicitud(id) {
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
          this.detalleSolicitud = response.data;
          
        })
        .catch(error => console.error('Error al obtener detalles de la solicitud:', error));
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
    cancelarReserva() {
        const elementoCancelar = this.listaTipoSR.find(tipo => tipo.nombre === "CANCELADO");
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
        if (elementoCancelar) {
        const nuevoId = elementoCancelar.id; 
        const nuevoNombre = elementoCancelar.nombre; 
         

        this.detalleSolicitud.tipoSR.id= nuevoId; 
        this.detalleSolicitud.tipoSR.nombre= nuevoNombre; 

        const apiUrl = process.env.VUE_APP_BASE_URL;
        axios.put(`${apiUrl}/v1/solicitud-reserva/${this.detalleSolicitud.id}`, this.detalleSolicitud, config)
        .then(response => {

          this.$router.push({ name: 'buzon'});
          this.$notify({
                title: 'Éxito',
                text: 'La solicitud se canceló correctamente.',
                type: 'success',
          });
          this.cargando = false;
        })
        .catch(error => {
          console.error('Error en la petición PUT:', error);
          this.$notify({
                title: 'Error',
                text: 'Hubo un problema al cancelar la solicitud. Intentelo de nuevo',
                type: 'error',
          });
          this.cargando = false;
        });
      }
    },
    eliminarReserva() {
        const elementoEliminar = this.listaTipoSR.find(tipo => tipo.nombre === "INVISIBLE");
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
        if (elementoEliminar) {
        const nuevoId = elementoEliminar.id; 
        const nuevoNombre = elementoEliminar.nombre; 

        this.detalleSolicitud.tipoSR.id= nuevoId; 
        this.detalleSolicitud.tipoSR.nombre= nuevoNombre; 

        const apiUrl = process.env.VUE_APP_BASE_URL;
        axios.put(`${apiUrl}/v1/solicitud-reserva/${this.detalleSolicitud.id}`, this.detalleSolicitud, config)
        .then(response => {

          this.$router.push({ name: 'buzon' });
          this.$notify({
                title: 'Éxito',
                text: 'La solicitud se eliminó correctamente.',
                type: 'success',
          });
          this.cargando = false;
        })
        .catch(error => {
          console.error('Error en la petición PUT:', error);
          this.$notify({
                title: 'Error',
                text: 'Hubo un problema al eliminar la solicitud. Intentelo de nuevo',
                type: 'error',
          });
          this.cargando = false;
        });
      }
    }
  },
}


</script>

<style>
.body_detalle{
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #000000a4;
  color: white;
}

.body_detalle h2{
  margin-top: 10px;
}

.content_detalleBuzon{
  margin: 40px 100px 10px 100px;
  padding: 30px;
  background-color: #0E2C40;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, .5);
}

.body_detalle .svg-inline--fa {
  height: 50px;
}

.content_detalleBuzon .info_detalle{
  display: flex;
  flex-direction: column;
  text-align: justify;
  margin-left: 50px;
  margin-right: 50px;
}

.info_detalle h3{
  text-align: start;
  margin-left: 20px;
  color: #1e2b2d;
  font-size: 23px;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.info_detalle p{
  color: #1e2b2d;
  margin-top: 10px;
}

.info_detalle .detalle_item{
  padding: 15px;
  margin-top: 15px;
  background-color: #ffffff;
  border-radius: 5px;
}

.info_detalle .detalle_item p {
  overflow: auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
}

.body_detalle .detalle_item .svg-inline--fa {
   height: 22px;
   margin-right: 10px;
}

/*BOTONES*/
.botones_detalle{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-weight: bold;
}

.botones_detalle a{
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px 10px 10px 10px;
  width: 200px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
}

.botones_detalle #cancelar{
  background-color: #ff0000;
  color: #ffffff;
  transition: 0.3s ease; 
}

.botones_detalle #cancelar:hover {
  background-color: #ff000070;
  color: #ffffff;
}

.botones_detalle #atras{
  background-color: #ffffff;
  color: #000000;
  transition: 0.3s ease; 
}

.botones_detalle #atras:hover {
  background-color: rgba(255, 255, 255, 0.699);
}

.botones_detalle #calificar{
  background-color: #0d7703;
  color: #ffffff;
  transition: 0.3s ease;   
}

.botones_detalle #calificar:hover {
  background-color: #0d77038c;
}

.botones_detalle #eliminar{
  background-color: #8400ff;
  color: #ffffff;
  transition: 0.3s ease;   
}

.botones_detalle #eliminar:hover {
  background-color: #2a005ea3;
  color: #ffffff;
}

@media  screen and (max-width: 920px) {
  .content_detalleBuzon{
    margin: 40px 10px 10px 10px;
    padding: 10px 0px 10px 0px;
  }
}

@media  screen and (max-width: 680px) {
  .botones_detalle {
    flex-direction: column;
    gap: 5px;
  }

  .info_detalle h3{
    margin-left: 5px;
  }
}
 
</style>