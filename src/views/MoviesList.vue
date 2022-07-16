<template>
  <div class="movie-list" v-loading="isLoading">
    <el-col v-if="emptyList" class="list-is-not-present">
      No results found
    </el-col>
    <el-col v-if="!emptyList" class="list-is-present">
      <div class="movie-list-length">
        <span>{{ moviesList.totalResults }} results</span>
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
        <div class="load-more-button-container">
          <el-button
            class="load-more-button"
            plain
            type="info"
            @click="loadNextPage"
            >Load more</el-button
          >
        </div>
      </div>
    </el-col>

    <el-dialog v-model="dialogTableVisible" title="Watchlist" center>
      <div class="watch-list-container" style="height: 50vh" center>
        <h3 v-if="watchList.length === 0">
          You have not watch-listed anything yet
        </h3>
        <ul
          class="watch-list-item"
          v-for="item in watchList"
          :key="item.imdbID"
          @click="loadWatchListToView(item)"
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
              <p class="movie-title" style="font-size: small">
                {{ item.Title }}
              </p>
              <p class="movie-year">
                {{ item.Year }}
                <span> &#183; </span>
                {{ item.Runtime }}
              </p>
              <p class="movie-genre">{{ item.Genre }}</p>
            </span>

            <!-- <el-icon class="delete-icon" size="28px" color="#F56C6C" @click="deleteShowFromWatchList(item)"><DeleteFilled /></el-icon> -->
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { store } from "../store/store.js";

export default {
  data() {
    return {
      moviesList: [],
      count: ref(0),
      page: 1,
      dialogTableVisible: false,
      searchString: "star",
      watchList: [],
      isLoading: false,
      type: "",
      yearOfRelease: "2022",
      busy: false,
      showsList: [],
    };
  },
  mounted() {
    // this.getMoviesList(this.page);
    this.watchList = store.state.watchList;
  },
  created() {
    this.emitter.on("searchString", (evt) => {
      this.searchString = evt.eventContent;
      this.getMoviesList((this.page = 1));
    });

    this.emitter.on("typeOfShow", (evt) => {
      this.type = evt.eventContent;
      this.getMoviesList((this.page = 1));
    });

    this.emitter.on("year", (evt) => {
      this.yearOfRelease = evt.eventContent;
      console.table(this.yearOfRelease);
      this.getMoviesList((this.page = 1));
    });
  },
  methods: {
    getMoviesList(page) {
      this.isLoading = true;
      axios
        .get("https://www.omdbapi.com/?apikey=3b773132", {
          params: {
            s: this.searchString,
            type: this.type,
            y: this.yearOfRelease,
            page: page,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response && response.data) {
            this.moviesList = response.data;
            this.showsList.push(...this.moviesList.Search);
            // if (this.page > 1) {
            //   this.showsList.push(...this.moviesList.Search);
            // }
          }

          this.isLoading = false;
          console.log(this.showsList);
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
      store.commit("removeFromWatchList", item);
    },
    loadNextPage() {
      this.page++;
      console.log(this.page);
      this.getMoviesList(this.page);
    },
  },
  computed: {
    hideLoadMoreButton() {
      return (
        this.showsList.length === this.moviesList.totalResults ||
        this.showsList.length % 10 !== 0
      );
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
  .movie-item,
  .watch-list-item {
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
  }
}

.watch-list-container {
  border: 1px solid #d1dbe561;
  .watch-list-item {
    margin: 4px;
    i.el-icon.delete-icon {
      margin-right: 2vh;
      margin-left: auto;
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
.movie-list {
  .list-is-not-present {
    text-align: center;
    margin-top: 60%;
  }
}
</style>
