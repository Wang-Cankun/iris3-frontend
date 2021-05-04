<template lang="html">
  <div v-if="loading" class="loading-page">
    <!--<h2>Calculating...</h2>-->
    <h2>Loading...</h2>
    <v-progress-circular
      width="6"
      color="primary"
      style="color: #30588c; width: 80px; height: 80px"
      indeterminate
    ></v-progress-circular>
    <div v-for="(progress, idx) in jobProgress" :key="idx">
      <p class="body-2">{{ progress }}</p>
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
  }),
  computed: {
    ...mapState({
      jobProgress: (state) => state.socket.jobProgress,
    }),
  },
  methods: {
    start() {
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
  },
}
</script>

<style>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  text-align: center;
  padding-top: 200px;
  font-size: 40px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  z-index: 1000;
}
</style>
