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
  </b-card>
</template>

<script>
export default {
  props: {
    quote: Object,
    imageUrl: String,
    title: String
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
}

.card-link {
  color: #343332;
}

.card-link:hover {
  color: #bcbebe;
}
</style>
