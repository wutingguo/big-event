<template>
  <div>
    <h1 class="title">{{list.title}}</h1>

    <div class="info">
      <span>作者: {{list.nickname || list.username}}</span>
      <span>发布时间: {{list.pub_date | flDate}}</span>
      <span>所属分类: {{list.cate_name}}</span>
      <span>状态: {{list.state}}</span>
    </div>

    <hr>
<!-- http://www.liulongbin.top:3008/uploads/9b3b1be8a0defeb9c38137a08ff8acf5.jpg -->
    <img :src="'http://www.liulongbin.top:3008'+list.cover_img" alt="" />
    <div v-html="list.content">

    </div>
  </div>
</template>

<script>
export default {
  name: 'LookArt',
  props: {
    list: {
      type: Object,
      required: true
    }
  }

}
</script>

<style lang="less" scoped>
.title {
  font-size: 24px;
  text-align: center;
  font-weight: normal;
  color: #000;
  margin: 0 0 10px 0;
}

.info {
  font-size: 12px;
  span {
    margin-right: 20px;
  }
}
</style>
