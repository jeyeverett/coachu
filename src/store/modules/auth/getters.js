export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  tokenExpiry(state) {
    return state.tokenExpiry;
  },
  isLoggedIn(state) {
    return !!state.token;
  }
};
