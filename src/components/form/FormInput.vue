<template>
  <div class="form-control">
    <label :for="id">{{ label }}</label>
    <input
      v-bind="$attrs"
      v-if="!textarea"
      :id="id"
      :placeholder="label"
      :class="{
        invalid: invalid && invalid !== null,
        valid: !invalid && invalid !== null
      }"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :aria-describedby="invalid ? `${id}-invalid` : null"
      :aria-invalid="invalid ? true : null"
    />
    <textarea
      v-bind="$attrs"
      v-else
      :id="id"
      :placeholder="label"
      :class="{
        invalid: invalid && invalid !== null,
        valid: !invalid && invalid !== null
      }"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :aria-describedby="invalid ? `${id}-invalid` : null"
      :aria-invalid="invalid ? true : null"
    />
    <transition mode="out-in">
      <ErrorIcon v-if="invalid && invalid !== null" :id="`${id}-invalid`" />
      <CheckIcon v-else-if="!invalid && invalid !== null" />
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
    },
    textarea: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import '/src/variables.scss';

.form-control {
  margin: 1rem 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  /* @media screen and (max-width: 580px) {
    width: 75%;
  } */

  input,
  textarea {
    padding: 1rem;
    padding-right: 3.5rem;
    border-radius: 2px;
    border: $border;
    border-bottom: 2px solid;
    margin-top: 5px;
    display: flex;
    width: 100%;
  }

  input.invalid,
  textarea.invalid {
    border-bottom: 2px solid $color-error;
  }

  input.valid,
  textarea.valid {
    border-bottom: 2px solid $color-check;
  }

  textarea {
    resize: none;
    font-family: inherit;
  }

  label {
    font-size: 1.4rem;
    font-weight: bold;
    text-align: left;
    width: 100%;
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

textarea::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

textarea::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

textarea::-webkit-scrollbar-thumb {
  background-color: rgba(24, 24, 27, 0.7);
  border-radius: 1px;
}

.v-enter-active {
  animation: errow 0.2s ease-out forwards;
}

.v-leave-active {
  animation: errow 0.2s ease-out reverse;
}
</style>
