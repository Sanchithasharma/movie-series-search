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
        <el-input
          v-model="searchString"
          class="w-50 m-2"
          placeholder="Type something"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
        <el-button
          @click="searchShowByString"
          @keyup.enter="searchShowByString"
          >Submit</el-button
        >
      </div>

      <div class="flex-grow" />
      <div class="year-slider">
        <el-label style="font-size: small">YEAR</el-label>
        <el-slider
          style="width: 160px"
          v-model="yearOfRelease"
          :min="1950"
          :max="2022"
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

export default {
  data() {
    return {
      typeOfShow: ref(""),
      radioSize: "small",
      searchString: "",
      yearOfRelease: "2022",
      marks: {
        1950: "1950",
        2022: "2022",
      },
    };
  },
  methods: {
    chooseTypeOfList() {
      this.emitter.emit("typeOfShow", { eventContent: this.typeOfShow });
    },
    searchShowByString() {
      this.emitter.emit("searchString", { eventContent: this.searchString });
    },
    filterShowsByYear() {
      this.emitter.emit("year", { eventContent: this.yearOfRelease });
    },
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
    .el-radio {
      color: red;
    }


    label.el-radio.el-radio--small {
      color: white;
      .is-checked {
        color: black;
      }
    }
    // .el-radio__input.is-checked + .el-radio__label {
    //   color: white;
    // }
  }
  .year-slider {
    margin: 2vh 2vh;
  }
}

.flex-grow {
  flex-grow: 1;
}
    .el-input__wrapper {
      background-color: red !important;
    }
</style>
