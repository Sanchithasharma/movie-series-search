<template>
  <div class="movie-list" v-loading="isLoading">
    <el-col v-if="emptyList" class="list-is-not-present">
      No results found
    </el-col>
    <el-col v-if="!emptyList" class="list-is-present">
      <div class="movie-list-length">
        <span>{{ numberOfResults }} results</span>
        <el-link type="primary" @click="dialogTableVisible = true"
          >View Watchlist</el-link
        >
      </div>
      <div class="movie-list-container">
        <ul
          class="movie-item"
          v-for="item in showsList"
          :key="item.imdbID"
          style="overflow: auto"
          @click="sendShowId(item)"
        >
          <li>
            <span>
              <el-image
                style="width: 80px; height: 80px"
                :src="item.Poster"
                fit="fill"
              >
              </el-image>
            </span>
            <span class="movie-info">
              <p class="movie-title">{{ item.Title }}</p>
              <p class="movie-year">{{ item.Year }}</p>
            </span>
          </li>
        </ul>
        <div
          class="load-more-button-container"
        >
          <el-button
            class="load-more-button"
            plain
            type="info"
            v-if="!hideLoadMoreButton"
            @click="loadNextPage"
            >Load more</el-button
          >
        </div>
      </div>
    </el-col>

    <el-dialog v-model="dialogTableVisible" title="Watchlist" center>
      <div class="watch-list-container" style="height: 50vh" center>
        <h3 v-if="watchList.length === 0" class="list-is-not-present">
          You have not watch-listed anything yet
        </h3>
        <ul
          class="watch-list-item"
          v-for="item in watchList"
          :key="item.imdbID"
        >
          <li>
            <span>
              <el-image
                style="width: 60px; height: 80px"
                :src="item.Poster"
                fit="fill"
              />
            </span>
            <span class="movie-info">
              <el-link
                class="movie-title"
                style="font-size: small"
                @click="loadWatchListToView(item)"
              >
                {{ item.Title }}
              </el-link>
              <p class="movie-year">
                {{ item.Year }}
                <span> &#183; </span>
                {{ item.Runtime }}
              </p>
              <p class="movie-genre">{{ item.Genre }}</p>
            </span>

            <el-button type="danger" @click="deleteShowFromWatchList(item)">
              <el-icon><Delete /></el-icon>
            </el-button>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../store/store.js";

export default {
  data() {
    return {
      moviesList: [],
      page: 1,
      dialogTableVisible: false,
      searchString: "star",
      watchList: [],
      isLoading: false,
      type: "",
      yearOfRelease: "2022",
      busy: false,
      showsList: [],
      numberOfResults: 0,
    };
  },
  mounted() {
    this.getMoviesList(this.page);
    this.watchList = store.state.watchList;
  },
  created() {
    this.emitter.on("triggerMovieListApi", () => {
      this.page = 1;
      this.showsList.length = 0;
      this.getMoviesList(this.page);
    });
  },
  methods: {
    getMoviesList(page) {
      this.isLoading = true;
      axios
        .get("https://www.omdbapi.com/?apikey=3b773132", {
          params: {
            s: store.state.searchString,
            type: store.state.typeOfShow,
            y: store.state.yearOfRelease,
            page: page,
          },
        })
        .then((response) => {
          if (response.data.Response) {
            this.moviesList = response.data;
            this.numberOfResults = response.data.totalResults;
            this.showsList.push(...this.moviesList.Search);
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
        });
    },
    sendShowId(show) {
      this.emitter.emit("imdbID", { eventContent: show.imdbID });
    },
    loadWatchListToView(show) {
      this.dialogTableVisible = false;
      this.sendShowId(show);
    },
    deleteShowFromWatchList(item) {
      store.commit("removeFromWatchList", item.imdbID);
      console.log(item);
    },
    loadNextPage() {
      this.page++;
      this.getMoviesList(this.page);
    },
  },
  computed: {
    hideLoadMoreButton() {
      return Number(this.numberOfResults) === Number(this.showsList.length)
    },
    emptyList() {
      return this.showsList.length === 0;
    },
  },
};
</script>

<style lang="scss">
.movie-list-container,
.watch-list-container {
  height: 72vh;
  overflow-y: auto;
  margin-top: 2px;
  .movie-item {
    border-bottom: 1px lightgray solid;
    margin: 8px;
    padding-bottom: 8px;
    padding-left: 0px;
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
        margin-top: 2%;
        border-radius: 4px;
        padding: 12px;

        .el-image__error span {
          display: none;
        }
      }
    }
  }
}
.movie-info {
  margin-left: 8px;
  p.movie-year,
  p.movie-genre {
    font-size: small;
    color: gray;
  }
  p.movie-title {
    font-size: large;
    color: rgb(66, 66, 66);
    word-wrap: break-word;
  }
}

.watch-list-container {
  border: 1px solid #d1dbe561;
  .watch-list-item {
    border-bottom: 1px lightgray solid;
    margin: 8px;
    padding-bottom: 8px;
    padding-left: 0px;
    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 4%;
      .el-image {
        margin-top: 2%;
        border-radius: 4px;
        padding: 12px;

        .el-image__error span {
          display: none;
        }
      }
    }
    margin: 4px;
    .el-button {
      margin-right: 2vh;
      margin-left: auto;
      cursor: pointer;
    }
  }
}
.movie-list-length {
  margin: 4%;
  color: gray;
  display: flex;
  justify-content: space-between;
}
.load-more-button-container {
  text-align: center;
  padding: 4px;
}
.list-is-not-present {
  text-align: center;
  margin-top: 30%;
}
</style>
