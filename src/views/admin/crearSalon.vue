<template>
    <div class="content_crearSalon">    
        <h2>
            FORMULARIO PARA LA CREACION DE SALON
        </h2>
        <form @submit.prevent="submit">
        <v-text-field
            v-model="nombre.value.value"
            :counter="10"
            :error-messages="nombre.errorMessage.value"
            label="Nombre"
        ></v-text-field>

        <v-text-field
            v-model="ubicacion.value.value"
            :counter="10"
            :error-messages="ubicacion.errorMessage.value"
            label="Ubicacion"
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
    
        <v-checkbox
            v-model="activo.value.value"
            :error-messages="activo.errorMessage.value"
            value="1"
            label="Habilitado?"
            type="activo"
        ></v-checkbox>
    
        <v-btn
            class="me-4"
            type="submit"
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
  
  export default{
  name: 'crearSalonComponent',
  methods: {
    irAHome() {
    // Redirige a la página de detalle del salón
      this.$router.push({ name: 'lista-salones-admin'});
    },
  },
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        nombre(value) {
          if (value?.length >= 2) return true;

          return 'El nombre del salón necesita más de 2 caracteres';
        },
        ubicacion(value) {
          if (value?.length >= 2) return true;

          return 'La ubicación del salón necesita más de 2 caracteres';
        },
        capacidad(value) {
          if (value?.length > 6 && /[0-9-]+/.test(value)) return true;

          return 'La capacidad del salón debe ser menor a 6 dígitos.';
        },
        descripcion(value) {
          // Agrega la regla de validación para la descripción según tus necesidades
          // Por ejemplo, puedes verificar la longitud o el formato.
          return true;
        },
        tarifa(value) {
          if (value?.length >= 2) return true;

          return 'La tarifa del salón necesita más de 2 caracteres';
        },
        activo(value) {
          if (value === '1') return true;

          return 'Debe ser marcado';
        },
      },
    });

    const nombre = useField('nombre');
    const ubicacion = useField('ubicacion');
    const capacidad = useField('capacidad');
    const descripcion = useField('descripcion');
    const tarifa = useField('tarifa');
    const activo = useField('activo');

    const submit = handleSubmit((values) => {
      alert(JSON.stringify(values, null, 2));
    });

    return {
      nombre,
      ubicacion,
      capacidad,
      descripcion,
      tarifa,
      activo,
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
.content_crearSalon{
    padding: 40px 100px 40px 100px;
}
.v-messages__message {
    text-align: start;
 
}
.v-input--horizontal {
    margin-top: 20px;
}
</style>