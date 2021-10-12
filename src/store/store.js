import { createStore } from 'vuex';
import coachesModule from './modules/coaches/index';
import requestsModule from './modules/requests/index';

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule
  },
  state() {
    return {
      userId: 'b3',
      isLoading: true,
      error: null
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    isLoading(state) {
      return state.isLoading;
    },
    isError(state) {
      return state.error;
    }
  },
  mutations: {
    setLoading(state, loading) {
      state.isLoading = loading;
    },
    setError(state, error) {
      state.error = error;
    }
  },
  actions: {
    loadingStart(context) {
      context.commit('setLoading', true);
    },
    loadingFinish(context) {
      context.commit('setLoading', false);
    },
    loadingError(context, error) {
      context.commit('setError', error);
    },
    loadCoaches(context, payload) {
      context.dispatch('loadingStart');
      context.dispatch('loadingError', null);
      this.dispatch('coaches/fetchCoaches', payload)
        .then(() => {
          context.dispatch('loadingFinish');
        })
        .catch(() => {
          context.dispatch('loadingFinish');
          context.dispatch(
            'loadingError',
            'Network Error - please try again later.'
          );
        });
    }
  }
});

export default store;
