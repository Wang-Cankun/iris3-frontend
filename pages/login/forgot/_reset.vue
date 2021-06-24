<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" my-5>
        <h1 class="text-center">Reset password</h1>
      </v-flex>
      <v-flex xs12 sm4 offset-sm4 mt-3>
        <v-alert v-if="error" prominent type="error" dismissible>
          <v-row align="center">
            <v-col class="grow">Error code {{ statusCode }}: {{ error }}</v-col>
          </v-row>
        </v-alert>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          method="post"
          @submit.prevent="register"
        >
          <v-layout column>
            <v-flex>
              <v-text-field
                id="Email"
                name="Email"
                label="Email"
                type="Email"
                :value="email"
                disabled
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                id="password"
                v-model="password"
                name="password"
                label="New password"
                type="password"
                required
                :rules="passwordRules"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm new password"
                type="password"
                :rules="confirmPasswordRules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" my-5>
              <v-btn color="primary" type="submit">Submit</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  middleware: 'guest',
  data() {
    return {
      valid: true,
      password: '',
      confirmPassword: '',
      statusCode: '',
      error: null,
      passwordRules: [
        (value) => !!value || 'Please type password.',
        (value) => (value && value.length >= 6) || 'minimum 6 characters',
      ],
      confirmPasswordRules: [
        (value) => !!value || 'Please type confirm password',
        (value) =>
          value === this.password ||
          'The password confirmation does not match.',
      ],
    }
  },
  computed: {
    token() {
      return this.$route.query.token
    },
    email() {
      return this.$route.query.email
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    async register() {
      if (!this.$refs.form.validate()) return
      try {
        await this.$axios.post('deepmaps/api/auth/password/forgot', {
          email: this.email,
          password: this.password,
          token: this.token,
        })

        await this.$auth.loginWith('local', {
          data: {
            username: this.email,
            password: this.password,
          },
        })

        this.$notifier.showMessage({
          content: 'Change password success!',
          color: 'success',
        })
        this.$router.push('/')
      } catch (e) {
        this.statusCode = e.response.data.statusCode
        this.error = e.response.data.message
      }
    },
  },
}
</script>
