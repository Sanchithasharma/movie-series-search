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
          v-model="input4"
          class="w-50 m-2"
          placeholder="Type something"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
        <el-button>Submit</el-button>
      </div>

      <div class="flex-grow" />
      <div class="year-slider">
        <el-label style="font-size: small">YEAR</el-label>
        <el-slider
          style="width: 160px"
          v-model="value"
          range
          show-stops
          :min="1970"
          :max="2022"
          :marks="marks"
        />
      </div>
      <div class="show-type">
        <el-label style="font-size: small">TYPE</el-label>
        <el-radio-group
          @change="chooseTypeOfList"
          text-color="white"
          v-model="radio"
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
      radio: ref(""),
      radioSize: 'small',
      searchString: "",
      value: ref([1990, 2015]),
      marks: {
        1970: "1970",
        2022: "2022",
      },
    };
  },
  methods: {
    chooseTypeOfList() {
      console.log(this.radio);
    },
    searchShowByString() {
      console.log(this.searchString);
      this.emitter.emit("searchString", { eventContent: this.searchString });
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

    label.el-radio.el-radio--small {
      color: white;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: white;
    }
  }
  .year-slider {
    margin: 2vh 2vh;
  }
}

.flex-grow {
  flex-grow: 1;
}
</style>
