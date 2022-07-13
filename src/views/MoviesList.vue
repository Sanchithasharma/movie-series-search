<template>
  <div class="movie-list">
    <h5>{{ moviesList.totalResults }} results</h5>
    <div class="movie-list-container">
      <ul
        class="movie-item"
        v-for="item in moviesList.Search"
        :key="item.imdbID"
        style="overflow: auto"
      >
        <li>
          <span>
            <el-image
              style="width: 100px; height: 100px"
              :src="item.Poster"
              fit="fill"
            />
          </span>
          <span>
            <p>{{ item.Title }}</p>
            <p>{{ item.Year }}</p>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  data() {
    return {
      moviesList: [],
      count: ref(0),
    };
  },
  mounted() {
    this.getMoviesList();
  },
  methods: {
    getMoviesList() {
      console.log("movie list");
      axios
        .get("https://www.omdbapi.com/?apikey=3b773132", {
          params: {
            s: "game",
            type: "",
          },
        })
        .then((response) => {
          console.log(response.data);
          this.moviesList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    load() {
      this.count.value += 2;
      console.log('loading')
    },
  },
};
</script>

<style lang="scss">
.movie-list-container {
  height: 500px;
  overflow: scroll;
  .movie-item {
    border-bottom: 1px lightgray solid;
    margin: 2px;
    overflow: scroll;
    li {
      display: flex;
      flex-direction: row;

      :hover {
        background-color: aquamarine  ;
      }
    }
  }
}
</style>
