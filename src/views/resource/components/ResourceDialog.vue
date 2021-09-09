<template>
  <div class="resource-dialog">
    <el-dialog :title="title" :visible="dialogFormVisible" @close="closeDialog">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="资源分类">
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
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="closeDialog"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

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
    }
  },
  data () {
    return {
      dialogFormVisible: this.visible,
      form: {
        parentId: -1, // -1 表示没有上级菜单
        name: '',
        region: '',
        href: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          {
            min: 2,
            max: 8,
            message: '长度在 2 到 8 个字符',
            trigger: 'blur'
          }
        ],
        description: [
          { required: true, message: '请输入菜单描述', trigger: 'blur' },
          {
            min: 2,
            max: 140,
            message: '长度在 2 到 140 个字符',
            trigger: 'blur'
          }
        ],
        icon: [
          { required: true, message: '请输入前端图标', trigger: 'blur' },
          {
            min: 2,
            max: 8,
            message: '长度在 2 到 8 个字符',
            trigger: 'blur'
          }
        ]
      },
      isSubmitLoading: false,
      parentMenuList: [] // 父级菜单列表
    }
  },
  methods: {
    closeDialog () {
      this.$emit('update:visible', false)
    }
  }
})
</script>

<style lang="scss" scoped></style>
