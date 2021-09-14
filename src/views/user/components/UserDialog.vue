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
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
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
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'UserDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
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
        code: '',
        description: ''
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
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
