<template>
  <div>
    <font-awesome-icon
      v-if="canEditOrDelete()"
      :icon="{ prefix: 'far', iconName: 'edit' }"
      :style="{ color: '#808080' }"
      class="action-icons"
      title="Edit Quote"
      @click="showModal('edit-quote-modal')"
    />
    <b-modal ref="edit-quote-modal" title="Edit Quote" :hide-footer="true">
      <CreateQuote :quote="quote" />
    </b-modal>
    <font-awesome-icon
      v-if="canEditOrDelete()"
      :icon="{ prefix: 'far', iconName: 'trash-alt' }"
      :style="{ color: '#808080' }"
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
      v-if="!bookmark"
      :icon="{ prefix: 'far', iconName: 'bookmark' }"
      :style="{ color: '#808080' }"
      class="action-icons"
      title="Add to Bookmarks"
      @click="addToBookmarks"
    />
    <font-awesome-icon
      v-if="bookmark"
      :icon="{ prefix: 'fas', iconName: 'bookmark' }"
      :style="{ color: 'red' }"
      class="action-icons delete-icon"
      title="Delete from Bookmarks"
      @click="deleteBookmark"
    />
    <!-- <font-awesome-icon
      :icon="{ prefix: 'fas', iconName: 'share-alt' }"
      class="action-icons"
      title="Share"
      @click="showModal('share-quote-modal')"
    /> -->
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
    }
  },
  methods: {
    addToBookmarks: function() {
      let url = `api/users/${this.currentUser.id}/bookmarks`
      this.$store.dispatch('createBookmark', {
        url,
        quote_id: this.quote.id,
        vm: this
      })
    },
    deleteBookmark: function() {
      let url = `api/users/${this.currentUser.id}/bookmarks/${this.bookmark.id}`
      this.$store.dispatch('deleteBookmark', { url, vm: this })
    },
    deleteQuote: function() {
      let url = `api/quotes/${this.quote.id}`
      this.$store.dispatch('deleteQuote', { url, vm: this })
    },
    canEditOrDelete: function() {
      if (
        this.quote &&
        this.quote.user &&
        this.currentUser &&
        this.quote.user.id === this.currentUser.id
      ) {
        return true
      } else {
        return false
      }
    },
    showModal(modalRef) {
      this.$refs[modalRef].show()
    }
  }
}
</script>

<style scoped>
.action-icons {
  cursor: pointer;
  font-size: 1.2em;
  margin: 0 1.5em;
}
.delete-icon {
  fill: red !important;
}
</style>
