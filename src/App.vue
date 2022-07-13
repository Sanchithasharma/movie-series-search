<template>
  <div class="app">
    <div class="app-header">
      <MovieSearch />
    </div>

    <div class="app-body">
      <MoviesList />
      <el-divider direction="vertical" />
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
$color: red;

.app {
  .app-header {

  }

  .app-body {
    border: 1px solid red;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
