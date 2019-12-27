<template>
  <b-container class="quotes-container">
    <!-- <b-row v-for="(row, index) in cardRows" :key="index"> -->
    <!-- <b-col v-for="(quote, index) in row" :key="index"> -->
    <div class="card-columns">
      <div v-for="quote in quotes" :key="quote.id">
        <QuoteCard
          :quote="quote"
          :imageUrl="setImageUrl(quote)"
          :title="setTitle(quote)"
        />
      </div>
    </div>
    <b-pagination
      v-model="paginationData.current_page"
      :total-rows="paginationData.total_records"
      per-page="10"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      align="center"
      class="quotes-pagination"
      @input="fetchQuotes(paginationData.current_page)"
    ></b-pagination>
    <!-- </b-col> -->
    <!-- </b-row> -->
  </b-container>
</template>

<script>
import QuoteCard from '@/components/QuoteCard.vue'

export default {
  components: {
    QuoteCard
  },
  methods: {
    setImageUrl: function(quote) {
      let titles = ['nature', 'travel']
      let randomTitle = Math.floor(titles.length * Math.random())
      return `https://source.unsplash.com/1600x900/?${quote.source_title ||
        randomTitle}`
    },
    setTitle: function(quote) {
      return quote.is_qotd ? 'QUOTE OF THE DAY' : ''
    },
    fetchQuotes: function(currentPage) {
      this.$store.dispatch('fetchQuotes', currentPage)
    }
  },
  computed: {
    quotes() {
      return this.$store.getters['quotes']
    },
    paginationData() {
      return this.$store.getters['paginationData']
    }
    // cardRows() {
    //   var rows = []
    //   var itemsPerRow = 3
    //   var arr = this.quotes
    //   for (var i = 0; i < arr.length; i += itemsPerRow) {
    //     var row = []
    //     for (var z = 0; z < itemsPerRow; z++) {
    //       row.push(arr[i + z])
    //     }
    //     rows.push(row)
    //   }
    //   return rows
    // }
  },
  mounted() {
    this.$store.dispatch('fetchQuotes', 1)
  }
}
</script>

<style>
.quotes-container {
  margin-top: 2em;
}

.pagination {
  margin-top: 4em;
}

.page-link {
  color: #343332;
}

.page-item.active .page-link {
  background-color: #bcbebe;
  border-color: #bcbebe;
}

.page-link:hover {
  color: #e27a4d;
}
</style>
