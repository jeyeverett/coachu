import mutations from './mutations';
import getters from './getters';
import actions from './actions';
import tagList from './tags.json';

export default {
  namespaced: true,
  state() {
    return {
      tags: tagList.tags,
      coaches: [],
      lastFetch: null
    };
  },
  mutations,
  getters,
  actions
};
