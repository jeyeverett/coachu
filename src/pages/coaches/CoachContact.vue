<template>
  <div v-if="isLoading">
    <base-spinner />
  </div>
  <base-card v-else style="display: flex; flex-direction: column;">
    <header>
      <h2>Contact {{ fullName }}</h2>
    </header>
    <transition>
      <h3 v-if="sentMessage">Message Sent!</h3>
    </transition>
    <form @submit.prevent="sendMessage">
      <div class="form-control">
        <label for="email">Your e-mail</label>
        <input
          type="email"
          id="email"
          v-model="email"
          :class="{ invalid: invalid.email }"
          @input="validate"
        />
        <transition>
          <span
            class="invalid-arrow"
            id="invalid-checkbox"
            v-show="invalid.email"
            >&#8594;</span
          >
        </transition>
      </div>
      <div class="form-control">
        <label for="message">Message</label>
        <textarea
          id="message"
          rows="5"
          v-model="message"
          :class="{ invalid: invalid.message }"
          @input="validate"
        />
        <transition>
          <span
            class="invalid-arrow"
            id="invalid-checkbox"
            v-show="invalid.message"
            >&#8594;</span
          >
        </transition>
      </div>
      <div>
        <base-button
          :disabled="!enableButton"
          class="register"
          :class="enableButton ? 'valid' : 'invalid'"
        >
          Send Message
        </base-button>
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
import { mapGetters, mapActions } from 'vuex';
export default {
  props: ['coachId'],
  data() {
    return {
      email: '',
      message: '',
      invalid: {
        email: false,
        message: false
      },
      sentMessage: false,
      enableButton: false
    };
  },
  computed: {
    ...mapGetters('coaches', ['getCoaches']),
    ...mapGetters(['isLoading', 'isError']),
    getCoach() {
      return this.getCoaches.find(coach => coach.id === this.coachId);
    },
    fullName() {
      return this.getCoach.firstName + ' ' + this.getCoach.lastName;
    },
    detailsLink() {
      return { name: 'coach', params: { coachId: this.coachId } };
    }
  },
  methods: {
    ...mapActions('requests', ['sendRequest']),
    validate({ target: { id, value } }) {
      if (id === 'email' && (!value.includes('@') || !value.includes('.'))) {
        this.invalid[id] = true;
        return;
      }

      this.invalid[id] = value === '';
    },
    sendMessage() {
      if (this.email === '' || this.message === '') return;

      this.sendRequest({
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
    setTimeout(
      () =>
        (this.invalid = {
          email: true,
          message: true
        }),
      300
    );
  },
  watch: {
    invalid: {
      handler: function(val) {
        this.enableButton = !Object.values(val).includes(true);
      },
      deep: true
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
  }

  button.valid {
    background-color: $color-primary-dark;
  }
}

.v-enter-active {
  animation: errow 0.2s ease-in forwards;
}

.v-leave-active {
  animation: errow 0.2s ease-out reverse;
}
</style>
