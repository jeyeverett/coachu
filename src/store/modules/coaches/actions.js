export default {
  async fetchCoaches(context) {
    const response = await fetch(
      `https://coachu-71b4b-default-rtdb.firebaseio.com/coaches.json`
    );

    if (!response.ok) {
      const error = new Error('Failed to fetch data!');
      throw error;
    }

    const data = await response.json();

    const coaches = [];

    for (const key in data) {
      coaches.push({ ...data[key], id: key });
    }

    context.commit('setCoaches', coaches);
  },
  async registerCoach(context, data) {
    const { userId } = context.rootGetters;
    const response = await fetch(
      `https://coachu-71b4b-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(data.coach)
      }
    );

    if (!response.ok) {
      throw new Error('Failed to save to database!');
    }

    context.commit('registerCoach', { ...data.coach, id: userId });
  }
};
