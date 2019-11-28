export default {
  namespaced: true,
  state: {
    subjectList: []
  },
  mutations: {
    SET_SUBJECT_LIST(state, list) {
      state.subjectList = list;
    }
  },
  actions: {
    async _queryAllSubject({ rootState, commit }, params) {
      const { data } = await rootState.api.post('/api/queryAllSubject', params);
      commit("SET_SUBJECT_LIST", data.data);
      return data;
    },
    async _createSubject({ rootState }, params) {
      const res = await rootState.api.post('/api/createSubject', params);
      return res;
    },
    async _editeSubject({ rootState }, params) {
      const res = await rootState.api.post('/api/editeSubject', params);
      return res;
    }
  },
  getters:{}
}