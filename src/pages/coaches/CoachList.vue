<template>
  <h1>The Coaches Page</h1>
  <section>
    <router-view></router-view>
  </section>
  <section>
    Filter
  </section>
  <section>
    <div class="actions">
      <base-button mode="ghost" style="marginRight: 1rem;">Refresh</base-button>
      <base-button to="/register" :link="true">Register</base-button>
    </div>
    <ul v-if="hasCoaches">
      <coach-item v-for="coach in getCoaches" :key="coach.id" v-bind="coach" />
    </ul>
    <h3 v-else>No coaches found.</h3>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import CoachItem from '../../components/coaches/CoachItem.vue';

export default {
  components: {
    CoachItem
  },
  computed: {
    ...mapGetters('coaches', ['getCoaches', 'hasCoaches'])
  }
};
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.actions {
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
}
</style>
