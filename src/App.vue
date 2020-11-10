<template>
<Navbar/>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
<p>yieks</p>
  <Footer/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
// import NewTask from '.components/NewTask.vue';
// import DataImportExport from './components/DataImportExport.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Footer,
    Navbar,
    // NewTask,
    // DataImportExport
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=PT+Sans&display=swap');

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body{
  font-family: 'PT Sans', sans-serif;
  background-color: $color-1;
  color: $color-5;
  margin: 0;
  min-height: 100%;
}

html{
  height: 100%;
}
</style>
