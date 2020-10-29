<template>
  <v-container>
    <v-row class="my-10" justify="center">
      <!-- Header Text -->
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
        <v-card class="my-12" outlined color="accent" height="380" rounded="lg">
          <v-card-title class="justify-center">Project title</v-card-title>
          <v-card outlined class="mx-10" height="100" rounded="lg">
            <v-card-subtitle>Here are project description</v-card-subtitle>
          </v-card>
          <v-row class="ma-4" justify="space-around">
            <v-card outlined rounded="lg"
              ><v-card-title class="justify-center"
                >ID: P00001</v-card-title
              ></v-card
            >
            <v-card outlined rounded="lg"
              ><v-card-title class="justify-center"
                >Owner: XXXX</v-card-title
              ></v-card
            >
            <v-card outlined rounded="lg"
              ><v-card-title class="justify-center"
                >Created: 10/29/2020</v-card-title
              ></v-card
            >
            <v-card outlined rounded="lg"
              ><v-card-title class="justify-center"
                >Species: Human</v-card-title
              ></v-card
            >
            <v-card outlined rounded="lg"
              ><v-card-title class="justify-center"
                >scRNA-Seq</v-card-title
              ></v-card
            >
          </v-row>
          <v-row class="ma-6" justify="space-around">
            <v-card color="warning" outlined rounded="pill" width="340"
              ><v-card-title class="justify-center"
                >0 Pending jobs</v-card-title
              ></v-card
            >
            <v-card color="success" outlined rounded="pill" width="340"
              ><v-card-title class="justify-center"
                >1 Completed jobs</v-card-title
              ></v-card
            >
            <v-card color="error" outlined rounded="pill" width="340"
              ><v-card-title class="justify-center"
                >0 Error jobs</v-card-title
              ></v-card
            >
          </v-row>
        </v-card>

        <v-card outlined class="my-12" color="accent" height="380" rounded="lg">
          <v-card-title class="justify-center">Project title</v-card-title>
          <v-card outlined class="mx-10" height="100" rounded="lg">
            <v-card-subtitle>Here are project description</v-card-subtitle>
          </v-card>
          <v-row class="ma-4" justify="space-around">
            <v-card outlined rounded="lg"
              ><v-card-title class="justify-center"
                >ID: P00002</v-card-title
              ></v-card
            >
            <v-card outlined rounded="lg"
              ><v-card-title class="justify-center"
                >Owner: XXXX</v-card-title
              ></v-card
            >
            <v-card outlined rounded="lg"
              ><v-card-title class="justify-center"
                >Created: 10/30/2020</v-card-title
              ></v-card
            >
            <v-card outlined rounded="lg"
              ><v-card-title class="justify-center"
                >Species: Human</v-card-title
              ></v-card
            >
            <v-card outlined rounded="lg"
              ><v-card-title class="justify-center"
                >scRNA-Seq</v-card-title
              ></v-card
            >
          </v-row>
          <v-row class="ma-6" justify="space-around">
            <v-card color="warning" outlined rounded="pill" width="340"
              ><v-card-title class="justify-center"
                >1 Pending jobs</v-card-title
              ></v-card
            >
            <v-card color="success" outlined rounded="pill" width="340"
              ><v-card-title class="justify-center"
                >1 Completed jobs</v-card-title
              ></v-card
            >
            <v-card color="error" outlined rounded="pill" width="340"
              ><v-card-title class="justify-center"
                >1 Error jobs</v-card-title
              ></v-card
            >
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tab: null,
  }),
}
</script>
