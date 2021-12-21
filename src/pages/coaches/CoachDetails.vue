<template>
  <router-view v-if="this.$route.path.includes('contact')" />
  <div v-else-if="isLoading">
    <BaseSpinner />
  </div>
  <BaseCard v-else-if="getCoach">
    <section class="coach-details">
      <img v-if="imageUrl" :src="imageUrl" alt="" width="50" height="50" />
      <h2>{{ fullName }}</h2>
      <p class="coach-details__rate">${{ rate }}/hour</p>
      <p class="coach-details__description">{{ description }}</p>
      <div class="coach-details__badges">
        <BaseBadge v-for="area in areas" :key="area">{{ area }}</BaseBadge>
      </div>
      <div class="coach-details__contact">
        <h3>Interested? Reach out Now!</h3>
        <BaseButton :to="contactLink" mode="register" :link="true">
          Contact
        </BaseButton>
      </div>
    </section>
  </BaseCard>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['coachId'],
  created() {
    setTimeout(() => {
      if (!this.getCoach) {
        this.$router.push({
          name: '404ResourceNotFound',
          params: { resource: 'coach' }
        });
      }
    }, 1000);
  },
  computed: {
    ...mapGetters('coaches', ['getCoaches']),
    getCoach() {
      const coach = this.getCoaches.find(coach => coach.id === this.coachId);
      return coach ? coach : undefined;
    },
    fullName() {
      return this.getCoach.firstName + ' ' + this.getCoach.lastName;
    },
    contactLink() {
      return { name: 'contact', params: { coachId: this.coachId } };
    },
    description() {
      return this.getCoach.description;
    },
    areas() {
      return this.getCoach.areas;
    },
    rate() {
      return this.getCoach.hourlyRate;
    },
    imageUrl() {
      return this.getCoach.imageUrl;
    },
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  height: 50px;
  border-radius: 100%;
  width: auto;
}
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
    margin-top: 2rem;

    h3 {
      margin: 0;
      margin-right: 2rem;
    }
  }
}
</style>
