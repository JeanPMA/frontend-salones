<template>
    <div class="filtro_serviceTipoSR">
        <div class="filtro_btnServiceTipoSR">
            <span class="icon">
                <font-awesome-icon :icon="['fas', 'filter']" />
            </span>
            <a href="#" @click="mostrarFiltroServiceTipoSR = !mostrarFiltroServiceTipoSR">FILTRO</a>
        </div>
  
        <div v-if="mostrarFiltroServiceTipoSR" class="filtro_listaServiceTipoSR">
        <label v-for="estado in estadosAdmin" :key="estado.id">
            <input type="checkbox" v-model="servicesTipoSRSeleccionados" :value="estado.valor" />
            {{ estado.nombre }}
        </label>
        </div>
    </div>
  </template>
  
  <script>

  
  export default {
    data() {
      return {
        estadosAdmin: [
        { id: 1, nombre: 'HABILITADO', valor: 1 },
        { id: 2, nombre: 'DESHABILITADO', valor: 0 },
        ],
        servicesTipoSRSeleccionados: JSON.parse(localStorage.getItem('servicesTipoSRSeleccionados')) || [],
        mostrarFiltroServiceTipoSR: localStorage.getItem('mostrarFiltroServiceTipoSR') === 'true' || false,
      };
    },
    mounted() {
    },
    watch: {
      servicesTipoSRSeleccionados() {
        localStorage.setItem('servicesTipoSRSeleccionados', JSON.stringify(this.servicesTipoSRSeleccionados));
        this.$emit('filtroCambiado', this.servicesTipoSRSeleccionados);
      },
      mostrarFiltroServiceTipoSR() {
      localStorage.setItem('mostrarFiltroServiceTipoSR', this.mostrarFiltroServiceTipoSR.toString());
    },
    },
    created() {
      this.mostrarFiltroServiceTipoSR = localStorage.getItem('mostrarFiltroServiceTipoSR') === 'true' || false;
    },
  };
  </script>
  
<style scoped>
.filtro_serviceTipoSR {
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  
}
.filtro_btnServiceTipoSR{
    display: flex;
    flex-direction: row;
}
.filtro_serviceTipoSR span {
    margin-left: 20px;
}
.filtro_serviceTipoSR a {
  cursor: pointer;
  margin-right: 10px; 
  padding-left: 10px;
  text-decoration: none;
  color: rgb(0, 0, 0);
}

.filtro_listaServiceTipoSR {
  display: flex;
  flex-direction: row;
  background-color: transparent;
  color: rgb(0, 0, 0);
  padding: 10px;
  top: 50px;
  right: 0;
  z-index: 2; 
}

.filtro_listaServiceTipoSR label {
  margin-bottom: 5px;
  padding-left: 20px;
}

.filtro_listaServiceTipoSR button {
  margin-top: 10px;
}
</style>