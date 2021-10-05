<template>
  <base-card>
    <li>
      <section>
        <h3>{{ fullName }}</h3>
        <h4>${{ hourlyRate }}/hour</h4>
        <div class="badges">
          <base-badge v-for="area in areas" :key="area">{{ area }}</base-badge>
        </div>
      </section>
      <div class="actions">
        <base-button :to="detailsLink" style="marginBottom: 1rem;" :link="true">
          View Details
        </base-button>
        <base-button :to="contactLink" :link="true">
          Contact
        </base-button>
      </div>
    </li>
  </base-card>
</template>

<script>
export default {
  props: ['firstName', 'lastName', 'id', 'hourlyRate', 'areas'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    detailsLink() {
      return { name: 'coach', params: { coachId: this.id } };
    },
    contactLink() {
      return { name: 'contact', params: { coachId: this.id } };
    }
  }
};
</script>

<style lang="scss" scoped>
li {
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
section {
  max-width: 75%;
}

.badges {
  display: flex;
  flex-wrap: wrap;
}

.actions {
  display: flex;
  flex-direction: column;
}
</style>
