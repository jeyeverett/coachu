export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  updateCoach(state, payload) {
    state.coaches = state.coaches.filter(coach => coach.id != payload.id);
    state.coaches.unshift(payload);
  },
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};
