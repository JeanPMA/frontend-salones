<template>
    <div class="content_crearSalon" v-if="salon">    
        <h2>
            EDITAR INFORMACION
        </h2>
        <form @submit.prevent="submit">
        <v-text-field           
            :counter="50"
            maxlength="50"
            clearable
            :error-messages="nombre.errorMessage.value"
            label="Nombre"
            v-model="nombre.value.value"
            @input="bloquearCaracteresEspeciales"
        ></v-text-field>

        <v-text-field
            :counter="100"
            maxlength="100"
            clearable
            :error-messages="direccion.errorMessage.value"
            label="Direccion"
            v-model="direccion.value.value"
        ></v-text-field>

        <v-select
          v-model="salon.usuario.id"        
          :items="usuariosLista"
          item-title="nombre"
          item-value="id"
          label="Selecciona el usuario"
          @update:modelValue="handleUsuarioChange"
        ></v-select>
        <p v-if="errorUsuario">Por favor, selecciona 1 opcion.</p>

        <v-text-field
            :counter="5"
            maxlength="5"
            clearable
            :error-messages="capacidad.errorMessage.value"
            label="Capacidad"
            v-model="capacidad.value.value"
            @input="limitesCapacidad"

        ></v-text-field>
    
        <v-textarea 
            :error-messages="descripcion.errorMessage.value"
            :counter="200"
            maxlength="200"
            clearable
            label="Descripcion"
            v-model="descripcion.value.value"
        ></v-textarea>
            
        <v-text-field
            :counter="5"
            maxlength="5"
            clearable
            :error-messages="tarifa.errorMessage.value"
            label="Tarifa"
            v-model="tarifa.value.value"
            @input="limitesTarifa"
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

        <div class="imagen_editar">
          <label>Nueva Imagen:</label>
          <input type="file" @change="handleFileChange" />
          <h4>(Ingresar imagen solo en caso de modificación)</h4>
        </div>
        <div class="imagen_actual">
          <label>Imagen Actual:</label>
          <img :src="salon.banner_url" alt="Imagen actual" v-if="salon.banner_url" />
        </div>
       <v-text-field
            label="estado"
            :value="salon.estado === 1 ? 'HABILITADO' : 'DESHABILITADO'"
            v-model="salon.estado"
            disabled 
        ></v-text-field>

        <v-btn
            class="me-4"
            type="submit"
            @click="actualizarSalon"
            :disabled="cargando"
        >
        {{ cargando ? 'Guardando...' : 'Guardar' }}
        </v-btn>
    


        <v-btn @click="irAHome" >
            Volver
        </v-btn>
        </form>
      <div v-if="cargando" class="overlay"></div> 
      <div v-if="cargando" class="loader"></div>
</div>
  </template>

<script>
  import { ref } from 'vue';
  import { useField, useForm } from 'vee-validate';
  import axios from 'axios';
  import jwt_decode from 'jwt-decode';
  import VueNotification from '@kyvg/vue3-notification';

  export default{
  name: 'editarSalonComponent',
  data() {
    return {
        salon:{
          id: '',
          nombre: '',
          direccion: '',
          usuario: {
            id: '',
          },
          capacidad: '',
          descripcion: '',
          tarifa: '',
          estado: '',
          banner_url: "", 
        },
        errorServicios: false,
        errorUsuario: false,
        error: false,
        nuevaImagen: null,
        serviciosSeleccionados: [],
        servicios:[],
        usuariosLista:[],
        usuarioSeleccionado: null,
        mostrarErrorNombre: false,
        mostrarErrorDireccion: false,
        mostrarErrorCapacidad: false,
        mostrarErrorDescripcion: false,
        mostrarErrorTarifa: false,
        cargando: false,
        nombre: {
          value: {
            value: ''
          },
          errorMessage: {
            value: ''
          }
        },
        direccion: {
          value: {
            value: ''
          },
          errorMessage: {
            value: ''
          }
        },
        capacidad: {
          value: {
            value: ''
          },
          errorMessage: {
            value: ''
          }
        },
        descripcion: {
          value: {
            value: ''
          },
          errorMessage: {
            value: ''
          }
        },
        tarifa: {
          value: {
            value: ''
          },
          errorMessage: {
            value: ''
          }
        },
        estado: {
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
      this.$router.push({ name: 'lista-salones-admin'});
    },
    bloquearCaracteresEspeciales() {
      this.nombre.value.value = this.nombre.value.value.replace(/[^a-zA-Z0-9\s]/g, '');
    },
    limitesCapacidad(){
    this.limitarLongitudCapacidad();
    this.bloquearECapacidad();
    },
    limitarLongitudCapacidad() {
        if (this.capacidad.value.value.length > 8) {
          this.capacidad.value.value = this.capacidad.value.value.slice(0, 8);
        }
    },
    bloquearECapacidad() {
      this.capacidad.value.value = this.capacidad.value.value.replace(/\D/g, '');
    },
    limitesTarifa(){
    this.limitarLongitudTarifa();
    this.bloquearETarifa();
    },
    limitarLongitudTarifa() {
        if (this.tarifa.value.value.length > 8) {
          this.tarifa.value.value = this.tarifa.value.value.slice(0, 8);
        }
    },
    bloquearETarifa() {
      this.tarifa.value.value = this.tarifa.value.value.replace(/\D/g, '');
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.nuevaImagen = file;
      this.error = false;
    },
    handleServiciosChange() {
      this.errorServicios = false;
    },
    handleUsuarioChange() {
      this.errorUsuario = false;
    },
    async obtenerYAsignar() {
    try {
      const salonId = this.$route.params.id;
      await this.obtenerDetallesSalon(salonId)

      this.nombre.value.value = this.salon.nombre;
      this.direccion.value.value = this.salon.direccion;
      this.capacidad.value.value = this.salon.capacidad;
      this.descripcion.value.value = this.salon.descripcion;
      this.tarifa.value.value = this.salon.tarifa;
     
  
    }catch (error) {
    console.error('Error al obtener y asignar:', error);
    }
    },
    async obtenerUsuarios() {
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

        const response = await axios.get('http://localhost:8080/v1/usuario', config);

        this.usuariosLista = response.data.filter(usuario => {
                  return usuario.rol && usuario.rol.nombre === 'OWNER';
                });
      } catch (error) {
        console.error('Error al obtener salones:', error);
      }
    },
    async obtenerDetallesSalon(id) {
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
      const response = await axios.get(`http://localhost:8080/v1/salon/${id}`, config);
      this.salon = response.data;
    } catch (error) {
      console.error('Error al obtener detalles de la solicitud:', error);
    }
    },
    async obtenerServicios() {
    try {
      const salonId = this.$route.params.id;
      await this.obtenerDetallesSalon(salonId);
      
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwt_decode(token);
      const userRole = decodedToken.roles[0];
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-User-Role': userRole,
        },
      };

      const response = await axios.get('http://localhost:8080/v1/servicio/activo', config);
      const serviciosEnBaseDeDatos = response.data;

      if (this.salon && this.salon.servicios) {
          const serviciosSeleccionadosIds = this.salon.servicios.map(servicio => servicio.id);

          serviciosEnBaseDeDatos.forEach(servicio => {
            servicio.selected = serviciosSeleccionadosIds.includes(servicio.id);
          });

          this.servicios = serviciosEnBaseDeDatos;

          await new Promise(resolve => this.$nextTick(resolve));

          this.serviciosSeleccionados = serviciosEnBaseDeDatos.filter(servicio => servicio.selected);
          this.serviciosSeleccionados = this.serviciosSeleccionados.map(item => item.id);

      } else {
        console.error('Detalle de salón dueño no válido:', this.detalleSalonDueño);
      }
    
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    }
  },
  async actualizarSalon() {
      this.errorServicios = this.serviciosSeleccionados.length === 0 ;
      this.errorUsuario= !this.salon.usuario ;
      if (this.errorServicios || this.errorUsuario) {

        return;
      }    
      this.mostrarErrorNombre = this.nombre.errorMessage.value;
      this.mostrarErrorDireccion = this.direccion.errorMessage.value;
      this.mostrarErrorCapacidad = this.capacidad.errorMessage.value;
      this.mostrarErrorDescripcion = this.descripcion.errorMessage.value;
      this.mostrarErrorTarifa = this.tarifa.errorMessage.value;
      if (this.mostrarErrorNombre != undefined ||
          this.mostrarErrorDireccion != undefined ||
          this.mostrarErrorCapacidad != undefined ||
          this.mostrarErrorDescripcion != undefined ||
          this.mostrarErrorTarifa != undefined) {            
          return;
      }
      this.cargando = true;
            const formData = new FormData();
            formData.append('nombre', this.nombre.value.value);
            formData.append('direccion', this.direccion.value.value);
            formData.append('capacidad', this.capacidad.value.value);
            formData.append('descripcion', this.descripcion.value.value);
            formData.append('tarifa', this.tarifa.value.value);
            formData.append('estado', this.salon.estado);
            formData.append('usuario', this.salon.usuario.id);
  

            formData.append('servicios', this.serviciosSeleccionados.join(','));
            if (this.nuevaImagen) {
              formData.append('multipartFile', this.nuevaImagen);
            }
         
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

            };

    
          axios.put(`http://localhost:8080/v1/salon/admin/${this.salon.id}`, formData, config)
          .then(response => {
              this.$router.push({ name: 'lista-salones-admin'});
              this.$notify({
                title: 'Éxito',
                text: 'El salón se actualizó correctamente.',
                type: 'success',
              });
              this.cargando = false;
            })
            .catch(error => {
              this.$notify({
                title: 'Error',
                text: 'Error, nombre de salón modificado ya existente. Intentalo de nuevo',
                type: 'error',
              });
              this.cargando = false;
            });
   
  },
  },
  async mounted(){
  await this.obtenerYAsignar();
  await this.obtenerUsuarios();
  this.obtenerServicios();
  },
  setup() {
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
          const digitsOnly = String(value).replace(/\D/g, '');
          if (digitsOnly === '') {
            return 'Ingrese la capacidad del salón.';
          }
          return true;
        },
        descripcion(value) {
          if (value?.length >= 2) return true;
          return 'La descripción del salón necesita más de 2 caracteres';
        },
        tarifa(value) {
          const digitsOnly = String(value).replace(/\D/g, '');
          if (digitsOnly === '') {
            return 'Ingrese la tarifa del salón.';
          }
          return true;
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
      estado,
      submit,
    };
  },
};

</script>

<style>
.content_crearSalon .imagen_actual{
    display: flex;
    flex-direction: column;
}

.content_crearSalon .imagen_editar{
  display: flex;
  flex-direction: column;
  align-items: start;
 
}

.content_crearSalon .imagen_actual label{
  text-align: start;
  margin-top: 10px;
  font-size: 20px;
  color: rgb(118, 118, 118);
}


.content_crearSalon .imagen_actual img{
    width: 400px;
    height: 400px;
    object-fit: cover; 
    margin-left: auto;
    margin-right: auto;
}
.content_crearSalon .imagen_editar label{
  text-align: start;
  font-size: 20px;
  color: rgb(118, 118, 118);
}

.content_crearSalon .imagen_editar h4{
  color: #0000006a;
  margin-bottom: 10px;
}
.content_crearSalon .imagen_editar input{
  width: 100%;
  color: rgb(118, 118, 118);
  margin-top: 10px;
}
@media  screen and (max-width: 520px) {
  .content_crearSalon .imagen_actual img{
    width: 100%;
    height: 250px;
}
}

@media  screen and (max-width: 300px) {
  .content_crearSalon .imagen_actual img{
    width: 100%;

}
}
</style>