<template>
  <div class="movie-view">
    <div class="movie">
      <div class="movie-image">
        <el-image
          style="width: 200px; height: 300px"
          src="https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"
          fit="fill"
        />
      </div>

      <div class="movie-info">
        <h1>Guardians of the Galaxy Vol. 2</h1>
        <p>PG-13 . Action, Adventure, Comedy . 136 min</p>
        <div>Chris Pratt, Zoe Saldana, Dave Bautista</div>
      </div>

      <div>
        <el-button> Watchlist<Upload /> </el-button>
      </div>
    </div>

    <el-divider />
    <div>
      <p>
        The Guardians struggle to keep together as a team while dealing with <br/>
        their personal family issues, notably Star-Lord's encounter with his
        father the ambitious celestial being Ego.
      </p>
    </div>
    <el-divider />

    <div class="movie-ratings">
      <div class="rating">
        <span class="rating-number">7.6/10</span>
        <span class="rating-website">Internet Movie Database</span>
      </div>

      <div class="rating">
        <span class="rating-number">85%</span>
        <span class="rating-website">Rotten Tomatoes</span>
      </div>

      <div class="rating">
        <span class="rating-number">67/100</span>
        <span class="rating-website">Metacritic</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      movieInfo: {},
    };
  },
  methods: {
    getMovieInfo() {
      axios
        .get("http://www.omdbapi.com/?i=tt3896198&apikey=3b773132")
        .then((response) => {
          console.log(response.data);
          this.movieInfo = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.movie {
  display: flex;
  justify-content: space-around;
}

.movie-ratings {
  display: flex;
  justify-content: space-around;
  .rating {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
