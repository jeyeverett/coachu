<template>
  <base-card>
    <form @submit.prevent="addCoach">
      <div class="form-control">
        <label for="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          v-model.trim="coach.firstName"
          @input="validate"
          :class="{ invalid: invalid.firstName }"
        />
        <transition>
          <span class="invalid-arrow" v-show="invalid.firstName">&#8594;</span>
        </transition>
      </div>
      <div class="form-control">
        <label for="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          v-model.trim="coach.lastName"
          @input="validate"
          :class="{ invalid: invalid.lastName }"
        />
        <transition>
          <span class="invalid-arrow" v-show="invalid.lastName">&#8594;</span>
        </transition>
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model.trim="coach.description"
          @input="validate"
          :class="{ invalid: invalid.description }"
        />
        <transition>
          <span class="invalid-arrow" v-show="invalid.description"
            >&#8594;</span
          >
        </transition>
      </div>
      <div class="form-control">
        <label for="hourly">Hourly Rate</label>
        <input
          id="hourlyRate"
          type="number"
          v-model.number="coach.hourlyRate"
          min="1"
          @input="validate"
          :class="{ invalid: invalid.hourlyRate }"
        />
        <transition>
          <span class="invalid-arrow" v-show="invalid.hourlyRate">&#8594;</span>
        </transition>
      </div>
      <div>
        <h4>Specialties</h4>
        <div class="form-control__checkbox">
          <span class="form-control__checkbox--option">
            <label for="frontend">Frontend</label>
            <input
              type="checkbox"
              id="frontend"
              value="frontend"
              v-model="coach.areas"
            />
          </span>
          <span class="form-control__checkbox--option">
            <label for="backend">Backend</label>
            <input
              type="checkbox"
              id="backend"
              value="backend"
              v-model="coach.areas"
            />
          </span>
          <span class="form-control__checkbox--option">
            <label for="career">Career</label>
            <input
              type="checkbox"
              id="career"
              value="career"
              v-model="coach.areas"
            />
          </span>
          <transition>
            <span
              class="invalid-arrow"
              id="invalid-checkbox"
              v-show="invalid.specialty"
              >&#8594;</span
            >
          </transition>
        </div>
      </div>
      <base-button
        style="marginTop: 2rem; width: 100%;"
        :disabled="!isValid"
        class="register"
        :class="isValid ? 'valid' : 'invalid'"
      >
        Register
      </base-button>
    </form>
  </base-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      invalid: {
        firstName: false,
        lastName: false,
        description: false,
        hourlyRate: false,
        specialty: false
      },
      coach: {
        firstName: '',
        lastName: '',
        areas: [],
        description: '',
        hourlyRate: null
      }
    };
  },
  computed: {
    ...mapGetters(['userId']),
    isValid() {
      return !Object.values(this.invalid).includes(true);
    }
  },
  methods: {
    ...mapActions('coaches', ['registerCoach']),
    validate({ target: { id, value } }) {
      if (id === 'hourlyRate') {
        this.invalid[id] = value < 1;
        return;
      }

      if (value === '') {
        this.invalid[id] = true;
      } else {
        this.invalid[id] = false;
      }
    },
    addCoach() {
      this.registerCoach({ coach: this.coach });
      this.$router.replace('/coaches/' + this.userId);
    }
  },
  watch: {
    'coach.areas'(value) {
      if (value.length) {
        this.invalid.specialty = false;
      } else {
        this.invalid.specialty = true;
      }
    }
  },
  created() {
    setTimeout(
      () =>
        (this.invalid = {
          firstName: true,
          lastName: true,
          description: true,
          hourlyRate: true,
          specialty: true
        }),
      300
    );
  }
};
</script>

<style lang="scss" scoped>
@import '/src/variables.scss';

section {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

form {
  width: 50%;
  min-width: 40rem;

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

    &__checkbox {
      display: flex;
      justify-content: center;
      margin: 1rem 0;
      position: relative;

      span:not(:last-child) {
        margin-right: 2rem;
      }

      label {
        display: block;

        font-size: 1.4rem;
        font-weight: bold;
        margin-right: 5px;
      }

      &--option {
        display: flex;
        align-items: center;
      }
    }

    input.invalid,
    textarea.invalid {
      border-bottom: 2px solid orangered;
    }
  }

  .invalid-arrow {
    font-size: 3rem;
    line-height: 3rem;
    position: absolute;
    left: -3rem;
    color: orangered;
    &#invalid-checkbox {
      top: -0.75rem;
    }
  }

  .v-enter-active {
    animation: errow 0.2s ease-out forwards;
  }

  .v-leave-active {
    animation: errow 0.2s ease-out reverse;
  }

  @keyframes errow {
    0% {
      opacity: 0;
      transform: translateX(-30px);
    }

    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  button.invalid {
    background-color: $color-primary-light;
  }

  button.valid {
    background-color: $color-primary-dark;
  }
}
</style>
