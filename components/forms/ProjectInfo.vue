<template>
  <v-col class="mx-4 mb-0" cols="12">
    <v-card class="mx-auto">
      <v-expansion-panels v-model="panel" flat>
        <v-expansion-panel>
          <v-card-title class="pa-0 title-1">
            <v-expansion-panel-header>
              Project summary
            </v-expansion-panel-header>
          </v-card-title>

          <v-expansion-panel-content>
            <v-layout row wrap>
              <!--<v-flex xs12 md12 lg5
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
              </v-flex> -->
              <v-flex xs12 md12 lg7
                ><v-card-title class="ma-2 py-0 subtitle-1 font-weight-bold"
                  >Project information
                  <v-divider class="ma-2 py-0"></v-divider>
                </v-card-title>
                <v-card-text>
                  <p class="ma-2">
                    <span class="text--secondary">ID: </span>
                    <span class="text--primary">{{ jobid }}</span>
                  </p>
                  <p class="ma-2">
                    <span class="text--secondary">Create time: </span>
                    <span class="text--primary">{{
                      projectCreateDate || jobCreateDate
                    }}</span>
                  </p>
                  <p class="ma-2">
                    <span class="text--secondary">Creator: </span>
                    <span class="text--primary">{{
                      jobCreator || 'Admin'
                    }}</span>
                  </p>
                  <div v-if="jobid === 'example' && type === 'multiome'">
                    <p class="ma-2">
                      <span class="text--secondary">Species: </span>
                      <span class="text--primary">Human</span>
                    </p>
                    <p class="ma-2">
                      <span class="text--secondary">Uploaded files: </span>
                      <span class="text--primary"
                        >Human PBMC sorted 3K example</span
                      >
                    </p>
                  </div>
                  <div v-if="jobid === 'example' && type === 'single-rna'">
                    <p class="ma-2">
                      <span class="text--secondary">Species: </span>
                      <span class="text--primary">Mouse</span>
                    </p>
                    <p class="ma-2">
                      <span class="text--secondary">Uploaded files: </span>
                      <span class="text--primary"
                        >Mouse brain example (Zeisel 2015)</span
                      >
                    </p>
                  </div>
                  <div v-if="jobid === 'example' && type === 'multiple-rna'">
                    <p class="ma-2">
                      <span class="text--secondary">Species: </span>
                      <span class="text--primary">Human</span>
                    </p>
                    <p class="ma-2">
                      <span class="text--secondary">Uploaded files: </span>
                      <span class="text--primary">Human IFNB example </span>
                    </p>
                  </div>
                  <div v-if="jobid !== 'example'">
                    <p class="ma-2">
                      <span class="text--secondary">Species: </span>
                      <span class="text--primary">{{ species }}</span>
                    </p>
                    <p class="ma-2">
                      <span class="text--secondary">Uploaded files: </span>
                      <span class="text--primary">{{ uploadFiles }}</span>
                    </p>
                  </div>
                </v-card-text>
              </v-flex>
              <v-flex xs12 md12 lg5
                ><v-card-title class="ma-2 py-0 subtitle-1 font-weight-bold"
                  >Parameters<v-divider class="ma-2 py-0"></v-divider
                ></v-card-title>

                <v-card-text>
                  <p class="ma-2">
                    <span class="text--secondary">To be added </span>
                    <span class="text--primary"></span>
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
export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index
}

export default {
  props: {
    jobid: { type: String, required: true, default: 'example' },
    type: { type: String, required: true, default: 'singleRna' },
  },

  async fetch() {
    const files = await this.$axios
      .get('deepmaps/api/file/upload/' + this.jobid)
      .then((res) => res.data)
    this.uploadFiles = files
      .filter((file) => !!file && file.fieldname === this.type)
      .map((file) => file.originalname)
      .filter(onlyUnique)
    this.species = files
      .filter((file) => !!file && file.fieldname === this.type)
      .map((file) => file.species)
      .filter(onlyUnique)
    this.projectCreateDate = files
      .filter((file) => !!file && file.fieldname === this.type)
      .map((file) => file.createTime)[0]
    this.jobCreator = files
      .filter((file) => !!file && file.fieldname === this.type)
      .map((file) => file.creator)[0]
  },
  data() {
    return {
      panel: false,
      projectTitle: 'Project 1',
      projectDescription: 'Project 1: Human PBMC',
      projectCreator: 'Admin',
      jobCreator: 'Admin',
      projectId: 'P000001',
      uploadFiles: '',
      species: '',
      projectCreateDate: '',
    }
  },

  computed: {
    jobCreateDate() {
      return new Date().toISOString().split('T')[0]
    },
  },

  methods: {
    async getUploadFiles() {
      return await this.$axios
        .get('deepmaps/api/file/upload/' + this.jobid)
        .then((res) => {
          console.log(res.data.map((file) => file))
          return res.data.map((file) => file.originalname)
        })
    },
  },
}
</script>
