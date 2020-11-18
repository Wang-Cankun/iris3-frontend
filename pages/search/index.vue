<template>
  <v-container>
    <v-row class="my-12 justify-center">
      <v-row class="justify-center">
        <p class="text-h4">
          Search
        </p>
      </v-row>
    </v-row>

    <v-row class="px-7">
      <p class="title">Search</p>
      <v-btn class="ml-10" color="primary">Admain search</v-btn>
    </v-row>
    <v-row class="px-7 justify-center">
      <v-text-field
        v-model="searchJobId"
        clearable
        solo
        label="P00001/User/Species/Tissue?"
        type="search"
        outlined
      ></v-text-field>
      <v-btn class="ml-2" color="primary" height="56">Go</v-btn>
    </v-row>
    <v-row class="justify-center">
      <v-card class="my-12" color="#BBDEFB" outlined rounded="lg">
        <v-card-title class="justify-center">Project title</v-card-title>
        <v-card outlined class="mx-9" height="100" rounded="lg">
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
              <v-card v-show="expand" height="100" width="340"></v-card>
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
              <v-card v-show="expand1" height="100" width="340"></v-card>
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
              <v-card v-show="expand2" height="100" width="340"></v-card>
            </v-expand-transition>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <v-row class="my-12 justify-center">
      <v-card class="my-12" color="error" outlined rounded="lg" width="1140">
        <v-row justify="center">
          <v-icon x-large>mdi-alert-circle</v-icon>
        </v-row>
        <v-card-title class="justify-center">No Project Found</v-card-title>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    expand: false,
    expand1: false,
    expand2: false,
  }),
}
</script>
