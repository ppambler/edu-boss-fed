<template>
  <div class="login">
    <div>
      <img class="logo" src="@/assets/logo.png" alt="EduBoss">
    </div>
    <!--
      1. :model="ruleForm"
      2. :rules="rules"
      3. ref="ruleForm"
      4. el-form-item 绑定 prop 属性
    -->
    <el-form
      class="login-form"
      label-position="top"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      size="medium"
    >
      <h2 class="form-title">系统登录</h2>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="onSubmit"
          :loading="isLoginLoading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 18,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur'
          }
        ]
      },
      isLoginLoading: false
    }
  },
  methods: {
    async onSubmit () {
      // 1. 表单验证
      // 2. 验证通过 -> 提交表单
      // 3. 处理请求结果 -> 成功：跳转到首页 -> 失败：给出提示
      try {
        // 1. 表单验证 -> 验证不通过会执行 catch 里边的代码，err 为 false，会根据输入内容决定页面显示什么样的 校验 message
        await (this.$refs.form as Form).validate()

        // 登录按钮 loading
        this.isLoginLoading = true

        // 2. 验证通过 -> 提交表单
        // console.log(await login(this.form))
        const { data } = await login(this.form)

        // 3. 处理请求结果
        // 失败：给出提示
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 1. 登录成功，记录登录状态，状态需要能够全局访问（放到 Vuex 容器中）
          this.$store.commit('setUser', data.content)
          // 2. 然后在访问需要登录的页面的时候判断有没有登录状态（路由拦截器）

          // 成功：跳转回原来页面或首页
          this.$router.push(this.$route.query.redirect as string || '/')
          // this.$router.push({
          //   name: 'home'
          // })
          this.$message.success('登录成功')
        }
      } catch (err) {
        console.log('登录失败', err)
      } finally {
        // 结束登录按钮的 loading
        this.isLoginLoading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .logo {
    width: 100px;
    margin: 20px;
    margin-top: -100px;
  }
  .login-form {
    width: 380px;
    background: #fff;
    padding: 30px;
    border-radius: 5px;
    .form-title {
      margin: 0 0 1rem;
      font-weight: 400;
      font-size: 1.5rem;
    }
  }
  .login-btn {
    width: 100%;
  }
}
</style>
