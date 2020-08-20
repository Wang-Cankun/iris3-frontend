<template>
  <v-layout column justify-center align-center>
    <img width="600px" src="img/iris3_logo_clip2.svg" />
    <v-flex class="text-xs-center" mt-5>
      <h1>Welcome to IRIS3</h1>
    </v-flex>
    <v-flex class="text-xs-center" mt-3>
      <blockquote class="blockquote text-xs-center">
        Integrated Cell-type-specific Regulon Inference Server from Single-cell
        RNA-Seq
      </blockquote>
    </v-flex>
    <v-flex sm6 class="text-xs-center" ma-5>
      <v-btn color="primary" to="/submit">Submit</v-btn>
      <v-btn color="secondary" to="/register">Register</v-btn>
      <v-btn to="/login">Login</v-btn>
    </v-flex>
    <v-flex class="text-xs-center" mt-5>
      <v-btn color="primary" large>primary</v-btn>
      <v-btn color="secondary" large>secondary</v-btn>
      <v-btn color="tertiary" class="white--text" large>tertiary</v-btn>
      <v-btn color="accent" large>accent</v-btn>
      <v-btn color="error" large>error</v-btn>
      <v-btn color="info" large>info</v-btn>
      <v-btn color="success" large>success</v-btn>
      <v-btn color="warning" large>warning</v-btn>
    </v-flex>
    <v-flex class="text-xs-center" mt-5>
      <v-btn color="primary" @click="showSnackbar('Hello, snackbar', '')">
        Default snackbar
      </v-btn>
      <v-btn
        color="success"
        @click="showSnackbar('Hello, snackbar', 'success')"
      >
        Success snackbar
      </v-btn>
      <v-btn color="error" @click="showSnackbar('Hello, snackbar', 'error')">
        Error snackbar
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    showSnackbar(msg, col) {
      this.$notifier.showMessage({ content: msg, color: col })
    },
  },
  head() {
    return {
      title: 'IRIS3',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Integrated Cell-type-specific Regulon Inference Server from Single-cell RNA-Seq',
        },
      ],
    }
  },
}
</script>
