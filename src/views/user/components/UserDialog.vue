<template>
  <div class="user-dialog">
    <el-dialog
      title="分配角色"
      :visible="dialogFormVisible"
      @close="closeDialog"
      :append-to-body="true"
    >
      <el-select v-model="roleIdList" multiple placeholder="请选择">
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
        <el-button type="primary" @click="handleAllocRole" :loading="isLoading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { allocateUserRoles } from '@/services/role'
export default Vue.extend({
  name: 'UserDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formData: Object,
    rolesData: Array,
    currentUser: Object
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
      roleIdList: [],
      isLoading: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('update:visible', false)
    },
    async handleAllocRole () {
      this.isLoading = true
      const { data } = await allocateUserRoles({
        userId: (this.currentUser as any).id,
        roleIdList: this.roleIdList
      })
      if (data.code === '000000') {
        this.$message.success('分配成功')
        this.closeDialog()
      } else {
        this.$message.error('分配失败')
      }
      this.isLoading = false
    }
  }
})
</script>

<style lang="scss" scoped></style>
