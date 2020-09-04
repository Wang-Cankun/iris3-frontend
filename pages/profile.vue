<template>
  <v-container>
    <section class="section">
      <v-row no-gutters align="start" justify="center">
        <v-col xs="12" md="12" lg="8">
          <v-card>
            <v-card-title class="text-h4 font-weight-regular">
              Profile
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-show="!isModify">
              <p>
                <span class="text-h6 text--primary">Email: </span>
                <span class="text-h6 text--primary">{{ profile.email }}</span>
              </p>
              <p>
                <span class="text-h6 text--primary">Name: </span>
                <span class="text-h6 text--primary"
                  >{{ profile.firstName }} {{ profile.lastName }}</span
                >
              </p>
              <p>
                <span class="text-h6 text--primary">Institution: </span>
                <span class="text-h6 text--primary"
                  >{{ profile.institution }}
                </span>
              </p>
              <p>
                <span class="text-h6 text--primary"
                  >Admin Email Delivery:
                </span>
                <span class="text-h6 text--primary">{{ newsletter }}</span>
              </p>
              <v-btn color="primary" @click="isModify = true">Modify</v-btn>
            </v-card-text>
            <v-card-text v-show="isModify">
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                method="post"
                @submit.prevent="modifyProfile"
              >
                <v-layout column>
                  <v-flex>
                    <v-text-field
                      id="firstName"
                      v-model="formProfile.firstName"
                      name="firstName"
                      label="First Name"
                      type="string"
                      :rules="nameRules"
                      required
                    ></v-text-field>
                    <v-text-field
                      id="lastName"
                      v-model="formProfile.lastName"
                      name="lastName"
                      label="Last Name"
                      type="string"
                      :rules="nameRules"
                      required
                    ></v-text-field>
                    <v-text-field
                      id="institution"
                      v-model="formProfile.institution"
                      name="institution"
                      label="Institution"
                      type="string"
                      :rules="nameRules"
                      required
                    ></v-text-field>
                    <v-checkbox v-model="formProfile.newsletter">
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
                  <v-flex class="text-xs-center" my-5>
                    <v-btn color="primary" type="submit">Modify</v-btn>
                    <v-btn @click="isModify = false">Cancel</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
          </v-card>
          <v-card class="my-5">
            <v-card-title class="text-h4 font-weight-regular">
              Jobs
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text> </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  async fetch() {
    await this.$store.dispatch('fetchProfile', this.loggedInUser.email)
  },
  data() {
    return {
      valid: true,
      isModify: false,
      nameRules: [
        (v) => !!v || 'Field is required',
        (v) => (v && v.length <= 30) || 'Field must be less than 30 characters',
        (v) => (v && v.length > 1) || 'Field must be more than 1 characters',
      ],
    }
  },
  middleware: 'auth',
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      profile: (state) => state.profile,
    }),
    newsletter() {
      return this.profile.newsletter ? 'Yes' : 'No'
    },
    formProfile() {
      return JSON.parse(JSON.stringify(this.profile))
    },
  },
  methods: {
    async modifyProfile() {
      if (!this.$refs.form.validate()) return
      try {
        await this.$axios.post('users/' + this.formProfile.email, {
          firstName: this.formProfile.firstName,
          lastName: this.formProfile.lastName,
          institution: this.formProfile.institution,
          newsletter: this.formProfile.newsletter,
        })
        this.$notifier.showMessage({
          content: 'Profile updated!',
          color: 'success',
        })
        this.$router.push('/profile')
      } catch (e) {
        this.$notifier.showMessage({
          content: 'Profile update failed!',
          color: 'error',
        })
        this.statusCode = e.response.data.statusCode
        this.error = e.response.data.message
      }
    },
  },
}
</script>
