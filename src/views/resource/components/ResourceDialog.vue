<template>
  <div class="resource-dialog">
    <el-dialog :title="title" :visible="dialogFormVisible" @close="closeDialog" :append-to-body="true">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="资源分类">
          <el-select v-model="form.categoryId" placeholder="不分类" clearable>
            <el-option
              v-for="item in resourceCategories"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" :disabled="isLoading">取 消</el-button>
        <el-button type="primary" @click="onSubmit" :loading="isLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdateResource } from '@/services/resource'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'ResourceDialog',
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
        return ['添加资源', '编辑资源'].indexOf(value) !== -1
      }
    },
    data: {
      type: Array,
      required: true
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
        id: null,
        categoryId: '', // 默认不分类
        name: '',
        url: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' },
          {
            min: 2,
            max: 8,
            message: '长度在 2 到 8 个字符',
            trigger: 'blur'
          }
        ],
        description: [
          { required: true, message: '请输入资源描述', trigger: 'blur' },
          {
            min: 2,
            max: 140,
            message: '长度在 2 到 140 个字符',
            trigger: 'blur'
          }
        ],
        url: [
          { required: true, message: '请输入资源路径', trigger: 'blur' },
          {
            min: 2,
            max: 8,
            message: '长度在 2 到 50 个字符',
            trigger: 'blur'
          }
        ]
      },
      isLoading: false,
      resourceCategories: this.data // 资源分类列表
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
        const { data } = await createOrUpdateResource(this.form)
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
