<template>
  <v-col class="mb-2" cols="12">
    <v-tabs v-model="tab" color="primary" slider-color="purple">
      <v-tab>Dataset 1 </v-tab>
      <v-tab>Dataset 2 </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card outlined hover>
          <v-col cols="3">
            <v-card outlined hover color="grey lighten-1">
              <p class="title text-center">Original data statistics</p>
              <p class="ml-4 title-h4">Cell number</p>
              <p class="ml-4 title-h4">Gene number</p>
              <p class="ml-4 title-h4">Average expression level</p>
              <p class="ml-4 title-h4">Zero expression percentage</p>
              <p class="title text-center">Current data statistics</p>
              <p class="ml-4 title-h4">Cell number</p>
              <p class="ml-4 title-h4">Gene number</p>
              <p class="ml-4 title-h4">Average expression level</p>
              <p class="ml-4 title-h4">Zero expression percentage</p>
              <v-row justify="center">
                <v-btn color="Primary" width="300" rounded
                  >Download Pre-processed data</v-btn
                >
              </v-row>
            </v-card>

            <v-card class="mt-6" outlined hover color="grey lighten-1">
              <p class="title text-center">Preprocessing Prarmeters</p>
              <p class="ml-4 title-h4">Cell filter</p>
              <v-text-field
                v-model="title"
                class="px-6"
                outlined
                background-color="white"
              ></v-text-field>
              <p class="ml-4 title-h4">Gene filter</p>
              <v-text-field
                v-model="title"
                class="px-6"
                outlined
                background-color="white"
              ></v-text-field>
              <p class="ml-4 title-h4">Normalization</p>
              <v-text-field
                v-model="title"
                class="px-6"
                outlined
                background-color="white"
              ></v-text-field>
              <v-row justify="center">
                <v-btn color="Primary" width="300" rounded>Update</v-btn>
              </v-row>
            </v-card>
          </v-col>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card outlined hover>
          <v-col cols="3">
            <v-card outlined hover color="grey lighten-1">
              <p class="title text-center">Original data statistics</p>
              <p class="ml-4 title-h4">Cell number</p>
              <p class="ml-4 title-h4">Gene number</p>
              <p class="ml-4 title-h4">Average expression level</p>
              <p class="ml-4 title-h4">Zero expression percentage</p>
              <p class="title text-center">Current data statistics</p>
              <p class="ml-4 title-h4">Cell number</p>
              <p class="ml-4 title-h4">Gene number</p>
              <p class="ml-4 title-h4">Average expression level</p>
              <p class="ml-4 title-h4">Zero expression percentage</p>
              <v-row justify="center">
                <v-btn color="Primary" width="300" rounded
                  >Download Pre-processed data</v-btn
                >
              </v-row>
            </v-card>

            <v-card class="mt-6" outlined hover color="grey lighten-1">
              <p class="title text-center">Preprocessing Prarmeters</p>
              <p class="ml-4 title-h4">Cell filter</p>
              <v-text-field
                v-model="title"
                class="px-6"
                outlined
                background-color="white"
              ></v-text-field>
              <p class="ml-4 title-h4">Gene filter</p>
              <v-text-field
                v-model="title"
                class="px-6"
                outlined
                background-color="white"
              ></v-text-field>
              <p class="ml-4 title-h4">Normalization</p>
              <v-text-field
                v-model="title"
                class="px-6"
                outlined
                background-color="white"
              ></v-text-field>
              <v-row justify="center">
                <v-btn color="Primary" width="300" rounded>Update</v-btn>
              </v-row>
            </v-card>
          </v-col>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-col>
</template>
<script>
export default {
  data: () => ({
    tab: null,
  }),
}
</script>
