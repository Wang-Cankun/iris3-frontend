<template>
  <div><v-btn @click="method1()">Socket</v-btn> {{ message }}</div>
</template>

<script>
// import socket from '~/plugins/socket.io.js'

export default {
  asyncData() {
    /**
     *
     *
     * return new Promise((resolve) =>
      socket.emit('last-messages', (messages) => resolve({ messages }))
    )
     */
  },
  data() {
    return { message: '123' }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/',
    })
    this.socket.on('connected', () => {
      console.log('Connected')
    })
  },
  methods: {
    method1() {
      /* Emit events */
      this.socket.emit(
        'submit',
        {
          hello: 'hello',
        },
        (resp) => {
          /* Handle response, if any */
          this.message = resp
          console.log(resp)
        }
      )
    },
  },
  head: {
    title: 'Nuxt.js with Socket.io',
  },
}
</script>

<style></style>
