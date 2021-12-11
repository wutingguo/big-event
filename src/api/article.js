import http from '@/utils/requst'
export const reqGetArticle = () => {
  return http({
    method: 'GET',
    url: '/my/cate/list'
  })
}
