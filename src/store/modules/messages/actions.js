export default {
  async sendMessage(context, payload) {
    const { email, message, coachId } = payload;
    const newMessage = {
      email,
      message
    };

    const response = await fetch(
      `https://coachu-71b4b-default-rtdb.firebaseio.com/messages/${coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newMessage)
      }
    );

    if (!response.ok) {
      const error = new Error('Network error - Failed to send message.');
      throw error;
    }

    const data = response.json();

    context.commit('addMessage', { ...newMessage, coachId, id: data.name });
  },
  async fetchMessages(context) {
    const { userId, token } = context.rootGetters;

    const response = await fetch(
      `https://coachu-71b4b-default-rtdb.firebaseio.com/messages/${userId}.json?auth=${token}`
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(
        response.message || 'Network error - Failed to retrieve messages.'
      );
      throw error;
    }

    const messages = [];

    for (const key in data) {
      messages.push({ ...data[key], id: key });
    }

    context.commit('setMessages', messages);
  }
};
