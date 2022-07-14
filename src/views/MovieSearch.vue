<template>
  <div class="movie-search">
    <el-menu
      class="movie-search-menu-bar"
      mode="horizontal"
      background-color="#666666"
    >
      <div class="search-container">
        <el-input
          v-model="searchString"
          placeholder="Search for movie, series or episode ..."
        >
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
      </div>
      <el-button @click="searchShowByString">Submit</el-button>
    </el-menu>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      radio: ref(""),
      searchString: "",
      value2: ref(0),
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

  .el-radio-group {
    label.el-radio.el-radio--small {
      color: white;
    }
  }
  .movie-search-menu-bar {
    display: flex;
    flex-direction: row;
  }
  .search-container {
    .el-input {
      height: 40px;
      margin: 35px;
      width: 160%;
    }
  }
}

.slidecontainer {
  display: flex;
  margin: 2px 40px;
}

// .el-input.el-input--prefix {
//   border: none;
//   border-bottom: 1px solid white;
//   width: 40%;
//   .el-input__wrapper {
//     background-color: black;
//   }
// }
</style>
