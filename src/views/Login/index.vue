<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-title">欢迎使用</h1>
      <el-form :model="form" :rules="rules" ref="formRef" class="login-form" @submit.prevent="handleSubmit">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="账号" prefix-icon="User" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="password">
              <el-input v-model="form.password" type="password" placeholder="密码" prefix-icon="Lock" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item prop="code">
              <el-input v-model="form.code" placeholder="验证码" prefix-icon="Verification" />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item>
              <img :src="codeimg" alt="验证码" class="code-img" @click="refreshCode" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="remember-forget">
              <el-checkbox v-model="form.remember">记住密码</el-checkbox>
              <a href="#" class="forget-link">忘记密码</a>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" native-type="submit" class="login-btn">登录</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="register-link">
              <span>还没有账号？</span>
              <a href="#">立即注册</a>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCode, login } from './api'

const formRef = ref()
const form = ref({
  username: '',
  password: '',
  code: '',
  remember: false,
  captchaId: ''
})
const codeimg = ref('')
const rules = {
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ]
}
const refreshCode = () => {
  getCode().then(res => {
    form.value.captchaId = res.data.captchaId
    codeimg.value = res.data.captcha
  })
}

onMounted(() => {
  console.log('组件挂载完成')
  refreshCode()
})


const handleSubmit = () => {
  formRef.value.validate((valid: boolean) => {
    console.log('表单验证结果:', valid)
    if (valid) {
      console.log('登录成功:', form.value)
      let data = {
        username: form.value.username,
        password: form.value.password,
        captchaId: form.value.captchaId,
        captcha: form.value.code
      }
      login(data).then(res => {
        console.log('登录成功:', res)
      })
      refreshCode()
    }
  })
}
</script>

<style scoped>
.login-container {
  width:100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  width: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.login-title {
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 30px;
}

.login-form {
  width: 100%;
}

.code-img {
  width: 100%;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  object-fit: cover;
}

.remember-forget {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forget-link {
  color: #667eea;
  text-decoration: none;
}

.forget-link:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 500;
}

.register-link {
  text-align: center;
  margin-top: 10px;
  color: #666;
}

.register-link a {
  color: #667eea;
  text-decoration: none;
  margin-left: 5px;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>