<template>
  <span class="badge">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
@import '/src/variables.scss';

.badge {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.4rem;
  letter-spacing: 2px;
}
</style>
