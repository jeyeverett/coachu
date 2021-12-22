<template>
  <section>
    <h1 style="margin-bottom: 30px;">Edit Coach</h1>
    <CoachForm v-if="getCoach" style="margin: 0 auto;" :editCoach="getCoach" />
    <h3 v-else style="text-align:center">
      You need to register as a coach before you can edit your profile.
    </h3>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    CoachForm
  },
  computed: {
    ...mapGetters(['userId']),
    ...mapGetters('coaches', ['getCoach'])
  }
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
