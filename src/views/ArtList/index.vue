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
            <el-input size="small" placeholder="请选择分类"></el-input>
          </el-form-item>
          <el-form-item label="发布状态">
            <!-- <el-select size="small" placeholder="请选择状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select> -->
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
      <el-table-column prop="title" label="文章标题"> </el-table-column>
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
  </el-card>
</template>

<script>
import { reqDelArt, reqGetArtList } from '@/api/article'
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
      lsit: null,
      total: null
    }
  },
  created () {
    this.getArtList()
  },
  methods: {
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
    }
  }
}
</script>

<style>
</style>
