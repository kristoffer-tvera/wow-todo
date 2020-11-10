<template>
<nav>
<ul>
    <li><a href="/">A2D Todo</a></li>
    <li><a href="/import.php">Import characters</a></li>
    <li><a href="https://github.com/kristoffer-tvera/wow-todo/issues">Issues / Help</a></li>
    <li><a href="https://github.com/kristoffer-tvera/wow-todo">GitHub</a></li>
</ul>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

nav{
  background-color: $color-5;
  color: $color-1;
}
ul {
  list-style-type: none;
  padding: 1rem;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0 1rem;
}
a {
  color: $color-1;
  transition: 350ms;
  
  &:hover{
    border-bottom: 1px solid;
  }
}
</style>
