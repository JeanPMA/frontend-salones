<template>
    <div class="content_crearSalonDueño">    
        <font-awesome-icon :icon="['fas', 'square-plus']" style="font-size: 30px;"/>

        <h2 style="margin-top: 10px;">
            FORMULARIO PARA LA CREACION DE SALON
        </h2>
        <form @submit.prevent="submit" enctype="multipart/form-data">
        <v-text-field
            v-model="nombre.value.value"
            :counter="10"
            :error-messages="nombre.errorMessage.value"
            label="Nombre"
        ></v-text-field>


        <v-text-field
            v-model="direccion.value.value"
            :counter="10"
            :error-messages="direccion.errorMessage.value"
            label="Direccion"
        ></v-text-field>

        <v-text-field
            v-model="capacidad.value.value"
            :counter="5"
            :error-messages="capacidad.errorMessage.value"
            label="Capacidad del salon"
        ></v-text-field>
    
        <v-textarea 
            v-model="descripcion.value.value"
            :error-messages="descripcion.errorMessage.value"
            :counter="50"
            label="Descripcion"
        ></v-textarea>
            
        <v-text-field
            v-model="tarifa.value.value"
            :counter="8"
            :error-messages="tarifa.errorMessage.value"
            label="Tarifa del salon"
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
            label="Habilitado?"
            type="activo"
        ></v-checkbox>

        <h1>Subir Imagen</h1>
        <input type="file" @change="handleFileChange" accept="image/*">
        <p v-if="error">Por favor, selecciona una imagen.</p>

        <v-btn
            class="me-4"
            type="submit"
            @click="crearSalon"
        >
            Crear
        </v-btn>
    
        <!-- <v-btn @click="handleReset"  class="me-4">
            Limpiar
        </v-btn> -->  

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
  name: 'crearSalonDueñoComponent',
  data() {
    return {
      selectedFile: null,
      serviciosSeleccionados: [],
      error: false,
      errorServicios: false,
    };
  },
  methods: {
    irAHome() {
    // Redirige a la página de detalle del salón
      this.$router.push({ name: 'lista-salones'});
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
      if (this.error || this.errorServicios) {

        return;
      }

      
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

    
          axios.post('http://localhost:8080/v1/salon', formData, config)
          .then(response => {
              console.log('Salon guardado:', response.data);
              this.$router.push({ name: 'lista-salones'});
            })
            .catch(error => {
              console.error('Error al guardar el Salon:', error);
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
            axios.get('http://localhost:8080/v1/servicio/activo', config)
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
          if (value?.length < 6 && /[0-9-]+/.test(value)) return true;

          return 'La capacidad del salón debe ser menor a 6 dígitos.';
        },
        descripcion(value) {
          // Agrega la regla de validación para la descripción según tus necesidades
          // Por ejemplo, puedes verificar la longitud o el formato.
          return true;
        },
        tarifa(value) {
          if (value?.length < 5 && /[0-9-]+/.test(value)) return true;

          return 'La tarifa del salón debe ser menor a 5 dígitos.';
        },
        estado(value) {
          if (value === '1') return true;

          return 'Debe ser marcado';
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
/*descripcion (value) {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

        return 'Must be a valid e-mail.'
      },
      select (value) {
        if (value) return true

        return 'Select an item.'
      },*/
</script>

<style>
.content_crearSalonDueño{
    margin-left: auto;
    margin-right: auto;
    width: 70vw;
    /*background-color: rgba(179, 178, 178, 0.856);*/
    padding: 20px 100px 50px 100px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    border-radius: 50px;
}
.content_crearSalonDueño form{
    padding: 1px 50px 50px 50px; 
    background-color: rgb(255, 255, 255);
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
}
.content_crearSalonDueño h2{
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
</style>