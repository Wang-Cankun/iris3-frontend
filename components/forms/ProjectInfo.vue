<template>
  <v-col class="mb-2" cols="12">
    <v-card class="mx-auto">
      <v-expansion-panels v-model="panel">
        <v-expansion-panel>
          <v-card-title class="primary white--text title-1">
            <v-expansion-panel-header>
              Project summary
            </v-expansion-panel-header>
          </v-card-title>

          <v-expansion-panel-content>
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
                    <span class="text--primary">{{ jobid }}</span>
                  </p>
                  <p class="ma-2">
                    <span class="text--secondary">Create date: </span>
                    <span class="text--primary">{{ jobCreateDate }}</span>
                  </p>
                  <p class="ma-2">
                    <span class="text--secondary">Creator: </span>
                    <span class="text--primary">{{ jobCreator }}</span>
                  </p>
                  <p class="ma-2">
                    <span class="text--secondary">Species: </span>
                    <span class="text--primary">{{ species }}</span>
                  </p>
                  <p class="ma-2">
                    <span class="text--secondary">Uploaded files: </span>
                    <span class="text--primary">{{ uploadFiles }}</span>
                  </p>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: {
    jobid: { type: String, required: true, default: 'example' },
  },

  async fetch() {
    const files = await this.$axios
      .get('deepmaps/api/file/upload/' + this.jobid)
      .then((res) => res.data)
    this.uploadFiles = files.map((file) => file.originalname)
    this.species = files.map((file) => file.species)
  },
  data() {
    return {
      panel: false,
      projectTitle: 'Example title1',
      projectDescription: 'Example description1',
      projectCreator: 'Admin',
      jobCreator: 'Admin',
      projectId: 'P000001',
      uploadFiles: '',
      species: '',
    }
  },

  computed: {
    projectCreateDate() {
      return new Date().toISOString().split('T')[0]
    },
    jobCreateDate() {
      return new Date().toISOString().split('T')[0]
    },
  },

  methods: {
    async getUploadFiles() {
      return await this.$axios
        .get('deepmaps/api/file/upload/' + this.jobid)
        .then((res) => {
          console.log(res.data.map((file) => file.originalname))
          return res.data.map((file) => file.originalname)
        })
    },
  },
}
</script>
