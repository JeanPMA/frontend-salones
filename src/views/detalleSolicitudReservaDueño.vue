<template>
    <div class="body_detalleSR">
        <div class="content_detalleSR">
            <font-awesome-icon :icon="['fas', 'circle-info']" />
            <h2>SOLICITUD-RESERVA</h2>
            <div class="info_detalleSR">
                <div class="detalle_itemSR">
                    
                    <h3><font-awesome-icon :icon="['fas', 'calendar-days']" />Fecha de Evento:</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                

                <div class="detalle_itemSR">
                    <h3><font-awesome-icon :icon="['fas', 'circle-question']" />Motivo:</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
               

                <div class="detalle_itemSR">
                    <h3><font-awesome-icon :icon="['fas', 'bell-concierge']" />Servicios: </h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                    </p>
                </div>
                
                
                <div class="detalle_itemSR">
                    <h3><font-awesome-icon :icon="['fas', 'message']" />Detalle Extra:</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book
                    </p>
                </div>
                

                <div class="detalle_itemSR">
                    <h3><font-awesome-icon :icon="['fas', 'calendar']" />Fecha de solicitud:</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                

                <div class="detalle_itemSR">
                    <h3><font-awesome-icon :icon="['fas', 'diagram-project']" />Estado:</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
               
            </div>
            <div class="botones_SolicitudReserva">
                <a id="atras"  @click="volverAtras">ATRAS</a>
                <a id="cancelar" >RECHAZAR</a>               
                <a id="calificar" >ACEPTAR</a>
            </div>  
        </div>
        
    </div>
</template>

<script>
export default {
  name: 'detalleSolicitudReservaComponent',
  methods: {
    
    irACalificación() {
    // Redirige a la página de calificacion
      this.$router.push({ name: 'calificar'});
    },
    volverAtras (){

    this.$router.go(-1);
    },
}

}
</script>

<style>
.body_detalleSR{
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #535353;
    color: rgb(255, 255, 255);
}
.body_detalleSR h2{
    margin-top: 10px;
}
.content_detalleSR{
    margin: 10px 100px 10px 100px;
    padding: 30px;
    background-color: #0E2C40;
    border-radius: 20px;
    
    box-shadow: 0 0 20px rgba(0, 0, 0, .5);
}
.body_detalleSR .svg-inline--fa {
   height: 50px;
}
.content_detalleSR .info_detalleSR{
    display: flex;
    flex-direction: column;
    text-align: justify;
    margin-left: 50px;
    margin-right: 50px;
}
.info_detalleSR h3{
    text-align: start;
    display: flex;
    align-items: center;
    color: #ffffff;
    font-size: 20px;
    width: 18vw;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.info_detalleSR p{
    color: #1e2b2d;
    margin-top: 5px;
    padding: 15px;
    border-radius: 5px;
    flex: 1; 
    background-color: #ffffff;
}
.info_detalleSR .detalle_itemSR{
    
    margin-top: 20px;
    
  
    display: flex;
    flex-direction: row;
}
.body_detalleSR .detalle_itemSR .svg-inline--fa {
   height: 22px;
   margin-right: 10px;
}
/* botones estilos*/
.botones_SolicitudReserva{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    font-weight: bold;
}

.botones_SolicitudReserva a{
    margin-left: 20px;
    margin-right: 20px;
    padding: 8px;
    width: 200px;
    height: 40px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 15px;
    
}

.botones_SolicitudReserva #cancelar{
    background-color: #ff0000;
    color: #ffffff;
    border: 2px solid #ff0000;
   transition: 0.3s ease; 
   
  }

.botones_SolicitudReserva #cancelar:hover {
    background-color: transparent;
    color: #ff0000;
   
  }

  .botones_SolicitudReserva #atras{
    background-color: #ffffff;
    color: #000000;
    border: 2px solid #ffffff;
   transition: 0.3s ease; 
   
  }

.botones_SolicitudReserva #atras:hover {
    background-color: transparent;
    color: #ffffff;
   
  }

  .botones_SolicitudReserva #calificar{
    background-color: #0d7703;
    border: 2px solid #0d7703;
    color: #ffffff;
   transition: 0.3s ease;   
   
  }

.botones_SolicitudReserva #calificar:hover {
    background-color: transparent;
    color: #0d7703;
   
  }
</style>