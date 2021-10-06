<template>
  <base-card>
    <section>
      <h2>Find By Specialty</h2>
      <div>
        <span class="filter-option">
          <label for="frontend">Frontend</label>
          <input type="checkbox" id="frontend" checked @click="setFilters" />
        </span>
        <span class="filter-option">
          <label for="backend">Backend</label>
          <input type="checkbox" id="backend" checked @click="setFilters" />
        </span>
        <span class="filter-option">
          <label for="career">Career</label>
          <input type="checkbox" id="career" checked @click="setFilters" />
        </span>
      </div>
    </section>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  methods: {
    setFilters(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const newFilters = {
        ...this.filters,
        [inputId]: isActive
      };
      this.filters = newFilters;
      this.$emit('change-filter', newFilters);
    }
  }
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>
