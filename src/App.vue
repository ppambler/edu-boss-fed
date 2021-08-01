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
import request from '@/utils/request'
request({
  method: 'GET',
  url: '/boss/v2/api-docs?group=edu-boss-boot'
}).then(data => {
  console.log(data)
})
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
