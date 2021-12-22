export default {
  async fetchCoaches(context, payload) {
    if (payload && !payload.refresh && !context.getters.shouldFetchNew) return;

    const response = await fetch(
      `https://coachu-71b4b-default-rtdb.firebaseio.com/coaches.json`
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error('Failed to fetch data!');
      throw error;
    }

    const coaches = [];

    for (const key in data) {
      coaches.push({ ...data[key], id: key });
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
    context.dispatch('loadingFinish', null, { root: true });
  },
  async registerCoach(context, data) {
    const { userId, token } = context.rootGetters;

    const response = await fetch(
      `https://coachu-71b4b-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          ...data.coach,
          createdAt: Date.now(),
          updatedAt: Date.now()
        })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to save to database!');
    }

    context.commit('registerCoach', {
      ...data.coach,
      id: userId
    });
  },
  async updateCoach(context, data) {
    const { userId, token } = context.rootGetters;

    const response = await fetch(
      `https://coachu-71b4b-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          ...data.coach,
          updatedAt: Date.now()
        })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to save to database!');
    }

    context.commit('updateCoach', {
      ...data.coach,
      id: userId
    });
  }
};
