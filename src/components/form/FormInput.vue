<template>
  <div class="form-control">
    <label :for="id">{{ label }}</label>
    <input
      v-bind="$attrs"
      :id="id"
      :placeholder="label"
      :class="{ invalid }"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :aria-describedby="invalid ? `${id}-invalid` : null"
      :aria-invalid="invalid ? true : null"
    />
    <transition mode="out-in">
      <ErrorIcon v-if="invalid" :id="`${id}-invalid`" />
      <CheckIcon v-else />
    </transition>
  </div>
</template>

<script>
import ErrorIcon from '../icons/ErrorIcon.vue';
import CheckIcon from '../icons/CheckIcon.vue';
export default {
  components: { ErrorIcon, CheckIcon },
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    invalid: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import '/src/variables.scss';

.form-control {
  margin: 1rem 0;
  position: relative;

  input,
  textarea {
    padding: 1rem;
    width: 100%;
    border-radius: 2px;
    border: $border;
    border-bottom: 2px solid $color-check;
  }

  input.invalid,
  textarea.invalid {
    border-bottom: 2px solid $color-error;
  }

  textarea {
    resize: none;
    font-family: inherit;
  }

  label {
    font-size: 1.4rem;
    font-weight: bold;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

.v-enter-active {
  animation: errow 0.2s ease-out forwards;
}

.v-leave-active {
  animation: errow 0.2s ease-out reverse;
}
</style>
