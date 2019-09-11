<template>
  <div id="app">
    <Map3D />
  </div>
  
</template>

<script>
import Map3D from './components/Map3D.vue';

export default {
  name: 'app',
  components: {
    Map3D,
  }
}
</script>

<style>
#app {
  width:100%;
  height: 100%;
}
</style>
