<template>
  <div class="illume-header">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="/" class="illume-brand">illume</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2 search-quotes"
              placeholder="Title, Topic or Author"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="currentUser">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{ currentUser.name }}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#" @click.prevent="logout"
              >Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!currentUser">
          <b-button v-b-modal.modal-1 class="my-2 my-sm-0 signin-button"
            >Sign in</b-button
          >
          <b-modal id="modal-1" title="Signin to illume">
            <div class="signin-modal">
              <p>
                Sign in to get access to premium quotes, create your own quotes,
                bookmark and share your favourite quotes.
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
      this.$store.commit('handleLogout')
      // this.$router.push('/')
      this.$bvToast.toast('Signed out successfully', {
        autoHideDelay: 2000,
        variant: 'success',
        noCloseButton: true
      })
    }
  },
  components: {
    SocialAuth
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

@media (min-width: 576px) {
  .search-quotes {
    width: 20em !important;
  }
}

input {
  margin-right: 0 !important;
}

.signin-button {
  background-color: #e27a4d !important;
  border-color: #e27a4d;
}
.signin-button:hover {
  background-color: #ffffff !important;
  color: #343332 !important;
}

.signin-modal {
  font-size: 0.9em;
  color: rgba(0, 0, 0, 0.54);
  text-align: center !important;
}
</style>
