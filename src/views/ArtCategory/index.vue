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
  <el-dialog  @close="textArticleList" title="添加文章分类" :visible.sync="addArticleList" >
      <el-form :rules="rules" :model="ArticleForm" ref="Article" >
        <el-form-item label="分类名称" label-width="120px" prop="cate_alias">
          <el-input v-model="ArticleForm.cate_alias" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" label-width="120px" prop="cate_name">
          <el-input v-model="ArticleForm.cate_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addArticleList = false">取 消</el-button>
        <el-button type="primary" @click="shureAdd">确 定</el-button>
      </div>
  </el-dialog>
    <el-table border stripe style="width: 100%" :data="ArticleList">
      <el-table-column prop="id" label="序号" width="125"> </el-table-column>
      <el-table-column prop="cate_alias" label="分类名称"> </el-table-column>
      <el-table-column prop="cate_name" label="分类别名"> </el-table-column>

      <el-table-column label="操作"
        ><el-button size="mini" type="primary" @click="changeArticle(this.ArticleList.id)">修改</el-button
        ><el-button size="mini" type="danger">删除</el-button>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { reqAddArticle } from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'Artcategory',
  data () {
    return {
      addArticleList: false,
      ArticleForm: {
        cate_alias: '',
        cate_name: ''
      },
      rules: {
        cate_name: [
          { required: true, message: '分类名必须是1-10位的非空字符', trigger: ['blur', 'change'] },
          { pattern: /^\S{1,10}$/, message: '分类名称必须是1-10位的非空字符串', trigger: ['blur', 'change'] }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.$store.dispatch('article/getArticleList')
    // this.$store.dispatch('article/addFn')
  },
  computed: {
    ...mapState('article', ['ArticleList'])
  },
  methods: {
    textArticleList () {
      this.addArticleList = false
      this.$refs.Article.resetFields()
    },
    shureAdd () {
      this.$refs.Article.validate(async (flag) => {
        console.log(flag)
        if (!flag) return console.log('')
        this.addArticleList = false
        const { data } = await reqAddArticle(this.ArticleForm)
        if (data.code === 0) {
          this.$message.success(data.message)
        }
        this.$store.dispatch('article/getArticleList')
        // this.$store.commit('addFn', this.ArticleForm)
      })
    },
    changeArticle (id) {
      console.log(id)
      this.addArticleList = true
      // reqChangeArticle(id)
    }
  }
}
</script>

<style>
</style>
