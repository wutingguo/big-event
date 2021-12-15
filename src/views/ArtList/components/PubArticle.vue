<template>
  <div class="art-pub-container">
    <el-form ref="pubRef" label-width="100px" :rules="rules" :model="pubForm">
      <el-form-item label="文章标题" prop="title">
        <el-input placeholder="请填写文章标题" v-model="pubForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <el-select placeholder="请选择分类" clearable v-model="pubForm.cate_id">
          <el-option :label="item.cate_name" :value="item.id" v-for="item in ArticleList" :key="item.id"> </el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="文章内容">
        <quill-editor v-model="pubForm.content"></quill-editor>
      </el-form-item>
      <el-form-item label="文章封面">
        <div class="cover-box">
          <img :src="pubForm.cover_img" alt="" class="cover-img" />
          <el-link type="primary" :underline="false" @click="$refs.iptFile.click()">+ 选择封面</el-link>
          <input type="file" ref="iptFile" accept="image/*" hidden @change="upImg"/>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish('已发布')">发布文章</el-button>
        <el-button type="info" @click="publish('草稿')">存为草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import defImg from '@/assets/images/cover.jpg'
import { mapActions, mapState } from 'vuex'
import { reqPublish } from '@/api/article'
export default {
  name: 'PubArticle',
  data () {
    return {
      pubForm: {
        title: '',
        cate_id: '',
        content: '',
        state: '',
        cover_img: defImg
      },
      rules: {
        title: [
          { required: true, message: '文章标题不能为空', trigger: ['change', 'blur'] },
          { min: 1, max: 30, message: '文章标题1-30字符', trigger: ['change', 'blur'] }
        ],
        cate_id: [
          { required: true, message: '文章分类不能为空', trigger: ['change', 'blur'] }
        ]
      },
      filed: null
    }
  },
  created () {
    this.getArticleList()
  },
  computed: {
    ...mapState('article', ['ArticleList'])

  },
  methods: {
    ...mapActions('article', ['getArticleList']),
    upImg (e) {
      // console.log(e.target.files)
      // 这里打印的是两个属性,第一个是文件对象,第二个是length,我们需要的是第一个所以需要去第一个下标
      const filed = e.target.files[0]
      console.log(filed)
      const path = URL.createObjectURL(filed)
      console.log(path)
      this.pubForm.cover_img = path
      this.filed = filed
    },
    publish (str) {
      this.pubForm.state = str
      console.log(111)
      this.$refs.pubRef.validate(async (flag) => {
        if (!flag) return this.$message.error('表单验证失败,请从新输入')
        console.log(flag)
        const fm = new FormData()
        fm.append('title', this.pubForm.title)
        fm.append('cate_id', this.pubForm.cate_id)
        fm.append('content', this.pubForm.content)
        fm.append('cover_img', this.filed)
        fm.append('state', this.pubForm.state)
        const { data } = await reqPublish(fm)
        console.log(data)
        if (data.code !== 0) return this.$message.error(data.message)
        this.$message.success(data.message)
        this.$emit('pubclose')
      })
    }

  }
}
</script>

<style lang="less" scoped>
.art-pub-container {
  padding: 0 30px 20px 0px;
}

.el-select {
  width: 100%;
}

/deep/ .ql-snow .ql-color-picker .ql-picker-label svg,
/deep/ .ql-snow .ql-icon-picker .ql-picker-label svg {
  position: relative;
  top: -6px;
}

/deep/ .ql-snow .ql-picker-label::before {
  position: relative;
  top: -8px;
}

/deep/ .ql-editor {
  min-height: 300px;
}

.cover-img {
  object-fit: cover;
  width: 400px;
  height: 280px;
  margin-right: 10px;
}

.cover-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
