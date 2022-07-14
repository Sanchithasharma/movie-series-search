<template>
  <div class="movie-list">
    <div class="movie-list-length">
      <span>{{ moviesList.totalResults }} results</span>
      <el-link type="primary" @click="dialogTableVisible = true"
        >View Watchlist</el-link
      >
    </div>
    <div class="movie-list-container" v-infinite-scroll="load">
      <ul
        class="movie-item"
        v-for="item in moviesList.Search"
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
            />
          </span>
          <span class="movie-info">
            <p class="movie-title">{{ item.Title }}</p>
            <p class="movie-year">{{ item.Year }}</p>
          </span>
        </li>
      </ul>
    </div>

    <el-dialog v-model="dialogTableVisible" title="Watchlist">
      <el-table :data="gridData">
        <el-table-column property="Title" label="Title" width="150" />
        <el-table-column property="Type" label="Type" width="200" />
        <el-table-column property="Runtime" label="Runtime" />
        <el-table-column property="Genre" label="Genre" />
      </el-table>
    </el-dialog>
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
      page: 1,
      dialogTableVisible: false,
      searchString: "star",
      gridData: [
        {
          Title: "Gone Girl",
          Year: "2014",
          Rated: "R",
          Released: "03 Oct 2014",
          Runtime: "149 min",
          Genre: "Drama, Mystery, Thriller",
          Director: "David Fincher",
          Writer: "Gillian Flynn",
          Actors: "Ben Affleck, Rosamund Pike, Neil Patrick Harris",
          Plot: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
          Language: "English",
          Country: "United States",
          Awards: "Nominated for 1 Oscar. 64 wins & 188 nominations total",
          Poster:
            "https://m.media-amazon.com/images/M/MV5BMTk0MDQ3MzAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_SX300.jpg",
          Ratings: [
            {
              Source: "Internet Movie Database",
              Value: "8.1/10",
            },
            {
              Source: "Rotten Tomatoes",
              Value: "87%",
            },
            {
              Source: "Metacritic",
              Value: "79/100",
            },
          ],
          Metascore: "79",
          imdbRating: "8.1",
          imdbVotes: "957,908",
          imdbID: "tt2267998",
          Type: "movie",
          DVD: "13 Jan 2015",
          BoxOffice: "$167,767,189",
          Production: "N/A",
          Website: "N/A",
          Response: "True",
        },
      ],
    };
  },
  mounted() {
    this.getMoviesList(this.page);
  },
  created() {
    this.emitter.on("searchString", (evt) => {
      this.searchString = evt.eventContent;
      this.getMoviesList(this.page);
    });
  },
  methods: {
    getMoviesList(page) {
      console.log("movie list");
      axios
        .get("https://www.omdbapi.com/?apikey=3b773132", {
          params: {
            s: this.searchString,
            type: "",
            y: "1970-2020",
            page: page,
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
      console.log(this.page);
    },
    sendShowId(show) {
      this.emitter.emit("imdbID", { eventContent: show.imdbID });
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
    margin: 8px;
    padding-bottom: 8px;
    overflow: scroll;
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
        border-radius: 4px;
        padding: 12px;
      }
    }
    .movie-info {
      margin-left: 8px;
      p.movie-year {
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

.movie-list-length {
  margin: 4%;
  color: gray;
  display: flex;
  justify-content: space-between;
}
</style>
