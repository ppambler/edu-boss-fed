<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'menu-create' })"
          >添加菜单</el-button
        >
      </div>
      <el-table :data="menus" style="width: 100%" :border="true" :stripe="true">
        <el-table-column label="编号" width="100" type="index" align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称"
          min-width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="level"
          :formatter="formatLevel"
          label="菜单级数"
          min-width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标"
          min-width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序"
          min-width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
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
import { getAllMenus } from '@/services/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus () {
      try {
        const { data } = await getAllMenus()
        if (data.code === '000000') {
          this.menus = data.data
        }
      } catch (error) {
        this.$message.error('加载菜单列表失败')
      }
    },
    handleEdit () {
      console.log('handleEdit')
    },
    handleDelete () {
      console.log('handleDelete')
    },
    formatLevel (menu: any) {
      return menu.level === 0 ? '一级' : menu.level === 1 ? '二级' : '三级'
    }
  }
})
</script>

<style lang="scss" scoped></style>
