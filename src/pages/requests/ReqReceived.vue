<template>
  <header>
    <h1>Requests Page</h1>
  </header>
  <div v-if="isLoading">
    <base-spinner />
  </div>
  <section v-else-if="!isLoading">
    <ul>
      <request-item
        v-for="request in getRequests"
        :key="request.id"
        v-bind="request"
      />
    </ul>
    <base-card v-if="!isError && !hasRequests">
      <h3>You haven't received any requests yet.</h3>
    </base-card>
  </section>
  <div class="error" v-if="!isLoading && isError">{{ isError }}</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  components: {
    RequestItem
  },
  computed: {
    ...mapGetters('requests', ['getRequests', 'hasRequests']),
    ...mapGetters(['isLoading', 'isError'])
  },
  methods: {
    ...mapActions('requests', ['fetchRequests']),
    ...mapActions(['loadingStart', 'loadingFinish', 'loadingError']),
    async loadRequests() {
      this.loadingStart();
      try {
        await this.fetchRequests();
        this.loadingFinish();
      } catch (err) {
        this.loadingError('Failed to load requests - please try again later.');
        this.loadingFinish();
      }
    }
  },
  created() {
    this.loadRequests();
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 5rem;
}
section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
