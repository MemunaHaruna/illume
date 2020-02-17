<template>
  <div class="home">
    <b-button variant="light" class="add-to-home">Add to Home Screen</b-button>
    <TopicsList />
    <QuotesList :url="url" />
  </div>
</template>

<script>
// @ is an alias to /src
import QuotesList from '@/components/QuotesList.vue'
import TopicsList from '@/components/TopicsList.vue'

export default {
  name: 'home',
  components: {
    QuotesList,
    TopicsList
  },
  computed: {
    currentUser() {
      return this.$store.getters['currentUser']
    }
  },
  data() {
    return {
      url: this.currentUser && this.currentUser.id ? 'api/quotes' : 'api'
    }
  }
}
</script>

<style>
.add-to-home {
  display: none;
  margin: 0 auto;
}
</style>
