export default {
  async sendRequest(context, payload) {
    const { email, message, coachId } = payload;
    const newRequest = {
      email,
      message
    };

    const response = await fetch(
      `https://coachu-71b4b-default-rtdb.firebaseio.com/requests/${coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    );

    if (!response.ok) {
      const error = new Error('Network error - Failed to send request.');
      throw error;
    }

    const data = response.json();

    context.commit('addRequest', { ...newRequest, coachId, id: data.name });
  },
  async fetchRequests(context) {
    const { userId } = context.rootGetters;
    const response = await fetch(
      `https://coachu-71b4b-default-rtdb.firebaseio.com/requests/${userId}.json`
    );

    if (!response.ok) {
      const error = new Error(
        response.message || 'Network error - Failed to retrieve requests.'
      );
      throw error;
    }

    const data = await response.json();

    const requests = [];

    for (const key in data) {
      requests.push({ ...data[key], id: key });
    }

    context.commit('setRequests', requests);
  }
};
