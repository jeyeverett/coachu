<template>
  <form @submit.prevent="handleCoachForm">
    <FormInput
      type="text"
      id="firstName"
      label="First Name"
      v-model.trim="coach.firstName"
      :invalid="invalid.firstName"
      @input="validate"
    />
    <FormInput
      type="text"
      id="lastName"
      label="Last Name"
      v-model.trim="coach.lastName"
      :invalid="invalid.lastName"
      @input="validate"
    />
    <FormInput
      type="text"
      id="imageUrl"
      label="Image URL"
      v-model.trim="coach.imageUrl"
      :invalid="invalid.imageUrl"
      @input="validate"
    />
    <FormInput
      type="text"
      id="description"
      label="Description"
      :textarea="true"
      v-model.trim="coach.description"
      :invalid="invalid.description"
      @input="validate"
    />

    <FormInput
      type="number"
      id="hourlyRate"
      label="Hourly Rate"
      v-model.trim="coach.hourlyRate"
      :invalid="invalid.hourlyRate"
      @input="validate"
    />

    <fieldset style="position: relative;">
      <legend>
        Specialties
      </legend>
      <div class="form-control__checkbox">
        <TagCheckbox
          v-model="coach.tags"
          :tag="tag"
          class="form-control__checkbox--option"
          @change="validate"
          v-for="tag in tags"
          :key="tag"
        />
      </div>
      <transition mode="out-in">
        <ErrorIcon v-if="invalid.tags" />
        <CheckIcon v-else />
      </transition>
    </fieldset>
    <div v-if="isLoading">
      <BaseSpinner />
    </div>
    <div v-else>
      <BaseButton style="marginTop: 2rem; width: 100%;" class="register">
        {{ editCoach ? 'Update' : 'Register' }}
      </BaseButton>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TagCheckbox from '../form/TagCheckbox.vue';
import FormInput from '../form/FormInput.vue';
import ErrorIcon from '../icons/ErrorIcon.vue';
import CheckIcon from '../icons/CheckIcon.vue';

export default {
  components: { TagCheckbox, FormInput, ErrorIcon, CheckIcon },
  props: {
    editCoach: {
      type: Object,
      required: false
    }
  },
  created() {
    if (this.editCoach) {
      this.coach = { ...this.editCoach, tags: this.coach.tags };
      Object.keys(this.coach).forEach(field => {
        if (field === 'tags') return;
        this.validate({ target: { id: field } });
      });
    }
  },
  data() {
    return {
      invalid: {
        firstName: true,
        lastName: true,
        description: true,
        hourlyRate: true,
        tags: true,
        imageUrl: true
      },
      coach: {
        firstName: '',
        lastName: '',
        tags: [],
        description: '',
        hourlyRate: null,
        imageUrl: ''
      },
      enableButton: false
    };
  },
  computed: {
    ...mapGetters(['userId', 'isLoading', 'isError']),
    ...mapGetters('coaches', ['getTags']),
    tags() {
      return this.getTags;
    }
  },
  methods: {
    ...mapActions('coaches', ['registerCoach', 'updateCoach']),
    ...mapActions(['loadingStart', 'loadingFinish', 'loadingError']),
    validate({ target: { id, value } }) {
      if (id === 'hourlyRate') {
        this.invalid[id] = value < 1;
        return;
      }

      if (this.tags.includes(id)) {
        this.invalid.tags = this.coach.tags.length < 1;
        return;
      }

      return (this.invalid[id] = value === '');
    },
    async handleCoachForm() {
      if (Object.values(this.invalid).includes(true)) return;

      this.loadingStart();
      try {
        if (this.editCoach) {
          await this.updateCoach({ coach: this.coach });
        } else {
          await this.registerCoach({ coach: this.coach });
        }
        this.loadingFinish();
        this.$router.replace('/coaches/' + this.userId);
      } catch (error) {
        this.loadingFinish();
        this.loadingError(error);
      }
    }
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

    &__checkbox {
      display: flex;
      flex-direction: column;
      max-height: 8rem;
      flex-wrap: wrap;
      justify-items: center;
      margin: 1rem 0;
      padding-left: 20px;

      &--option {
        display: flex;
        align-items: center;
        &:not(:last-child) {
          margin-bottom: 1rem;
        }
      }
    }
  }
}
</style>
