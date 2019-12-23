<template>
  <div>
    <button
      id="google-login-button"
      @click.prevent="handleLogin('google_oauth2')"
    >
      Login to Google
    </button>
    <button id="facebook-login-button" @click.prevent="handleLogin('facebook')">
      Login to Facebook
    </button>
    <button @click.prevent="handleLogin('twitter')">
      Login to Twitter
    </button>
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
        this.popup.close()
        this.$store.commit('setCurrentUser', JSON.parse(data))
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

<style></style>
