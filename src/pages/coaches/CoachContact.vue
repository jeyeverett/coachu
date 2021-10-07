<template>
  <base-card v-if="!isLoading" style="display: flex; flex-direction: column;">
    <h2>Contact {{ fullName }}</h2>
    <form>
      <div class="form-control">
        <label for="email">Your e-mail</label>
        <input type="email" id="email" />
      </div>
      <div class="form-control">
        <label for="message">Message</label>
        <textarea id="message" rows="5"></textarea>
      </div>
      <div class="actons">
        <base-button>Send Message</base-button>
      </div>
    </form>
    <section style="textAlign: right; margin: 2rem;">
      <base-button :to="detailsLink" :link="true" mode="ghost"
        >Details</base-button
      >
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

<style lang="scss" scoped>
@import '/src/variables.scss';

form {
  width: 70%;
  min-width: 50rem;
  .form-control {
    margin: 1rem 0;
    position: relative;

    input,
    textarea {
      padding: 1rem;
      width: 100%;
      border-radius: $border-radius;
      border: $border;
      border-bottom: 2px solid green;
    }

    textarea {
      resize: none;
    }

    label {
      font-size: 1.4rem;
      font-weight: bold;
    }
  }
}
</style>
