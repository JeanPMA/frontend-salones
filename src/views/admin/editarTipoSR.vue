<template>
    <div class="content_crearTipoSR">    
        <h2>
            EDITAR TIPO SOLICITUD RESERVA
        </h2>
        <form @submit.prevent="submit">
        
    
        <v-text-field
            :error-messages="nombre.errorMessage.value"
            :counter="50"
            maxlength="50"
            label="Nombre"
            v-model="nombre.value.value"
            clearable
            @input="bloquearCaracteresEspeciales"
        ></v-text-field>
    
        <v-text-field
            :error-messages="estado.errorMessage.value"
            label="estado"
            :value="detalleTipoSR.estado === 1 ? 'HABILITADO' : 'DESHABILITADO'"
            v-model="detalleTipoSR.estado"
            disabled 
        ></v-text-field>
     
        <v-btn @click="irAHome" color="grey-lighten-1">
            Volver
        </v-btn>
    
        <v-btn
            class="ml-4"
            type="submit"
            @click="editarTipoSR"
            :disabled="cargando"
            color="grey-darken-3"
        >
         {{ cargando ? 'Guardando...' : 'Guardar' }}
        </v-btn>

        </form>
      <div v-if="cargando" class="overlay"></div>    
      <div v-if="cargando" class="loader"></div>
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
  data() {
    return {
      cargando: false,
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
    async obtenerYAsignar() {
      const tipoSRId = this.$route.params.id;
      await this.obtenerDetallesTipoSR(tipoSRId)


      this.nombre.value.value = this.detalleTipoSR.nombre;
    

    },
    async obtenerDetallesTipoSR(id) {
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

      const response = await axios.get(`http://localhost:8080/v1/tipo-sr/${id}`, config);

  
      this.detalleTipoSR = response.data;

    } catch (error) {
      console.error('Error al obtener detalles de la solicitud:', error);
    }
    },
    editarTipoSR() {

      this.mostrarErrorNombre = this.nombre.errorMessage.value;
      if (this.mostrarErrorNombre != undefined) {            
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
        }
        const data = {
                id : this.detalleTipoSR.id,
                nombre : this.nombre.value.value,
                estado: this.detalleTipoSR.estado,
                created_at: this.detalleTipoSR.created_at,
          };

      this.$axios.put(`http://localhost:8080/v1/tipo-sr/${this.detalleTipoSR.id}`, data, config)
        .then(response => {
          this.$router.push({ name: 'lista-tipoSR-admin'});
          this.$notify({
                title: 'Éxito',
                text: 'El tipo solicitud-reserva se actualizó correctamente.',
                type: 'success',
              });
          this.cargando = false;
        })
        .catch(error => {
          this.$notify({
                title: 'Error',
                text: 'Error, nombre del tipo solicitud-reserva modificado ya existente. Intentalo de nuevo',
                type: 'error',
              });
          this.cargando = false;
        });
},
  },
  data() {
  return {
      detalleTipoSR: {
        nombre: "",
        estado: '',
        created_at: "",
      
      },
      nombre: {
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