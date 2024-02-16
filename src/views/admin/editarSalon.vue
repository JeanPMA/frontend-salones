<template>
    <div class="content_crearSalon" v-if="salon">    
        <h2>
            EDITAR INFORMACION
        </h2>
        <form @submit.prevent="submit">
        <v-text-field           
            :counter="50"
            :error-messages="nombre.errorMessage.value"
            label="Nombre"
            v-model="nombre.value.value"
        ></v-text-field>

        <v-text-field
            :counter="10"
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
            :error-messages="capacidad.errorMessage.value"
            label="Capacidad"
            v-model="capacidad.value.value"
        ></v-text-field>
    
        <v-textarea 
            :error-messages="descripcion.errorMessage.value"
            :counter="50"
            label="Descripcion"
            v-model="descripcion.value.value"
        ></v-textarea>
            
        <v-text-field
            :counter="8"
            :error-messages="tarifa.errorMessage.value"
            label="Tarifa"
            v-model="tarifa.value.value"
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

        <label>Nueva Imagen:</label>
        <input type="file" @change="handleFileChange" />
        <img :src="salon.banner_url" alt="Imagen actual" v-if="salon.banner_url" />

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
  methods: {
    irAHome() {
    // Redirige a la página de detalle del salón
      this.$router.push({ name: 'lista-salones-admin'});
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
      console.log(this.salon);
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
            const formData = new FormData();
            formData.append('nombre', this.nombre.value.value);
            formData.append('direccion', this.direccion.value.value);
            formData.append('capacidad', this.capacidad.value.value);
            formData.append('descripcion', this.descripcion.value.value);
            formData.append('tarifa', this.tarifa.value.value);
            formData.append('estado', this.salon.estado);
            formData.append('usuario', this.salon.usuario.id);
            const vSelectComponent = this.$refs.miVSelect;

              if (vSelectComponent && vSelectComponent.selectedItems) {
                this.serviciosSeleccionados = vSelectComponent.selectedItems.map(item => item.id);
                console.log("if");
              } else {      
                
              }

            formData.append('servicios', this.serviciosSeleccionados.join(','));
            if (this.nuevaImagen) {
              formData.append('multipartFile', this.nuevaImagen);
            }
            const formDataObj = {};
            formData.forEach((value, key) => {
              formDataObj[key] = value;
            });

            // Imprime el objeto resultante en la consola
            console.log(formDataObj);
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
              console.log('Salon actualizado:', response.data);
              this.$router.push({ name: 'lista-salones-admin'});
            })
            .catch(error => {
              console.error('Error al actualizar el Salon:', error);
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
        return true;

          //return 'La capacidad del salón debe ser menor a 6 dígitos.';
        },
        descripcion(value) {
          // Agrega la regla de validación para la descripción según tus necesidades
          // Por ejemplo, puedes verificar la longitud o el formato.
          return true;
        },
        tarifa(value) {
          //if (value?.length >= 2) 
          return true;

         // return 'La tarifa del salón necesita más de 2 caracteres';
        },
        estado(value) {
          if (value === '1') return true;

          return 'Debe ser marcado';
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

</style>