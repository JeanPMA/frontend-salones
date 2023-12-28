<template>
    <div class="content_crearSalon">    
        <h2>
            EDITAR INFORMACION
        </h2>
        <form @submit.prevent="submit">
        <v-text-field           
            :counter="50"
            :error-messages="nombre.errorMessage.value"
            label="Nombre"
            v-model="nombreSalon"
        ></v-text-field>

        <v-text-field
            :counter="10"
            :error-messages="ubicacion.errorMessage.value"
            label="Ubicacion"
            v-model="ubicacionSalon"
        ></v-text-field>

        <v-text-field
            :counter="5"
            :error-messages="capacidad.errorMessage.value"
            label="Capacidad"
            v-model="capacidadSalon"
        ></v-text-field>
    
        <v-textarea 
            :error-messages="descripcion.errorMessage.value"
            :counter="50"
            label="Descripcion"
            v-model="descripcionSalon"
        ></v-textarea>
            
        <v-text-field
            :counter="8"
            :error-messages="tarifa.errorMessage.value"
            label="Tarifa"
            v-model="tarifaSalon"
        ></v-text-field>
    
        <v-checkbox

            :error-messages="activo.errorMessage.value"
            label="Habilitado?"
            v-model="habilitadoSalon"
            type="activo"
        ></v-checkbox>
    
        <v-btn
            class="me-4"
            type="submit"
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
  
  export default{
  name: 'editarSalonComponent',
  methods: {
    irAHome() {
    // Redirige a la página de detalle del salón
      this.$router.push({ name: 'lista-salones-admin'});
    },
  },
  data() {
    return {
        nombreSalon: 'SALON DE EVENTOS XD',
        ubicacionSalon: 'AV PETROLERA KM9',
        capacidadSalon: 600,
        descripcionSalon: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
        tarifaSalon: '6 BS',
        habilitadoSalon: true,
    };
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