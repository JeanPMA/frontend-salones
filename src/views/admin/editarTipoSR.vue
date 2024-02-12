<template>
    <div class="content_crearTipoSR">    
        <h2>
            EDITAR TIPO SOLICITUD RESERVA
        </h2>
        <form @submit.prevent="submit">
        
    
        <v-text-field
            :error-messages="nombre.errorMessage.value"
            :counter="10"
            label="Nombre"
            v-model="nombre.value.value"
        ></v-text-field>
    
        <v-text-field
            :error-messages="estado.errorMessage.value"
            label="estado"
            :value="detalleTipoSR.estado === 1 ? 'HABILITADO' : 'DESHABILITADO'"
            v-model="detalleTipoSR.estado"
            disabled 
        ></v-text-field>
 
    
        <v-btn
            class="me-4"
            type="submit"
            @click="editarTipoSR"
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
      this.$router.push({ name: 'lista-tipoSR-admin'});
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
     console.log(this.detalleTipoSR);

    } catch (error) {
      console.error('Error al obtener detalles de la solicitud:', error);
    }
    },
    editarTipoSR() {
      this.mostrarErrorNombre = this.nombre.errorMessage.value;
      if (this.mostrarErrorNombre != undefined) {            
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
                id : this.detalleTipoSR.id,
                nombre : this.nombre.value.value,
                estado: this.detalleTipoSR.estado,
                created_at: this.detalleTipoSR.created_at,
          };

      this.$axios.put(`http://localhost:8080/v1/tipo-sr/${this.detalleTipoSR.id}`, data, config)
        .then(response => {
          console.log('TipoSR actualizado con éxito:', response.data);
          this.$router.push({ name: 'lista-tipoSR-admin'});
        })
        .catch(error => {
          console.error('Error al actualizar el TipoSR:', error);
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