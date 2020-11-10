<template>
  <footer>
    <p> Amused to Death © {{ year }}</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {},
  data() {
    return {
      year: (new Date).getUTCFullYear()
    }
  },

  beforeMount(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
