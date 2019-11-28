export default {
  namespaced: true,
  state: {
    selectLabel: [
      'A',
      'B',
      'C',
      'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
      'Q'
    ]
  },
  actions: {
    async _querySubjectDetialByID({ rootState }, params) {
      const { data } = await rootState.api.post('/api/querySubjectDetialByID', params);
      return data;
    },
    async _createSubject({ rootState }, params) {
      const { data } = await rootState.api.post('/api/addSubject', params);
      return data;
    },
    async _deleteSubjectById({ rootState }, params) {
      const { data } = await rootState.api.post('/api/deleteSubjectById', params);
      return data;
    }
  },
  mutations: {},
  getters: {}
}