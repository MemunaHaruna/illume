<template>
  <div>
    <h5>Bookmarks</h5>
    <BookmarksList />
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
  }
}
</script>

<style></style>
