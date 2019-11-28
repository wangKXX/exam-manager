export default {
  namespaced: true,
  state: {
    userTypeList: []
  },
  actions: {
    async _queryAllUserType({ rootState, commit}, params) {
      const { data } = await rootState.api.post('/api/queryAllUSerType', params);
      commit("SET_USER_TYPE_LIST", data.data);
      return data;
    },
    async _addUserType({ rootState }, params) {
      const res = await rootState.api.post('/api/addUserType', params);
      return res;
    },
    async _editeUserType({ rootState }, params) {
      const res = await rootState.api.post('/api/editeUserType', params);
      return res;
    },
    async _queryUserTypeBySubjectId({ rootState }, params) {
      const { data } = await rootState.api.post('/api/queryUserTypeBySubjectId', params);
      return data;
    }
  },
  mutations: {
    SET_USER_TYPE_LIST(state, list) {
      state.userTypeList = list;
    }
  },
  getters: {}
}