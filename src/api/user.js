import http from '@/utils/requst'
export const reqLogin = (data) => {
  return http({
    method: 'POST',
    url: '/api/login',
    data
  })
}
export const reqGetuserInfo = () => {
  return http({
    method: 'get',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('big-event')
    }
  })
}
