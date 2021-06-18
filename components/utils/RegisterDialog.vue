<template>
  <div>
    <v-dialog v-model="dialog" max-width="700">
      <v-card>
        <v-card-title>Sign up</v-card-title>
        <v-divider class="my-2 py-2"></v-divider>
        <v-card-text class="my-0 py-0">
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
                ></v-text-field>
                <v-text-field
                  id="lastName"
                  v-model="lastName"
                  name="lastName"
                  label="Last Name"
                  type="string"
                ></v-text-field>
                <v-text-field
                  id="institution"
                  v-model="institution"
                  name="institution"
                  label="Institution"
                  type="string"
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
                        information emails from IRIS3 adminsitrators (new
                        feature announcements, unplanned site maintenance,
                        general notices, etc.)
                      </v-tooltip>
                    </div>
                  </template>
                </v-checkbox>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn class="mx-2 mb-2" color="primary" dark @click="register()">
            sign up </v-btn
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
  computed: {},
  watch: {
    dialog(val) {
      !val && this.$emit('close')
    },
  },
  methods: {
    async register() {
      if (!this.$refs.form.validate()) return
      try {
        await this.$axios.post('deepmaps/api/auth/register', {
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
        this.$emit('close')
        this.$notifier.showMessage({
          content: 'Sign up success!',
          color: 'success',
        })
        this.$router.push('/')
      } catch (e) {
        this.statusCode = e.response.data.statusCode
        this.error = e.response.data.message
        this.$notifier.showMessage({
          content: 'Error: ' + this.error,
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
