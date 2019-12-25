<template>
  <div id="app">
    <div id="nav">
      <app-header></app-header>
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  components: {
    'app-header': Header
  }
}
</script>

<style lang="scss">
#app,
.modal-dialog {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #343332;
}

#nav {
  a {
    font-weight: bold;
    color: #343332;

    &.router-link-exact-active {
      color: #e27a4d;
    }
  }
}
</style>
