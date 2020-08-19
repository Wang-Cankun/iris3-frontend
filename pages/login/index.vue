<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 mt-5>
        <h1 class="text-center">Sign in</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-alert v-if="error" prominent type="error" dismissible>
          <v-row align="center">
            <v-col class="grow">Error code {{ statusCode }}: {{ error }}</v-col>
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
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit">
                Submit
              </v-btn>
              <p>
                Don't have an account?
                <nuxt-link to="/register">Register</nuxt-link>
              </p>
            </v-flex>
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
        this.SET_SNACK(true)
      } catch (e) {
        this.statusCode = e.response.data.statusCode
        this.error = e.response.data.message
      }
    },
  },
}
</script>
