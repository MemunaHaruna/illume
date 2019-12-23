<template>
  <div class="home">
    <HelloWorld msg="Welcome to Illume" />
    <SocialAuth />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SocialAuth from '../components/SocialAuth.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    SocialAuth
  }
}
</script>
