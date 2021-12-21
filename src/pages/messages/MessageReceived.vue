<template>
  <section>
    <header>
      <h1>Messages Page</h1>
    </header>
    <div v-if="isLoading">
      <BaseSpinner />
    </div>
    <section v-else-if="!isLoading">
      <ul>
        <Message
          v-for="request in getMessages"
          :key="request.id"
          v-bind="request"
        />
      </ul>

      <BaseCard v-if="!isError && !hasMessages">
        <h3>You haven't received any messages yet.</h3>
      </BaseCard>
    </section>
    <div class="error" v-if="!isLoading && isError">{{ isError }}</div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Message from '../../components/messages/Message.vue';

export default {
  components: {
    Message
  },
  computed: {
    ...mapGetters('messages', ['getMessages', 'hasMessages']),
    ...mapGetters(['isLoading', 'isError'])
  },
  methods: {
    ...mapActions('messages', ['fetchMessages']),
    ...mapActions(['loadingStart', 'loadingFinish', 'loadingError']),
    async loadMessages() {
      this.loadingStart();
      try {
        await this.fetchMessages();
        this.loadingFinish();
      } catch (err) {
        this.loadingError('Failed to load messages - please try again later.');
        this.loadingFinish();
      }
    }
  },
  created() {
    this.loadMessages();
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
