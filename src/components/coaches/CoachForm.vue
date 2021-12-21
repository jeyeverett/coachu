<template>
  <form @submit.prevent="addCoach">
    <div class="form-control">
      <label for="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        v-model.trim="coach.firstName"
        :class="{ invalid: invalid.firstName }"
        @input="validate"
      />
      <transition>
        <span class="invalid-arrow" v-show="invalid.firstName">&#8594;</span>
      </transition>
    </div>
    <div class="form-control">
      <label for="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        v-model.trim="coach.lastName"
        :class="{ invalid: invalid.lastName }"
        @input="validate"
      />
      <transition>
        <span class="invalid-arrow" v-show="invalid.lastName">&#8594;</span>
      </transition>
    </div>
    <div class="form-control">
      <label for="imageUrl">Image URL</label>
      <input
        type="url"
        id="imageUrl"
        v-model.trim="coach.imageUrl"
        :class="{ invalid: invalid.imageUrl }"
        @input="validate"
      />
      <transition>
        <span class="invalid-arrow" v-show="invalid.imageUrl">&#8594;</span>
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
        <span class="invalid-arrow" v-show="invalid.description">&#8594;</span>
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
      <h4 style="position: relative;">
        Specialties
        <transition>
          <span
            class="invalid-arrow"
            id="invalid-checkbox"
            v-show="invalid.specialty"
            >&#8594;</span
          >
        </transition>
      </h4>
      <div class="form-control__checkbox">
        <span class="form-control__checkbox--option">
          <input
            type="checkbox"
            id="react"
            value="react"
            v-model="coach.areas"
          />
          <label for="react">React</label>
        </span>
        <span class="form-control__checkbox--option">
          <input type="checkbox" id="vue" value="vue" v-model="coach.areas" />
          <label for="vue">Vue</label>
        </span>
        <span class="form-control__checkbox--option">
          <input
            type="checkbox"
            id="angular"
            value="angular"
            v-model="coach.areas"
          />
          <label for="angular">Angular</label>
        </span>
        <span class="form-control__checkbox--option">
          <input type="checkbox" id="css" value="css" v-model="coach.areas" />
          <label for="css">CSS</label>
        </span>
        <span class="form-control__checkbox--option">
          <input type="checkbox" id="html" value="html" v-model="coach.areas" />
          <label for="html">HTML</label>
        </span>
        <span class="form-control__checkbox--option">
          <input
            type="checkbox"
            id="cloud"
            value="cloud"
            v-model="coach.areas"
          />
          <label for="cloud">Cloud</label>
        </span>
        <span class="form-control__checkbox--option">
          <input
            type="checkbox"
            id="frontend"
            value="frontend"
            v-model="coach.areas"
          />
          <label for="frontend">Frontend</label>
        </span>
        <span class="form-control__checkbox--option">
          <input
            type="checkbox"
            id="backend"
            value="backend"
            v-model="coach.areas"
          />
          <label for="backend">Backend</label>
        </span>
        <span class="form-control__checkbox--option">
          <input
            type="checkbox"
            id="career"
            value="career"
            v-model="coach.areas"
          />
          <label for="career">Career</label>
        </span>
      </div>
    </div>
    <div v-if="isLoading">
      <BaseSpinner />
    </div>
    <div v-else>
      <BaseButton
        style="marginTop: 2rem; width: 100%;"
        :disabled="!enableButton"
        class="register"
        :class="enableButton ? 'valid' : 'invalid'"
      >
        Register
      </BaseButton>
    </div>
  </form>
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
        specialty: false,
        imageUrl: false
      },
      coach: {
        firstName: '',
        lastName: '',
        areas: [],
        description: '',
        hourlyRate: null,
        imageUrl: ''
      },
      enableButton: false
    };
  },
  computed: {
    ...mapGetters(['userId', 'isLoading', 'isError'])
  },
  methods: {
    ...mapActions('coaches', ['registerCoach']),
    ...mapActions(['loadingStart', 'loadingFinish', 'loadingError']),
    validate({ target: { id, value } }) {
      if (id === 'hourlyRate') {
        this.invalid[id] = value < 1;
        return;
      }

      this.invalid[id] = value === '';
    },
    async addCoach() {
      this.loadingStart();
      try {
        await this.registerCoach({ coach: this.coach });
        this.loadingFinish();
        this.$router.replace('/coaches/' + this.userId);
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
    },
    'coach.areas'(value) {
      this.invalid.specialty = !value.length;
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
          specialty: true,
          imageUrl: true
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
      font-family: inherit;
    }

    label {
      font-size: 1.4rem;
      font-weight: bold;
    }

    &__checkbox {
      display: flex;
      flex-direction: column;
      max-height: 8rem;
      flex-wrap: wrap;
      justify-items: center;
      margin: 1rem 0;

      label {
        display: block;
        line-height: 1.4rem;
        font-size: 1.4rem;
        font-weight: bold;
        margin-left: 5px;
      }

      &--option {
        display: flex;
        align-items: center;
        &:not(:last-child) {
          margin-bottom: 1rem;
        }
      }
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
