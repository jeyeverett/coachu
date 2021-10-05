<template>
  <the-header></the-header>
  <main>
    <h1 style="fontSize: 3rem;">coachu</h1>
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
  color: $color-black;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: $color-primary;
  transition: $transition-all;
  &:hover {
    color: $color-primary-dark;
  }
}

h1 {
  font-size: 2.4rem;
  margin-bottom: 1.4rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1.2rem;
}

h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

h4 {
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
}
</style>
