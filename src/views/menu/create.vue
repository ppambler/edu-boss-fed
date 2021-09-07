<template>
  <div class="menu-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加菜单</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <el-option :value="-1" label="无上级菜单"></el-option>
            <el-option
              v-for="item in parentMenuList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标" prop="icon">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number
            v-model="form.orderNum"
            :min="1"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="isSubmitLoading"
            >提交</el-button
          >
          <el-button :disabled="isSubmitLoading">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'MenuCreate',
  data () {
    return {
      form: {
        parentId: -1, // -1 表示没有上级菜单
        name: '你要创建的菜单名',
        region: '',
        href: '路径',
        icon: '图标',
        orderNum: 0,
        description: '菜单描述',
        shown: false
      },
      rules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入菜单描述', trigger: 'blur' }
        ],
        icon: [{ required: true, message: '请输入前端图标', trigger: 'blur' }]
      },
      isSubmitLoading: false,
      parentMenuList: [] // 父级菜单列表
    }
  },
  created () {
    this.loadMenuInfo()
  },
  methods: {
    async loadMenuInfo () {
      try {
        const { data } = await getEditMenuInfo()
        if (data.code === '000000') {
          this.parentMenuList = data.data.parentMenuList
        }
      } catch (error) {
        this.$message.error('加载上级菜单数据失败')
      }
    },
    async onSubmit () {
      // 1. 表单验证
      // 2. 验证通过，提交表单

      try {
        await (this.$refs.form as Form).validate()
        this.isSubmitLoading = true
        const { data } = await createOrUpdateMenu(this.form)
        if (data.code === '000000') {
          this.$message.success('提交成功')
          this.$router.push({
            name: 'menu'
          })
        } else {
          this.$message.error('提交失败')
        }
      } catch (error) {
        this.$message.error('验证失败')
      } finally {
        this.isSubmitLoading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
