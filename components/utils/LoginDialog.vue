<template>
  <div>
    <v-dialog v-model="dialog" max-width="700">
      <v-card>
        <v-card-title>Sign in</v-card-title>
        <v-divider class="my-2 py-2"></v-divider>
        <v-card-text>
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
                <v-btn color="primary" type="submit"> Submit </v-btn>
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
          <v-btn class="mx-2" color="primary" dark @click="login()">
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
  computed: {},
  methods: {
    login() {
      this.$emit('close')
      return 1
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>
