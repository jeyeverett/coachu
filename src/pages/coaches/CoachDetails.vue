<template>
  <router-view v-if="this.$route.path.includes('contact')"></router-view>
  <base-card v-else-if="!isLoading">
    <section class="coach-details">
      <h2>{{ fullName }}</h2>
      <p class="coach-details__description">{{ description }}</p>
      <p class="coach-details__rate">${{ rate }}/hour</p>
      <div class="coach-details__badges">
        <base-badge v-for="area in areas" :key="area">{{ area }}</base-badge>
      </div>
      <div class="coach-details__contact">
        <h3>Interested? Reach out Now!</h3>
        <base-button :to="contactLink" mode="ghost" :link="true"
          >Contact</base-button
        >
      </div>
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
    contactLink() {
      return { name: 'contact', params: { coachId: this.coachId } };
    },
    description() {
      return this.coach.description;
    },
    areas() {
      return this.coach.areas;
    },
    rate() {
      return this.coach.hourlyRate;
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

<style lang="scss" scoped>
h2 {
  font-size: 2.4rem;
}
.coach-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__description {
    font-size: 1.4rem;
    width: 75%;
    margin-top: 1rem;
  }

  &__rate {
    font-size: 1.6rem;
    font-weight: bold;
    width: 75%;
    text-align: right;
    margin-top: 1rem;
  }

  &__badges {
    display: flex;
    flex-wrap: wrap;
    margin: 1rem 0;
  }

  &__contact {
    display: flex;
    align-items: center;

    h3 {
      margin: 0;
      margin-right: 2rem;
    }
  }
}
</style>
