<template>
  <v-container>
    <v-layout column justify-center align-center>
      <v-flex class="text-xs-center" mt-5>
        <h1>Contact page</h1>
        <v-btn color="primary" type="submit" @click="showMsg()">
          Test Snackbar</v-btn
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    showMsg() {
      this.$notifier.showMessage({
        content: 'Login failed!',
        color: 'error',
      })
    },
  },
}
</script>
