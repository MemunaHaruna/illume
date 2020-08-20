<template>
  <div class="quote-card-footer">
    <font-awesome-icon
      v-if="canEditOrDeleteQuote()"
      :icon="{ prefix: 'far', iconName: 'edit' }"
      class="action-icons"
      title="Edit Quote"
      @click="showModal('edit-quote-modal')"
    />
    <b-modal
      ref="edit-quote-modal"
      id="edit-quote-modal"
      title="Edit Quote"
      :hide-footer="true"
    >
      <CreateQuote :quote="quote" />
    </b-modal>
    <font-awesome-icon
      v-if="canEditOrDeleteQuote()"
      :icon="{ prefix: 'far', iconName: 'trash-alt' }"
      class="action-icons"
      title="Delete Quote"
      @click="showModal('delete-quote-modal')"
    />
    <b-modal ref="delete-quote-modal" title="Delete Quote" :hide-footer="true">
      <h5>Are you sure you want to delete this quote?</h5>
      <p>This action is not reversible.</p>
      <b-button variant="danger" @click="deleteQuote">Delete</b-button>
    </b-modal>
    <font-awesome-icon
      v-if="canCreateBookmark()"
      :icon="{ prefix: 'far', iconName: 'bookmark' }"
      class="action-icons"
      :class="{ 'is-bookmarked': quote.bookmarked_by_current_user || '' }"
      title="Add to Bookmarks"
      @click="addToBookmarks"
    />
    <font-awesome-icon
      v-if="canDeleteBookmark()"
      :icon="{ prefix: 'far', iconName: 'bookmark' }"
      class="action-icons delete-icon"
      :class="{ 'is-bookmarked': quote.bookmarked_by_current_user || '' }"
      title="Delete from Bookmarks"
      @click="deleteBookmark"
    />
    <social-sharing
      :url="host"
      :title="contentSnippet()"
      :quote="quote.link_to_source"
      :hashtags="tagsList()"
      inline-template
    >
      <div class="action-icons twitter-share-icon">
        <network network="twitter" class="share-link">
          <font-awesome-icon
            :icon="{ prefix: 'fab', iconName: 'twitter' }"
            title="Share to Twitter"
          />
        </network>
      </div>
    </social-sharing>
  </div>
</template>

<script>
import CreateQuote from '@/components/CreateQuote'
export default {
  props: {
    quote: Object,
    bookmark: Object
  },
  components: {
    CreateQuote
  },
  data() {
    return {
      host: process.env.VUE_APP_HOST
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters['currentUser']
    },
    bookmarks() {
      return this.$store.getters['bookmarks']
    }
  },
  methods: {
    addToBookmarks: function() {
      this.$store.dispatch('createBookmark', {
        quote: this.quote,
        vm: this
      })
    },
    deleteBookmark: function() {
      this.$store.dispatch('deleteBookmark', {
        bookmark: this.bookmark,
        vm: this
      })
    },
    deleteQuote: function() {
      this.$store.dispatch('deleteQuote', { quote: this.quote, vm: this })
    },
    canEditOrDeleteQuote: function() {
      return (
        this.quote &&
        this.quote.user &&
        this.currentUser &&
        this.quote.user.id === this.currentUser.id
      )
    },
    canCreateBookmark: function() {
      return this.currentUser && !this.bookmark
    },
    canDeleteBookmark: function() {
      return this.currentUser && this.bookmark
    },
    showModal(modalRef) {
      this.$refs[modalRef].show()
    },
    tagsList() {
      // the regex removes all empty spaces, dots and colons so it looks good as hashtags
      const author = this.quote.author
        ? this.quote.author.replace(/ |[.:,]/g, '')
        : ''
      const title = this.quote.source_title
        ? this.quote.source_title.replace(/ |[.:,]/g, '')
        : ''

      if (author.length > 0 && title.length > 0) {
        return [author, title].join(',')
      } else if (author.length > 0) {
        return author
      } else if (title.length > 0) {
        return title
      }
      return (
        this.quote.tags.length > 0 &&
        this.quote.tags.map(tag => tag.name).join(',')
      )
    },
    contentSnippet() {
      const snippetWordCount = 30
      const wordsInText = this.quote.content.split(' ')
      const ellipsis = wordsInText.length > snippetWordCount ? '...' : ''
      return wordsInText.slice(0, snippetWordCount).join(' ') + ellipsis
    }
  }
}
</script>

<style scoped>
.action-icons {
  cursor: pointer;
  margin: 0 1.5em;
  color: #cccccc;
}
.action-icons:hover {
  color: rgb(128, 128, 128);
}

.quote-card-footer {
  display: flex;
  justify-content: space-evenly;
}

.is-bookmarked {
  color: #e27a4d;
}

.is-bookmarked:hover {
  color: darkred;
}
.twitter-share-icon:hover {
  color: rgb(85, 172, 238);
}
</style>
