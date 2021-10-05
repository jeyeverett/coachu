<template>
  <button>
    {{ title }}
  </button>
</template>

<script>
export default {
  props: ['title']
};
</script>

<style lang="scss" scoped>
@import 'src/variables.scss';

button {
  font-family: inherit;
  border: none;
  background-color: transparent;
  padding: 1rem 2rem;
  border: 1px solid $color-secondary;
  border-radius: 3px;
  cursor: pointer;
}
</style>
