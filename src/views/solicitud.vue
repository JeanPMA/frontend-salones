<template>
<div class="solicitud_content">
        <div class="solicitud_form">
            <form @submit.prevent="submit">
                <h2>RESERVAR</h2>
                <label for="salon" id="salon">Salón:</label>
                <v-select
                  v-model="solicitudReserva.salon.id"
                  label="Selecciona salon de eventos"
                  :items="listaSalones"
                  variant="outlined"
                  item-title="nombre"
                  item-value="id"
                  hide-details
                  :disabled="selectorBloqueado"
                  @update:modelValue="obtenerServicios(), limpiarErrorSalon"
                ></v-select>
                <span v-if="mostrarErrorSalon" class="error-message">Tienes que seleccionar una opción</span>

                <label for="motivo" id="motivo">Motivo:</label>
                <v-select
                  v-model="solicitudReserva.motivo"
                  label="Selecciona motivo"
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                  variant="outlined"
                  hide-details
                 
                  @update:modelValue="limpiarErrorMotivo"

                ></v-select>
                <span v-if="mostrarErrorMotivo" class="error-message">Tienes que seleccionar una opción</span>

                <label for="servicio" id="servicio">Servicios: </label>

                  <v-select
                    v-model="seleccionados"
                    :items="listaServicios"
                    label="Selecciona servicios"
                    item-title="nombre"
                    item-value="nombre"
                    multiple
                    variant="outlined"
                    hide-details
                    persistent-hint
                    @update:modelValue="limpiarErrorSeleccionados"
                  ></v-select>
                <span v-if="mostrarErrorServicios" class="error-message">Debes seleccionar al menos una opción</span>

                
                <label for="fecha_reserva" id="labelFecha">Fecha de Evento:</label>
                <input type="date" id="fecha_reserva" name="fecha_reserva" :min="minDate" v-model="solicitudReserva.fecha_reserva" @change="limpiarErrorFecha">
                <span v-if="mostrarErrorFecha" class="error-message">Debes seleccionar una fecha</span>

                <label for="detalle" id="labelDetalle">Detalle Extra:</label>
                <textarea id="detalle" name="detalle" rows="4" placeholder="Detalle:" style="font-family: Arial, sans-serif;" v-model="solicitudReserva.detalle" @input="limpiarErrorDetalle" maxlength="200"></textarea>
                <span v-if="mostrarErrorDetalle" class="error-message">El detalle no puede estar vacío</span>

                <div class="form_btn">
                  <a  id="cancel" @click="volverAtras">CANCELAR</a>
                  <a id="send" @click="guardarSolicitudReserva" :disabled="cargando">{{ cargando ? 'ENVIANDO...' : 'ENVIAR' }}</a>
                  

                </div>
            </form>
        </div>
        <div v-if="cargando" class="overlay"></div>    
        <div v-if="cargando" class="loader"></div>
    </div>
    <Toast ref="toast" @success="onSuccess" @error="onError" />
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import VueNotification from '@kyvg/vue3-notification';


export default {
    name: 'solicitudComponent',
    components: {
      VueNotification,
    },

    data() { 
      const today = new Date();
      const minDate = new Date(today);
      minDate.setDate(today.getDate() + 5);
     
      
    return {
        minDate: minDate.toISOString().split('T')[0],      
        seleccionados: [],

        listaSalones: [],
        listaServicios: [],
        solicitudReserva: {
          salon: {
            id: null,
          },
          motivo: null,
          fecha_reserva: this.$route.params.fechaPorDefecto || null,
          detalle: null,
          servicio: null,
        },
        selectorBloqueado: false,
        mostrarErrorSalon: false,
        mostrarErrorMotivo: false,
        mostrarErrorServicios: false,
        mostrarErrorFecha: false,
        mostrarErrorDetalle: false,

        cargando: false,
      }
    },
    async  mounted() {
      await this.obtenerSalones();
      const nombreSalonSeleccionado = this.$route.params.nombreSalon;


      if (nombreSalonSeleccionado) {
        const salonSeleccionado = this.listaSalones.find(salon => salon.nombre === nombreSalonSeleccionado);

        if (salonSeleccionado) {
          this.solicitudReserva.salon = salonSeleccionado;
          this.selectorBloqueado = true;
          this.obtenerServicios();
        } else {
          console.error('Salón no encontrado en la lista.');
        }
      }
    },
    methods: {
     
        volverAtras (){
        this.$router.go(-1);
        },
        guardarSolicitudReserva() {
            

            this.mostrarErrorSalon = !this.solicitudReserva.salon.id;
            this.mostrarErrorMotivo = !this.solicitudReserva.motivo;
            this.mostrarErrorServicios = this.seleccionados.length === 0;
            this.mostrarErrorFecha = !this.solicitudReserva.fecha_reserva;
            this.mostrarErrorDetalle = !this.solicitudReserva.detalle;
            if (this.mostrarErrorSalon || this.mostrarErrorMotivo || this.mostrarErrorServicios || this.mostrarErrorFecha || this.mostrarErrorDetalle) {
              
              return;
            }

            this.cargando = true;
            const serviciosSeleccionados = this.seleccionados.join(', ');
            this.solicitudReserva.servicio = serviciosSeleccionados;

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
            };
            axios.post('http://localhost:8080/v1/solicitud-reserva', this.solicitudReserva, config  )
            .then(response => {
              this.$router.push({ name: 'salones'});
              this.$notify({
                title: 'Éxito',
                text: 'La solicitud se guardó correctamente.',
                type: 'success',
              });
              this.cargando = false;
            })
            .catch(error => {
              console.error('Error al guardar la solicitud de reserva:', error);
              this.$notify({
                title: 'Error',
                text: 'Hubo un problema al guardar la solicitud.',
                type: 'error',
              });
              this.cargando = false;
              });
                  
      },
    async obtenerSalones() {
      try {
        const token = localStorage.getItem('jwtToken');
        const decodedToken = jwt_decode(token);
        const userRole = decodedToken.roles[0];
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-User-Role': userRole,
          },
        };

        const response = await axios.get('http://localhost:8080/v1/salon/auth/all', config);

        this.listaSalones = response.data.map(item => ({ id: item.id, nombre: item.nombre, servicios: item.servicios }));
      } catch (error) {
        console.error('Error al obtener salones:', error);
      }
    },
    obtenerServicios() {
      const salonSeleccionado = this.listaSalones.find(salon => salon.id === this.solicitudReserva.salon.id);
      if (salonSeleccionado && salonSeleccionado.servicios) {
        this.listaServicios = salonSeleccionado.servicios.map(servicio => ({ id: servicio.id, nombre: servicio.nombre }));
      } else {
        this.listaServicios = [{ id: null, nombre: 'No existen servicios actualmente' }];
      }
    },
    limpiarErrorSalon() {
      this.mostrarErrorSalon = false;
    },
    limpiarErrorMotivo() {
      this.mostrarErrorMotivo = false;
    },
    limpiarErrorSeleccionados() {
      this.mostrarErrorServicios = false;
    },
    limpiarErrorFecha() {
      this.mostrarErrorFecha = false;
    },
    limpiarErrorDetalle() {
      this.mostrarErrorDetalle = false;
    },
    onSuccess(message) {
  },
  onError(message) {
    console.error('Error:', message);
  },
    },

}
</script>

<style>

.solicitud_content{
    background-color: #000000a4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
   
}

.solicitud_form{
    background-color: white;
    display: flex;
    border-radius: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
    width: 60vw;
}

.solicitud_form form h2{
    text-align: center;
}

.solicitud_form form {
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #ffffff;
    text-align: start;
    
  }

  .solicitud_form #labelNombre, #labelMotivo, #labelServicios, #labelFecha, #labelDetalle {
    display: block;
    margin-bottom: 7px;
    margin-top: 7px;
  }

  .solicitud_form #nombre, .solicitud_form #mensaje, .solicitud_form input[type="email"], .solicitud_form textarea
  {
    width: 100%;
    padding: 10px 10px 10px 10px;
    margin-bottom: 3px;
    border: 1px solid #8b8888e7;
    border-radius: 5px;
    margin-right: 10px;
  }

  .solicitud_form input[type="date"]
  {
   
    padding: 10px 10px 10px 10px;
    margin-bottom: 10px;
    border: 1px solid #8b8888e7;
    border-radius: 5px;
    margin-right: 10px;
  }

 

  #labelServicios{
    margin-top: 10px;
  }

  
  

  form textarea{
 
    
    resize: none;
  }
 


.form_btn{
    margin: 20px 5px 10px 5px;
   text-align: center;
    justify-items: end;
    text-decoration: none;
    padding-bottom: 20px;
}

.form_btn a{
    margin-left: 5px;
    margin-right: 5px;
    padding: 10px 20px 10px 20px;

    border: 2px solid rgb(45, 45, 45);
    cursor: pointer;

    text-align: center;
}

.form_btn #send{
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

.form_btn #send:hover {
    color: #ffffff; 
    background-color: rgb(54, 54, 54);
   
  }

.form_btn #cancel{
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

.form_btn #cancel:hover {
    color: rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
    text-decoration: none;
  }

  .error-message {
    color: rgb(176, 0, 32); 
    font-size: 14px;
    margin-bottom: 5px;
    margin-left: 20px;
    display: block;
    text-align: start;
  }
  @media  screen and (max-width: 700px) {
    .solicitud_content{
      width: 100%;
    }
    .form_btn{
      flex-direction: column;
      gap: 10px;
    }
    .solicitud_form{
      width: 90vw;
    }
  }

  @media  screen and (max-width: 350px) {
    .form_btn{
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
</style>