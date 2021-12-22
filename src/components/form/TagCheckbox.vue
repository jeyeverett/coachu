<template>
  <span>
    <input
      type="checkbox"
      :id="tag"
      :value="tag"
      @change="updateTags"
      :checked="checked"
    />
    <label :for="tag">{{ tag }}</label>
  </span>
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
            [...this.modelValue].filter(tag => tag !== this.tag)
          )
        : this.$emit('update:modelValue', [...this.modelValue, this.tag]);
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  line-height: 1.4rem;
  font-size: 1.4rem;
  font-weight: bold;
  margin-left: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
}
</style>
