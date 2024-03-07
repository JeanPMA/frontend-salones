<template>
    <div class="filtro_roles">
        <div class="filtro_btnRol">
            <span class="icon">
                <font-awesome-icon :icon="['fas', 'filter']" />
            </span>
            <a href="#" @click="mostrarFiltroRol = !mostrarFiltroRol">FILTRO</a>
        </div>
  
      <div v-if="mostrarFiltroRol" class="filtro_listaRol">
        <label v-for="rol in roles" :key="rol.id">
          <input type="checkbox" v-model="rolesSeleccionados" :value="rol.nombre" />
          {{ rol.nombre }}
        </label>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        roles: [],
        rolesSeleccionados: JSON.parse(localStorage.getItem('rolesSeleccionados')) || [],
        mostrarFiltroRol: localStorage.getItem('mostrarFiltroRol') === 'true' || false,
      };
    },
    mounted() {
      
      
      axios.get('http://localhost:8080/v1/rol')
        .then(response => {
          this.roles = response.data;
        })
        .catch(error => console.error('Error al obtener datos de la API:', error));
    },
    watch: {
      rolesSeleccionados() {
        localStorage.setItem('rolesSeleccionados', JSON.stringify(this.rolesSeleccionados));
        this.$emit('filtroCambiado', this.rolesSeleccionados);
      },
      mostrarFiltroRol() {
      localStorage.setItem('mostrarFiltroRol', this.mostrarFiltroRol.toString());
    },
    },
    created() {
    this.mostrarFiltroRol = localStorage.getItem('mostrarFiltroRol') === 'true' || false;
    },
  };
  </script>
  
<style scoped>
.filtro_roles {
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  padding-left: 20px;
}
.filtro_btnRol{
    display: flex;
    flex-direction: row;
}
.filtro_roles span {
    margin-left: 20px;
}
.filtro_roles a {
  cursor: pointer;
  margin-right: 10px; 
  padding-left: 10px;
  text-decoration: none;
  color: rgb(0, 0, 0);
}

.filtro_listaRol {
  display: flex;
  flex-direction: row;
  background-color: transparent;
  color: rgb(0, 0, 0);
  padding: 10px;
  top: 50px;
  right: 0;
  z-index: 1; 
}

.filtro_listaRol label {
  margin-bottom: 5px;
  padding-left: 20px;
}

.filtro_listaRol button {
  margin-top: 10px;
}
</style>