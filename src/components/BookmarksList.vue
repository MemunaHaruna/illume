<template>
  <b-container class="bookmarks-container">
    <div v-if="bookmarks && bookmarks.length">
      <div class="card-columns">
        <div v-for="bookmark in bookmarks" :key="bookmark.id">
          <QuoteCard
            :quote="bookmark.quote"
            :imageUrl="setImageUrl(bookmark.quote)"
            :title="setTitle(bookmark.quote)"
            :bookmark="bookmark"
          />
        </div>
      </div>
      <b-pagination
        v-model="paginationData.current_page"
        :total-rows="paginationData.total_records"
        :per-page="10"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        align="center"
        class="quotes-pagination"
        @input="fetchBookmarks({ currentPage: paginationData.current_page })"
      ></b-pagination>
    </div>

    <div v-else-if="!(bookmarks && bookmarks.length)">
      <p class="empty-state">No bookmarks found</p>
    </div>
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
    fetchBookmarks: function(params) {
      const vmParams = { vm: this }
      const mergedParams = { ...params, ...vmParams }
      this.$store.dispatch('fetchBookmarks', mergedParams)
    }
  },
  computed: {
    bookmarks() {
      return this.$store.getters['bookmarks']
    },
    paginationData() {
      return this.$store.getters['paginationData']
    }
  },
  mounted() {
    this.fetchBookmarks({
      currentPage: 1,
      vm: this
    })
  }
}
</script>

<style>
.bookmarks-container {
  margin-top: 2em;
}

svg.action-icons.delete-icon.svg-inline--fa.fa-bookmark.fa-w-12 {
  color: #e27a4d !important;
}
</style>
