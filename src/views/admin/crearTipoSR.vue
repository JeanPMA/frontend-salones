<template>
    <div class="content_crearTipoSR">    
        <h2>
            FORMULARIO PARA LA CREACION DE TIPO SOLICITUD RESERVA
        </h2>
        <form @submit.prevent="submit">
        
    
        <v-text-field
            v-model="nombre.value.value"
            :error-messages="nombre.errorMessage.value"
            :counter="50"
            maxlength="50"
            label="Nombre"
            clearable
            @input="bloquearCaracteresEspeciales"
        ></v-text-field>
    

        <v-checkbox
            v-model="estado.value.value"
            :error-messages="estado.errorMessage.value"
            value="1"
            label="Marque esta casilla si desea habilitar el tipo solicitud-reserva"
            type="activo"
            @input="ajustarValorEstado"
        ></v-checkbox>
    
        <v-btn
            class="me-4"
            type="submit"
            @click="crearTipoSR" 
            
        >
            Crear
        </v-btn>
    
        <v-btn @click="irAHome" >
            Volver
        </v-btn>
        </form>
</div>
  </template>

<script>
  import { ref } from 'vue';
  import { useField, useForm } from 'vee-validate';
  import axios from 'axios';
  import jwt_decode from 'jwt-decode';
  import VueNotification from '@kyvg/vue3-notification';

  
  export default{
  name: 'crearServicioComponent',
  data(){
    return {
    nombre: {
        value: { value: "" },
        errorMessage: { value: "" },
      }

    }
  },
  components: {
      VueNotification,
    },
  methods: {
    irAHome() {
      this.$router.push({ name: 'lista-tipoSR-admin'});
    },
    bloquearCaracteresEspeciales() {
      this.nombre.value.value = this.nombre.value.value.replace(/[^a-zA-Z0-9\s]/g, '');
    },
    ajustarValorEstado() {
      if (!this.estado.value.value) {
        this.estado.value.value = 0;
      }
    },
    async crearTipoSR() {    
            if (!this.estado.value.value) {
              this.estado.value.value = 0;
            }
          
            if (this.nombre?.errorMessage?.value || !this.nombre.value.value) {
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
            };
            const data = {
                nombre : this.nombre.value.value,
                estado: this.estado.value.value,
            };
          axios.post('http://localhost:8080/v1/tipo-sr', data, config)
          .then(response => {
              this.$router.push({ name: 'lista-tipoSR-admin'});
              this.$notify({
                title: 'Éxito',
                text: 'El tipo solicitud-reserva se guardó correctamente.',
                type: 'success',
              });
            })
            .catch(error => {
              this.$notify({
                title: 'Error',
                text: 'Error, nombre de tipo solicitud-reserva ingresado ya existente. Intentalo de nuevo',
                type: 'error',
              });
            });
   
  },
  },
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        
        nombre(value) {
            if (value?.length >= 2) return true;

            return 'El nombre del tipo solicitud-reserva necesita más de 2 caracteres';
        },

      },
    });


    const nombre = useField('nombre');

    const estado = useField('estado');

    const submit = handleSubmit((values) => {
   
    });

    return {
      nombre,
      estado,
      submit,
    };
  },
 
};

</script>

<style>
.content_crearTipoSR{
    padding: 40px 100px 40px 100px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.content_crearTipoSR form{
    padding: 1px 50px 50px 50px; 
    background-color: rgb(255, 255, 255);
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;

}
.content_crearTipoSR h2{
    padding: 50px; 
    background-color: rgb(255, 255, 255);
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
}

.v-messages__message {
    text-align: start;
 
}
.v-input--horizontal {
    margin-top: 20px;
}

@media  screen and (max-width: 700px) {
  .content_crearTipoSR{
    padding: 20px 10px 50px 10px;
  }
}

@media  screen and (max-width: 460px) {
  .content_crearTipoSR{
    width: 100%;
  }
}

@media  screen and (max-width: 300px) {
  .content_crearTipoSR{
    padding: 20px 5px 50px 5px;
  }
  .content_crearTipoSR form{
    padding: 1px 10px 50px 10px;
  }
  .content_crearTipoSR h2 {
    padding: 50px 10px 50px 10px;

  }
}
</style>