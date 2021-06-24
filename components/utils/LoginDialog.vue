<template>
  <div>
    <v-dialog v-model="computedDialog" max-width="700">
      <v-card>
        <v-card-title>Sign in</v-card-title>
        <v-divider class="my-2 py-2"></v-divider>
        <v-card-text class="my-0 py-0">
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
              <p>
                Don't have an account?
                <nuxt-link to="/register">Register</nuxt-link>
              </p>
              <p>
                Forgot your password?
                <nuxt-link to="/login/forgot">Reset password</nuxt-link>
              </p>
              <!--<a
                href="http://localhost:9005/iris3/api/auth/google"
                target="blank"
                ><v-img
                  max-width="180px"
                  src="img/btn_google_signin_dark_normal_web.png"
                >
                </v-img
              ></a>-->
            </v-layout>
          </form>
        </v-card-text>

        <v-card-actions>
          <v-btn class="mx-2 mb-2" color="primary" dark @click="login()">
            sign in </v-btn
          ><v-btn color="grey darken-1" text @click="close()"> cancel </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      value: 1,
      email: '',
      password: '',
      statusCode: '',
      error: '',
      snackbar: null,
    }
  },
  computed: {
    url() {
      return this.$route.params
    },
    computedDialog: {
      get() {
        return this.dialog
      },
      set(val) {
        !val && this.$emit('close')
      },
    },
  },
  watch: {
    url() {
      this.$emit('close')
    },
  },
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
        this.$emit('close')
        console.log(
          this.$store.getters.loggedInUser,
          this.$auth.getToken('local')
        )
        this.$store.dispatch(
          'fetchProfile',
          this.$store.getters.loggedInUser,
          this.$auth.getToken('local')
        )
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
    close() {
      this.$emit('close')
    },
  },
}
</script>
