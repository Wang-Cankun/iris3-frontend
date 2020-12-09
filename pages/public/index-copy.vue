<template>
  <v-container>
    <v-row class="my-12 justify-center">
      <v-row class="justify-center">
        <p class="text-h4">
          Public IRIS3 Projects
        </p>
      </v-row>

      <v-tabs v-model="tab">
        <v-tab>Windows</v-tab>
        <v-tab>Table</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-row class="justify-center">
            <v-card class="my-12" color="#ECEFF1" outlined rounded="lg">
              <v-card-title class="justify-center">Project title</v-card-title>
              <v-card outlined class="mx-9" height="100" rounded="lg">
                <v-card-subtitle>Here are project description</v-card-subtitle>
              </v-card>
              <v-row class="my-2" justify="space-around">
                <v-card outlined rounded="lg"
                  ><v-card-subtitle class="justify-center"
                    >ID: P00001</v-card-subtitle
                  ></v-card
                >
                <v-card outlined rounded="lg"
                  ><v-card-subtitle class="justify-center"
                    >Owner: XXXX</v-card-subtitle
                  ></v-card
                >
                <v-card outlined rounded="lg"
                  ><v-card-subtitle class="justify-center"
                    >Created: 10/29/2020</v-card-subtitle
                  ></v-card
                >
                <v-card outlined rounded="lg"
                  ><v-card-subtitle class="justify-center"
                    >Species: Human</v-card-subtitle
                  ></v-card
                >
                <v-card outlined rounded="lg"
                  ><v-card-subtitle class="justify-center"
                    >scRNA-Seq</v-card-subtitle
                  ></v-card
                >
              </v-row>
              <v-row class="px-8">
                <v-col>
                  <v-btn
                    color="warning"
                    rounded="pill"
                    width="340"
                    @click="expand = !expand"
                    >0 Pending jobs</v-btn
                  >
                  <v-expand-transition>
                    <v-card v-show="expand" height="100"></v-card>
                  </v-expand-transition>
                </v-col>
                <v-col>
                  <v-btn
                    color="success"
                    rounded="pill"
                    width="340"
                    @click="expand1 = !expand1"
                    >1 Completed jobs</v-btn
                  >
                  <v-expand-transition>
                    <v-card v-show="expand1" height="100"></v-card>
                  </v-expand-transition>
                </v-col>
                <v-col>
                  <v-btn
                    color="error"
                    rounded="pill"
                    width="340"
                    @click="expand2 = !expand2"
                    >0 Error jobs</v-btn
                  >
                  <v-expand-transition>
                    <v-card v-show="expand2" height="100"></v-card>
                  </v-expand-transition>
                </v-col>
              </v-row>
            </v-card>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tab: null,
    expand: false,
    expand1: false,
    expand2: false,
  }),
}
</script>
