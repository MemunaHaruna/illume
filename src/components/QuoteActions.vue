<template>
  <div>
    <font-awesome-icon
      v-if="!bookmark"
      :icon="{ prefix: 'fas', iconName: 'bookmark' }"
      :style="{ color: '#343332' }"
      class="bookmark-icon"
      title="Bookmark"
      @click="addToBookmarks"
    />
    <font-awesome-icon
      v-if="bookmark"
      :icon="{ prefix: 'fas', iconName: 'bookmark' }"
      :style="{ color: 'red' }"
      class="bookmark-icon"
      title="Delete Bookmark"
      @click="deleteBookmark"
    />
  </div>
</template>

<script>
export default {
  props: {
    quote: Object,
    bookmark: Object
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
    }
  }
}
</script>

<style scoped>
.bookmark-icon {
  cursor: pointer;
  font-size: 1.5em;
}

.bookmark-icon:hover {
  color: #343332;
}
</style>
