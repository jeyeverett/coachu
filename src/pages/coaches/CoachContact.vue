<template>
  <div v-if="isLoading">
    <BaseSpinner />
  </div>
  <BaseCard v-else-if="getCoach" style="display: flex; flex-direction: column;">
    <header>
      <h2>Contact {{ fullName }}</h2>
    </header>
    <transition>
      <h3 v-if="sentMessage">Message Sent!</h3>
    </transition>
    <form @submit.prevent="sendNewMessage">
      <FormInput
        type="text"
        id="email"
        label="Your Email"
        v-model.trim="email"
        :invalid="invalid.email"
        @input="validate"
      />
      <FormInput
        type="text"
        id="message"
        label="Message"
        v-model.trim="message"
        :invalid="invalid.message"
        @input="validate"
        :textarea="true"
      />

      <div>
        <BaseButton class="register">
          Send Message
        </BaseButton>
      </div>
    </form>
    <section style="textAlign: right; margin: 2rem;">
      <BaseButton :to="detailsLink" :link="true">Details</BaseButton>
    </section>
  </BaseCard>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import FormInput from '../../components/form/FormInput.vue';

export default {
  components: { FormInput },
  props: ['coachId'],
  data() {
    return {
      email: '',
      message: '',
      invalid: {
        email: null,
        message: null
      },
      sentMessage: false
    };
  },

  computed: {
    ...mapGetters('coaches', ['getCoaches']),
    ...mapGetters(['isLoading', 'isError']),
    getCoach() {
      const coach = this.getCoaches.find(coach => coach.id === this.coachId);
      return coach ? coach : undefined;
    },
    fullName() {
      return this.getCoach.firstName + ' ' + this.getCoach.lastName;
    },
    detailsLink() {
      return { name: 'coach', params: { coachId: this.coachId } };
    }
  },
  methods: {
    ...mapActions('messages', ['sendMessage']),
    validate({ target: { id, value } }) {
      if (id === 'email' && (!value.includes('@') || !value.includes('.'))) {
        this.invalid[id] = true;
        return;
      }

      this.invalid[id] = value === '';
    },
    sendNewMessage() {
      if (Object.values(this.invalid).includes(true)) return;

      this.sendMessage({
        coachId: this.coachId,
        email: this.email,
        message: this.message
      });

      this.sentMessage = true;

      setTimeout(() => {
        this.email = '';
        this.message = '';
        this.sentMessage = false;
        this.invalid.email = true;
        this.invalid.message = true;
      }, 2000);
    }
  },
  created() {
    setTimeout(() => {
      if (!this.getCoach) {
        this.$router.push({
          name: '404ResourceNotFound',
          params: { resource: 'coach' }
        });
      }
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
@import '/src/variables.scss';

form {
  width: 70%;

  @media screen and (max-width: 480px) {
    width: 100%;
  }

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
    input.invalid,
    textarea.invalid {
      border-bottom: 2px solid $color-error;
    }
  }

  .invalid-arrow {
    font-size: 3rem;
    line-height: 3rem;
    position: absolute;
    left: -3rem;
    color: $color-error;
  }

  button.invalid {
    background-color: $color-primary-light;
    color: white;
    cursor: not-allowed;
    &:hover {
      background-color: $color-primary-light;
    }
  }

  button.valid {
    background-color: $color-primary-dark;
    cursor: pointer;
  }
}

.v-enter-active {
  animation: errow 0.2s ease-in forwards;
}

.v-leave-active {
  animation: errow 0.2s ease-out reverse;
}
</style>
