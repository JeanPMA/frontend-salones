<template>

  <div class="app">
    <Notifications />
    <router-view></router-view>
  </div>

</template>

<script>
import { Notifications } from '@kyvg/vue3-notification';



export default {
    name: 'App',
    components: { Notifications },
 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: white;

}
html, body {
    height: 100%;
    margin: 0; 
    background-color: white;
    scroll-behavior: smooth;
}

</style>
