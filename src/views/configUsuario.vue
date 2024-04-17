<template>
    <div class="content_crearUsuario">    
        <h2>
            EDITAR INFORMACION
        </h2>
        <form @submit.prevent="submit">
        <h4 class="mensaje_disable">El campo usuario no se puede editar.</h4>
        <v-text-field
            :counter="50"
            maxlength="50"
            :error-messages="username.errorMessage.value"
            label="Usuario"
            v-model="username.value.value"
            clearable
            disabled
        ></v-text-field>

        <v-text-field
            :counter="50"
            maxlength="50"
            :error-messages="password.errorMessage.value"
            label="Solo ingresar contraseña en caso de cambio"
            v-model="password.value.value"
            clearable
            :type="showPassword ? 'text' : 'password'"
            append-icon="mdi-eye"
            @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-text-field
            :counter="8"
            maxlength="8"
            :error-messages="telefono.errorMessage.value"
            label="Numero de telefono"
            v-model="telefono.value.value"
            clearable
            @input="limitesTelefono"
        ></v-text-field>
    
        <v-text-field
            :error-messages="nombre.errorMessage.value"
            :counter="50"
            maxlength="50"
            label="Nombre"
            v-model="nombre.value.value"
            clearable
            @input="bloquearCaracteresEspecialesNombre"
        ></v-text-field>
            
        <v-text-field
           :counter="50"
            maxlength="50"
            :error-messages="apellido.errorMessage.value"
            label="Apellido"
            v-model="apellido.value.value"
            clearable
            @input="bloquearCaracteresEspecialesApellido"
        ></v-text-field>

        <v-text-field
            :counter="100"
            maxlength="100"
            :error-messages="correo.errorMessage.value"
            label="Correo electronico"
            v-model="correo.value.value"
            clearable
        ></v-text-field>

     

        <v-text-field
            label="estado"
            :value="usuario.estado === 1 ? 'HABILITADO' : 'DESHABILITADO'"
            v-model="usuario.estado"
            disabled 
        ></v-text-field>


        <v-btn @click="irAHome" color="grey-lighten-1">
            Volver
        </v-btn>
    
        <v-btn
            class="ml-4"
            type="submit"
            @click="editarUsuario"
            :disabled="cargando"
            color="grey-darken-3"
        >
         {{ cargando ? 'Guardando...' : 'Guardar' }}
        </v-btn>

        </form>
    <div v-if="cargando" class="overlay"></div>    
    <div v-if="cargando" class="loader"></div>
</div>
  </template>

  
<script>
import { useField, useForm } from 'vee-validate';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import VueNotification from '@kyvg/vue3-notification';

export default{
name: 'editarUsuarioComponent',
data() {
  return {
    usuario: {
          id: '',
          username: '',
          password: '',
          telefono: '',
          nombre: '',
          apellido: '',
          correo: '',
          estado: '',
          rol:{
            id: '',
            nombre:'',
          }
        },
        mostrarErrorUsername: false,
        mostrarErrorTelefono: false,
        mostrarErrorNombre: false,
        mostrarErrorApellido: false,
        mostrarErrorCorreo: false,
        cargando: false,
        showPassword: false,
        rolesLista: [],
        username: {
          value: {
            value: ''
          },
          errorMessage: {
            value: ''
          }
        },
        password: {
          value: {
            value: ''
          },
          errorMessage: {
            value: ''
          }
        },
        telefono: {
          value: {
            value: ''
          },
          errorMessage: {
            value: ''
          }
        },
        nombre: {
          value: {
            value: ''
          },
          errorMessage: {
            value: ''
          }
        },
        apellido: {
          value: {
            value: ''
          },
          errorMessage: {
            value: ''
          }
        },
        correo: {
          value: {
            value: ''
          },
          errorMessage: {
            value: ''
          }
        },

  };
},
components: {
      VueNotification,
    },
methods: {
  irAHome() {
    const token = localStorage.getItem('jwtToken');
    const decodedToken = jwt_decode(token);
    const userRoles = decodedToken.roles;

    if (userRoles.includes('ROLE_USER')) {
      this.$router.push({ name: 'salones' });

    } else if (userRoles.includes('ROLE_OWNER')) {
      this.$router.push({ name: 'lista-salones' });

    } else if (userRoles.includes('ROLE_ADMIN')) {
      this.$router.push({ name: 'lista-usuarios-admin' });

    } else {
      console.error('Error roles invalidos.');
    }
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
  bloquearCaracteresEspecialesNombre() {
      this.nombre.value.value = this.nombre.value.value.replace(/[^a-zA-Z\s]/g, '');
  },
  bloquearCaracteresEspecialesApellido() {
      this.apellido.value.value = this.apellido.value.value.replace(/[^a-zA-Z\s]/g, '');
  },

  async obtenerYAsignar() {
    try {
      const usuarioId = this.$route.params.id;
      await this.obtenerDetallesUsuario(usuarioId)

      this.username.value.value = this.usuario.username;
      this.password.value.value = this.usuario.password;
      this.telefono.value.value = this.usuario.telefono;
      this.nombre.value.value = this.usuario.nombre;
      this.apellido.value.value = this.usuario.apellido;
      this.correo.value.value = this.usuario.correo;
  
    }catch (error) {
    console.error('Error al obtener y asignar:', error);
    }
    },
    async obtenerDetallesUsuario(id) {
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

      const response = await axios.get(`http://localhost:8080/v1/usuario/${id}`, config);

  
      this.usuario = response.data;
    } catch (error) {
      console.error('Error al obtener detalles de la solicitud:', error);
    }
    },
    editarUsuario() {

      this.mostrarErrorUsername = this.username.errorMessage.value;
      this.mostrarErrorTelefono = this.telefono.errorMessage.value;
      this.mostrarErrorNombre = this.nombre.errorMessage.value;
      this.mostrarErrorApellido = this.apellido.errorMessage.value;
      this.mostrarErrorCorreo = this.correo.errorMessage.value;
      if (this.mostrarErrorUsername != undefined ||
          this.mostrarErrorTelefono != undefined ||
          this.mostrarErrorNombre != undefined ||
          this.mostrarErrorApellido != undefined ||
          this.mostrarErrorCorreo != undefined) {            
          return;
      }

      this.cargando = true;
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwt_decode(token);
      const userRole = decodedToken.roles[0];
      let username = decodedToken.sub;

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
              id : this.usuario.id,
              username : this.username.value.value,
              password : this.password.value.value,
              telefono: this.telefono.value.value,
              nombre: this.nombre.value.value,
              apellido: this.apellido.value.value,
              correo: this.correo.value.value,
              rol: {
                id: this.usuario.rol.id
              },
              estado: this.usuario.estado,
        };
      this.$axios.put(`http://localhost:8080/v1/usuario/config/${this.usuario.id}`, data, config)
      .then(response => {
      
        this.$notify({
            title: 'Éxito',
            text: 'El usuario se actualizó correctamente.',
            type: 'success',
          });
         this.cargando = false;
      })
      .catch(error => {
        this.$notify({
                title: 'Error',
                text: 'Error, nombre o correo de usuario modificado ya existente. Intentalo de nuevo',
                type: 'error',
              });
        this.cargando = false;
      });
    
      },
},

async mounted(){
  await this.obtenerYAsignar();
},
setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        username(value) {
          if (value?.length >= 2) return true;

          return 'El username del usuario necesita más de 2 caracteres';
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
    const rol = useField('rol');

    const submit = handleSubmit((values) => {

    });

    return {
      username,
      password,
      telefono,
      nombre,
      apellido,
      correo,
      rol,

      submit,
    };
  },
};

</script>

<style>
.mensaje_disable{
  color: #888888a1; 
  font-style: italic;
  text-align: start;
  margin-left: 15px;
  font-size: 15px;
}
</style>