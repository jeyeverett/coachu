export default {
  getCoaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    return getters.getCoaches.some(coach => coach.id === rootGetters.userId);
  },
  shouldFetchNew(state) {
    const { lastFetch } = state;
    if (!lastFetch) return true;

    const currentTimestamp = new Date().getTime();
    return (currentTimestamp - lastFetch) / 1000 > 60;
  },
  getTags(state) {
    return state.tags;
  }
};
