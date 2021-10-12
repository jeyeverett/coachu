<template>
  <section>
    <h1 style="textAlign: center;">Sign-in / Sign-up</h1>
    <base-card style="margin: 0 auto;">
      <form @submit.prevent>
        <div class="form-control">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model.trim="user.email"
            :class="{ invalid: invalid.email }"
            @input="validate"
          />
          <transition>
            <span class="invalid-arrow" v-show="invalid.email">&#8594;</span>
          </transition>
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model.trim="user.password"
            :class="{ invalid: invalid.password }"
            @input="validate"
          />
          <transition>
            <span class="invalid-arrow" v-show="invalid.password">&#8594;</span>
          </transition>
        </div>
        <div v-if="isLoading">
          <base-spinner />
        </div>
        <div v-else>
          <base-button
            id="signin"
            style="marginTop: 2rem; width: 100%;"
            :disabled="!enableButton"
            mode="register"
            :class="enableButton ? 'valid' : 'invalid'"
            @click="submitForm"
            >Sign-in</base-button
          >
          <p
            style="marginTop: 2rem; width: 100%; textAlign: center; fontSize: 1.2rem; fontWeight: bold;"
          >
            OR
          </p>
          <base-button
            id="signup"
            type="button"
            style="marginTop: 2rem; width: 100%;"
            :disabled="!enableButton"
            :class="enableButton ? '' : 'invalid'"
            @click="submitForm"
            >Sign-up</base-button
          >
          <transition name="error">
            <div class="inline-error" v-if="isError">{{ isError }}</div>
          </transition>
        </div>
      </form>
    </base-card>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      invalid: {
        email: false,
        password: false
      },
      user: {
        email: '',
        password: ''
      },
      enableButton: false
    };
  },
  computed: {
    ...mapGetters(['isLoading', 'isError'])
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
      try {
        this.loadingStart();
        await this.authenticate({ user: this.user, id });
        this.user.email = '';
        this.user.password = '';
        this.loadingFinish();
        this.$router.replace('/coaches');
      } catch (error) {
        this.loadingFinish();
        this.loadingError(error);
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
  },
  created() {
    setTimeout(
      () =>
        (this.invalid = {
          email: true,
          password: true
        }),
      300
    );
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
