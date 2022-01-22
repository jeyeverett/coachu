<template>
  <form @submit.prevent="handleCoachForm" style="margin: 0 auto;">
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
      <div class="filters">
        <TagCheckbox
          v-model="coach.tags"
          :tag="tag"
          @change="validate"
          v-for="tag in tags"
          :key="tag"
        />
      </div>
      <transition mode="out-in">
        <ErrorIcon v-if="invalid.tags && invalid.tags !== null" />
        <CheckIcon v-else-if="!invalid.tags && invalid.tags !== null" />
      </transition>
    </fieldset>

    <transition mode="out-in">
      <div v-if="isLoading">
        <BaseSpinner />
      </div>
      <div v-else>
        <BaseButton style="marginTop: 2rem; width: 100%;" class="register">
          {{ editCoach ? 'Update' : 'Register' }}
        </BaseButton>
      </div>
    </transition>
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
        firstName: null,
        lastName: null,
        description: null,
        hourlyRate: null,
        tags: null,
        imageUrl: null
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
    ...mapActions(['loadingStart', 'loadingFinish', 'loadingError']),
    ...mapActions('coaches', ['registerCoach', 'updateCoach']),
    async validate({ target: { id, value } }) {
      console.log('debounce');

      if (id === 'hourlyRate') {
        this.invalid[id] = value < 1;
        return;
      }

      if (id === 'firstName' || id === 'lastName') {
        this.invalid[id] = value.length < 2;
        return;
      }

      if (id === 'description') {
        this.invalid[id] = value.length < 25;
        return;
      }

      if (id === 'imageUrl') {
        this.invalid[id] =
          value.length > 10 ? await this.isValidUrl(value) : false;
        return;
      }

      if (this.tags.includes(id)) {
        this.invalid.tags = this.coach.tags.length < 1;
        return;
      }
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
    },
    async isValidUrl(url) {
      console.log('here');
      try {
        const res = await fetch(url);
        const buff = await res.blob();
        return buff.type.startsWith('image/');
      } catch (err) {
        return false;
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
  max-width: 40rem;

  .form-control {
    margin: 1rem 0;
    position: relative;
  }
  .filters {
    display: flex;
    flex-direction: column;
    max-height: 140px;
    justify-content: center;
    flex-wrap: wrap;
    width: 80%;
    margin: 0 auto;

    @media screen and (max-width: 350px) {
      width: 90%;
    }

    span {
      margin-bottom: 1rem;
    }
  }
}
</style>
