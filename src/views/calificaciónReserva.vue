<template>
    <div class="body_calificación">
        <div class="content_calificación">
            <font-awesome-icon :icon="['fas', 'ranking-star']" />
            <h2>Califica tu experiencia</h2>
            <p>"¡Gracias por reservar en nuestro salón de eventos! 
                Nos encantaría conocer tu opinión acerca del salon. 
                Por favor, califica tu experiencia del 1 al 5, donde 1 es muy insatisfactorio y 
                5 es excelente. Tu retroalimentación nos ayuda a mejorar."</p>
            <v-rating
                hover
                :length="5"
                :size="ratingSize"
                v-model="puntuacion" 
                active-color="warning"
                @input="actualizarPuntuacion"
            />
            <div class="button_califación">
              <a id="back" @click="volverAtras">VOLVER</a>
              <a id="send" @click="enviarPuntuacion">ENVIAR</a>          
            </div>  
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import VueNotification from '@kyvg/vue3-notification';

export default {
  name: 'calificaciónComponent',
  data() {
    return {
      puntuacion: 0,
      idReserva: null,

      isWindowSizeGreaterThan600: window.innerWidth >= 600,
    };
  },
  components: {
      VueNotification,
  },
  computed: {
    ratingSize() {
      return this.isWindowSizeGreaterThan600 ? 81 : 50;
    },
  },
  mounted() {
    this.idReserva = this.$route.params.id;
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    actualizarPuntuacion() {
      
    },
    volverAtras (){
            this.$router.push({ name: 'detalle-buzon', params: { id: this.idReserva } });
        },
    handleResize() {
      this.isWindowSizeGreaterThan600 = window.innerWidth >= 600;
      this.$forceUpdate();
    },
    enviarPuntuacion() { 
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
          
            const data = {
                id : this.idReserva,
                puntuacion: this.puntuacion,
            };
          
            axios.patch(`http://localhost:8080/v1/solicitud-reserva/calificacion/${this.idReserva}`, data, config )
                .then(response => {              
                this.$router.push({ name: 'buzon'});
                this.$notify({
                    title: 'Éxito',
                    text: 'Puntuación registrada correctamente.',
                    type: 'success',
                 });
                })
                .catch(error => {
                console.error('Error al enviar la puntuación:', error);
                  this.$notify({
                      title: 'Error',
                      text: 'Hubo un problema al registrar la calificación. Intentalo de nuevo',
                      type: 'error',
                  });
                });
    },
  },
}
</script>

<style>
.body_calificación{
  background-color: #000000a4;
  height: 100vh;
  color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content_calificación{
  background-color: rgb(70, 21, 115);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0px 200px 0px 200px;
  padding: 70px;
  border-radius: 30px;
}

.content_calificación h2{
  font-weight: bold;
  font-size: 40px;
  margin-top: 30px;
  color: white;
}

.content_calificación p{
  padding-top: 40px;
  font-size: 20px;
  color: white;
}

.content_calificación .svg-inline--fa {
  height: 50px;
}

.v-rating  {
  font-size: 45px;
  margin-top: 20px;
}

/*BOTONES*/
.button_califación{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  font-weight: bold;
}

.button_califación a{
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px 40px 10px 40px;
  width: auto;
  height: 50px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
}

.button_califación #send{
  background-color: #0d7703;
  color: #ffffff;
  transition: 0.3s ease;  
}

.button_califación #send:hover {
  background-color: #0d77038c;
}

.button_califación #back{
  background-color: #ffffff;
  color: #000000;
  transition: 0.3s ease; 
}

.button_califación #back:hover {
  background-color: rgba(255, 255, 255, 0.699);
}

@media  screen and (max-width: 600px) {
  .content_calificación{
    margin: 0px 10px 0px 10px;
    padding: 50px 10px 50px 10px;
  }

  .button_califación a{
    width: 200px;
  }

  .v-rating  {
    font-size: 30px;
    margin-top: 20px;
  }
}

@media  screen and (max-width: 510px) {
  .button_califación{
    flex-direction: column;
    margin-top: 30px;
  }
  .button_califación a{
    margin-top: 10px;
  }
}

@media  screen and (max-width: 300px) {
  .content_calificación h2{
    font-size: 30px;
  }

  .content_calificación p{
    font-size: 15px;
  }

  .button_califación a{
    width: 100%;
    font-size: 15px;
    padding: 5px 20px 5px 20px;
    height: 100%;
  }

  .content_calificación{
    padding: 20px 10px 20px 10px;
  }
  
  .v-rating  {
    font-size: 20px;
  }
}

</style>