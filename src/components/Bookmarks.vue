<template>
  <div>
    <h5>Bookmarks</h5>
    <BookmarksList :url="url" />
  </div>
</template>

<script>
import BookmarksList from '@/components/BookmarksList.vue'

export default {
  components: {
    BookmarksList
  },
  props: {
    currentUserId: Number
  },
  data() {
    return {
      url: `api/users/${this.currentUserId}/bookmarks`
    }
  }
}
</script>

<style></style>
