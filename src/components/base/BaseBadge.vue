<template>
  <span class="badge">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
@import '/src/variables.scss';

.badge {
  padding: 0.5rem 1rem;
  margin: 1rem;
  border: $border;
  border-radius: $border-radius;
  font-size: 1.2rem;
}
</style>
