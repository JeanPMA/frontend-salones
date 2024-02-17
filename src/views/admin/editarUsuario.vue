<template>
    <div class="content_crearUsuario">    
        <h2>
            EDITAR INFORMACION
        </h2>
        <form @submit.prevent="submit">
            <v-text-field
           
            :counter="10"
            :error-messages="username.errorMessage.value"
            label="Usuario"
            v-model="username.value.value"
        ></v-text-field>

        <v-text-field
            :counter="10"
            :error-messages="password.errorMessage.value"
            label="Solo ingresar contraseña en caso de cambio"
            v-model="password.value.value"
        ></v-text-field>

        <v-select
                  v-model="usuario.rol.id"
                  label="Selecciona un rol"
                  :items="rolesLista"
                  variant="outlined"
                  item-title="nombre"
                  item-value="id"
                  hide-details
                  @update:modelValue="limpiarErrorRol"
          ></v-select>
          <span v-if="mostrarErrorRol" class="error-message">Tienes que seleccionar una opción</span>

        <v-text-field
            :counter="8"
            :error-messages="telefono.errorMessage.value"
            label="Numero de telefono"
            v-model="telefono.value.value"
        ></v-text-field>
    
        <v-text-field
            :error-messages="nombre.errorMessage.value"
            :counter="10"
            label="Nombre"
            v-model="nombre.value.value"
        ></v-text-field>
            
        <v-text-field
            :counter="10"
            :error-messages="apellido.errorMessage.value"
            label="Apellido"
            v-model="apellido.value.value"
        ></v-text-field>

        <v-text-field
            :counter="10"
            :error-messages="correo.errorMessage.value"
            label="Correo electronico"
            v-model="correo.value.value"
        ></v-text-field>

     

        <v-text-field
            label="estado"
            :value="usuario.estado === 1 ? 'HABILITADO' : 'DESHABILITADO'"
            v-model="usuario.estado"
            disabled 
        ></v-text-field>

    
        <v-btn
            class="me-4"
            type="submit"
            @click="editarUsuario"
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
        mostrarErrorRol: false,
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
  // Redirige a la página de detalle del salón
    this.$router.push({ name: 'lista-usuarios-admin'});
  },
  limpiarErrorRol() {
      this.mostrarErrorRol = false;
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

        this.rolesLista = response.data.map(item => ({ id: item.id, nombre: item.nombre }));
      } catch (error) {
        console.error('Error al obtener salones:', error);
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
      console.log(this.usuario);

    } catch (error) {
      console.error('Error al obtener detalles de la solicitud:', error);
    }
    },
    editarUsuario() {
      this.mostrarErrorRol = !this.usuario.rol.id;

      if(this.mostrarErrorRol) {
              
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
     
      this.$axios.put(`http://localhost:8080/v1/usuario/${this.usuario.id}`, data, config)
      .then(response => {
        this.$router.push({ name: 'lista-usuarios-admin'});
          this.$notify({
                title: 'Éxito',
                text: 'El usuario se actualizó correctamente.',
                type: 'success',
              });
      })
      .catch(error => {
        this.$notify({
                title: 'Error',
                text: 'Error, nombre o correo de usuario modificado ya existente. Intentalo de nuevo',
                type: 'error',
              });
      });
      },
},

async mounted(){
  await this.obtenerYAsignar();
  await this.obtenerRoles();
  
},
setup() {
    const { handleSubmit } = useForm({
      validationSchema: {
        username(value) {
          if (value?.length >= 2) return true;

          return 'El username del salón necesita más de 2 caracteres';
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
        if (value?.length >= 2) return true

        return 'Tiene que ser valido el e-mail.'
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

</style>