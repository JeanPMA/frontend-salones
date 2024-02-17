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
                :size="81"
                v-model="puntuacion" 
                active-color="warning"
                @input="actualizarPuntuacion"
            />
            <div class="button_califación">
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
    };
  },
  components: {
      VueNotification,
  },
  mounted() {
    this.idReserva = this.$route.params.id;
  },
  methods: {
    actualizarPuntuacion() {
      
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
    background-color: #030303;
    height: 100%;
    color: rgb(0, 0, 0);
}
.content_calificación{
    background-color: rgb(70, 21, 115);
    display: flex;
    align-items: center;
    justify-content: center;

    flex-direction: column;
    margin: 50px 200px 50px 200px;
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
/* botones estilos*/
.button_califación{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
    font-weight: bold;
}

.button_califación a{
    margin-left: 30px;
    margin-right: 30px;
    padding: 5px 20px 10px 20px;
    width: 350px;
    height: 40px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 20px;
    text-align: center;
}

.button_califación #send{
    background-color: #ffffff;
    color: #000000;
   transition: 0.3s ease; 
   
  }

.button_califación #send:hover {
    background-color: #000000;
    color: #ffffff;
   
  }





</style>