<template>
  <span class="badge">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
@import '/src/variables.scss';

.badge {
  padding: 1rem 2rem;
  margin: 1rem;
  border: $border;
  border-radius: $border-radius;
  font-size: 1.4rem;
  line-height: 1.4rem;
}
</style>
