<template>
  <div class="search-form_wrapper">
    <font-awesome-icon
      :icon="{ prefix: 'fas', iconName: 'search' }"
      :style="{ color: '#bcbebe' }"
      class="search-icon"
    />
    <b-form-input
      size="sm"
      class="mr-sm-2 search-quotes"
      placeholder="Title, Body or Author"
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
      waitTime: 300
    }
  },
  methods: {
    handleSearch: function() {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$store.commit('setQueryString', this.query)
        this.$store.dispatch('fetchQuotes', { vm: this })
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
  text-indent: 1.5em;
}

.search-form_wrapper {
  position: relative;
}

.search-icon {
  font-size: 0.9em;
  position: absolute;
  top: 0.6em;
  left: 0.5em;
}
</style>
