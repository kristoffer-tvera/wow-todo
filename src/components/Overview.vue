<template>
  <h3>Characters</h3>
    <div class="row">
      <div class="card" v-for="character in characters" :key="character.id">
        {{ character.id }}
        <hr/>
        {{ character.name }}
        <hr/>
        {{ character.class }}
        <hr/>
        {{ character.realm }}
        <hr/>
        {{ character.faction }}
      </div>
    </div>
</template>

<script>
export default {
  name: 'Overview',
  props: ["characterList"],
  data() {
    return {
      characters: this.characterList,
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.row{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
}

.card{
  /* width: 100%; */
  /* max-width: 8%; */
  padding: 1rem;
  margin: 0.5rem;
  border: 1px solid;
  box-sizing: border-box;
}
</style>
