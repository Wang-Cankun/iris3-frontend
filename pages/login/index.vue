<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 my-5>
        <h1 class="text-center">Sign in</h1>
      </v-flex>
      <v-flex xs12 sm4 offset-sm4 mt-3>
        <v-alert v-if="error" prominent type="error" dismissible>
          <v-row align="center">
            <v-col class="grow">Error: {{ error }}</v-col>
          </v-row>
        </v-alert>
        <form method="post" @submit.prevent="login">
          <v-layout column>
            <v-flex>
              <v-text-field
                id="email"
                v-model="email"
                name="email"
                label="Email"
                type="email"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                id="password"
                v-model="password"
                name="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" my-5>
              <v-btn color="primary" type="submit">
                Submit
              </v-btn>
            </v-flex>
            <p>
              Don't have an account?
              <nuxt-link to="/register">Submit</nuxt-link>
            </p>
            <p>
              Forgot your password?
              <nuxt-link to="/login/forgot">Reset password</nuxt-link>
            </p>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  middleware: 'guest',
  data: () => ({
    email: '',
    password: '',
    statusCode: '',
    error: '',
    snackbar: null,
  }),

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.email,
            password: this.password,
          },
        })
        this.$router.push('/')
        this.$store.commit('SET_TOKEN', this.$auth.getToken('local'))
        this.$axios.setToken(this.$auth.getToken('local'))
        this.$notifier.showMessage({
          content: 'Sign in success!',
          color: 'success',
        })
      } catch (e) {
        this.statusCode = e.response.data.statusCode
        this.error = e.response.data.message
        this.$notifier.showMessage({
          content: 'Login failed!',
          color: 'error',
        })
      }
    },
  },
}
</script>
