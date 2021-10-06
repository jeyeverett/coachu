<template>
  <button v-if="!link" :class="mode">
    <slot />
  </button>
  <router-link :to="to" v-else :class="mode">
    <slot />
  </router-link>
</template>

<script>
export default {
  props: ['link', 'to', 'mode']
};
</script>

<style lang="scss" scoped>
@import 'src/variables.scss';

button,
a {
  font-size: 1.4rem;
  color: $color-black;
  font-family: inherit;
  border: none;
  background-color: transparent;
  padding: 1rem 2rem;
  border: 1px solid $color-primary;
  border-radius: calc($border-radius - 2px);
  cursor: pointer;
  text-align: center;
  transition: $transition-all;

  &:hover {
    background-color: $color-primary;
    color: white;
  }
}

.ghost {
  border: none;
  color: white;
  background-color: rgba($color-primary, 0.6);
}

.register {
  background-color: $color-primary-dark;
  color: white;
}
</style>
