<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>基本资料</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      ref="form"
      label-width="80px"
      style="width: 500px; margin-top: 30px"
    >
      <el-form-item label="登录名称">
        <el-input disabled :value="userInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input :value="userInfo.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input :value="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交修改</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'info',
  methods: {
    ...mapActions('user', ['getuserInfo'])
  },
  computed: {
    ...mapState('user', ['userInfo'])
  }
}
</script>

<style></style>
