<template>
  <div class="app">
    <header class="app-header">
      <MovieSearch />
    </header>

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
  color: rgba(0, 0, 0, 0.62);
  .app-body {
    display: flex;
    flex-direction: row;
    .movie-list {
      width: 700px;
      border-right: 1px solid lightgray;
      padding: 2px;
      margin-right: 8px;
    }
    .movie-view {
      width: 100%;

    }
  }
}
</style>
