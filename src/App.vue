<template>
  <div class="app">
    <div class="app-header">
      <MovieSearch />
    </div>

    <div class="app-body">
      <MoviesList />
      <MovieView />
    </div>
  </div>
</template>

<script>
import MovieSearch from "./views/MovieSearch.vue";
import MoviesList from "./views/MoviesList.vue";
import MovieView from "./views/MovieView.vue";

export default {
  name: "App",
  components: {
    MovieSearch,
    MoviesList,
    MovieView,
  },
};
</script>

<style lang="scss">
.app {
  font-family: Arial, Helvetica, sans-serif;
  .app-body {
    display: flex;
    flex-direction: row;
    .movie-list {
      width: 36%;
      border-right: 1px solid lightgray;
      padding: 2px;
      margin-right: 8px;
    }
  }
}
</style>
