<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import 'src/variables.scss';

.card {
  border: $border;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  width: 100%;
  max-width: 60rem;
}
</style>
