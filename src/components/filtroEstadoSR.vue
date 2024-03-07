<template>
    <div class="filtro_estadoSR">
        <div class="filtro_btnSR">
            <span class="icon">
                <font-awesome-icon :icon="['fas', 'filter']" />
            </span>
            <a href="#" @click="mostrarFiltroSR = !mostrarFiltroSR">FILTRO</a>
        </div>
  
      <div v-if="mostrarFiltroSR" class="filtro_listaSR">
        <label v-for="estado in estados" :key="estado.id">
          <input type="checkbox" v-model="estadosSeleccionados" :value="estado.nombre" />
          {{ estado.nombre }}
        </label>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import jwt_decode from 'jwt-decode';

  export default {
    data() {
      return {
        estados: [],
        estadosSeleccionados: JSON.parse(localStorage.getItem('SREstadoSeleccionado')) || [],
        mostrarFiltroSR: localStorage.getItem('mostrarFiltroSR') === 'true' || false,
      };
    },
    mounted() { 
    const token = localStorage.getItem('jwtToken');
    const decodedToken = jwt_decode(token);

    const direccionActual = window.location.pathname;

    axios.get('http://localhost:8080/v1/tipo-sr')
    .then(response => {
      this.estados = response.data.filter(estado => {
        if (decodedToken.roles.includes("ROLE_OWNER") && direccionActual === "/lista-reservas") {
          return !["INVISIBLE", "PENDIENTE", "RECHAZADO"].includes(estado.nombre);
        } else if (decodedToken.roles.includes("ROLE_OWNER") && direccionActual === "/lista-solicitudes") {
          return !["INVISIBLE", "ACEPTADO", "CANCELADO"].includes(estado.nombre);
        } else if (decodedToken.roles.includes("ROLE_USER")) {
          return estado.nombre !== "INVISIBLE";
        } else {
          return true;
        }
      });
    })
    .catch(error => console.error('Error al obtener datos de la API:', error));
    },
    watch: {
      estadosSeleccionados() {
        localStorage.setItem('SREstadoSeleccionado', JSON.stringify(this.estadosSeleccionados));
        this.$emit('filtroCambiado', this.estadosSeleccionados);
      },
      mostrarFiltroSR() {
      localStorage.setItem('mostrarFiltroSR', this.mostrarFiltroSR.toString());
    },
    },
    created() {
    this.mostrarFiltroSR = localStorage.getItem('mostrarFiltroSR') === 'true' || false;
    },
  };
  </script>
  
<style scoped>
.filtro_estadoSR {
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  padding-left: 20px;
  color: rgb(0, 0, 0);
}
.filtro_btnSR{
    display: flex;
    flex-direction: row;
}
.filtro_estadoSR span {
    margin-left: 20px;
}
.filtro_estadoSR a {
  cursor: pointer;
  margin-right: 10px; 
  padding-left: 10px;
  text-decoration: none;
  color: rgb(0, 0, 0);
}

.filtro_listaSR {
  display: flex;
  flex-direction: row;
  background-color: transparent;
  color: rgb(0, 0, 0);
  padding: 10px;
  top: 50px;
  right: 0;
  z-index: 1; 
}

.filtro_listaSR label {
  margin-bottom: 5px;
  padding-left: 20px;
}

.filtro_listaSR button {
  margin-top: 10px;
}
  @media  screen and (max-width: 510px) {
  .filtro_listaSR{
    flex-direction: column;
    font-size: 15px;

  }
  .filtro_listaSR label {
    padding-left: 0px;
  }
  .filtro_listaSR label, input {
    margin-bottom: 10px;
  }
  .filtro_estadoSR {
    align-items: center; 
    text-align: justify;
  }
}
</style>