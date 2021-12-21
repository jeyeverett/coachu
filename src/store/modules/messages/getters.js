export default {
  getMessages(state) {
    return state.messages;
  },
  hasMessages(state) {
    return state.messages.length > 0;
  }
};
