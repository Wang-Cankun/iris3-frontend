<template lang="html">
  <div v-if="loading" class="loading-page">
    <div class="my-12 py-12">
      <v-progress-circular
        width="5"
        color="primary"
        style="color: #30588c; width: 80px; height: 80px"
        indeterminate
      ></v-progress-circular>
    </div>
    <div class="loading-cancel">
      <h2>Calculating {{ dotValue.slice(0, dot) }}</h2>
    </div>
    <div class="loading-cancel">
      <v-btn @click="cancel">cancel</v-btn>
    </div>
    <div v-if="uploadProgress" class="text-left body-2">
      <p>Upload progress: {{ uploadProgress }}%</p>
    </div>
    <div
      v-for="(progress, idx) in jobProgress"
      :key="idx"
      class="text-left body-2"
    >
      <p>{{ progress }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    loading: false,
    continuous: true,
    progress: 0,
    error: '',
    dot: 1,
    dotValue: '.....',
  }),
  computed: {
    ...mapState({
      jobProgress: (state) => state.socket.jobProgress,
      uploadProgress: (state) => state.socket.uploadProgress,
    }),
  },
  mounted() {
    window.setInterval(() => {
      this.dot = this.dot + 1
      if (this.dot > 5) {
        this.dot = 0
      }
    }, 500)
  },
  methods: {
    start() {
      this.$store.commit('socket/CLEAR_JOB_PROGRESS')
      this.loading = true
    },
    stop() {
      this.loading = false
    },
    finish() {
      this.$store.commit('socket/CLEAR_JOB_PROGRESS')
      this.loading = false
    },
    fail(error) {
      this.error = error
    },
    cancel() {
      this.finish()
    },
  },
}
</script>

<style>
.loading-page {
  position: fixed;
  top: 75px;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.782);
  text-align: center;
  padding-top: 300px;

  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  z-index: 1000;
}

.loading-cancel {
  margin-top: 2em;
}
</style>
