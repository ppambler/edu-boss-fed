<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="name" label="资源名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="categoryId" label="资源分类">
                <el-select
                  v-model="form.categoryId"
                  placeholder="请选择资源分类"
                  clearable
                >
                  <el-option
                    :label="item.name"
                    :value="item.id"
                    v-for="item in resourceCategories"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="url" label="资源路径">
                <el-input v-model="form.url"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-button
                  type="primary"
                  @click="onSubmit"
                  :disabled="isLoading"
                  >查询搜索</el-button
                >
                <el-button @click="onReset" :disabled="isLoading"
                  >重置</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div class="card-header-button">
          <el-button @click="dialogShow = true">添加</el-button>
          <el-button @click="$router.push({ name: 'resource-category' })"
            >资源分类</el-button
          >
          <div v-if="dialogShow" class="dialogBox">
            <resource-dialog
              title="添加资源"
              :visible.sync="dialogShow"
              :data="resourceCategories"
              v-on:success="loadResources"
            ></resource-dialog>
          </div>
        </div>
      </div>
      <el-table
        :data="resources"
        style="width: 100%; margin-bottom: 20px"
        v-loading="isLoading"
        :border="true"
        :stripe="true"
      >
        <el-table-column type="index" label="编号" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="url" width="240" label="资源路径" align="center">
        </el-table-column>
        <el-table-column
          prop="description"
          width="180"
          label="描述"
          align="center"
        >
        </el-table-column>
        <el-table-column
          width="180"
          prop="createdTime"
          label="添加时间"
          align="center"
          :formatter="formatDate"
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
      <!--
        total 总记录数
        page-size 每页大小
        分页组件会自动根据 total 和 page-size 计算出一共分多少页
       -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="isLoading"
      >
      </el-pagination>
    </el-card>
    <div v-if="dialogEditShow" class="dialogBox">
      <resource-dialog
        title="编辑资源"
        :visible.sync="dialogEditShow"
        :data="resourceCategories"
        v-on:success="loadResources"
        :form-data="resourceData"
      ></resource-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages, deleteResource } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import dayjs from 'dayjs'
import { Form } from 'element-ui'
import ResourceDialog from './ResourceDialog.vue'
export default Vue.extend({
  name: 'ResourceList',
  components: {
    ResourceDialog
  },
  data () {
    return {
      resources: [], // 资源列表
      form: {
        name: '',
        url: '',
        current: 1, // 默认查询第1页数据
        size: 5, // 每页大小
        categoryId: null // 资源分类
      },
      totalCount: 0,
      resourceCategories: [], // 资源分类列表
      isLoading: true, // 加载状态
      dialogShow: false,
      dialogEditShow: false,
      resourceData: {} // 单个资源数据
    }
  },
  created () {
    this.loadResources()
    this.loadResourceCategories()
  },

  methods: {
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },
    async loadResources () {
      this.isLoading = true // 展示加载中状态
      const { data } = await getResourcePages(this.form)
      this.resources = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false // 关闭加载中状态
    },
    onSubmit () {
      console.log('submit!')
      this.form.current = 1 // 筛选查询从第 1 页开始
      this.loadResources()
    },
    handleEdit (item: any) {
      console.log('handleEdit', item)
      this.dialogEditShow = true
      this.resourceData = item
    },
    handleDelete (item: any) {
      console.log('handleDelete', item)
      this.$confirm('确认删除吗？', '提示', {})
        .then(async () => {
          // 确认执行这里
          // 请求删除操作
          const { data } = await deleteResource(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadResources() // 更新数据列表
          }
        })
        .catch((err) => {
          // 取消执行这里
          console.log(err)
          this.$message.info('已取消删除')
        })
    },
    formatDate (item: any) {
      return dayjs(item.createdTime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleSizeChange (val: number) {
      console.log('Size', val)
      this.form.size = val
      this.form.current = 1 // 每页大小改变重新查询第1页数据
      this.loadResources()
    },
    handleCurrentChange (val: number) {
      console.log('Current', val)
      // 请求获取对应页码的数据
      this.form.current = val // 修改要查询的页码
      this.loadResources()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1 // 重置回到第1页
      this.loadResources()
    }
  }
})
</script>

<style lang="scss" scoped>
.box-card ::v-deep .el-card__header {
  padding: 20px 0;
  .el-form {
    padding: 0 12px;
  }
}

.card-header-button {
  border-top: 1px solid #ebeef5;
  padding: 20px 20px 0 18px;
}
</style>
