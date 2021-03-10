import Vue from 'vue'
import Vuex from 'vuex'
import weather from './weatherModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { weather }
})
