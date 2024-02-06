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
                  @update:modelValue="limpiarErrorSalon"
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
                    :items="states"
                    label="Selecciona servicios"
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
                <textarea id="detalle" name="detalle" rows="4" placeholder="Detalle:" style="font-family: Arial, sans-serif;" v-model="solicitudReserva.detalle" @input="limpiarErrorDetalle"></textarea>
                <span v-if="mostrarErrorDetalle" class="error-message">El detalle no puede estar vacío</span>

                <div class="form_btn">
                  <a id="send" @click="guardarSolicitudReserva">ENVIAR</a>
                    <a  id="cancel" @click="volverAtras">CANCELAR</a>

                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default {
    name: 'solicitudComponent',
    components: {
        
    },
    
    data() { 
      const today = new Date();
      const minDate = new Date(today);
      minDate.setDate(today.getDate() + 5);
     
      
    return {
        minDate: minDate.toISOString().split('T')[0],      
        seleccionados: [],
        states: [
          'Alabama', 'Alaska', 'American Samoa', 'Arizona',
          'Arkansas', 'California', 'Colorado', 'Connecticut',
          'Delaware', 'District of Columbia', 'Federated States of Micronesia',
          'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
          'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
          'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
          'Missouri', 'Montana', 'Nebraska', 'Nevada',
          'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
          'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
          'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
          'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
          'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
        ],
        listaSalones: [],
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
              console.log('Solicitud de reserva guardada:', response.data);
              this.$router.push({ name: 'salones'});
            })
            .catch(error => {
              console.error('Error al guardar la solicitud de reserva:', error);
            });
           
            //console.log(this.solicitudReserva);
       
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

        const response = await axios.get('http://localhost:8080/v1/salon', config);

        this.listaSalones = response.data.map(item => ({ id: item.id, nombre: item.nombre }));
      } catch (error) {
        console.error('Error al obtener salones:', error);
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
    }
}
</script>

<style>
.solicitud_content{
    background-color: #5f76f7;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
   
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
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.form_btn a{
    margin-left: 30px;
    margin-right: 30px;
    padding: 5px 20px 10px 20px;
    width: 150px;
    height: 40px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 20px;
    text-align: center;
}

.form_btn #send{
    background-color: #161616;
    color: #fff;
   transition: 0.3s ease; 
   
  }

.form_btn #send:hover {
    background-color: #7c7c7c;
    color: #030303;
   
  }

.form_btn #cancel{
    background-color: #7c7c7c;
    color: #030303;
    transition: 0.3s ease; 

   
  }

.form_btn #cancel:hover {
    background-color: #161616;
    color: #fff;
  }
  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 5px;
    display: block;
  }
</style>