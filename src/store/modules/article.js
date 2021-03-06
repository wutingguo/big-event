import { reqGetArticle } from '@/api/article'

const state = {
  ArticleList: []
}
const mutations = {
  setArticleList (state, value) {
    state.ArticleList = value
  }

}

const actions = {
  async getArticleList (context) {
    const { data } = await reqGetArticle()
    // console.log(data)
    if (data.code === 0) {
      context.commit('setArticleList', data.data)
    }
  }

}

export default {
  // namesplaced: true,
  namespaced: true,
  state,
  mutations,
  actions
  // getters
}
