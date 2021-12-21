<template>
  <BaseCard>
    <li>
      <h3>{{ email }}</h3>
      <p>{{ message }}</p>
      <a :href="emailLink" link="true">Reply</a>
    </li>
  </BaseCard>
</template>

<script>
export default {
  props: ['email', 'message'],
  computed: {
    emailLink() {
      return 'mailto:' + this.email;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '/src/variables.scss';
li {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 40rem;
  max-width: 60rem;

  p {
    font-size: 1.4rem;
    padding: $padding;
  }

  a {
    font-size: 1.2rem;
    margin-top: 1rem;
    padding: $padding;
    border: $border;
    border-radius: $border-radius;
    transition: $transition-all;
    align-self: flex-end;
    &:hover {
      background-color: $color-primary;
      color: white;
    }
  }
}
</style>
