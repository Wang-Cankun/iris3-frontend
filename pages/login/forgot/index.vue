<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 my-5>
        <h1 class="text-center">Reset password</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
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
          @submit.prevent="sendEmail"
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
            <v-flex class="text-xs-center" my-5>
              <v-btn color="primary" type="submit"> Submit </v-btn>
              <p>You will receive an email to reset your password.</p>
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
      email: '',
      statusCode: '',
      error: null,
      emailRules: [
        (v) => (/.+@.+\..+/.test(v) && v.length > 0) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    async sendEmail() {
      if (!this.$refs.form.validate()) return
      try {
        await this.$axios.post('deepmaps/api/auth/forgot', {
          email: this.email,
        })

        this.$notifier.showMessage({
          content: 'An email has been sent to: ' + this.email,
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
