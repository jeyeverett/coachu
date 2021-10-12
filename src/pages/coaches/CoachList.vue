<template>
  <section>
    <h1>The Coaches Page</h1>

    <section class="details">
      <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </section>

    <section>
      <div class="actions">
        <base-button
          mode="ghost"
          style="marginRight: 1rem;"
          @click="loadCoaches({ refresh: true })"
          >Refresh</base-button
        >
        <base-button style="marginRight: 1rem;" @click="toggleFilters"
          >Filters</base-button
        >
        <base-button
          to="/register"
          :link="true"
          mode="register"
          v-if="showRegisterButton"
          >Register</base-button
        >
        <base-button
          to="/auth?redirect=register"
          :link="true"
          mode="register"
          v-else
          title="Sign in to register as a coach"
          >Sign-In</base-button
        >
      </div>
      <div class="actions" v-show="showFilters">
        <coach-filter @change-filter="setFilters" />
      </div>
      <div v-if="isLoading">
        <base-spinner />
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          v-bind="coach"
        />
      </ul>
      <h3 v-else-if="!isError">No coaches found.</h3>
      <transition name="error">
        <div class="error" v-if="isError">{{ isError }}</div>
      </transition>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: {
    CoachItem,
    CoachFilter
  },
  data() {
    return {
      showFilters: true,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  computed: {
    ...mapGetters('coaches', ['getCoaches', 'hasCoaches', 'isCoach']),
    ...mapGetters(['isLoading', 'isError', 'isLoggedIn']),
    filteredCoaches() {
      return this.getCoaches.filter(coach => {
        if (coach.areas.includes('frontend') && this.activeFilters.frontend) {
          return true;
        }

        if (coach.areas.includes('backend') && this.activeFilters.backend) {
          return true;
        }

        if (coach.areas.includes('career') && this.activeFilters.career) {
          return true;
        }

        return false;
      });
    },
    showRegisterButton() {
      return (
        (this.isLoggedIn && !this.isCoach && !this.isLoading) ||
        (!this.isCoach && this.isLoggedIn)
      );
    }
  },
  methods: {
    ...mapActions(['loadCoaches']),
    setFilters(newFilters) {
      this.activeFilters = newFilters;
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '/src/variables.scss';

h1 {
  margin-bottom: 4rem;
  text-align: center;
}
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.details {
  display: flex;
  justify-content: center;
  align-items: center;
}

.actions {
  display: flex;
  justify-content: space-around;
  margin: 2rem auto;
  max-width: 100rem;
}
</style>
