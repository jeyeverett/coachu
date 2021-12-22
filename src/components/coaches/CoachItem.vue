<template>
  <BaseCard>
    <li>
      <article>
        <div style="display: flex; align-items: center;">
          <img
            v-if="imageUrl"
            :src="imageUrl"
            alt="coach image"
            width="50"
            height="50"
          />
          <h3 style="margin: 0; margin-left: 10px;">{{ fullName }}</h3>
          <h4 style="margin: 0; margin-left: 10px;">${{ hourlyRate }}/hour</h4>
        </div>
        <div class="badges">
          <BaseBadge v-for="tag in areas" :key="tag">{{ tag }}</BaseBadge>
        </div>
      </article>
      <div class="actions">
        <BaseButton
          :to="detailsLink"
          style="marginBottom: 1rem;"
          :link="true"
          @click="scrollToTop"
        >
          Details
        </BaseButton>
        <BaseButton :to="contactLink" :link="true" @click="scrollToTop">
          Contact
        </BaseButton>
      </div>
    </li>
  </BaseCard>
</template>

<script>
export default {
  props: ['firstName', 'lastName', 'id', 'hourlyRate', 'areas', 'imageUrl'],
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
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  height: 50px;
  border-radius: 100%;
  width: auto;
}
li {
  width: 100%;
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
