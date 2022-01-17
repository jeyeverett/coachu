<template>
  <fieldset>
    <label :for="tag" class="tag-container">
      <input
        type="checkbox"
        :id="tag"
        :value="tag"
        @change="updateTags"
        :checked="checked"
      />
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class=""
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      {{ tag }}</label
    >
  </fieldset>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      required: true
    },
    modelValue: {
      type: Array,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateTags() {
      this.modelValue.includes(this.tag)
        ? this.$emit(
            'update:modelValue',
            this.modelValue.filter(tag => tag !== this.tag)
          )
        : this.$emit('update:modelValue', [...this.modelValue, this.tag]);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'src/variables.scss';

label {
  display: block;
  line-height: 1.4rem;
  font-size: 1.4rem;
  font-weight: bold;
  margin-left: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
  cursor: pointer;
}

input {
  position: absolute;
  z-index: 10;
  cursor: pointer;
  height: 24px;
  width: 24px;
  opacity: 0;
}

input:checked + div {
  border: 2px solid $color-primary;
}
input:checked + div svg {
  opacity: 1;
}

div {
  background: white;
  border: 2px solid $color-primary-light;
  border-radius: 5px;
  height: 24px;
  width: 24px;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
  transition: all 0.2s;

  &:focus-within {
    border: 2px solid $color-primary;
  }

  svg {
    height: 24px;
    width: 24px;
    opacity: 0;
    transition: all 0.2s;
    pointer-events: none;
  }
}

.tag-container {
  display: flex;
  align-items: center;
  margin: 6px 0;
}

@media screen and (max-width: 480px) {
  label {
    line-height: 1.2rem;
    font-size: 1.2rem;
  }

  input {
    height: 16px;
    width: 16px;
  }

  div {
    border-radius: 5px;
    height: 16px;
    width: 16px;

    svg {
      height: 16px;
      width: 16px;
    }
  }
}
</style>
