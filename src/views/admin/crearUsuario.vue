<template>
    <div class="content_crearUsuario">    
        <h2>
            FORMULARIO PARA LA CREACION DE USUARIO
        </h2>
        <form @submit.prevent="submit">
        <v-text-field
            v-model="usuario.value.value"
            :counter="10"
            :error-messages="usuario.errorMessage.value"
            label="Usuario"
        ></v-text-field>

        <v-text-field
            v-model="contraseña.value.value"
            :counter="10"
            :error-messages="contraseña.errorMessage.value"
            label="Contraseña"
        ></v-text-field>

        <v-text-field
            v-model="telefono.value.value"
            :counter="8"
            :error-messages="telefono.errorMessage.value"
            label="Numero de telefono"
        ></v-text-field>
    
        <v-text-field
            v-model="nombre.value.value"
            :error-messages="nombre.errorMessage.value"
            :counter="10"
            label="Nombre"
        ></v-text-field>
            
        <v-text-field
            v-model="apellido.value.value"
            :counter="10"
            :error-messages="apellido.errorMessage.value"
            label="Apellido"
        ></v-text-field>

        <v-text-field
            v-model="correo.value.value"
            :counter="10"
            :error-messages="correo.errorMessage.value"
            label="Correo electronico"
        ></v-text-field>
    
        <v-text-field
            v-model="rol.value.value"
            :counter="10"
            :error-messages="rol.errorMessage.value"
            label="Rol"
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
  name: 'crearUsuarioComponent',
  methods: {
    irAHome() {
    // Redirige a la página de detalle del salón
      this.$router.push({ name: 'lista-usuarios-admin'});
    },
  },
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        usuario(value) {
          if (value?.length >= 2) return true;

          return 'El usuario del salón necesita más de 2 caracteres';
        },
        contraseña(value) {
          if (value?.length >= 2) return true;

          return 'La ubicación del salón necesita más de 2 caracteres';
        },
        telefono(value) {
          if (value?.length > 9 && /[0-9-]+/.test(value)) return true;

          return 'La telefono del salón debe ser menor a 6 dígitos.';
        },
        nombre(value) {
            if (value?.length >= 2) return true;

            return 'El nombre necesita más de 2 caracteres';
        },
        apellido(value) {
          if (value?.length >= 2) return true;

          return 'El apellido necesita más de 2 caracteres';
        },
        correo(value) {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

        return 'Tiene que ser valido el e-mail.'
        },
        estado(value) {
          if (value?.length >= 2) return true;

          return 'El estado necesita más de 2 caracteres';
        },
        activo(value) {
          if (value === '1') return true;

          return 'Debe ser marcado';
        },
      },
    });

    const usuario = useField('usuario');
    const contraseña = useField('contraseña');
    const telefono = useField('telefono');
    const nombre = useField('nombre');
    const apellido = useField('apellido');
    const correo = useField('correo');
    const rol = useField('rol');
    const activo = useField('activo');

    const submit = handleSubmit((values) => {
      alert(JSON.stringify(values, null, 2));
    });

    return {
      usuario,
      contraseña,
      telefono,
      nombre,
      apellido,
      correo,
      rol,
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
.content_crearUsuario{
    padding: 40px 100px 40px 100px;
}
.v-messages__message {
    text-align: start;
 
}
.v-input--horizontal {
    margin-top: 20px;
}
</style>