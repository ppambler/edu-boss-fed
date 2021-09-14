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
                  @click="handleQuery"
                  :disabled="isLoading"
                  >查询</el-button
                >
                <el-button @click="handleReset" :disabled="isLoading"
                  >重置</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="注册时间" prop="rangeDate">
                <el-date-picker
                  v-model="form.rangeDate"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  value-format="yyyy-MM-dd"
                  unlink-panels
                  is-range
                  :picker-options="pickerOptions"
                />
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
        <el-table-column width="120" label="状态" align="center">
          <template slot-scope="scope">
            <!-- <i
              title="正常"
              :class="[
                'status',
                scope.row.status === 'ENABLE'
                  ? 'status-success'
                  : 'status-fail',
              ]"
            ></i> -->
            <el-switch
              v-model="scope.row.status"
              active-value="ENABLE"
              inactive-value="DISABLE"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleForbidUser(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" align="center">
          <template>
            <el-button type="text" @click="handleSelectRole"
              >分配角色</el-button
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
        :current-page.sync="form.currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="isLoading"
      >
      </el-pagination>
    </el-card>
    <div v-if="dialogVisible" class="dialogBox">
      <user-dialog
        :isEdit="true"
        :visible.sync="dialogVisible"
        v-on:success="loadUsers"
        :form-data="userData"
        :roles-data="roles"
      ></user-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages, forbidUser } from '@/services/user'
import { getAllRoles } from '@/services/role'
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
        // 似乎叫 filterParams 比叫好呀！
        phone: '',
        currentPage: 1, // 默认查询第1页数据
        pageSize: 5, // 每页大小
        startCreateTime: '',
        endCreateTime: '',
        rangeDate: []
      },
      totalCount: 0,
      isLoading: true, // 加载状态
      dialogShow: false,
      dialogVisible: false,
      userData: {}, // 单个用户数据
      roles: [], // 所有角色列表
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker: any) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker: any) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker: any) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近六个月',
            onClick (picker: any) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一年',
            onClick (picker: any) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  created () {
    this.loadUsers()
  },

  methods: {
    async loadUsers () {
      this.isLoading = true // 展示加载中状态
      const { rangeDate } = this.form
      if (rangeDate && rangeDate.length) {
        this.form.startCreateTime = rangeDate[0]
        this.form.endCreateTime = rangeDate[1]
      } else {
        this.form.startCreateTime = ''
        this.form.endCreateTime = ''
      }
      const { data } = await getUserPages(this.form)
      this.users = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false // 关闭加载中状态
    },
    async handleForbidUser (user: any) {
      try {
        console.log(user)
        const { data } = await forbidUser(user.id)
        console.log(data)
      } catch (error) {
        user.status = 'ENABLE'
        console.log(error)
      }
    },
    handleQuery () {
      console.log('submit!')
      this.form.currentPage = 1 // 筛选查询从第 1 页开始
      this.loadUsers()
    },
    handleEdit (item: any) {
      console.log('handleEdit', item)
      this.dialogVisible = true
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
    handleReset () {
      (this.$refs.form as Form).resetFields()
      this.form.currentPage = 1 // 重置回到第1页
      this.loadUsers()
    },
    async handleSelectRole () {
      // 加载角色列表
      const { data } = await getAllRoles()
      this.roles = data.data
      // 展示对话框
      this.dialogVisible = true
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
  width: 0.875rem;
  height: 0.875rem;
  vertical-align: middle;
  border-radius: 50%;
}
</style>
