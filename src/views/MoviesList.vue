<template>
  <div class="movie-list">
    <div class="movie-list-length">{{ moviesList.totalResults }} results</div>
    <div class="movie-list-container" v-infinite-scroll="load">
      <ul
        class="movie-item"
        v-for="item in moviesList.Search"
        :key="item.imdbID"
        style="overflow: auto"
      >
        <li>
          <span>
            <el-image
              style="width: 80px; height: 80px"
              :src="item.Poster"
              fit="fill"
            />
          </span>
          <span class="movie-info">
            <p class="movie-title">{{ item.Title }}</p>
            <p class="movie-year">{{ item.Year }}</p>
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
      page: 1
    };
  },
  mounted() {
    this.getMoviesList(this.page);
  },
  methods: {
    getMoviesList(page) {
      console.log("movie list");
      axios
        .get("https://www.omdbapi.com/?apikey=3b773132", {
          params: {
            s: "game",
            type: "",
            y: '1970',
            page: page
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
      // this.count.value += 2;
      // this.page = this.page + 1
      // this.getMoviesList(this.page);
      console.log(this.page);
    },
  },
};
</script>

<style lang="scss">
.movie-list-container {
  height: 496px;
  overflow: scroll;
  .movie-item {
    border-bottom: 1px lightgray solid;
    margin: 4px;
    overflow: scroll;
    padding-left: 0px;
    // padding: 4px;
    :hover {
      background-color: #ebebeb;
      cursor: pointer;
    }
    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 4%;
      .el-image {
        border-radius: 4px;
      }
    }
    .movie-info {
      margin-left: 4%;
      p.movie-year {
        font-size: small;
        color: gray;
      }
      p.movie-title {
        font-size: large;
        color: rgb(66, 66, 66);
      }
    }
  }
}

.movie-list-length {
  margin: 8%;
  color: gray;
}
</style>
