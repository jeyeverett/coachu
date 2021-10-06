export default {
  async getCoach(context, payload) {
    const coaches = await context.getters.getCoaches;
    return coaches.find(coach => coach.id === payload.coachId);
  },
  addCoach(context, payload) {
    context.dispatch('addCoach', payload);
  }
};
