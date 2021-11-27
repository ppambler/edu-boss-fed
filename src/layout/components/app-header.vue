<template>
  <div class="header">
    <el-button class="hamburger" :icon="hamburgerIcon" @click.stop="handleCollapse"></el-button>
    <div class="breadcrumbWrapper">
      <Breadcrumb />
    </div>
    <div class="dropdownWrapper">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            shape="square"
            :size="40"
            :src="userInfo.portrait || require('@/assets/default-avatar.png')"
          ></el-avatar>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
          <el-dropdown-item divided @click.native="handleLogout"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '@/services/user'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
export default Vue.extend({
  name: 'AppHeader',
  components: {
    Breadcrumb
  },
  props: ['collapse'],
  data () {
    return {
      userInfo: {}, // 当前登录用户信息
      hamburgerIcon: 'el-icon-s-fold'
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },
    handleLogout () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确认执行这里
          // 清除登录状态
          this.$store.commit('setUser', null)
          // 跳转到登录页面
          this.$router.push({
            name: 'login'
          })
          this.$message({
            type: 'success',
            message: '退出成功！'
          })
        })
        .catch(() => {
          // 取消执行这里
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    },
    handleCollapse () {
      const flag = !this.collapse
      this.hamburgerIcon = flag ? 'el-icon-s-unfold' : 'el-icon-s-fold'
      this.$emit('update:collapse', flag)
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: -20px;
  /* justify-content: space-between; */
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
  .hamburger {
    padding: 17px;
    height: 60px;
    font-size: 20px;
    border: 0;
    border-radius: 0;
    background-color: #f8f9fb;
    &:hover {
      color: #28333e;
    }
    &:focus {
      color: #28333e;
    }
  }
  .dropdownWrapper {
    margin-left: auto;
  }
}
</style>
