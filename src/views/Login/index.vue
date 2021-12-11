/* eslint-disable no-useless-return */
<template>
  <div class="login-container">
    <!-- 头部的 logo 区域 -->
    <div class="header">
      <img src="@/assets/images/logo.png" alt="" />
    </div>

    <!-- 登录和注册区域 -->
    <div class="box">
      <div class="box-header"></div>
      <!-- 登录的表单 -->
      <!-- <el-form>
        <el-form-item>
          <el-input
            placeholder="请输入用户名"
            maxlength="10"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item >
          <el-input
            placeholder="请输入密码"
            maxlength="15"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-button type="primary" class="btn-login">登录</el-button>
        <el-link type="info" class="link-reg">去注册账号</el-link>
      </el-form> -->

  <el-form :model="userInfo" :rules="rules" ref="loginForm" >
    <el-form-item prop="username">
      <el-input placeholder="请输入用户名" v-model="userInfo.username" prefix-icon="el-icon-loading"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input placeholder="请输入密码" v-model="userInfo.password"   prefix-icon="el-icon-lock"></el-input>
    </el-form-item>
    <el-button type="success" class="btn-login" @click="login">登录</el-button>
   <el-form-item> <el-link class="link-reg">去注册</el-link></el-form-item>
  </el-form>
    </div>
  </div>
</template>
<script>
import { reqLogin } from '@/api/user'
export default {
  data () {
    return {
      userInfo: {
        username: 'wtg106',
        password: 'wtg971040'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: ['blur', 'change'] },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入用户名称', trigger: ['blur', 'change'] },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15位的非空字符串', trigger: ['blur', 'change'] }
        ]
      }

    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async (flag) => {
        // eslint-disable-next-line no-useless-return
        if (!flag) return
        const { data } = await reqLogin(this.userInfo)

        if (data.code !== 0) {
          this.$message.error(data.message)
        } else {
          this.$message.success(data.message)
          localStorage.setItem('big-event', data.token)
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  background-color: blue;
  height: 100%;
  background: url('~@/assets/images/login_bg.jpg') no-repeat center;
  background-size: cover;

  .header {
    width: 1200px;
    margin: 0 auto;
    user-select: none;
  }

  .box {
    width: 400px;
    height: 270px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.2);
    padding: 0 30px;
    box-sizing: border-box;

    .box-header {
      height: 60px;
      background: url('~@/assets/images/login_title.png') no-repeat center;
    }

    .btn-login {
      width: 100%;
    }

    .link-reg {
      font-size: 12px;
      position: absolute;
      right: 0;
    }
  }
}
// .button{
//   height: 40px;

// }
</style>
