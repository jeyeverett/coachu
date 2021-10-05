<template>
  <h1>The Coaches Page</h1>
  <section>
    <router-view></router-view>
  </section>
  <section>
    Filter
  </section>
  <section>
    <base-button title="refresh" />
    <router-link to="/register">Register</router-link>
    <ul v-if="hasCoaches">
      <li v-for="coach in getCoaches" :key="coach.id">
        <router-link :to="'/coaches/' + coach.id"
          >{{ coach.firstName }} {{ coach.lastName }}</router-link
        >
      </li>
    </ul>
    <h3 v-else>No coaches found.</h3>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters('coaches', ['getCoaches', 'hasCoaches'])
  }
};
</script>
