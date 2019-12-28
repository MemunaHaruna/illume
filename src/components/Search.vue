<template>
  <div>
    <b-form-input
      size="sm"
      class="mr-sm-2 search-quotes"
      placeholder="Title, Content or Author"
      v-model="query"
      @keyup="handleSearch"
    ></b-form-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      timeout: null,
      waitTime: 1000
    }
  },
  methods: {
    handleSearch: function() {
      if (this.query == '') {
        this.$store.dispatch('fetchQuotes')
      }
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$store.dispatch('fetchQuotes', {
          query: this.query
        })
      }, this.waitTime)
    }
  }
}
</script>

<style scoped>
@media (min-width: 576px) {
  .search-quotes {
    width: 20em !important;
  }
}

input {
  margin-right: 0 !important;
}
</style>
