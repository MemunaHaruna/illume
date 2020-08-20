<template>
  <div>
    <div class="create-quote_modal">
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <b-form @submit.prevent="onSubmit">
        <b-form-group
          id="quote-title-group"
          label="Title:"
          label-for="quote-title"
          description="title of the book/film/song where you found this quote"
          align="left"
        >
          <b-form-input
            id="quote-title"
            v-model="form.source_title"
            placeholder="e.g 100 Love Sonnets"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="quote-author-group"
          label="Author(required):"
          label-for="quote-author"
          description="credit the source of this quote"
          align="left"
        >
          <b-form-input
            id="quote-author"
            v-model="form.author"
            required
            placeholder="e.g Pablo Neruda"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="quote-source-link-group"
          label="Link to Source:"
          label-for="quote-source-link"
          description="help others read/watch/listen to the source of this quote"
          align="left"
        >
          <b-form-input
            id="quote-source-link"
            v-model="form.link_to_source"
            placeholder="e.g www.goodreads.com/book/show/11339.100_Love_Sonnets"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="quote-access-group"
          label="Visible to:"
          label-for="quote-access"
          align="left"
        >
          <b-form-radio v-model="form.access" name="quote-access" value="1"
            >Just me</b-form-radio
          >
          <b-form-radio v-model="form.access" name="quote-access" value="0"
            >Everyone</b-form-radio
          >
        </b-form-group>

        <b-form-group
          id="quote-topic-group"
          label="Tags:"
          label-for="quote-topic"
          align="left"
        >
          <multiselect
            v-model="form.tag_ids"
            track-by="id"
            label="name"
            :options="topics"
            :multiple="true"
            :close-on-select="false"
          ></multiselect>
        </b-form-group>

        <b-form-group
          id="quote-content-group"
          label="Body(required):"
          label-for="quote-body"
          align="left"
        >
          <b-form-textarea
            id="quote-body"
            v-model="form.content"
            required
            placeholder="I love you without knowing how, or when, or from where. I love you simply, without problems or pride..."
            :style="{ height: '10em' }"
          ></b-form-textarea>
        </b-form-group>
        <b-button block type="submit" variant="outline-dark">Save</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },
  props: {
    quote: Object
  },
  data() {
    return {
      form: {
        source_title: this.getQuoteDetails('source_title'),
        author: this.getQuoteDetails('author'),
        content: this.getQuoteDetails('content'),
        source_type: this.getQuoteDetails('source_type'),
        link_to_source: this.getQuoteDetails('link_to_source'),
        access: this.getQuoteDetails('access'),
        tag_ids: this.getQuoteTags()
      }
    }
  },
  computed: {
    topics() {
      return this.$store.getters['topics']
    },
    errorMessage() {
      return this.$store.getters['createQuoteError']
    },
    newQuote() {
      return this.$store.getters['newQuote']
    }
  },
  methods: {
    onSubmit() {
      if (this.quote) {
        this.$store.dispatch('editQuote', {
          formData: this.form,
          quote_id: this.quote.id,
          vm: this
        })
      } else {
        this.$store.dispatch('createNewQuote', {
          formData: this.form,
          vm: this
        })
      }
      this.form = {
        source_title: '',
        author: '',
        content: '',
        source_type: '',
        link_to_source: '',
        access: [],
        tag_ids: []
      }

      this.$bvModal.hide('create-quote-modal')
      this.$bvModal.hide('edit-quote-modal')
    },
    getQuoteDetails: function(detail) {
      if (this.quote && this.quote[detail] && detail == 'access') {
        return this.quote[detail] == 'open' ? 0 : 1
      }
      if (this.quote && this.quote[detail]) {
        return this.quote[detail]
      }
      return ''
    },
    getQuoteTags: function() {
      if (this.quote && this.quote.tags) {
        return this.quote.tags
      }
      return []
    }
  },
  mounted() {
    this.$store.dispatch('fetchTopics')
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
.create-quote_modal {
  font-size: 0.9em;
  color: rgba(0, 0, 0, 0.54);
  text-align: left !important;
}
</style>
