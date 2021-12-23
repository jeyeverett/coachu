<template>
  <section style="padding-bottom: 20px;">
    <h1>Find a CodeCoach</h1>
    <p style="text-align: center; margin-bottom: 20px;">
      Contact a coach for free - sign in/up to register as a coach
    </p>
    <transition-group name="group-slide" tag="section" appear>
      <section
        key="coach"
        class="details"
        v-if="this.$route.path.slice(1).split('/').length >= 2"
      >
        <router-view v-slot="{ Component }">
          <transition name="route" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </section>

      <section style="padding: 10px 0 20px 10px;" key="coaches">
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
          <BaseButton
            to="/edit"
            :link="true"
            v-else
            title="Edit your coach profile"
          >
            Edit Profile
          </BaseButton>
        </div>
        <transition>
          <div class="actions" v-show="showFilters">
            <CoachFilter @change-filter="setFilters" />
          </div>
        </transition>
        <div v-if="isLoading">
          <BaseSpinner />
        </div>
        <ul>
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            v-bind="coach"
          />
        </ul>
        <transition>
          <h3 v-if="!isError && !filteredCoaches" style="text-align: center;">
            No coaches found.
          </h3>
        </transition>

        <transition name="error">
          <div class="error" v-if="isError">{{ isError }}</div>
        </transition>
        <div style="text-align: center; margin-top: 20px;">
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
    </transition-group>
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
      activeFilters: []
    };
  },
  computed: {
    ...mapGetters('coaches', [
      'getCoaches',
      'hasCoaches',
      'isCoach',
      'getTags'
    ]),
    ...mapGetters(['isLoading', 'isError', 'isLoggedIn']),
    filteredCoaches() {
      return this.getCoaches
        .filter(coach => {
          for (let tag of coach.tags) {
            if (this.activeFilters.includes(tag)) return true;
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
