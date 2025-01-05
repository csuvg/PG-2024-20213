<template>
   <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/CitaActual/C-2">CA</router-link>
  </nav> -->
  <router-view />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Della+Respira&family=Julius+Sans+One&family=Poppins:wght@400;500;700&display=swap');
#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #4532d3;
    }
  }
}

</style>
