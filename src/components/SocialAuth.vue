<template>
  <div class="signin-buttons__container">
    <b-button
      id="twitter-login-button"
      class="my-2 my-sm-0 social-login__button"
      @click="handleLogin('twitter')"
    >
      <span
        ><font-awesome-icon
          :icon="{ prefix: 'fab', iconName: 'twitter' }"
          :style="{ color: '#55acee' }"
      /></span>
      <span>Sign in with Twitter</span>
    </b-button>

    <b-button
      id="google-login-button"
      class="my-2 my-sm-0 social-login__button"
      @click="handleLogin('google_oauth2')"
    >
      <span left
        ><font-awesome-icon
          :icon="{ prefix: 'fab', iconName: 'google' }"
          :style="{ color: '#dd4b39' }"
      /></span>
      Sign in with Google
    </b-button>
    <b-button
      id="facebook-login-button"
      class="my-2 my-sm-0 social-login__button"
      @click="handleLogin('facebook')"
    >
      <span left
        ><font-awesome-icon
          :icon="{ prefix: 'fab', iconName: 'facebook' }"
          :style="{ color: '#3b5998' }"
      /></span>
      Sign in with Facebook
    </b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socketId: window.localStorage.getItem('socketId'),
      popup: '',
      provider: ''
    }
  },
  channels: {
    AuthChannel: {
      connected() {
        console.log('socket connection completed')
      },
      rejected() {
        console.log('socket connection rejected')
      },
      received(data) {
        // TO-DO: handle login errors
        let parsedData = JSON.parse(data)
        this.$bvToast.toast(parsedData.message, {
          autoHideDelay: 2000,
          variant: 'success',
          noCloseButton: true
        })
        this.popup.close()
        this.$store.commit('setCurrentUser', parsedData)
      },
      disconnected() {
        console.log('socket connection disconnected')
      }
    }
  },
  methods: {
    handleLogin: function(provider) {
      const width = 600,
        height = 600
      const left = window.innerWidth / 2 - width / 2
      const top = window.innerHeight / 2 - height / 2
      const url =
        process.env.VUE_APP_API_BASE_URL +
        `auth/${provider}?socketId=${this.socketId}`
      this.popup = window.open(
        url,
        '_blank',
        `toolbar=no, location=no, directories=no, status=no, menubar=no,
        scrollbars=no, resizable=no, copyhistory=no, width=${width},
        height=${height}, top=${top}, left=${left}`
      )
    }
  },
  created() {
    window.localStorage.setItem(
      'socketId',
      parseInt(Math.random() * 1000000000, 10)
    )
  },
  mounted() {
    this.$cable.subscribe({
      channel: 'AuthChannel',
      socket_id: this.socketId
    })
  }
}
</script>

<style scoped>
.signin-buttons__container {
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 0.8em !important;
}
.social-login__button {
  background-color: white;
  border: 1px solid #dbded8;
  color: #343332;
  display: flex;
  justify-content: space-evenly;
  width: 14em;
  margin-bottom: 0.9em !important;
}
</style>
