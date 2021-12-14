<template>
  <el-card>
    <!-- 面包屑模块 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <hr />
    <!-- 筛选模块 -->
    <el-row type="flex" justify="space-between" style="margin: 30px 0">
      <el-col :span="16">
        <el-form inline class="demo-form-inline">
          <el-form-item label="文章分类">
           <el-select size="small" placeholder="请选择分类" v-model="params.cate_id">
              <el-option v-for="item in ArticleList " :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态">
            <el-select size="small" placeholder="请选择状态" v-model="params.state">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">筛选</el-button>
            <el-button type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="small"
          >发表文章</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="lsit" style="width: 100%">
      <el-table-column  label="文章标题">
        <template #default="{row}">
          <el-link type="primary" @click="seeArt(row.id)">{{row.title}}</el-link>
          <!-- <slot></slot> -->
          <el-dialog
  title="文章预览"
  :visible.sync="dialogVisible"
  @close="dialogVisible=false"
  width="78%">
  <LookArt :list="byIdList"></LookArt>
</el-dialog>

        </template>
    </el-table-column>
      <el-table-column prop="cate_name" label="分类"> </el-table-column>
      <el-table-column  label="发表时间">
        <template #default="{ row }">
          {{row.pub_date | flDate}}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"> </el-table-column>
      <el-table-column  label="操作">
        <template #default="{row}">
          <el-button type="danger" @click="delArt(row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

            <!-- @size-change="handleSizeChange"
      @current-change="handleCurrentChange" -->
        <!-- :current-page="currentPage4" -->
    <el-pagination
      style="margin:30px 0 "
      @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
      :current-page="params.pagenum"
      :page-sizes="[2, 3, 5,8,10]"
      :page-size="params.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

  </el-card>
</template>

<script>
import LookArt from './components/LookArt.vue'
import { mapActions, mapState } from 'vuex'
import { reqDelArt, reqGetArtList, reqLookArt } from '@/api/article'
export default {
  name: 'ArtList',
  data () {
    return {
      params: {
        pagenum: 1,
        pagesize: 5,
        cate_id: '',
        state: ''
      },
      byIdList: null,
      lsit: null,
      total: null,
      dialogVisible: false
    }
  },
  components: {
    LookArt
  },
  created () {
    this.getArtList()
    this.getArticleList()
  },
  computed: {
    ...mapState('article', ['ArticleList'])
  },
  methods: {
    ...mapActions('article', ['getArticleList']),
    async  getArtList () {
      const { data } = await reqGetArtList(this.params)
      // console.log(data)
      if (data.code !== 0) return this.$message.error('获取文章列表失败')
      this.lsit = data.data
      this.total = data.total
    },
    delArt (id) {
      this.$confirm('此操作将会删除文章中的美女,请确认', '提示一哈', { type: 'error' }).then(async () => {
        const { data } = await reqDelArt(id)
        console.log(data)
        if (data.code !== 0) return this.$message.error('删除失败')
        this.$message.success(data.message)
        this.getArtList()
      }).catch(() => {
        this.$message.info('取消删除,你是个好人')
      })
    },
    async  seeArt (id) {
      const { data } = await reqLookArt(id)
      // console.log(data)
      if (data.code !== 0) return console.log('获取失败')
      this.dialogVisible = true
      this.byIdList = data.data
    },
    handleSizeChange (val) {
      // handleSizeChange是每页多少条数据发生变化了执行
      // console.log(val, 555)// 分页条数,也就是每页多少条
      this.params.pagesize = val
      this.getArtList()
    },
    handleCurrentChange (data) {
      // 这个函数是页码发生变化后就会执行
      // console.log(data, 111)// 页码,下面的数字,有多少页,点击就会变化
      this.params.pagenum = data
      this.getArtList()
    }

  }
}
</script>

<style>
</style>
