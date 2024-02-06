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
                <a v-if="detalleSolicitud.tipoSR.nombre === 'ACEPTADO' || detalleSolicitud.tipoSR.nombre === 'PENDIENTE'" id="cancelar" @click="cancelarReserva">CANCELAR RESERVA</a>               
                <a v-if="detalleSolicitud.tipoSR.nombre === 'ACEPTADO' && detalleSolicitud.puntuacion === null" id="calificar" @click="irACalificación()">CALIFICAR</a>

                <a v-if="detalleSolicitud.tipoSR.nombre === 'INVISIBLE' || detalleSolicitud.tipoSR.nombre === 'RECHAZADO' ||  detalleSolicitud.tipoSR.nombre === 'CANCELADO'" id="eliminar" @click="eliminarReserva">ELIMINAR</a>
            </div>  
        </div>
        
    </div>
</template>

<script>
 import axios from 'axios';
  import jwt_decode from 'jwt-decode';

export default {
  name: 'detalleBuzonComponent',
  data() {
    return {
      detalleSolicitud: null,   
      listaTipoSR: [], 
      

    };
  },
  mounted() {
      const salonId = this.$route.params.id;

      this.obtenerDetallesSalon(salonId);
      this.obtenerListaTipoSR();
  },
  methods: {
    
    irACalificación() {
    // Redirige a la página de calificacion
      this.$router.push({ name: 'calificar'});
    },
    volverAtras (){
      this.$router.push({ name: 'buzon'});
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

      axios.get(`http://localhost:8080/v1/solicitud-reserva/${id}`, config)
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
      axios.get('http://localhost:8080/v1/tipo-sr', config)
        .then(response => {
          this.listaTipoSR = response.data;
          
        })
        .catch(error => console.error('Error al obtener datos de la API:', error));
    },
    cancelarReserva() {
        const elementoCancelar = this.listaTipoSR.find(tipo => tipo.nombre === "CANCELADO");
        
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

        
        axios.put(`http://localhost:8080/v1/solicitud-reserva/${this.detalleSolicitud.id}`, this.detalleSolicitud, config)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: 'buzon'});
        })
        .catch(error => {
          console.error('Error en la petición PUT:', error);
        });
      }
    },
    eliminarReserva() {
        const elementoCancelar = this.listaTipoSR.find(tipo => tipo.nombre === "INVISIBLE");
        
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

        
        axios.put(`http://localhost:8080/v1/solicitud-reserva/${this.detalleSolicitud.id}`, this.detalleSolicitud, config)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: 'buzon', params: { id: id } });
        })
        .catch(error => {
          console.error('Error en la petición PUT:', error);
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
    height: 100%;
    background-color: #535353;
    color: white;
}
.body_detalle h2{
    margin-top: 10px;
}
.content_detalleBuzon{
    margin: 10px 100px 10px 100px;
    padding: 30px;
    background-color: rgb(91, 36, 80);
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
    background-color: #d4cfeb;
    border-radius: 5px;
}
.body_detalle .detalle_item .svg-inline--fa {
   height: 22px;
   margin-right: 10px;
}
/* botones estilos*/
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
    background-color: #000000;
    color: #ffffff;
   
  }

  .botones_detalle #calificar{
    background-color: #0d7703;
    color: #ffffff;
   transition: 0.3s ease;   
   
  }

.botones_detalle #calificar:hover {
    background-color: #5eff00a3;
    color: #ffffff;
   
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
</style>