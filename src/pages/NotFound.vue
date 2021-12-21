<template>
  <section>
    <BaseCard style="margin: 0 auto; flex-direction: column;">
      <h1>
        {{ resource ? resource[0].toUpperCase() + resource.slice(1) : 'Page' }}
        Not Found!
      </h1>
      <p>
        Could not find this {{ resource ? resource : 'page' }} - check out our
        list of
        <router-link to="/coaches">coaches</router-link>
      </p>
    </BaseCard>
  </section>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      default: ''
    }
  }
};
</script>

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
