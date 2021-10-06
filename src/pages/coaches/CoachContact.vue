<template>
  <base-card v-if="!isLoading">
    <h2>{{ fullName }}</h2>
    <section>
      <base-button :to="detailsLink" :link="true">Details</base-button>
    </section>
  </base-card>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ['coachId'],
  data() {
    return {
      coach: null,
      isLoading: false
    };
  },
  computed: {
    fullName() {
      return this.coach.firstName + ' ' + this.coach.lastName;
    },
    detailsLink() {
      return { name: 'coach', params: { coachId: this.coachId } };
    }
  },
  methods: {
    ...mapActions('coaches', ['getCoach']),
    loadCoach(id) {
      this.isLoading = true;
      this.getCoach({ coachId: id }).then(coach => {
        this.coach = coach;
        this.isLoading = false;
      });
    }
  },
  created() {
    this.loadCoach(this.coachId);
  },
  watch: {
    coachId(newCoachId) {
      this.loadCoach(newCoachId);
    }
  }
};
</script>
