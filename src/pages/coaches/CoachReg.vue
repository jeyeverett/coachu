<template>
  <h1>Coach Registration</h1>
  <section class="registration">
    <form @submit.prevent>
      <div class="form-control">
        <label for="firstName">First Name</label>
        <input id="firstName" type="text" v-model="firstName" />
      </div>
      <div class="form-control">
        <label for="lastName">Last Name</label>
        <input id="lastName" type="text" v-model="lastName" />
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      areas: [],
      description: '',
      hourlyRate: null
    };
  }
};
</script>

<style lang="scss" scoped></style>
