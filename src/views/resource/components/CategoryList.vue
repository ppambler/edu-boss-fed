<template>
  <div class="category-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'category-create' })"
          >添加资源分类</el-button
        >
      </div>
      <el-table
        :data="categorys"
        style="width: 100%"
        :border="true"
        :stripe="true"
      >
        <el-table-column label="编号" width="100" type="index" align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源分类名称"
          min-width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="level"
          :formatter="formatDate"
          label="创建时间"
          min-width="150"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="sort"
          label="排序"
          min-width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourceCategories } from '@/services/resource-category'
import dayjs from 'dayjs'

export default Vue.extend({
  name: 'CategoryIndex',
  data () {
    return {
      categorys: []
    }
  },
  created () {
    this.loadAllCategorys()
  },
  methods: {
    async loadAllCategorys () {
      try {
        const { data } = await getResourceCategories()
        if (data.code === '000000') {
          this.categorys = data.data
        }
      } catch (error) {
        this.$message.error('加载资源分类列表失败')
      }
    },
    handleEdit (item: any) {
      this.$router.push({
        name: 'category-edit',
        params: {
          id: item.id
        }
      })
    },
    handleDelete (item: any) {
      console.log(item)
      // this.$confirm('确认删除吗？', '提示', {})
      //   .then(async () => {
      //     // 确认执行这里
      //     // 请求删除操作
      //     const { data } = await deleteCategory(item.id)
      //     if (data.code === '000000') {
      //       this.$message.success('删除成功')
      //       this.loadAllCategorys() // 更新数据列表
      //     }
      //   })
      //   .catch((err) => {
      //     // 取消执行这里
      //     console.log(err)
      //     this.$message.info('已取消删除')
      //   })
    },
    formatDate (item: any) {
      return dayjs(item.createdTime).format('YYYY-MM-DD HH:mm:ss')
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
