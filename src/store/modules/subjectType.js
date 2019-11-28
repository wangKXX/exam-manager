export default {
  namespaced: true,
  state: {
    subjectTypeList: [],
    subjectList: []
  },
  mutations: {
    SET_SUBJECT_TYPE(state, list) {
      state.subjectTypeList = list;
    },
    SET_SUBJECT_LIST(state, list) {
      state.subjectList = list;
    }
  },
  actions: {
    async _addSubject({ rootState }, params) {
      const res = await rootState.api.post('/api/addSubjectType', params);
      console.log(res);
    },
    async _queryAllSubject({ rootState, commit }, params) {
      const { data } = await rootState.api.post('/api/getExmNet', params);
      commit("SET_SUBJECT_LIST", data.data);
      return data;
    },
    async _queryAllSubjectType({ rootState, commit }, params) {
      const { data } = await rootState.api.post('/api/queryAllSubjectType', params);
      commit("SET_SUBJECT_TYPE", data.data);
      return data;
    },
    async _deleteSubjectTypeById({ rootState }, params) {
      const res = await rootState.api.post('/api/deleteSubjectTypeById', params);
      return res;
    },
    async _editeSubject({ rootState }, params) {
      const res = await rootState.api.post('/api/editeSubject', params);
      return res;
    }
  },
  getters: {}
}