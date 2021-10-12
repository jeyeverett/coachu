<template>
  <the-header></the-header>
  <main>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </main>
</template>

<script>
import TheHeader from './components/layout/TheHeader';
import { mapActions } from 'vuex';

export default {
  components: {
    TheHeader
  },
  methods: {
    ...mapActions(['loadCoaches'])
  },
  created() {
    this.loadCoaches();
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
  scroll-behavior: smooth;
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

section {
  width: 100%;
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

.error {
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  margin-top: 10rem;
}

.inline-error {
  font-size: 1.4rem;
  color: $color-error;
  text-align: center;
  margin: 2rem 0;
}

.route-enter-active {
  animation: errow 0.3s ease-in forwards;
}
.route-leave-active {
  animation: errow 0.3s ease-in reverse;
}

.error-enter-active {
  animation: errow 0.3s ease-in forwards;
}
.error-leave-active {
  animation: errow 0.3s ease-out reverse;
}
</style>
