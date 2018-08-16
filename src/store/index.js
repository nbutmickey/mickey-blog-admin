import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getter'
import mutations from './mutation'
import state from './state'

Vue.use(Vuex);
export default new Vuex.Store({
  getters,
  mutations,
  state
});

