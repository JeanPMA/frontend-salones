<template>
    <div class="content_crearTipoSR">    
        <h2>
            FORMULARIO PARA LA CREACION DE TIPO SOLICITUD RESERVA
        </h2>
        <form @submit.prevent="submit">
        
    
        <v-text-field
            v-model="nombre.value.value"
            :error-messages="nombre.errorMessage.value"
            :counter="10"
            label="Nombre"
        ></v-text-field>
    

        <v-checkbox
            v-model="estado.value.value"
            :error-messages="estado.errorMessage.value"
            value="1"
            label="Habilitado?"
            type="activo"
        ></v-checkbox>
    
        <v-btn
            class="me-4"
            type="submit"
            @click="crearTipoSR" 
            
        >
            Crear
        </v-btn>
    
        <v-btn @click=""  class="me-4">
            Limpiar
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

  
  export default{
  name: 'crearServicioComponent',
  methods: {
    irAHome() {

      this.$router.push({ name: 'lista-tipoSR-admin'});
    },
    async crearTipoSR() {    
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
            console.log(data);
          axios.post('http://localhost:8080/v1/tipo-sr', data, config)
          .then(response => {
              console.log('Tipo SR guardada:', response.data);
              this.$router.push({ name: 'lista-tipoSR-admin'});
            })
            .catch(error => {
              console.error('Error al guardar Tipo SR:', error);
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

        estado(value) {
          if (value === '1') return true;

          return 'Debe ser marcado';
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
}
.v-messages__message {
    text-align: start;
 
}
.v-input--horizontal {
    margin-top: 20px;
}
</style>