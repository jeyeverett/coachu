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
  height: 100%;
  padding: 2rem;
  max-width: 80rem;
  background-color: white;

  @media screen and (max-width: 400px) {
    padding: 1rem;
  }
}
</style>
