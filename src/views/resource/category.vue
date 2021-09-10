<template>
  <div class="resource-category">
    <category-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CategoryList from './components/CategoryList.vue'
export default Vue.extend({
  name: 'ResourceCategory',
  components: {
    CategoryList
  },
  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped></style>
