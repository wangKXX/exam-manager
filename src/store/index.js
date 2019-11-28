import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import index from './modules'
import choiceQuestion from './modules/choiceQuestion'
import subjectType from './modules/subjectType'
import userType from './modules/userType'
import axios from '../axios';
import subject from './modules/subject'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: axios
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    index,
    choiceQuestion,
    subjectType,
    userType,
    subject
  }
})
