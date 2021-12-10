import { reqGetuserInfo } from '@/api/user'
const state = {
  userInfo: {}
}
const mutations = {
  setUserInfo (state, value) {
    state.userInfo = value
  }
}

const actions = {
  async getuserInfo (context) {
    const { data } = await reqGetuserInfo()
    console.log(data)
    if (data.code === 0) {
      context.commit('setUserInfo', data.data)
    }
  }
}
const getters = {
  defaultImg (state) {
    return state.userInfo.username ? state.userInfo.username.slice(0, 1).toUpperCase() : ''
  }
}
export default {
  // namesplaced: true,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
