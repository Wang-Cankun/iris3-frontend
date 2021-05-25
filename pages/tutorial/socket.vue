<template>
  <v-container>
    <v-row class="my-12 justify-center">
      <v-row class="justify-center">
        <p class="text-h4">Tutorial</p>
        <v-btn @click="getMessage">emit</v-btn>
        <v-progress-linear color="primary" indeterminate></v-progress-linear>
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

  methods: {
    getMessage() {
      this.$nuxt.$loading.start()
      setTimeout(() => {
        this.$store.commit('socket/SET_JOB_PROGRESS', '1')
        this.$nuxt.$loading.finish()
      }, 1000000)
    },
  },
}
</script>
