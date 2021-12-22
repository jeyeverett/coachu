<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
</template>

<style lang="scss" scoped>
@import '/src/variables.scss';

.icon {
  height: $icon-height;
  width: $icon-width;
  color: $color-check;
  position: absolute;
  top: 22px;
  right: 5px;
}
</style>
