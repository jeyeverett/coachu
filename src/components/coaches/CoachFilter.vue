<template>
  <BaseCard>
    <section>
      <h2 style="margin-bottom: 30px;">Find By Specialty</h2>
      <div class="filters">
        <span>
          <label for="vue">Vue</label>
          <input type="checkbox" id="vue" checked @click="setFilters" />
        </span>
        <span>
          <label for="react">React</label>
          <input type="checkbox" id="react" checked @click="setFilters" />
        </span>
        <span>
          <label for="angular">Angular</label>
          <input type="checkbox" id="angular" checked @click="setFilters" />
        </span>
        <span>
          <label for="css">CSS</label>
          <input type="checkbox" id="css" checked @click="setFilters" />
        </span>
        <span>
          <label for="html">HTML</label>
          <input type="checkbox" id="html" checked @click="setFilters" />
        </span>
        <span>
          <label for="cloud">Cloud</label>
          <input type="checkbox" id="cloud" checked @click="setFilters" />
        </span>
        <span>
          <label for="frontend">Frontend</label>
          <input type="checkbox" id="frontend" checked @click="setFilters" />
        </span>
        <span>
          <label for="backend">Backend</label>
          <input type="checkbox" id="backend" checked @click="setFilters" />
        </span>
        <span>
          <label for="career">Career</label>
          <input type="checkbox" id="career" checked @click="setFilters" />
        </span>
      </div>
    </section>
  </BaseCard>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filters: {
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

.filters {
  display: flex;
  flex-wrap: wrap;

  span {
    margin-bottom: 0.5rem;
  }
}
</style>
