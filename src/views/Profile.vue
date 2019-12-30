<template>
  <div v-if="currentUser">
    <header class="header-section">
      <div class="header-avatar" v-if="currentUser.avatar_url">
        <img
          :src="currentUser.avatar_url"
          alt="user avatar"
          width="100"
          height="100"
        />
      </div>
      <p class="username">{{ currentUser.name }}</p>
      <p>{{ currentUser.email }}</p>
    </header>
    <div>
      <b-tabs content-class="mt-3" fill>
        <b-tab title="My Quotes" active>
          <PersonalQuotes />
        </b-tab>
        <b-tab title="Bookmarked Quotes">
          <Bookmarks :currentUserId="currentUser.id" />
        </b-tab>
        <b-tab title="Notifications">
          <h5>Notifications</h5>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import PersonalQuotes from '@/components/PersonalQuotes.vue'
import Bookmarks from '@/components/Bookmarks.vue'

export default {
  components: {
    PersonalQuotes,
    Bookmarks
  },
  computed: {
    currentUser() {
      return this.$store.getters['currentUser']
    }
  }
}
</script>

<style scoped>
.header-section {
  height: 210px;
  background-color: #343332;
  color: #ffffff;
  /* background: url('https://source.unsplash.com/1600x400?wallpapers'); */
}

.header-avatar img {
  border-radius: 50px;
  margin: 0.6em 0;
}
.username {
  font-size: 1.5em;
}
</style>
