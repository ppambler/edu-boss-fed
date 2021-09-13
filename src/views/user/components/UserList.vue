<template>
  <div class="user-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="phone" label="手机号">
                <el-input v-model="form.phone"></el-input>
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
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="注册时间">
                <el-input v-model="form.createTime"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table
        :data="users"
        style="width: 100%; margin-bottom: 20px"
        v-loading="isLoading"
        :border="true"
        :stripe="true"
      >
        <el-table-column prop="id" label="用户 ID" width="100" align="center">
        </el-table-column>
        <el-table-column prop="name" label="头像" width="100" align="center">
          <template slot-scope="scope">
            <img
              width="30px"
              class="avatar"
              :src="
                scope.row.portrait ||
                '//www.lgstatic.com/thumbnail_100x100/i/image2/M01/5E/65/CgotOVszSAOANi0LAAAse2IVWAE693.jpg'
              "
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" width="180" align="center">
        </el-table-column>
        <el-table-column prop="phone" width="180" label="手机号" align="center">
        </el-table-column>
        <el-table-column
          width="180"
          prop="createTime"
          label="注册时间"
          align="center"
          :formatter="formatDate"
        ></el-table-column>
        <el-table-column width="180" label="状态" align="center">
          <template slot-scope="scope">
            <i title="正常" :class="['status',scope.row.status === 'ENABLE' ? 'status-success' : 'status-fail']"></i>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" align="center">
          <template slot-scope="scope">
            <div>
              <el-button
                type="text"
                @click="
                  $router.push({
                    name: 'alloc-menu',
                    params: {
                      userId: scope.row.id,
                    },
                  })
                "
                >禁用</el-button
              >
              <el-button type="text">分配角色</el-button>
            </div>
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
        :current-page.sync="form.currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="isLoading"
      >
      </el-pagination>
    </el-card>
    <div v-if="dialogEditShow" class="dialogBox">
      <user-dialog
        :isEdit="true"
        :visible.sync="dialogEditShow"
        v-on:success="loadUsers"
        :form-data="userData"
      ></user-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages } from '@/services/user'
import dayjs from 'dayjs'
import { Form } from 'element-ui'
import UserDialog from './UserDialog.vue'
export default Vue.extend({
  name: 'UserList',
  components: {
    UserDialog
  },
  data () {
    return {
      users: [], // 用户列表
      form: {
        phone: '',
        currentPage: 1, // 默认查询第1页数据
        pageSize: 5 // 每页大小
      },
      totalCount: 0,
      isLoading: true, // 加载状态
      dialogShow: false,
      dialogEditShow: false,
      userData: {} // 单个用户数据
    }
  },
  created () {
    this.loadUsers()
  },

  methods: {
    async loadUsers () {
      this.isLoading = true // 展示加载中状态
      const { data } = await getUserPages(this.form)
      this.users = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false // 关闭加载中状态
    },
    onSubmit () {
      console.log('submit!')
      this.form.currentPage = 1 // 筛选查询从第 1 页开始
      this.loadUsers()
    },
    handleEdit (item: any) {
      console.log('handleEdit', item)
      this.dialogEditShow = true
      this.userData = item
    },
    formatDate (item: any) {
      return dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    handleSizeChange (val: number) {
      console.log('Size', val)
      this.form.pageSize = val
      this.form.currentPage = 1 // 每页大小改变重新查询第1页数据
      this.loadUsers()
    },
    handleCurrentChange (val: number) {
      console.log('Current', val)
      // 请求获取对应页码的数据
      this.form.currentPage = val // 修改要查询的页码
      this.loadUsers()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.currentPage = 1 // 重置回到第1页
      this.loadUsers()
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

.avatar {
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-sizing: border-box;
  vertical-align: middle;
}

.status-success {
    background: #51cf66;
}
.status-fail {
    background: #ff6b6b;
}
.status {
    display: inline-block;
    cursor: pointer;
    width: .875rem;
    height: .875rem;
    vertical-align: middle;
    border-radius: 50%;
}
</style>
