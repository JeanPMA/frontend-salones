<template>
    <div class="content_crearServicioTipoSR">    
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
      
        <v-btn @click="irAHome" color="grey-lighten-1">
            Volver
        </v-btn>

        <v-btn
            class="ml-4"
            type="submit"
            @click="crearTipoSR" 
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
  data(){
    return {
    cargando: false,
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
                estado: this.estado.value.value,
            };
          const apiUrl = process.env.VUE_APP_BASE_URL;
          axios.post(`${apiUrl}/v1/tipo-sr`, data, config)
          .then(response => {
              this.$router.push({ name: 'lista-tipoSR-admin'});
              this.$notify({
                title: 'Éxito',
                text: 'El tipo solicitud-reserva se guardó correctamente.',
                type: 'success',
              });
              this.cargando = false;
            })
            .catch(error => {
              this.$notify({
                title: 'Error',
                text: 'Error, nombre de tipo solicitud-reserva ingresado ya existente. Intentalo de nuevo',
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
</style>