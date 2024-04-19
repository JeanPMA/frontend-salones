<template>
    <div class="content_crearServicioTipoSR">    
        <h2>
            FORMULARIO PARA LA CREACION DE SERVICIO
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
            
        <v-text-field
            v-model="detalle.value.value"
            :counter="100"
            maxlength="100"
            :error-messages="detalle.errorMessage.value"
            label="Detalle"
        ></v-text-field>

        <v-checkbox
            v-model="estado.value.value"
            :error-messages="estado.errorMessage.value"
            value="1"
            label="Marque esta casilla si desea habilitar el servicio"
            type="activo"
            @input="ajustarValorEstado"

        ></v-checkbox>
    
        <v-btn @click="irAHome" color="grey-lighten-1">
            Volver
        </v-btn>

        <v-btn
            class="ml-4"
            type="submit"
            @click="crearServicio" 
            :disabled="cargando"
            color="grey-darken-3"
        >
          {{ cargando ? 'Creando...' : 'Crear' }}
        </v-btn>
    


        </form>
        <div v-if="cargando" class="overlay"></div>    
        <div v-if="cargando" class="loader"></div>
</div>
  </template>

<script>
  import { useField, useForm } from 'vee-validate';
  import axios from 'axios';
  import jwt_decode from 'jwt-decode';
  import VueNotification from '@kyvg/vue3-notification';

  export default{
  name: 'crearServicioComponent',
  components: {
      VueNotification,
    },
  data() {
    return {
      cargando: false,
    }
  },
  methods: {
    irAHome() {

      this.$router.push({ name: 'lista-servicios-admin'});
    },
    ajustarValorEstado() {
      if (!this.estado.value.value) {
        this.estado.value.value = 0;
      }
    },
    bloquearCaracteresEspeciales() {
      this.nombre.value.value = this.nombre.value.value.replace(/[^a-zA-Z0-9\s]/g, '');
    },
    async crearServicio() {    
            if (!this.estado.value.value) {
              this.estado.value.value = 0;
            }
            if (this.detalle?.errorMessage?.value || !this.detalle.value.value
            || this.nombre?.errorMessage?.value || !this.nombre.value.value) {
              return;
            }
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
            };
            const data = {
                nombre : this.nombre.value.value,
                detalle : this.detalle.value.value,
                estado: this.estado.value.value,
            };
          const apiUrl = process.env.VUE_APP_BASE_URL;
          axios.post(`${apiUrl}/v1/servicio`, data, config)
          .then(response => {
              this.$notify({
                title: 'Éxito',
                text: 'El servicio se guardó correctamente.',
                type: 'success',
              });
              this.$router.push({ name: 'lista-servicios-admin'});
              this.cargando = false;
            })
            .catch(error => {
              this.$notify({
                title: 'Error',
                text: 'Error, nombre de servicio ingresado ya existente. Intentalo de nuevo',
                type: 'error',
              });
              this.cargando = false;
            });
   
  },
  },
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        
        nombre(value) {
            if (value?.length >= 2) return true;

            return 'El nombre necesita más de 2 caracteres';
        },
        detalle(value) {
          if (value?.length >= 2) return true;

          return 'El detalle necesita más de 2 caracteres';
        },

      },
    });


    const nombre = useField('nombre');
    const detalle = useField('detalle');
    const estado = useField('estado');

    const submit = handleSubmit((values) => {

    });

    return {
      nombre,
      detalle,
      estado,
      submit,
    };
  },
};

</script>

<style>
.content_crearServicioTipoSR{
  padding: 40px 100px 40px 100px;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content_crearServicioTipoSR form{
  padding: 1px 50px 50px 50px; 
  background-color: rgb(255, 255, 255);
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border: 2px solid #000000;
  border-top: none;
}

.content_crearServicioTipoSR h2{
  padding: 50px; 
  background-color: rgb(255, 255, 255);
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border: 2px solid #000000;
  border-bottom: none;
}

@media  screen and (max-width: 700px) {
  .content_crearServicioTipoSR{
    padding: 20px 10px 50px 10px;
  }
}

@media  screen and (max-width: 460px) {
  .content_crearServicioTipoSR{
    width: 100%;
  }
}

@media  screen and (max-width: 300px) {
  .content_crearServicioTipoSR{
    padding: 20px 5px 50px 5px;
  }

  .content_crearServicioTipoSR form{
    padding: 1px 10px 50px 10px;
  }

  .content_crearServicioTipoSR h2 {
    padding: 50px 10px 50px 10px;
  }
}
</style>