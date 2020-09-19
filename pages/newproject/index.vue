<template>
  <div>
    <v-stepper v-model="e1" alt-labels>
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Upload data</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"
          >Preprocessing</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3"
          >Cell clustering</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 4" step="4"
          >DGE analysis</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 5" step="5">Regulon</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 6" step="6">Job summary</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="7">Results</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 2">
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 3">
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 4">
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 5">
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="5">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 6">
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="6">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 7">
            Continue
          </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="7">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      e1: 1,
    }
  },
}
</script>
