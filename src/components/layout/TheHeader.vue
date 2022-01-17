<template>
  <header>
    <nav>
      <router-link to="/">
        <span class="logo">codecoach</span>
      </router-link>
      <ul>
        <li>
          <router-link to="/coaches">Coaches</router-link>
        </li>
        <li ref="" v-if="isLoggedIn && isCoach">
          <router-link to="/messages">Messages</router-link>
        </li>
        <li ref="" v-if="isLoggedIn">
          <a @click="logOut">Sign-Out</a>
        </li>
        <li v-else>
          <router-link to="/auth">Sign In/Up</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters(['isLoggedIn']),
    ...mapGetters('coaches', ['isCoach'])
  },
  methods: {
    ...mapActions(['signOut']),
    logOut() {
      this.signOut();
      this.$router.replace('/coaches');
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'src/variables.scss';

header {
  padding: 2rem 4rem;
  @media screen and (max-width: 480px) {
    padding: 0.5rem 1rem;
    margin-bottom: 2rem;
  }
}
nav {
  display: flex;
  justify-content: space-between;
}

ul {
  display: flex;
}

li {
  font-size: 1.6rem;
  border-bottom: 2px solid transparent;

  &:not(:last-child) {
    margin-right: 2rem;
  }
}

a.router-link-active {
  padding-bottom: 1rem;
  border-bottom: 2px solid $color-primary;
  transition: $transition-all;

  &:hover {
    border-bottom: 2px solid $color-primary-dark;
  }
}

.logo {
  font-weight: bold;
  color: darkgray;
  font-size: 1.8rem;
  font-family: monospace;
}
</style>
