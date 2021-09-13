<template>
  <div class="user-dialog">
    <el-dialog
      :title="isEdit ? '编辑用户' : '添加用户'"
      :visible="dialogFormVisible"
      @close="closeDialog"
      :append-to-body="true"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="用户编码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
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
import { createOrUpdate } from '@/services/user'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'UserDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    formData: Object
  },
  created () {
    if (this.isEdit) {
      this.form = this.formData
    }
  },
  data () {
    return {
      dialogFormVisible: this.visible,
      form: {
        name: '',
        code: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      isLoading: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('update:visible', false)
    },
    async onSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        this.isLoading = true
        const { data } = await createOrUpdate(this.form)
        if (data.code === '000000') {
          this.$message.success(this.isEdit ? '修改成功' : '添加成功')
          this.$emit('success')
          this.closeDialog()
        } else {
          this.$message.error(this.isEdit ? '修改失败' : '添加失败')
        }
      } catch (error) {
        this.$message.error('验证失败')
      } finally {
        this.isLoading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
