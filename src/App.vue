<template>
  <div id="app">
    <!-- 用来提示还有内容，不然一片空白，以为项目有问题 -->
    <h1>拉钩教育</h1>
    <!-- 根路由出口 -->
    <router-view />
    <el-button>normal button</el-button>
    <p>yellow</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'App'
})
</script>

<style lang="scss" scoped>
p
{
    font: $font-kai;

    color: $warning-color;
}

</style>
