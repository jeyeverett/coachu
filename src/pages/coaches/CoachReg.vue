<template>
  <section>
    <h1>Coach Registration</h1>
    <coach-form style="margin: 0 auto;" />
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm
  }
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
