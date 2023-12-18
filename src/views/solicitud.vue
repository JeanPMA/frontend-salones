<template>
<div class="solicitud_content">
        <div class="solicitud_form">
            <form action="procesar_formulario.php" method="post">
                <h2>RESERVAR</h2>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required>
                
                <label for="motivo">Motivo:</label>
                <select id="selector" name="valor" required>
                    <option value="" disabled selected>Seleccione un motivo</option>
                    <option value="opcion1">Motivo 1</option>
                    <option value="opcion2">Motivo 2</option>
                    <option value="opcion3">Motivo 3</option>
                    <option value="opcion4">Motivo 4</option>
                </select>
                
                <label for="servicios" id="labelServicios">Seleccione los servicios requeridos: </label>
                <select v-model="selected" id="selector2" name="valor" multiple required >
                   
                    <option value="opcion1">Servicio 1</option>
                    <option value="opcion2">Servicio 2</option>
                    <option value="opcion3">Servicio 3</option>
                    <option value="opcion4">Servicio 4</option>
                </select>
                
                <label for="fechaEvento">Fecha de Evento:</label>
                <input type="date" id="fechaEvento" name="fechaEvento">

                <label for="email">Detalle Extra:</label>
                <textarea id="mensaje" name="mensaje" rows="4" placeholder="Detalle:" style="font-family: Arial, sans-serif;" ></textarea>
              

                <div class="form_btn">
                    <a id="send" >ENVIAR</a>
                    <a  id="cancel" @click="volverAtras">CANCELAR</a>

                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'solicitudComponent',
    components: {
        
    },
    data() { 
    return {
                selectedServices: [] // Esta propiedad almacenará los servicios seleccionados
            }
        },
    methods: {
    volverAtras (){
  // Utiliza el método go para volver atrás en la historia del navegador
  this.$router.go(-1);
},
}
}
</script>

<style>
.solicitud_content{
    background-color: #5f76f7;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.solicitud_form{
    background-color: white;
    display: flex;
    border-radius: 10px;
    
    margin-top: 20px;
}

.solicitud_form form h2{
    text-align: center;
}

form {
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #ffffff;
    text-align: start;
    
  }

  label {
    display: block;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  input[type="text"],
  input[type="email"],
  textarea
  {
    width: 100%;
    padding: 10px 10px 10px 10px;
    margin-bottom: 3px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }

  input[type="date"]
  {
    width: 20%;
    padding: 10px 10px 10px 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }

  #selector{
    width: 50%;
    padding: 10px 10px 10px 10px;
    margin-bottom: 10px;
    
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }

 select:focus {
    border-color: #b30c00; /* Color de borde personalizable */
    outline: none; /* Elimina el resaltado del enfoque predeterminado del navegador */
  }

  #labelServicios{
    margin-top: 10px;
  }

  .select2-container--default .select2-search--dropdown .select2-search__field{
    display: none;
  }

  #selector2{
    width: 60vw;
    padding: 10px 10px 10px 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    caret-color: transparent;
  }

  .select2-container--default .select2-selection--multiple{
    caret-color: transparent;
    border: none;
    padding-bottom: 10px;
  }
  .select2-container--default .select2-selection--multiple .select2-selection__choice{
    margin-bottom: 4px;
    font-size: 15px;
   
  }

  form textarea{
 
    
    resize: none;
  }
 


.form_btn{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.form_btn a{
    margin-left: 30px;
    margin-right: 30px;
    padding: 10px 20px;
    width: 150px;
    height: 45px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 20px;
    text-align: center;
}

.form_btn #send{
    background-color: #161616;
    color: #fff;
   transition: 0.3s ease; 
   
  }

.form_btn #send:hover {
    background-color: #7c7c7c;
    color: #030303;
   
  }

.form_btn #cancel{
    background-color: #7c7c7c;
    color: #030303;
    transition: 0.3s ease; 

   
  }

.form_btn #cancel:hover {
    background-color: #161616;
    color: #fff;
  }
</style>