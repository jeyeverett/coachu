export default {
  addCoach(state, payload) {
    console.log(payload);
    state.coaches.push(payload);
    console.log(state);
  }
};
