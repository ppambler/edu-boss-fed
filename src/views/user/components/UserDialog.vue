<template>
  <div class="user-dialog">
    <el-dialog
      title="分配角色"
      :visible="dialogFormVisible"
      @close="closeDialog"
      :append-to-body="true"
    >
      <el-select v-model="value1" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" :disabled="isLoading">取 消</el-button>
        <el-button type="primary" @click="onSubmit" :loading="isLoading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// import { createOrUpdate } from '@/services/user'
export default Vue.extend({
  name: 'UserDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: Object,
    rolesData: Array
  },
  created () {
    if (this.formData) {
      this.form = this.formData
    }
    this.roles = this.rolesData as never
  },
  data () {
    return {
      dialogFormVisible: this.visible,
      form: {
        name: '',
        code: '',
        description: ''
      },
      roles: [],
      value1: [],
      isLoading: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('update:visible', false)
    },
    async onSubmit () {
      // try {
      //   await (this.$refs.form as Form).validate()
      //   this.isLoading = true
      //   const { data } = await createOrUpdate(this.form)
      //   if (data.code === '000000') {
      //     this.$message.success(this.isEdit ? '修改成功' : '添加成功')
      //     this.$emit('success')
      //     this.closeDialog()
      //   } else {
      //     this.$message.error(this.isEdit ? '修改失败' : '添加失败')
      //   }
      // } catch (error) {
      //   this.$message.error('验证失败')
      // } finally {
      //   this.isLoading = false
      // }
    }
  }
})
</script>

<style lang="scss" scoped></style>
