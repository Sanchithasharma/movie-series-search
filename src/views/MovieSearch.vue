<template>
  <div class="movie-search">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#666666"
    >
      <el-input v-model="input1" placeholder="Type something">
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>

      <div class="slidecontainer">
        <input type="range" min="1" max="100" value="50" />
      </div>

      <el-radio-group @change="chooseTypeOfList" v-model="radio">
        <el-radio label="" size="small">Any</el-radio>
        <el-radio label="movie" size="small">Movies</el-radio>
        <el-radio label="series" size="small">Series</el-radio>
        <el-radio label="episode" size="small">Episode</el-radio>
      </el-radio-group>
    </el-menu>
  </div>
</template>

<script>
import { ref } from "vue";

// const radio3 = ref('1')
export default {
  data() {
    return {
      radio: ref(""),
      input1: "",
    };
  },
  methods: {
    chooseTypeOfList() {
      console.log(this.radio);
    },
  },
};
</script>

<style lang="scss">
.el-menu {
  height: 100px;

  .el-radio-group {
    // margin-left: 50%;
    span.el-radio__label {
      color: white;
    }
  }

  .el-input {
    height: 40px;
    margin: 35px;
    width: 20%;
  }

  .slidecontainer {
    display: flex;
    margin: 2px 40px;
  }
}
</style>
