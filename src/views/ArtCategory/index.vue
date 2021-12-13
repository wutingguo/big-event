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
        <el-form-item label="分类名称" label-width="120px" prop="cate_alias" >
          <el-input v-model="ArticleForm.cate_alias" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" label-width="120px" prop="cate_name"  >
          <el-input v-model="ArticleForm.cate_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addArticleList = false">取 消</el-button>
        <el-button type="primary" @click="shureAdd">确 定</el-button>
      </div>
  </el-dialog>
    <el-table border stripe style="width: 100%" :data="ArticleList">
      <el-table-column type=index  prop="index" label="序号" width="125"> </el-table-column>
      <el-table-column prop="cate_name" label="分类名称"> </el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"> </el-table-column>

      <el-table-column label="操作">
       <template #default="{ row }">
         <!-- {{row}} -->
          <el-button size="mini" type="primary" @click="changeArticle(row.id)">修改</el-button>
        <el-button size="mini" type="danger" @click="delArticle(row.id)">删除</el-button>
       </template>
      </el-table-column>
    </el-table>
    <el-dialog  @close=" dialogVisible=false" title="修改文章分类" :visible.sync="dialogVisible " >
      <el-form :rules="rules" :model="changeForm" ref="changeArticle" >
        <el-form-item label="分类名称" label-width="120px" prop="cate_name">
          <el-input v-model="changeForm.cate_alias" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" label-width="120px"  prop="cate_alias" >
          <el-input v-model="changeForm.cate_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible  = false">取 消</el-button>
        <el-button type="primary" @click="shureChange">确 定</el-button>
      </div>
  </el-dialog>
  </el-card>
</template>

<script>
import { reqAddArticle, reqCateArticle, reqChangeArticle, reqDelArticle } from '@/api/article'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Artcategory',
  data () {
    return {
      dialogVisible: false,
      addArticleList: false,
      changeForm: {
        cate_alias: '',
        cate_name: '',
        id: null
      },
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
    ...mapActions('article', ['getArticleList']),
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
    async  changeArticle (id) {
      // console.log(id)
      if (id === 1 || id === 2) return this.$message.error('管理员不允许修改')
      this.dialogVisible = true
      // reqChangeArticle(id)
      const { data } = await reqChangeArticle(id)
      // console.log(data, 999)
      if (data.code !== 0) return this.$message.error(data.message)
      this.changeForm.cate_name = data.data.cate_name
      this.changeForm.cate_alias = data.data.cate_alias
      this.changeForm.id = id
    },
    shureChange () {
      // console.log('确定修改')
      this.$refs.changeArticle.validate(async (flag) => {
        // console.log(flag)
        if (!flag) return this.$message.error('请认真检查格式')
        const { data } = await reqCateArticle(this.changeForm)
        // console.log(data)
        this.getArticleList()
        this.dialogVisible = false

        if (data.code === 0) return this.$message.success(data.message)
      })
    },
    delArticle (id) {
      if (id === 1 || id === 2) return this.$message.error('管理员不允许删除')
      this.$confirm('此操作将会永久删除文章分类,请确认!!!', '温馨提醒', { type: 'warning' }).then(async () => {
        const { data } = await reqDelArticle(id)
        // console.log(data)
        if (data.code !== 0) return this.$message.error(data.message)
        this.$message.success(data.message)
        this.getArticleList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
</style>
