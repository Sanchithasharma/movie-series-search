<template>
  <div class="movie-search">
    <el-menu
      class="el-menu"
      mode="horizontal"
      :ellipsis="false"
      background-color="#666666"
      text-color="#fff"
      @select="handleSelect"
    >
      <div class="search-input">
        <el-input v-model="searchString" placeholder="Type something">
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
        <el-button @click="searchShowByString">Submit</el-button>
      </div>

      <div class="flex-grow" />
      <div class="year-slider">
        <el-label style="font-size: small">YEAR</el-label>
        <el-slider
          style="width: 160px"
          v-model="yearOfRelease"
          :min="1950"
          :max="currentYear"
          :marks="marks"
          @change="filterShowsByYear"
        />
      </div>
      <div class="show-type">
        <el-label style="font-size: small">TYPE</el-label>
        <el-radio-group
          @change="chooseTypeOfList"
          text-color="white"
          v-model="typeOfShow"
        >
          <el-radio label="" :size="radioSize">Any</el-radio>
          <el-radio label="movie" :size="radioSize">Movies</el-radio>
          <el-radio label="series" :size="radioSize">Series</el-radio>
          <el-radio label="episode" :size="radioSize">Episode</el-radio>
        </el-radio-group>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { ref } from "vue";
import { store } from "../store/store.js";

export default {
  data() {
    return {
      typeOfShow: "",
      radioSize: "small",
      searchString: ref(""),
      yearOfRelease: 0,
      currentYear: Number(new Date().getFullYear()),
      marks: {},
    };
  },
  methods: {
    chooseTypeOfList() {
      store.commit("filterByType", this.typeOfShow);
      this.triggerMovieListApi();
    },
    searchShowByString() {
      store.commit("filterShowsByString", this.searchString);
      this.triggerMovieListApi();
    },
    filterShowsByYear() {
      store.commit("filterShowsByYear", this.yearOfRelease);
      this.triggerMovieListApi();
    },
    triggerMovieListApi() {
      this.emitter.emit("triggerMovieListApi");
    },
    getCurrentYear() {
      const currentYearStr = this.currentYear.toString();
      this.marks = {
        1950: "1950",
      };
      this.marks[this.currentYear] = currentYearStr;
    },
  },
  mounted() {
    this.yearOfRelease = store.state.yearOfRelease;
    this.searchString = store.state.searchString;
    this.typeOfShow = store.state.typeOfShow;
    this.getCurrentYear();
  },
};
</script>

<style scoped lang="scss">
.el-menu {
  height: 100px;
  color: white;
  display: flex;
  align-items: center;
  .search-input {
    display: flex;
    margin: 2vh 2vh;
    width: 56vh;
    .el-button {
      margin: 1vh 1vh;
    }
  }

  .show-type {
    display: flex;
    flex-direction: column;
    margin: 2vh 4vh;
  }
  .el-radio-group {
    margin-right: 2vh;

    label.el-radio.el-radio--small {
      color: white;
      .is-checked {
        color: black;
      }
    }
  }
  .year-slider {
    margin: 2vh 2vh;
  }
}

.flex-grow {
  flex-grow: 1;
}
::v-deep .el-input__wrapper {
  // background-color: #666666 !important;
  border: none;
  color: white !important;
}
::v-deep .el-slider__bar {
  background-color: #c4c4c4 !important;
}

::v-deep span.el-radio__inner.is-checked{
  background: black;
  border-color: black;
}

::v-deep .el-slider__button.el-tooltip__trigger.el-tooltip__trigger {
  border-color: rgb(0 0 0 / 62%);
}
</style>
