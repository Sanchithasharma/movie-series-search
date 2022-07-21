<template>
  <div class="movie-view">
    <el-card :body-style="{ height: '75vh', overflow: 'auto' }">
      <el-col class="no-view-to-show" v-if="!!movieInfo.Title === false">
        Please click on any show from the list
      </el-col>
      <el-col v-else class="is-view">
        <div class="movie-view-container" :v-loading="isLoading">
          <div class="movie-image">
            <el-image
              style="width: 20vh; height: 30vh"
              :src="movieInfo.Poster"
              fit="fill"
            />
          </div>

          <div class="movie-info">
            <h1>{{ movieInfo.Title }}</h1>
            <div class="movie-year-genre-runtime">
              <span class="movie-rated">{{ movieInfo.Rated }}</span>
              <span> &#183; </span>

              <span>{{ movieInfo.Year }} </span>
              <span> &#183; </span>

              <span>{{ movieInfo.Genre }} </span>
              <span> &#183; </span>

              <span>{{ movieInfo.Runtime }} </span>
            </div>
            <br />
            <div>{{ movieInfo.Actors }}</div>
          </div>

          <div class="watchlist-button-container">
            <el-button
              size="large"
              type="info"
              v-if="!showWatchlistButton"
              plain
              @click="addThisShowToWatchList"
            >
              Watchlist<el-icon class="el-icon--right"
                ><CollectionTag
              /></el-icon>
            </el-button>
          </div>
        </div>

        <el-divider />
        <div class="movie-plot">
          {{ movieInfo.Plot }}
        </div>
        <el-divider />

        <div class="movie-ratings">
          <div
            class="rating"
            v-for="item in movieInfo.Ratings"
            :key="movieInfo.Ratings.indexOf(item)"
          >
            <el-card>
              <div class="rating-number">{{ item.Value }}</div>
              <div class="rating-website">{{ item.Source }}</div>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../store/store.js";

export default {
  name: "movie-view",
  data() {
    return {
      movieInfo: {},
      idmbId: "tt12327578",
      isLoading: false,
    };
  },
  methods: {
    getMovieInfo() {
      this.isLoading = true;
      axios
        .get("http://www.omdbapi.com/?apikey=3b773132", {
          params: {
            i: this.idmbId,
            plot: "full",
          },
        })
        .then((response) => {
          console.log(response.data);
          this.movieInfo = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
    },
    addThisShowToWatchList() {
      store.commit("addToWatchList", this.movieInfo);
    },
  },
  mounted() {
    this.getMovieInfo();
    console.log(this.showWatchlistButton);
  },
  created() {
    this.emitter.on("imdbID", (evt) => {
      this.idmbId = evt.eventContent;
      this.getMovieInfo();
    });
  },
  computed: {
    showWatchlistButton() {
      let alreadyExists = store.state.watchList.some(
        (item) => item.imdbID === this.movieInfo.imdbID
      );
      return alreadyExists;
    },
  },
};
</script>

<style lang="scss">
$font-color: gray;

.movie-view {
  padding: 16px;
  .no-view-to-show {
    text-align: center;
    padding-top: 30%;
  }
  .movie-view-container {
    display: flex;
    justify-content: space-around;
    .el-button {
      width: 168px;
      height: 40px;
      border: 1px solid gray;
      :hover {
        span {
          color: white;
        }
      }

      span {
        font-size: large;
        color: black;
      }
    }
  }
  .movie-info {
    margin-left: 20px;
    word-wrap: break-word;
    .movie-year-genre-runtime {
      font-size: large;
    }
    .movie-rated {
      border: 1px $font-color solid;
      border-radius: 4px;
      padding: 1px;
    }
    h1 {
      color: black;
    }
  }
}

.movie-ratings {
  display: flex;
  justify-content: space-evenly;
  .el-card {
    width: 24vh;
    overflow: auto;
  }
  .rating {
    text-align: center;
    .rating-number {
      font-size: larger;
      padding: 4px;
    }

    .rating-website {
      font-size: small;
    }
  }
}
</style>
