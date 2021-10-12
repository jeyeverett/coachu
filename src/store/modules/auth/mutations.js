export default {
  setCurrentUser(state, payload) {
    const { token, userId } = payload;
    state.didAutoSignOut = false;
    state.token = token;
    state.userId = userId;
  },
  setAutoSignOut(state) {
    state.didAutoSignOut = true;
  }
};
