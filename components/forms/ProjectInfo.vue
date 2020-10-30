<template>
  <v-col class="mb-2" cols="12">
    <v-card class="mx-auto">
      <v-card-title class="primary white--text title-1">
        Project summary
      </v-card-title>
      <v-layout row wrap>
        <v-flex xs12 md12 lg5
          ><v-card-title class="ma-2 py-0 subtitle-1 font-weight-bold"
            >Project information<v-divider class="ma-2 py-0"></v-divider
          ></v-card-title>

          <v-card-text>
            <p class="ma-2">
              <span class="text--secondary">Project ID: </span>
              <span class="text--primary">{{ projectId }}</span>
            </p>
            <p class="ma-2">
              <span class="text--secondary">Project title: </span>
              <span class="text--primary">{{ projectTitle }}</span>
            </p>
            <p class="ma-2">
              <span class="text--secondary">Project description: </span>
              <span class="text--primary">{{ projectDescription }}</span>
            </p>
            <p class="ma-2">
              <span class="text--secondary">Project create data: </span>
              <span class="text--primary">{{ projectCreateDate }}</span>
            </p>
            <p class="ma-2">
              <span class="text--secondary">Project creator: </span>
              <span class="text--primary">{{ projectCreator }}</span>
            </p>
          </v-card-text>
        </v-flex>
        <v-flex xs12 md12 lg7
          ><v-card-title class="ma-2 py-0 subtitle-1 font-weight-bold"
            >Job information
            <v-divider class="ma-2 py-0"></v-divider>
          </v-card-title>
          <v-card-text>
            <p class="ma-2">
              <span class="text--secondary">Job ID: </span>
              <span class="text--primary">{{ jobId }}</span>
            </p>
            <p class="ma-2">
              <span class="text--secondary">Job create date: </span>
              <span class="text--primary">{{ jobCreateDate }}</span>
            </p>
            <p class="ma-2">
              <span class="text--secondary">Job creator: </span>
              <span class="text--primary">{{ jobCreator }}</span>
            </p>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
  </v-col>
</template>
<script>
export default {
  data() {
    return {
      projectTitle: 'Example title1',
      projectDescription: 'Example description1',
      projectCreateDate: '10/29/2020',
      jobCreateDate: '10/29/2020',
      projectCreator: 'Admin',
      jobCreator: 'Admin',
      projectId: 'P000001',
      jobId: 'P000001-admin001',
    }
  },
  computed: {},
}
</script>
