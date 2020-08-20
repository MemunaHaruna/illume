<template>
  <b-container class="quotes-container">
    <!-- <b-row v-for="(row, index) in cardRows" :key="index"> -->
    <!-- <b-col v-for="(quote, index) in row" :key="index"> -->
    <div v-if="quotes && quotes.length">
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
        :per-page="15"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        align="center"
        class="quotes-pagination"
        @input="fetchQuotes({ currentPage: paginationData.current_page })"
      ></b-pagination>
    </div>

    <div v-if="!(quotes && quotes.length)">
      <p class="empty-state">No quotes found</p>
    </div>
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
      return `https://source.unsplash.com/500x300/?${quote.source_title ||
        randomTitle}`
    },
    setTitle: function(quote) {
      return quote.is_qotd ? 'QUOTE OF THE DAY' : ''
    },
    fetchQuotes: function(params) {
      const vmParams = { vm: this }
      const mergedParams = { ...params, ...vmParams }
      this.$store.dispatch('fetchQuotes', mergedParams)
    }
  },
  computed: {
    quotes() {
      return this.$store.getters['quotes']
    },
    paginationData() {
      return this.$store.getters['paginationData']
    }
  },
  mounted() {
    this.fetchQuotes({
      currentPage: 1,
      vm: this
    })
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

.empty-state {
  text-transform: uppercase;
  font-weight: 100;
  color: #bcbebe;
}
</style>
