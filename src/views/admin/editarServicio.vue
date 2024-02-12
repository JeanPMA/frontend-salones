<template>
    <div class="content_crearServicio">    
        <h2>
            EDITAR SERVICIO
        </h2>
        <form @submit.prevent="submit">
        
    
        <v-text-field
            :error-messages="nombre.errorMessage.value"
            :counter="10"
            label="Nombre"

            v-model="nombre.value.value"
          
        ></v-text-field>
            
        <v-text-field
            :counter="20"
            :error-messages="detalle.errorMessage.value"
            label="Detalle"
            v-model="detalle.value.value"
   
        ></v-text-field>

        <v-text-field
            :error-messages="estado.errorMessage.value"
            label="estado"
            :value="servicio.estado === 1 ? 'HABILITADO' : 'DESHABILITADO'"
            v-model="servicio.estado"
            disabled 
        ></v-text-field>
 
        <v-btn
            class="me-4"
            type="submit"
            @click="editarServicio"
        >
            Guardar
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
    // Redirige a la página de detalle del salón
      this.$router.push({ name: 'lista-servicios-admin'});
    },
    async obtenerYAsignar() {
      const servicioId = this.$route.params.id;
      await this.obtenerDetallesServicio(servicioId)

      this.detalle.value.value = this.servicio.detalle;
      this.nombre.value.value = this.servicio.nombre;
     
    },
    async obtenerDetallesServicio(id) {
    try {
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwt_decode(token);

      const userRole = decodedToken.roles[0];
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': userRole
        }
      };

      const response = await axios.get(`http://localhost:8080/v1/servicio/${id}`, config);

  
      this.servicio = response.data;
      console.log(this.servicio);

    } catch (error) {
      console.error('Error al obtener detalles de la solicitud:', error);
    }
    },
    editarServicio() {

      this.mostrarErrorNombre = this.nombre.errorMessage.value;
      this.mostrarErrorDetalle = this.detalle.errorMessage.value;

      if (this.mostrarErrorNombre != undefined || this.mostrarErrorDetalle  != undefined) {
              
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
      }
      const data = {
              id : this.servicio.id,
              nombre : this.nombre.value.value,
              detalle : this.detalle.value.value,
              estado: this.servicio.estado,
              created_at: this.servicio.created_at,
        };
      
      this.$axios.put(`http://localhost:8080/v1/servicio/${this.servicio.id}`, data, config)
      .then(response => {
        console.log('Servicio actualizado con éxito:', response.data);
        this.$router.push({ name: 'lista-servicios-admin'});
      })
      .catch(error => {
        console.error('Error al actualizar el servicio:', error);
      });
},
  },
  data() {
    return {
        servicio: {
          id: '',
          nombre: '',
          detalle: '',
          estado: '',
          created_at: '',
        },
        
        nombre: {
          value: {
            value: ''
          },
          errorMessage: {
            value: ''
          }
        },
        detalle: {
          value: {
            value: ''
          },
          errorMessage: {
            value: ''
          }
        },

    };
},
mounted(){
  this.obtenerYAsignar();

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
</style>