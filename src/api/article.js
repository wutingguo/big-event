import http from '@/utils/requst'
export const reqGetArticle = () => {
  return http({
    method: 'GET',
    url: '/my/cate/list'
  })
}
// 请求添加文章分类
export const reqAddArticle = (data) => {
  return http({
    method: 'POST',
    url: '/my/cate/add',
    data
  })
}
// 请求获取对应需要修改文章名字
export const reqChangeArticle = (id) => {
  return http({
    method: 'GET',
    url: '/my/cate/info',
    // 这里的params记得加{}他是以对象的形势接受
    params: { id }
  })
}
// 修改对应id的文章分类
export const reqCateArticle = (data) => {
  return http({
    method: 'PUT',
    url: '/my/cate/info',
    data
  })
}
// /my/cate/del
// 删除对应id的文章分类
export const reqDelArticle = (id) => {
  return http({
    method: 'DELETE',
    url: '/my/cate/del',
    params: { id }
  })
}
// /my/article/list
// 获取文章列表
export const reqGetArtList = (params) => {
  return http({
    method: 'GET',
    url: '/my/article/list',
    params

  })
}
// /my/article/info
// 删除文章
export const reqDelArt = (id) => {
  return http({
    method: 'DELETE',
    url: '/my/article/info',
    params: { id }

  })
}
export const reqLookArt = (id) => http({
  method: 'GET',
  url: '/my/article/info',
  params: { id }
})

export const reqPublish = (data) => http({
  method: 'post',
  url: '/my/article/add',
  data
})
