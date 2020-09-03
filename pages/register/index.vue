<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" my-5>
        <h1 class="text-center">Sign up</h1>
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
                id="email"
                v-model="email"
                name="email"
                label="Email"
                type="email"
                :rules="emailRules"
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
                :rules="passwordRules"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                :rules="confirmPasswordRules"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                id="firstName"
                v-model="firstName"
                name="firstName"
                label="First Name"
                type="string"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
                id="lastName"
                v-model="lastName"
                name="lastName"
                label="Last Name"
                type="string"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
                id="institution"
                v-model="institution"
                name="institution"
                label="Institution"
                type="string"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-checkbox v-model="newsletter">
                <template v-slot:label>
                  <div>
                    Admin Email Delivery.
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon color="primary" dark v-on="on"
                          >mdi-help-circle-outline</v-icon
                        >
                      </template>
                      By checking this option, you would like to receive
                      information emails from IRIS3 adminsitrators (new feature
                      announcements, unplanned site maintenance, general
                      notices, etc.)
                    </v-tooltip>
                  </div>
                </template>
              </v-checkbox>
            </v-flex>
            <v-flex class="text-xs-center" my-5>
              <v-btn color="primary" type="submit">Sign Up</v-btn>
              <div class="has-text-centered" style="margin-top: 20px;">
                Already got an account?
                <nuxt-link to="/login">Sign in</nuxt-link>
              </div>
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
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      institution: '',
      newsletter: false,
      confirmPassword: '',
      statusCode: '',
      error: null,
      emailRules: [
        (v) => (/.+@.+\..+/.test(v) && v.length > 0) || 'E-mail must be valid',
      ],
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
      nameRules: [
        (v) => !!v || 'Field is required',
        (v) => (v && v.length <= 30) || 'Field must be less than 30 characters',
        (v) => (v && v.length > 1) || 'Field must be more than 1 characters',
      ],
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    async register() {
      if (!this.$refs.form.validate()) return
      try {
        await this.$axios.post('users', {
          username: this.username,
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          institution: this.institution,
          newsletter: this.newsletter,
          job: [],
        })

        await this.$auth.loginWith('local', {
          data: {
            username: this.email,
            password: this.password,
          },
        })
        this.$notifier.showMessage({
          content: 'Sign up success!',
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
