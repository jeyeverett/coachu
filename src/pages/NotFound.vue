<template>
  <section>
    <base-card style="margin: 0 auto; flex-direction: column;">
      <h1>Page Not Found!</h1>
      <p>
        Could not find this page - check out our list of
        <router-link to="/coaches">coaches</router-link>
      </p>
    </base-card>
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-top: 4rem;
}

p {
  font-size: 1.4rem;
}

a {
  text-decoration: underline;
  &:hover {
    opacity: 0.5;
  }
}
</style>
