<template>
  <div class="home">
    <!-- <TopicsList /> -->
    <QuotesList />
  </div>
</template>

<script>
// @ is an alias to /src
import QuotesList from '@/components/QuotesList.vue'

export default {
  name: 'home',
  components: {
    QuotesList
  }
}
</script>
