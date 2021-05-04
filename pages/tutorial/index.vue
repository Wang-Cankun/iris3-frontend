<template>
  <v-container>
    <v-row class="my-12 justify-center">
      <v-row class="justify-center">
        <p class="text-h4">Tutorial</p>
        {{ jobProgress }}
        <v-btn @click="getMessage">emit</v-btn>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      sock: null,
      messageRxd: '123',
    }
  },

  computed: {
    ...mapState({
      jobProgress: (state) => state.socket.jobProgress,
    }),
  },
  mounted() {
    this.socket = this.$nuxtSocket({ name: 'main' })
    this.socket.on('jobProgress', (msg) => {
      /* Handle event */
      console.log(msg)
      // this.progress = msg
    })
  },
  methods: {
    getMessage() {
      // this.socket.emit('jobProgress', { id: 'abc123' }, (resp) => {
      //   this.messageRxd = resp
      // })
      this.$nuxt.$loading.start()
      setTimeout(() => {
        console.log('sleep end')
        this.$nuxt.$loading.finish()
      }, 6000)
    },
  },
}
</script>
