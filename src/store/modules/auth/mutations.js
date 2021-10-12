export default {
  setCurrentUser(state, payload) {
    const { token, userId, tokenExpiry } = payload;
    state.token = token;
    state.userId = userId;
    state.tokenExpiry = tokenExpiry;
  }
};
