<template>
    <div class="filtro_servicios">
        <div class="filtro_btn">
            <span class="icon">
                <font-awesome-icon :icon="['fas', 'filter']" />
            </span>
            <a href="#" @click="mostrarFiltro = !mostrarFiltro">FILTRO</a>
        </div>
    <transition name="filtro_lista">
        <div v-if="mostrarFiltro" class="filtro_lista">
          <label v-for="servicio in servicios" :key="servicio.id">
            <input type="checkbox" v-model="serviciosSeleccionados" :value="servicio.nombre" />
            {{ servicio.nombre }}
          </label>
        </div>
    </transition>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        servicios: [],
        serviciosSeleccionados: JSON.parse(localStorage.getItem('serviciosSeleccionados')) || [],
        mostrarFiltro: localStorage.getItem('mostrarFiltro') === 'true' || false,
      };
    },
    mounted() {
      
      
      axios.get('http://localhost:8080/v1/servicio/activo')
        .then(response => {
          this.servicios = response.data;
        })
        .catch(error => console.error('Error al obtener datos de la API:', error));
    },
    watch: {
      serviciosSeleccionados() {
        localStorage.setItem('serviciosSeleccionados', JSON.stringify(this.serviciosSeleccionados));
        this.$emit('filtroCambiado', this.serviciosSeleccionados);
      },
      mostrarFiltro() {
      localStorage.setItem('mostrarFiltro', this.mostrarFiltro.toString());
    },
    },
    created() {
    this.mostrarFiltro = localStorage.getItem('mostrarFiltro') === 'true' || false;
    },
  };
  </script>
  
<style scoped>
.filtro_servicios {
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  padding-left: 20px;
}

.filtro_btn{
  display: flex;
  flex-direction: row;
}
.filtro_servicios span {
  margin-left: 20px;
  color: rgb(0, 0, 0);
}

.filtro_servicios a {
  cursor: pointer;
  margin-right: 10px; 
  padding-left: 10px;
  text-decoration: none;
  color: rgb(0, 0, 0);
}

.filtro_lista {
  display: flex;
  flex-direction: row;
  background-color: transparent;
  color: rgb(0, 0, 0);
  padding: 10px;
  top: 50px;
  right: 0;
  z-index: 0; 
  transition: 0.2s ease;
}

.filtro_lista label {
  margin-bottom: 5px;
  padding-left: 20px;
}

.filtro_lista button {
  margin-top: 10px;
}

.filtro_lista-enter-active, .filtro_lista-leave-active {
  transition: opacity 0.5s;
}

.filtro_lista-enter-from, .filtro_lista-leave-to {
  opacity: 0;
}

@media  screen and (max-width: 500px) {
  .filtro_lista{
    flex-direction: column;
    font-size: 15px;
  }
  
  .filtro_servicios {
    align-items: center; 
    text-align: justify;
    padding-left: 0px;
  }
}
</style>