<template>
  <div>
    <h5>My Quotes</h5>
    <QuotesList :url="url" />
  </div>
</template>

<script>
import QuotesList from '@/components/QuotesList.vue'

export default {
  components: {
    QuotesList
  },
  data() {
    return {
      url: 'api/quotes/personal_quotes'
    }
  }
}
</script>

<style></style>
