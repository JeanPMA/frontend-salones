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
      this.$router.push({ name: 'lista-tipoSR-admin'});
    },
  },
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        
        nombre(value) {
            if (value?.length >= 2) return true;

            return 'El nombre necesita más de 2 caracteres';
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
    const fecha = useField('fecha');
    const activo = useField('activo');

    const submit = handleSubmit((values) => {
      alert(JSON.stringify(values, null, 2));
    });

    return {
      nombre,
      fecha,
      activo,
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