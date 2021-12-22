<template>
  <the-header></the-header>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </main>
</template>

<script>
import TheHeader from './components/layout/TheHeader';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    TheHeader
  },
  computed: {
    ...mapGetters(['didAutoSignOut'])
  },
  methods: {
    ...mapActions(['loadCoaches', 'autoLogin'])
  },
  created() {
    this.loadCoaches();
    this.autoLogin();
  },
  watch: {
    didAutoSignOut(newVal, oldVal) {
      if (!oldVal && oldVal !== newVal) {
        this.$router.replace('/coaches');
      }
    }
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
  background-color: rgb(240, 240, 240);
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
  cursor: pointer;

  &:hover {
    color: $color-primary-dark;
  }
}

h1 {
  font-size: 2.8rem;
  margin-bottom: 1.4rem;
  font-family: monospace;
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

fieldset {
  border: none;
}

legend {
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
  font-weight: bold;
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

.v-enter-active {
  animation: componentIn 0.3s ease-in forwards;
}

.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.v-leave-active {
  transition: all 0.5s ease;
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.group-slide-enter-active {
  animation: componentIn 0.3s ease-in forwards;
}

.group-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.group-slide-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}

.group-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.group-slide-move {
  transition: transform 0.5s ease;
}

.route-enter-active {
  animation: routeIn 0.3s ease-in forwards;
}
.route-leave-active {
  animation: routeOut 0.3s ease-in forwards;
}

.error-enter-active {
  animation: errow 0.3s ease-in forwards;
}
.error-leave-active {
  animation: errow 0.3s ease-out reverse;
}
</style>
