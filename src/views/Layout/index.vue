<template>
  <el-container class="main-container">
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <el-menu
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        router
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <img
              v-if="userInfo.user_pic"
              :src="userInfo.user_pic"
              alt=""
              class="avatar"
            />
            <div v-else class="text-avatar">{{ defaultImg }}</div>
            <span>个人中心 </span>
          </template>
          <el-menu-item index="/userinfo"
            ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
          >
          <el-menu-item index="/changeavatar"
            ><i class="el-icon-camera"></i>更换头像</el-menu-item
          >
          <el-menu-item index="/resetpwd"
            ><i class="el-icon-key"></i>重置密码</el-menu-item
          >
        </el-submenu>
        <el-menu-item  @click="out"
          ><i class="el-icon-switch-button"></i>退出</el-menu-item
        >
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <div class="aside-info">
          <img
            v-if="userInfo.user_pic"
            :src="userInfo.user_pic"
            alt=""
            class="avatar"
          />
          <div v-else class="text-avatar">{{ defaultImg }}</div>
          <span>欢迎{{ userInfo.nickname || userInfo.username }}</span>
        </div>
        <el-menu
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          router
          default-active="1"
        >
          <!-- 首页 -->
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- 文章管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="/artcategory"
              ><i class="el-icon-s-data"></i>文章分类</el-menu-item
            >
            <el-menu-item index="/artlist"
              ><i class="el-icon-document-copy"></i>文章列表</el-menu-item
            >
          </el-submenu>
          <!-- 个人中心 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/userinfo"
              ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
            >
            <el-menu-item index="/changeavatar"
              ><i class="el-icon-camera"></i>更换头像</el-menu-item
            >
            <el-menu-item index="/resetpwd"
              ><i class="el-icon-key"></i>重置密码</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>

        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import '@/store/index'
// import { reqGetuserInfo } from '@/api/user'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Layout',
  created () {
    this.$store.dispatch('user/getuserInfo')
  },
  computed: {
    ...mapState('user', ['userInfo']),
    ...mapGetters('user', ['defaultImg'])
  },
  methods: {
    out () {
      this.$confirm('是否真的要离开我?嘤嘤嘤~~~', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message.success('渣男!!!你会后悔的')
          localStorage.removeItem('big-event')
          this.$router.push('/login')
          // type: 'success',
          // message: '删除成功!'
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '真是个明确的选择'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;

  .el-header {
    padding: 0;
    background-color: #23262e;
    display: flex;
    justify-content: space-between;

    .el-menu {
      height: 60px;
      user-select: none;
    }
  }

  .el-aside {
    background-color: #23262e;
    user-select: none;
    .el-menu {
      border-right: 0;
    }
  }

  .el-footer {
    text-align: center;
    line-height: 50px;
    background-color: #eeeeee;
    height: 50px !important;
  }
}

.el-menu-item {
  font-size: 12px;
}

/deep/ .el-submenu__title {
  font-size: 12px;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}
.text-avatar {
  width: 35px;
  height: 35px;
  display: inline-block;
  background-color: #409eff;
  border-radius: 50%;
  font-size: 24px;
  text-align: center;
  line-height: 35px;
  margin-right: 10px;
  color: white;
}

.aside-info {
  border: 1px solid #000;
  border: 0 1px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
}
</style>
