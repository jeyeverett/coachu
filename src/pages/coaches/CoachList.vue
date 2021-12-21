<template>
  <section style="padding-bottom: 20px;">
    <h1>Find a CodeCoach</h1>

    <section class="details">
      <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </section>

    <section style="padding: 10px 0 20px 10px;">
      <div class="actions">
        <BaseButton
          mode="ghost"
          style="marginRight: 1rem;"
          @click="loadCoaches({ refresh: true })"
        >
          Refresh
        </BaseButton>
        <BaseButton style="marginRight: 1rem;" @click="toggleFilters">
          Filters
        </BaseButton>
        <BaseButton
          to="/register"
          :link="true"
          mode="register"
          v-if="showRegisterButton"
        >
          Register
        </BaseButton>
        <BaseButton
          to="/auth?redirect=register"
          :link="true"
          mode="register"
          v-else-if="!isLoggedIn"
          title="Sign in to register as a coach"
        >
          Sign In
        </BaseButton>
      </div>
      <transition>
        <div class="actions" v-show="showFilters">
          <CoachFilter @change-filter="setFilters" />
        </div>
      </transition>
      <transition mode="out-in">
        <div v-if="isLoading">
          <BaseSpinner />
        </div>
        <ul v-else>
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            v-bind="coach"
          />
        </ul>
      </transition>
      <transition>
        <h3 v-if="!isError && !filteredCoaches" style="text-align: center;">
          No coaches found.
        </h3>
      </transition>

      <transition name="error">
        <div class="error" v-if="isError">{{ isError }}</div>
      </transition>
    </section>
    <div style="text-align: center;">
      <BaseButton @click="loadMore" v-if="!allLoaded">Load More</BaseButton>
      <p
        v-else
        style="text-align: center; opacity: 0;"
        :style="{ opacity: allLoaded ? 1 : 0 }"
      >
        The End
      </p>
    </div>
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
      loadCount: 5,
      showFilters: true,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
        vue: true,
        react: true,
        angular: true,
        css: true,
        html: true,
        cloud: true
      }
    };
  },
  computed: {
    ...mapGetters('coaches', ['getCoaches', 'hasCoaches', 'isCoach']),
    ...mapGetters(['isLoading', 'isError', 'isLoggedIn']),
    filteredCoaches() {
      return this.getCoaches
        .filter(coach => {
          if (coach.areas.includes('frontend') && this.activeFilters.frontend) {
            return true;
          }

          if (coach.areas.includes('backend') && this.activeFilters.backend) {
            return true;
          }

          if (coach.areas.includes('career') && this.activeFilters.career) {
            return true;
          }

          if (coach.areas.includes('vue') && this.activeFilters.vue) {
            return true;
          }

          if (coach.areas.includes('react') && this.activeFilters.react) {
            return true;
          }

          if (coach.areas.includes('angular') && this.activeFilters.angular) {
            return true;
          }

          if (coach.areas.includes('css') && this.activeFilters.css) {
            return true;
          }

          if (coach.areas.includes('html') && this.activeFilters.html) {
            return true;
          }

          if (coach.areas.includes('cloud') && this.activeFilters.cloud) {
            return true;
          }

          return false;
        })
        .slice(0, this.loadCount);
    },
    showRegisterButton() {
      return (
        (this.isLoggedIn && !this.isCoach && !this.isLoading) ||
        (!this.isCoach && this.isLoggedIn)
      );
    },
    allLoaded() {
      return this.loadCount >= this.getCoaches.length;
    }
  },
  methods: {
    ...mapActions(['loadCoaches']),
    setFilters(newFilters) {
      console.log(newFilters);
      this.activeFilters = newFilters;
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    loadMore() {
      this.loadCount += 5;
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

p {
  font-size: 1.4rem;
  font-weight: 700;
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
