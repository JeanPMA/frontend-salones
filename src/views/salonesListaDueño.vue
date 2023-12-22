<template>
    <NavbarDueño/>
    <h2>
        LISTA DE SALONES
    </h2>
    <div class="search_listaSalon">
            <div class="search-container">
                <input type="text" id="search-input" placeholder="Buscar...">
                <button id="search-button">Buscar</button>
             </div>
    </div> 
    <div class="cards_listaSalon">
        <v-card
        class="mx-auto"
        width="400"
        prepend-icon="mdi-home"
        
        >
            <template v-slot:title>
            This is a title
            </template>

            <v-card-text>
            This is content
            </v-card-text>
        </v-card>    
    </div>
       
</template>

<script>
import NavbarDueño from '@/views/navbarDueño.vue';


export default {
name: 'listaSalonesDueñoComponent',
components: {
    NavbarDueño,
},
}
</script>

<style>
.search_listaSalon{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0px 100px 0px 100px;
    margin-top: 20px;
}
.cards_listaSalon{
    z-index: 0;
}
</style>