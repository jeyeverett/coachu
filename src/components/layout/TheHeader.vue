<template>
  <header>
    <nav>
      <router-link to="/">
        <span class="logo">coachu</span>
      </router-link>
      <ul>
        <li>
          <router-link to="/coaches">Coaches</router-link>
        </li>
        <li ref="" v-if="isLoggedIn">
          <router-link to="/requests">Requests</router-link>
        </li>
        <li ref="" v-if="isLoggedIn">
          <a @click="logOut">Sign-Out</a>
        </li>
        <li v-else>
          <router-link to="/auth">Sign-In</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters(['isLoggedIn'])
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
  color: grey;
  font-size: 1.8rem;
}
</style>
