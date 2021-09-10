<template>
  <div class="category-dialog">
    <el-dialog
      :title="title"
      :visible="dialogFormVisible"
      @close="closeDialog"
      :append-to-body="true"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort"></el-input>
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
import { createOrUpdateCategory } from '@/services/resource-category'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'CategoryDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['添加分类', '编辑分类'].indexOf(value) !== -1
      }
    },
    formData: Object
  },
  created () {
    if (this.formData) {
      this.form = this.formData
    }
  },
  data () {
    return {
      dialogFormVisible: this.visible,
      form: {
        name: '',
        sort: 0 // 默认排序 0
      },
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
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
        const { data } = await createOrUpdateCategory(this.form)
        if (data.code === '000000') {
          this.$message.success('添加成功')
          this.$emit('success')
          this.closeDialog()
        } else {
          this.$message.error('添加失败')
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
