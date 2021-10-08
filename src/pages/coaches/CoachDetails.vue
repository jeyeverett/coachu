<template>
  <router-view v-if="this.$route.path.includes('contact')" />
  <div v-else-if="isLoading">
    <base-spinner />
  </div>
  <base-card v-else>
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
import { mapGetters } from 'vuex';
export default {
  props: ['coachId'],
  // data() {
  //   return {
  //     isLoading: true
  //   };
  // },
  computed: {
    ...mapGetters('coaches', ['getCoaches']),
    getCoach() {
      return this.getCoaches.find(coach => coach.id === this.coachId);
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
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
  // methods: {
  //   ...mapActions('coaches', ['fetchCoaches']),
  //   loadCoaches() {
  //     this.isLoading = true;
  //     this.error = null;
  //     this.fetchCoaches()
  //       .then(() => {
  //         this.isLoading = false;
  //       })
  //       .catch(() => {
  //         this.isLoading = false;
  //         this.error = 'Network Error - please try again later.';
  //       });
  //   }
  // },
  // created() {
  //   this.loadCoaches();
  // },
  // watch: {
  //   coachId() {
  //     this.loadCoaches();
  //   }
  // }
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
