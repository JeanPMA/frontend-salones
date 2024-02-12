<template>
    <div class="content_crearServicio">    
        <h2>
            FORMULARIO PARA LA CREACION DE SERVICIO
        </h2>
        <form @submit.prevent="submit">
        
    
        <v-text-field
            v-model="nombre.value.value"
            :error-messages="nombre.errorMessage.value"
            :counter="10"
            label="Nombre"
        ></v-text-field>
            
        <v-text-field
            v-model="detalle.value.value"
            :counter="20"
            :error-messages="detalle.errorMessage.value"
            label="Detalle"
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
            @click="crearServicio" 
        >
            Crear
        </v-btn>
    
        <v-btn @click="handleReset"  class="me-4">
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

      this.$router.push({ name: 'lista-servicios-admin'});
    },
    async crearServicio() {    
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
            console.log(data);
          axios.post('http://localhost:8080/v1/servicio', data, config)
          .then(response => {
              console.log('Servicio guardado:', response.data);
              this.$router.push({ name: 'lista-servicios-admin'});
            })
            .catch(error => {
              console.error('Error al guardar servicio:', error);
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

        estado(value) {
          if (value === '1') return true;

          return 'Debe ser marcado';
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
/*nombre (value) {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

        return 'Must be a valid e-mail.'
      },
      select (value) {
        if (value) return true

        return 'Select an item.'
      },*/
</script>

<style>
.content_crearServicio{
    padding: 40px 100px 40px 100px;
}
.v-messages__message {
    text-align: start;
 
}
.v-input--horizontal {
    margin-top: 20px;
}
</style>