<template>
    <div class="content_crearusername">    
        <h2>
            FORMULARIO PARA LA CREACION DE username
        </h2>
        <form @submit.prevent="submit">
        <v-text-field
            v-model="username.value.value"
            :counter="10"
            :error-messages="username.errorMessage.value"
            label="Usuario"
        ></v-text-field>

        <v-text-field
            v-model="password.value.value"
            :counter="10"
            :error-messages="password.errorMessage.value"
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
    
        <v-select
                  v-model="rol.id"
                  label="Selecciona un rol"
                  :items="listaRoles"
                  variant="outlined"
                  item-title="nombre"
                  item-value="id"
                  hide-details
                  @update:modelValue="limpiarErrorUsuario"
          ></v-select>
          <span v-if="mostrarErrorUsuario" class="error-message">Tienes que seleccionar una opción</span>

        <v-checkbox
            v-model="estado.value.value"
            :error-messages="estado.errorMessage.value"
            value="1"
            label="Habilitado?"
            type="activo"
        ></v-checkbox>
    
        <v-btn
            class="me-4"
            type="submit"
            @click="crearUsuario"
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
  import axios from 'axios';
  import jwt_decode from 'jwt-decode';

  export default{
  name: 'crearusernameComponent',
  data() { 
    return {
      listaRoles: [],
      rol: {
            id: null,
      },
      mostrarErrorUsuario: false,
    }
  },
  async  mounted() {
      await this.obtenerRoles();
  },
  methods: {
    irAHome() {
      this.$router.push({ name: 'lista-usuarios-admin'});
    },
    limpiarErrorUsuario() {
      this.mostrarErrorUsuario = false;
    },
    async obtenerRoles() {

      try {
        const token = localStorage.getItem('jwtToken');
        const decodedToken = jwt_decode(token);
        const userRole = decodedToken.roles[0];
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-User-Role': userRole,
          },
        };

        const response = await axios.get('http://localhost:8080/v1/rol', config);

        this.listaRoles = response.data.map(item => ({ id: item.id, nombre: item.nombre }));
      } catch (error) {
        console.error('Error al obtener roles:', error);
      }
    },
    async crearUsuario() {    
      this.mostrarErrorUsuario = !this.rol.id;

      if(this.mostrarErrorUsuario) {
              
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
            };
            const data = {
                username : this.username.value.value,
                password : this.password.value.value,
                telefono: this.telefono.value.value,
                nombre: this.nombre.value.value,
                apellido: this.apellido.value.value,
                correo: this.correo.value.value,
                rol: {
                  id: this.rol.id
                },
                estado: this.estado.value.value,
            };
          console.log(data);
          axios.post('http://localhost:8080/v1/usuario', data, config)
          .then(response => {
              console.log('Usuario guardado:', response.data);
              this.$router.push({ name: 'lista-usuarios-admin'});
            })
            .catch(error => {
              console.error('Error al guardar usuario:', error);
            });
   
  },
  },
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        username(value) {
          if (value?.length >= 2) return true;

          return 'El username del salón necesita más de 2 caracteres';
        },
        password(value) {
          if (value?.length >= 2) return true;

          return 'La ubicación del salón necesita más de 2 caracteres';
        },
        telefono(value) {
          if (value?.length <= 8 && /[0-9-]+/.test(value)) return true;

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
          if (value?.length >= 2) return true;

        return 'Tiene que ser valido el e-mail.'
        },
        estado(value) {
          if (value?.length >= 2) return true;

          return 'El estado necesita más de 2 caracteres';
        },
        estado(value) {
          if (value === '1') return true;

          return 'Debe ser marcado';
        },
      },
    });

    const username = useField('username');
    const password = useField('password');
    const telefono = useField('telefono');
    const nombre = useField('nombre');
    const apellido = useField('apellido');
    const correo = useField('correo');
    
    const estado = useField('estado');

    const submit = handleSubmit((values) => {
     
    });

    return {
      username,
      password,
      telefono,
      nombre,
      apellido,
      correo,
      estado,
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
.content_crearusername{
    padding: 40px 100px 40px 100px;
}
.v-messages__message {
    text-align: start;
 
}
.v-input--horizontal {
    margin-top: 20px;
}
</style>