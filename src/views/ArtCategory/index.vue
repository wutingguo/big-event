<template>
  <el-card class="box-card">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/artcategory' }"
        >文章分类</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/artlist' }"
        >文章列表</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-row type="flex" justify="end">
      <!-- <el-col :span="12"></el-col> -->
      <el-col :span="2">
        <el-button type="primary" size="small" @click="addArticleList=true">添加分类</el-button></el-col>
    </el-row>
    <el-dialog title="添加文章分类" :visible.sync="addArticleList">
  <el-form >
    <el-form-item label="分类名称" label-width="120px">
      <el-input autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="分类别名" label-width="120px">
       <el-input  autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addArticleList = false">取 消</el-button>
    <el-button type="primary" @click="addArticleList = false">确 定</el-button>
  </div>
</el-dialog>
    <el-table border stripe style="width: 100%" :data="ArticleList">
      <el-table-column prop="id" label="序号" width="125"> </el-table-column>
      <el-table-column prop="cate_alias" label="分类名称"> </el-table-column>
      <el-table-column prop="cate_name" label="分类别名"> </el-table-column>

      <el-table-column label="操作"
        ><el-button size="mini" type="primary">修改</el-button
        ><el-button size="mini" type="danger">删除</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Artcategory',
  data () {
    return {
      addArticleList: false
    }
  },
  created () {
    this.$store.dispatch('article/getArticleList')
  },
  computed: {
    ...mapState('article', ['ArticleList'])
  }
  // methods: {
  //   addArticleList() {
  //
  //   }
  // },
}
</script>

<style>
</style>
