import http from '@/utils/requst'
export const reqGetArticle = () => {
  return http({
    method: 'GET',
    url: '/my/cate/list'
  })
}
export const reqAddArticle = (data) => {
  return http({
    method: 'POST',
    url: '/my/cate/add',
    data
  })
}
export const reqChangeArticle = (id) => {
  return http({
    method: 'PUT',
    url: '/my/cate/info',
    params: id
  })
}
