<template>
  <BaseCard>
    <section>
      <h2 style="margin-bottom: 30px;">Find By Specialty</h2>
      <div class="filters">
        <TagCheckbox
          v-for="tag in getTags"
          v-model="activeTags"
          :tag="tag"
          @change="setFilters"
          :key="tag"
          checked
        />
      </div>
    </section>
  </BaseCard>
</template>

<script>
import { mapGetters } from 'vuex';

import TagCheckbox from '../form/TagCheckbox.vue';
export default {
  components: { TagCheckbox },
  emits: ['change-filter'],
  data() {
    return {
      activeTags: []
    };
  },
  computed: {
    ...mapGetters('coaches', ['getTags'])
  },
  methods: {
    setFilters() {
      this.$emit('change-filter', this.activeTags);
    }
  },
  created() {
    this.activeTags = this.getTags;
    this.setFilters();
  }
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 480px) {
    align-items: flex-start;
  }
}

label {
  font-size: 1.2rem;
  margin-right: 5px;
}

div {
  display: flex;
  span:not(:last-child) {
    margin-right: 2rem;
  }
}

span {
  display: flex;
  align-items: center;
}

.filters {
  display: flex;
  flex-direction: column;
  max-height: 140px;
  justify-content: center;
  flex-wrap: wrap;
  width: 80%;
  margin: 0 auto;

  @media screen and (max-width: 350px) {
    width: 90%;
  }

  span {
    margin-bottom: 1rem;
  }
}
</style>
