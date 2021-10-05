import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      coaches: [
        {
          id: 'c1',
          firstName: 'Jeysen',
          lastName: 'Freedman',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Jeysen and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30
        },
        {
          id: 'c2',
          firstName: 'Joe',
          lastName: 'Baloney',
          areas: ['frontend', 'career'],
          description:
            'I am Joe and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30
        }
      ]
    };
  },
  mutations,
  getters,
  actions
};
