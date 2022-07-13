<template>
  <div class="movie-view">
    <div class="movie-view-container">
      <div class="movie-image">
        <el-image
          style="width: 200px; height: 300px"
          :src="movieInfo.Poster"
          fit="fill"
        />
      </div>

      <div class="movie-info">
        <h1>{{ movieInfo.Title }}</h1>
        <div>
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
        <el-button size="large" type="info" plain>
          Watchlist<el-icon class="el-icon--right"><CollectionTag /></el-icon>
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
        <div class="rating-number">{{ item.Value }}</div>
        <div class="rating-website">{{ item.Source }}</div>
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
        .get("http://www.omdbapi.com/?i=tt2267998&apikey=3b773132")
        .then((response) => {
          console.log(response.data);
          this.movieInfo = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getMovieInfo();
  },
};
</script>

<style lang="scss">
$font-color: gray;

.movie-view {
  padding: 16px;
  .movie-view-container {
    display: flex;
    justify-content: space-around;
    // .watchlist-button-container {
    //   margin-left: auto;
    //   margin-right: 0;
    // }
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
    margin-top: 100px;
    margin-left: 20px;
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
  justify-content: space-around;
  .rating {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .rating-number {
      font-size: larger;
      padding: 4px;
    }

    .rating-website {
      font-size: small;
    }
  }
}

.movie-plot {
  font-size: large;
}
</style>
