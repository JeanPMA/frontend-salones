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
    
        <v-text-field
            v-model="fecha.value.value"
            :counter="10"
            :error-messages="fecha.errorMessage.value"
            label="Fecha agregado"
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
  name: 'crearServicioComponent',
  methods: {
    irAHome() {
    // Redirige a la página de detalle del salón
      this.$router.push({ name: 'lista-servicios-admin'});
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
        fecha(value) {
          if (value?.length >= 2) return true;

          return 'La fecha necesita más de 2 caracteres';
        },
        activo(value) {
          if (value === '1') return true;

          return 'Debe ser marcado';
        },
      },
    });


    const nombre = useField('nombre');
    const detalle = useField('detalle');
    const fecha = useField('fecha');
    const activo = useField('activo');

    const submit = handleSubmit((values) => {
      alert(JSON.stringify(values, null, 2));
    });

    return {
      nombre,
      detalle,
      fecha,
      activo,
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