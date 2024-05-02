<template>
    <div class="content_crearSalonDueño">    
        <font-awesome-icon :icon="['fas', 'square-plus']" style="font-size: 30px;"/>

        <h2 style="margin-top: 10px;">
            FORMULARIO PARA LA CREACION DE SALON
        </h2>
        <form @submit.prevent="submit" enctype="multipart/form-data">
        <v-text-field
            v-model="nombre.value.value"
            :counter="50"
            clearable
            :error-messages="nombre.errorMessage.value"
            maxlength="50"
            label="Nombre"
            @input="bloquearCaracteresEspeciales"
        ></v-text-field>


        <v-text-field
            v-model="direccion.value.value"
            clearable
            :counter="100"
            maxlength="100"
            :error-messages="direccion.errorMessage.value"
            label="Direccion"
        ></v-text-field>

        <v-text-field
            v-model="capacidad.value.value"
            clearable
            :counter="5"
            maxlength="5"
            :error-messages="capacidad.errorMessage.value"
            label="Capacidad del salon"
            @input="limitesCapacidad"
        ></v-text-field>
    
        <v-textarea 
            v-model="descripcion.value.value"
            clearable
            :error-messages="descripcion.errorMessage.value"
            :counter="200"
            maxlength="200"
            label="Descripcion"
        ></v-textarea>
            
        <v-text-field
            v-model="tarifa.value.value"
            clearable
            :counter="5"
            maxlength="5"
            :error-messages="tarifa.errorMessage.value"
            label="Tarifa del salon"
            @input="limitesTarifa"
        ></v-text-field>

        <v-select
          v-model="serviciosSeleccionados"       
          :items="servicios"
          item-title="nombre"
          item-value="id"
          label="Selecciona los servicios"
          multiple
          @update:modelValue="handleServiciosChange"
        ></v-select>
        <p v-if="errorServicios">Por favor, selecciona al menos 1 opcion.</p>

        <v-checkbox
            v-model="estado.value.value"
            :error-messages="estado.errorMessage.value"
            value="1"
            label="Marque esta casilla si desea habilitar el salón"
            type="activo"
            @input="ajustarValorEstado"

        ></v-checkbox>
        <div class="crear_salon_imagen"> 
          <h1>Imagen Salón</h1>
          <input type="file" @change="handleFileChange" accept="image/*">
          <p v-if="error">Por favor, selecciona una imagen.</p>
        </div>
     
        <v-btn @click="irAHome"  class="me-4">
          VOLVER
        </v-btn>
        <v-btn
           
            type="submit"
            @click="crearSalon"
            :disabled="cargando"
        >
        {{ cargando ? 'Creando...' : 'Crear' }}
        </v-btn>
    
        <!-- <v-btn @click="handleReset"  class="me-4">
            Limpiar
        </v-btn> -->  

       
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
  name: 'crearSalonDueñoComponent',
  components: {
      VueNotification,
    },

  data() {
    return {
      selectedFile: null,
      serviciosSeleccionados: [],
      error: false,
      errorServicios: false,
      cargando: false,
      estado: {
        value: { value: 0 },
        errorMessage: { value: "" },
      }
    };
  },
  methods: {
    irAHome() {
      this.$router.push({ name: 'lista-salones'});
    },
    ajustarValorEstado() {
      if (!this.estado.value.value) {
        this.estado.value.value = 0;
      }
    },
    limitesCapacidad(){
    this.limitarLongitudCapacidad();
    this.bloquearECapacidad();
    },
    limitarLongitudCapacidad() {
        if (this.capacidad.value.value.length > 8) {
          this.capacidad.value.value = this.capacidad.value.value.slice(0, 8);
        }
    },
    bloquearECapacidad() {
      this.capacidad.value.value = this.capacidad.value.value.replace(/\D/g, '');
    },
    limitesTarifa(){
    this.limitarLongitudTarifa();
    this.bloquearETarifa();
    },
    limitarLongitudTarifa() {
        if (this.tarifa.value.value.length > 8) {
          this.tarifa.value.value = this.tarifa.value.value.slice(0, 8);
        }
    },
    bloquearETarifa() {
      this.tarifa.value.value = this.tarifa.value.value.replace(/\D/g, '');
    },
    bloquearCaracteresEspeciales() {
      this.nombre.value.value = this.nombre.value.value.replace(/[^a-zA-Z0-9\s]/g, '');
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      this.error = false;
    },
    handleServiciosChange() {
      this.errorServicios = false;
    },

    async crearSalon() {
   
      this.error = !this.selectedFile;
      this.errorServicios = this.serviciosSeleccionados.length === 0 ;
      if (!this.estado.value.value) {
        this.estado.value.value = 0;
      }
      if (this.error || this.errorServicios) {
        return;
      }
      const errores = [
              this.nombre,
              this.direccion,
              this.capacidad,
              this.descripcion,
              this.tarifa,
      ];

      for (const error of errores) {
          if (error?.errorMessage?.value || !error.value.value) {
            return;
          }
      }
            this.cargando = true;
            const formData = new FormData();
          
  
            formData.append('nombre', this.nombre.value.value);
            formData.append('direccion', this.direccion.value.value);
            formData.append('capacidad', this.capacidad.value.value);
            formData.append('descripcion', this.descripcion.value.value);
            formData.append('tarifa', this.tarifa.value.value);
            formData.append('estado', this.estado.value.value);

            formData.append('multipartFile', this.selectedFile);
            formData.append('servicios', this.serviciosSeleccionados.join(','));

            const token = localStorage.getItem('jwtToken');
            const decodedToken = jwt_decode(token);
            const userRole = decodedToken.roles[0];
            const username = decodedToken.sub;
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
                'X-User-Role': userRole,
                'Content-Type': 'multipart/form-data',
              },
              params: {
                username: username,
              },
            };

          const apiUrl = process.env.VUE_APP_BASE_URL;
          axios.post(`${apiUrl}/v1/salon`, formData, config)
          .then(response => {
              this.$router.push({ name: 'lista-salones'});
              this.$notify({
                title: 'Éxito',
                text: 'El salón se registró correctamente.',
                type: 'success',
              });
              this.cargando = false;
            })
            .catch(error => {
              this.$notify({
                title: 'Error',
                text: 'Error, nombre de salón ingresado ya existente. Intentalo de nuevo',
                type: 'error',
              });
              this.cargando = false;
            });
   
  },
  },
  setup() {
            const token = localStorage.getItem('jwtToken');
            const decodedToken = jwt_decode(token);
            const userRole = decodedToken.roles[0];
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
                'X-User-Role': userRole,
              },
            };
            const servicios = ref([]);
            const apiUrl = process.env.VUE_APP_BASE_URL;
            axios.get(`${apiUrl}/v1/servicio/activo`, config)
              .then(response => {
                servicios.value = response.data;
              
              })
              .catch(error => {
                console.error('Error al obtener servicios:', error);
              });

              
      

    const { handleSubmit } = useForm({
      validationSchema: {
        nombre(value) {
          if (value?.length >= 2) return true;

          return 'El nombre del salón necesita más de 2 caracteres';
        },
        direccion(value) {
          if (value?.length >= 2) return true;

          return 'La ubicación del salón necesita más de 2 caracteres';
        },
        capacidad(value) {
          const digitsOnly = String(value).replace(/\D/g, '');

          if (digitsOnly === '') {
            return 'Ingrese la capacidad del salón.';
          }

          return true;
        },
        descripcion(value) {
          if (value?.length >= 2) return true;

            return 'La descripción del salón necesita más de 2 caracteres';
        },
        tarifa(value) {
          const digitsOnly = String(value).replace(/\D/g, '');

          if (digitsOnly === '') {
            return 'Ingrese la tarifa del salón.';
          }

          return true;
        },
 
       
      },
    });
    
    const nombre = useField('nombre');
    const direccion = useField('direccion');
    const capacidad = useField('capacidad');
    const descripcion = useField('descripcion');
    const tarifa = useField('tarifa');
    const estado = useField('estado');

    const submit = handleSubmit((values) => {
      
    });
    return {
      nombre,
      direccion,
      capacidad,
      descripcion,
      tarifa,
      servicios,
  
      estado,

      submit,
    };
  },
};

</script>

<style>
.content_crearSalonDueño{
  margin-left: auto;
  margin-right: auto;
  width: 80vw;
  height: auto;
  padding: 20px 100px 50px 100px;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  border-radius: 50px;
  position: relative; 
}

.content_crearSalonDueño svg{
  color: white;
}

.content_crearSalonDueño form{
  padding: 1px 50px 50px 50px; 
  background-color: rgb(255, 255, 255);
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border: 2px solid #000000;
  border-top: none;
}

.content_crearSalonDueño h2{
  padding: 50px; 
  background-color: rgb(255, 255, 255);
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border: 2px solid #000000;
  border-bottom: none;
}

.content_crearSalonDueño p{
  color: rgb(176, 0, 32); 
  font-size: 12px;
  margin-bottom: 5px;
  margin-left: 20px;
  display: block;
  text-align: start;
}

.content_crearSalonDueño .crear_salon_imagen{
  display: flex;
  flex-direction: column;
  text-align: start;
  margin-bottom: 20px;
}

.content_crearSalonDueño .crear_salon_imagen p{
  margin-top: 5px;
}

.content_crearSalonDueño .crear_salon_imagen input{
  margin-top: 10px;
  color: rgb(118, 118, 118);
}

.content_crearSalonDueño h1{
  font-size: 20px;
  color: rgb(118, 118, 118);
}

.v-messages__message {
  text-align: start;
}

.v-input--horizontal {
  margin-top: 20px;
}

@media  screen and (max-width: 700px) {
  .content_crearSalonDueño{
    padding: 20px 10px 50px 10px;
  }
}

@media  screen and (max-width: 460px) {
  .content_crearSalonDueño{
    width: 100%;
  }
}

@media  screen and (max-width: 300px) {
  .content_crearSalonDueño{
    padding: 20px 5px 50px 5px;
  }

  .content_crearSalonDueño form{
    padding: 1px 10px 50px 10px;
  }
  
  .content_crearSalonDueño h2 {
    padding: 50px 10px 50px 10px;

  }
}
</style>