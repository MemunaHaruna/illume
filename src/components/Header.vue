<template>
  <div class="illume-header">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="/" class="illume-brand">illume</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-form>
            <Search />
          </b-nav-form>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="currentUser">
          <b-nav-item>
            <b-button
              block
              v-b-modal.modal-2
              class="my-2 my-sm-0 create-quote-button"
              >Add a Quote</b-button
            >
            <b-modal id="modal-2" title="Add a Quote" :hide-footer="true">
              <CreateQuote />
            </b-modal>
          </b-nav-item>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{ currentUser.name }}</em>
            </template>
            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="logout"
              >Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!currentUser">
          <b-button v-b-modal.modal-1 class="my-2 my-sm-0 signin-button"
            >Sign in</b-button
          >
          <b-modal id="modal-1" title="Signin to illume" :hide-footer="true">
            <div class="signin-modal">
              <p>
                Sign in to get access to premium quotes, create your own quotes,
                bookmark and share your favourite quotes with your friends.
              </p>
              <SocialAuth />
            </div>
          </b-modal>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import SocialAuth from '@/components/SocialAuth.vue'
import Search from '@/components/Search.vue'
import CreateQuote from '@/components/CreateQuote.vue'

export default {
  data() {
    return {}
  },
  computed: {
    currentUser() {
      return this.$store.getters['currentUser']
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch('handleLogout')
      this.$bvToast.toast('Signed out successfully', {
        autoHideDelay: 1000,
        variant: 'success',
        noCloseButton: true
      })
      if (this.$router.currentRoute.name != 'home') {
        this.$router.push('/')
      }
    }
  },
  components: {
    SocialAuth,
    Search,
    CreateQuote
  }
}
</script>

<style scoped>
@media (min-width: 1024px) {
  .illume-brand {
    border-right: 1px solid #dbded8;
    padding-right: 0.5em !important;
  }
}

.signin-button,
.create-quote-button {
  background-color: #e27a4d !important;
  border-color: #e27a4d;
}
.signin-button:hover,
.create-quote-button:hover {
  background-color: #ffffff !important;
  color: #343332 !important;
}

.signin-modal {
  font-size: 0.9em;
  color: rgba(0, 0, 0, 0.54);
  text-align: center !important;
}
</style>
