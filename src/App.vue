<template>
  <main>
    <the-header></the-header>
    <h1>Vue App</h1>
    <router-view></router-view>
  </main>
</template>

<script>
import TheHeader from './components/layout/TheHeader';
export default {
  components: {
    TheHeader
  }
};
</script>

<style lang="scss">
@import 'src/variables.scss';

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: blue;
  font-size: 1.4rem;
  &:hover {
    color: $color-secondary;
  }
}
</style>
