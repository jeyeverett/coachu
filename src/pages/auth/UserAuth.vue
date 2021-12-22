<template>
  <section>
    <h1 style="textAlign: center; margin-bottom: 30px;">Sign-in / Sign-up</h1>
    <form @submit.prevent style="margin: 0 auto;">
      <FormInput
        type="email"
        id="email"
        label="Email"
        v-model.trim="user.email"
        :invalid="invalid.email"
        @input="validate"
      />
      <FormInput
        type="password"
        id="password"
        label="Password"
        v-model.trim="user.password"
        :invalid="invalid.password"
        @input="validate"
      />
      <div v-if="isLoading">
        <BaseSpinner />
      </div>
      <div v-else>
        <BaseButton
          id="signin"
          style="marginTop: 2rem; width: 100%;"
          :disabled="!enableButton"
          mode="register"
          :class="enableButton ? 'valid' : 'invalid'"
          @click="submitForm"
        >
          Sign in
        </BaseButton>
        <p
          style="marginTop: 2rem; width: 100%; textAlign: center; fontSize: 1.2rem; fontWeight: bold;"
        >
          OR
        </p>
        <BaseButton
          id="signup"
          type="button"
          style="marginTop: 2rem; width: 100%;"
          :disabled="!enableButton"
          :class="enableButton ? '' : 'invalid'"
          @click="submitForm"
        >
          Sign up
        </BaseButton>
        <transition name="error">
          <div class="inline-error" v-if="isError">{{ isError }}</div>
        </transition>
      </div>
    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FormInput from '../../components/form/FormInput.vue';
export default {
  components: { FormInput },
  data() {
    return {
      invalid: {
        email: true,
        password: true
      },
      user: {
        email: '',
        password: ''
      },
      enableButton: false
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'isError']),
    ...mapGetters('coaches', ['getCoach'])
  },
  methods: {
    ...mapActions([
      'authenticate',
      'loadingStart',
      'loadingFinish',
      'loadingError'
    ]),
    validate({ target: { id, value } }) {
      if (id === 'email' && (!value.includes('@') || !value.includes('.'))) {
        this.invalid[id] = true;
        return;
      }
      this.invalid[id] = value === '' || value.length < 6;
    },
    async submitForm({ target: { id } }) {
      const { redirect } = this.$route.query;
      try {
        this.loadingStart();
        await this.authenticate({ user: this.user, id });
        this.user.email = '';
        this.user.password = '';
        this.loadingFinish();
        this.$router.replace(
          redirect && !this.getCoach ? '/register' : '/coaches'
        );
      } catch (error) {
        this.loadingFinish();
        this.loadingError(
          error.message || 'Network error - please try again later.'
        );
      }
    }
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
  width: 50%;
  min-width: 40rem;

  .form-control {
    margin: 1rem 0;
    position: relative;

    input {
      padding: 1rem;
      width: 100%;
      border-radius: $border-radius;
      border: $border;
      border-bottom: 2px solid green;
    }

    label {
      font-size: 1.4rem;
      font-weight: bold;
    }

    input.invalid {
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

  .v-enter-active {
    animation: errow 0.2s ease-out forwards;
  }

  .v-leave-active {
    animation: errow 0.2s ease-out reverse;
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
</style>
