<template>
  <header>
    <nav>
      <div>
        <h1>Logo</h1>
      </div>
      <ul>
        <li>
          <router-link to="/coaches">Coaches</router-link>
        </li>
        <li>
          <router-link to="/requests">Requests</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  padding: 1rem 2rem;
}
nav {
  display: flex;
  justify-content: space-between;
}
ul {
  display: flex;
}
li {
  font-size: 1.6rem;
  &:first-child {
    margin-right: 1rem;
  }
}
</style>
