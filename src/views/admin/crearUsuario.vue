<template>
    <div class="content_crearusername">    
        <h2>
            FORMULARIO PARA LA CREACION DE USUARIO
        </h2>
        <form @submit.prevent="submit">
        <v-text-field
            v-model="username.value.value"
            :counter="50"
            maxlength="50"
            :error-messages="username.errorMessage.value"
            label="Usuario"
            clearable
        ></v-text-field>

        <v-text-field
            v-model="password.value.value"
            :counter="50"
            maxlength="50"
            :error-messages="password.errorMessage.value"
            label="Contraseña"
            clearable
        ></v-text-field>

        <v-text-field
            v-model="telefono.value.value"
            :counter="8"
            maxlength="8"
            :error-messages="telefono.errorMessage.value"
            label="Numero de telefono"
            clearable
            @input="limitesTelefono"

        ></v-text-field>
     
        <v-text-field
            v-model="nombre.value.value"
            :error-messages="nombre.errorMessage.value"
            :counter="50"
            maxlength="50"
            label="Nombre"
            @input="bloquearCaracteresEspecialesNombre"
            clearable
        ></v-text-field>
            
        <v-text-field
            v-model="apellido.value.value"
            :counter="50"
            maxlength="50"
            :error-messages="apellido.errorMessage.value"
            label="Apellido"
            @input="bloquearCaracteresEspecialesApellido"
            clearable

        ></v-text-field>

        <v-text-field
            v-model="correo.value.value"
            :counter="100"
            maxlength="100"
            :error-messages="correo.errorMessage.value"
            label="Correo electronico"
            clearable
        ></v-text-field>
    
        <v-select
                  v-model="rol.id"
                  label="Selecciona un rol"
                  :items="listaRoles"
                  variant="outlined"
                  item-title="nombre"
                  item-value="id"
                  hide-details
                  @update:modelValue="limpiarErrorRol"
          ></v-select>
          <span v-if="mostrarErrorRol" class="error-message">Tienes que seleccionar una opción</span>

        <v-checkbox
            v-model="estado.value.value"
            :error-messages="estado.errorMessage.value"
            value="1"
            label="Marque esta casilla si desea habilitar el usuario"
            type="activo"
            @input="ajustarValorEstado"

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
  import VueNotification from '@kyvg/vue3-notification';

  export default{
  name: 'crearusernameComponent',
  data() { 
    return {
      listaRoles: [],
      rol: {
            id: null,
      },
      mostrarErrorRol: false,
    }
  },
  components: {
      VueNotification,
    },
  async  mounted() {
      await this.obtenerRoles();
  },
  methods: {
    irAHome() {
      this.$router.push({ name: 'lista-usuarios-admin'});
    },
    ajustarValorEstado() {
      if (!this.estado.value.value) {
        this.estado.value.value = 0;
      }
    },
    bloquearCaracteresEspecialesNombre() {
      this.nombre.value.value = this.nombre.value.value.replace(/[^a-zA-Z\s]/g, '');
    },
    bloquearCaracteresEspecialesApellido() {
      this.apellido.value.value = this.apellido.value.value.replace(/[^a-zA-Z\s]/g, '');
    },
    limitesTelefono(){
    this.limitarLongitudTelefono();
    this.bloquearE();
    },
    limitarLongitudTelefono() {
        if (this.telefono.value.value.length > 8) {
          this.telefono.value.value = this.telefono.value.value.slice(0, 8);
        }
    },
    bloquearE() {
      this.telefono.value.value = this.telefono.value.value.replace(/\D/g, '');
    },
    limpiarErrorRol() {
      this.mostrarErrorRol = false;
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
            this.mostrarErrorRol = !this.rol.id;

            if (!this.estado.value.value) {
              this.estado.value.value = 0;
            }
            const errores = [
              this.username,
              this.password,
              this.telefono,
              this.nombre,
              this.apellido,
              this.correo,
            ];

            for (const error of errores) {
              if (error?.errorMessage?.value || !error.value.value) {
                return;
              }
            }

            if (this.mostrarErrorRol) {
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
          axios.post('http://localhost:8080/v1/usuario', data, config)
          .then(response => {
              this.$router.push({ name: 'lista-usuarios-admin'});
              this.$notify({
                title: 'Éxito',
                text: 'El usuario se guardó correctamente.',
                type: 'success',
              });
            })
            .catch(error => {
              this.$notify({
                title: 'Error',
                text: 'Error, nombre o correo de usuario ingresado ya existente. Intentalo de nuevo',
                type: 'error',
              });
            });
   
  },
  },
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        username(value) {
          if (value?.length >= 2) return true;

          return 'El username del usuario necesita más de 2 caracteres';
        },
        password(value) {
          if (value?.length >= 2) return true;

          return 'La contraseña del usuario necesita más de 2 caracteres';
        },
        telefono(value) {
          const digitsOnly = String(value).replace(/\D/g, ''); 
          if (/^\d{7,}$/.test(digitsOnly)) {
            return true;
          }

          return 'El telefono del usuario debe ser mayor o igual a 7 dígitos.';
        },
        nombre(value) {
            if (value?.length >= 2) return true;

            return 'El nombre del usuario necesita más de 2 caracteres';
        },
        apellido(value) {
          if (value?.length >= 2) return true;

          return 'El apellido del usuario necesita más de 2 caracteres';
        },
        correo(value) {
          if (/^[a-zA-Z0-9.-]+@[a-z.-]+\.com+$/i.test(value)) return true

        return 'Ingresa un correo valido'
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