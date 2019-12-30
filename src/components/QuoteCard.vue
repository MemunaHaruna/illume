<template>
  <b-card
    v-if="quote"
    :title="title"
    :img-src="imageUrl"
    img-alt="Image from Unsplash"
    img-top
    tag="article"
    style
    class="mb-2"
    footer-tag="footer"
  >
    <b-card-text>
      <i>{{ quote.content }}</i>
      <p v-if="quote.source_title">
        <b-link :href="quote.link_to_source" target="_blank" class="card-link">
          <strong>- {{ quote.source_title }}</strong>
        </b-link>
      </p>
    </b-card-text>
    <b-card-text class="quote-author">{{ quote.author }}</b-card-text>
    <template v-slot:footer>
      <div v-if="currentUser">
        <QuoteActions :quote="quote" :bookmark="bookmark" />
      </div>
    </template>
  </b-card>
</template>

<script>
import QuoteActions from '@/components/QuoteActions'
export default {
  components: {
    QuoteActions
  },
  props: {
    quote: Object,
    imageUrl: String,
    title: String,
    bookmark: Object
  },
  computed: {
    currentUser() {
      return this.$store.getters['currentUser']
    }
  }
}
</script>

<style scoped>
.quote-author {
  text-transform: uppercase;
  font-weight: 100;
  color: #bcbebe;
}
.card-title {
  color: #e27a4d;
  font-size: 1.2em;
}

.card-link {
  color: #343332;
}

.card-link:hover {
  color: #bcbebe;
}

.card-footer {
  height: 47px;
  background-color: #f8f9fa;
}
</style>
