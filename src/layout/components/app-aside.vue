<template>
  <div class="aside">
    <router-link class="logo" to="/" title="Back to Home">
      <img src="./logo.png" alt="LagouEdu" />
      <transition name="fade">
        <h1 v-if="!collapse">Edu Boss</h1>
      </transition>
    </router-link>
    <el-menu
      class="el-menu"
      default-active="4"
      @open="handleOpen"
      @close="handleClose"
      background-color="#28333e"
      text-color="#bbbfbc"
      active-text-color="#f7f8f8"
      router
      :collapse="collapse"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-lock"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/role">
          <i class="el-icon-s-custom"></i>
          <span slot="title">角色管理</span>
        </el-menu-item>
        <el-menu-item index="/menu">
          <i class="el-icon-menu"></i>
          <span slot="title">菜单管理</span>
        </el-menu-item>
        <el-menu-item index="/resource">
          <i class="el-icon-setting"></i>
          <span slot="title">资源管理</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/course">
        <i class="el-icon-film"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <!-- <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item index="/advert">
          <i class="el-icon-setting"></i>
          <span slot="title">广告列表</span>
        </el-menu-item>
        <el-menu-item index="/advert-space">
          <i class="el-icon-setting"></i>
          <span slot="title">广告位列表</span>
        </el-menu-item>
      </el-submenu> -->
      <!-- <template v-for="(menu, index) in menuList">
        <el-submenu
          v-if="
            menu.subMenuList &&
            menu.shown &&
            menu.subMenuList.some((item) => item.shown)
          "
          :key="menu.id"
          :index="index + ''"
        >
          <template slot="title">
            <i :class="`el-icon-${menu.icon}`"></i>
            <span>{{ menu.name }}</span>
          </template>
          <template v-for="subMenu in menu.subMenuList">
            <el-menu-item
              v-if="subMenu.shown"
              :key="subMenu.id"
              :index="subMenu.href"
            >
              <i :class="`el-icon-${subMenu.icon}`"></i>
              <span slot="title">{{ subMenu.name }}</span>
            </el-menu-item>
          </template>
        </el-submenu>
        <template v-else>
          <el-menu-item v-if="menu.shown" :key="menu.id" :index="menu.href">
            <i :class="`el-icon-${menu.icon}`"></i>
            <span slot="title">{{ menu.name }}</span>
          </el-menu-item>
        </template>
      </template> -->
    </el-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'AppAside',
  props: ['collapse'],
  computed: {
    ...mapState(['menuList'])
  },
  methods: {
    handleOpen (key: string, keyPath: string): void {
      console.log(key, keyPath)
    },
    handleClose (key: string, keyPath: string): void {
      console.log(key, keyPath)
    }
  }
})
</script>

<style lang="scss" scoped>
.aside {
  /* height: 100%; */
  .logo {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: #28333e;
    color: #fff;
    text-decoration: none;
    height: 60px;
    img {
      width: 25px;
    }
  }
  .el-menu {
    /* min-height: 100vh; */
    /* width: auto; */
    /* height: 100%; */
    border-right: none;
    .el-menu-item:hover {
      color: #f7f8f8 !important;
    }
    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    // 指就是html中fade名称
    transition: all 0.2s ease-in; // 0.5s动画过渡的时间
  }
  .fade-enter,
  .fade-leave-to {
    transition: all 0.2s ease-out;
  }
}
</style>
