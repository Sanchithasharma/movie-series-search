<template>
<div class="app">
  <h2>movie search and series search</h2>
  <MovieSearch />
</div>

</template>

<script>
import MovieSearch from './views/MovieSearch.vue'


export default {
  name: 'App',
  components: {
    MovieSearch
  }
}
</script>

<style lang="scss">
  $color: red;

  .app {
    
    h2 {
      color: blue;
      border: 1px solid red;
    }
  }

</style>
