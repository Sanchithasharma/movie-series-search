<template>
  <div class="movie-search">
    <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
  <el-button :icon="Search" size="large" />
  </el-menu>
  </div>
</template>

<script>
export default {
}
</script>

<style>
    .el-menu {
        height: 100px;
    }

    .el-button {
        margin-left: 20px;
        margin-top: 10px;
    }
</style>