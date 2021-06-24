<template>
  <div>
    <v-container>
      <v-col class="mb-2" cols="8" offset="2">
        <v-row class="my-6 justify-center">
          <v-row class="justify-center">
            <p class="text-h5 font-weight-bold">Projects</p>
          </v-row>
        </v-row>
        <v-tabs v-model="tab" dark grow background-color="primary">
          <v-tab>Public</v-tab>
          <v-tab>Private</v-tab>

          <v-tabs-items v-model="tab">
            <!-- My projects tab -->
            <v-tab-item
              ><v-container>
                <v-col cols="12">
                  <v-row>
                    <v-col md="12" lg="4">
                      <v-card>
                        <v-card-title class="justify-center"
                          >Mouse brain data (Zeisel, et al. 2015)</v-card-title
                        >
                        <v-card-text>
                          <p class="ma-2">
                            <span class="text--secondary">Type </span>
                            <span class="text--primary"
                              >Single scRNA-seq dataset</span
                            >
                          </p>
                          <p class="ma-2">
                            <span class="text--secondary">Species: </span>
                            <span class="text--primary">Mouse</span>
                          </p>
                          <p class="ma-2">
                            <span class="text--secondary"
                              >Number of cells:
                            </span>
                            <span class="text--primary">3005</span>
                          </p>
                          <p class="ma-2">
                            <span class="text--secondary">Create date: </span>
                            <span class="text--primary"> 2021-06-17</span>
                          </p>
                          <p class="ma-2">
                            <span class="text--secondary">Creator: </span>
                            <span class="text--primary">Admin</span>
                          </p>
                        </v-card-text>
                        <v-card-actions class="mx-2">
                          <a
                            class="text-decoration-none"
                            href="submit/single-rna/example"
                            ><v-btn>Browse</v-btn>
                          </a>
                        </v-card-actions>
                      </v-card>
                    </v-col>

                    <v-col md="12" lg="4">
                      <v-card>
                        <v-card-title class="justify-center"
                          >Human IFNB-Stimulated and Control PBMCs</v-card-title
                        >
                        <v-card-text>
                          <p class="ma-2">
                            <span class="text--secondary">Type </span>
                            <span class="text--primary"
                              >Multiple scRNA-seq dataset</span
                            >
                          </p>
                          <p class="ma-2">
                            <span class="text--secondary">Species: </span>
                            <span class="text--primary">Human</span>
                          </p>
                          <p class="ma-2">
                            <span class="text--secondary"
                              >Number of cells:
                            </span>
                            <span class="text--primary">2800</span>
                          </p>
                          <p class="ma-2">
                            <span class="text--secondary">Create date: </span>
                            <span class="text--primary">{{
                              projectCreateDate
                            }}</span>
                          </p>
                          <p class="ma-2">
                            <span class="text--secondary">Creator: </span>
                            <span class="text--primary">Admin</span>
                          </p>
                        </v-card-text>
                        <v-card-actions class="mx-2">
                          <a
                            class="text-decoration-none"
                            href="submit/multiple-rna/example"
                            ><v-btn>Browse</v-btn>
                          </a>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                    <v-col md="12" lg="4">
                      <v-card>
                        <v-card-title class="justify-center"
                          >10X Human PBMC granulocyte 3k cells</v-card-title
                        >
                        <v-card-text>
                          <p class="ma-2">
                            <span class="text--secondary">Type </span>
                            <span class="text--primary"
                              >scRNA-seq and scATAC-seq</span
                            >
                          </p>
                          <p class="ma-2">
                            <span class="text--secondary">Species: </span>
                            <span class="text--primary">Human</span>
                          </p>
                          <p class="ma-2">
                            <span class="text--secondary"
                              >Number of cells:
                            </span>
                            <span class="text--primary">3000</span>
                          </p>
                          <p class="ma-2">
                            <span class="text--secondary">Create date: </span>
                            <span class="text--primary">{{
                              projectCreateDate
                            }}</span>
                          </p>
                          <p class="ma-2">
                            <span class="text--secondary">Creator: </span>
                            <span class="text--primary">Admin</span>
                          </p>
                        </v-card-text>
                        <v-card-actions class="mx-2">
                          <a
                            class="text-decoration-none"
                            href="submit/multiome/example"
                            ><v-btn>Browse</v-btn>
                          </a>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-container>
            </v-tab-item>

            <v-tab-item>
              <div v-if="!project.length" class="ma-2">
                <p class="text-center">No projects created yet.</p>
                <p class="text-center">
                  <a class="text-center text-decoration-none" href="/upload"
                    ><v-btn color="primary">Create new project</v-btn>
                  </a>
                </p>
              </div>
              <div v-if="isLogin">
                <v-expansion-panels v-model="panel" multiple>
                  <v-expansion-panel
                    v-for="(projectName, idx1) in allProjectNames"
                    :key="idx1"
                  >
                    <v-expansion-panel-header class="font-weight-normal title"
                      >Project {{ idx1 + 1 }}:
                      {{ projectName }}</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                      <v-row>
                        <div v-for="(item, idx) in project" :key="idx" cols="6">
                          <v-col
                            v-if="projectName === item.originalname"
                            cols="12"
                          >
                            <v-card class="ma-1">
                              <v-card-text>
                                <p class="ma-2">
                                  <span class="text--secondary">Job ID: </span>
                                  <span class="text--primary">{{
                                    item.jobid
                                  }}</span>
                                </p>
                                <p class="ma-2">
                                  <span class="text--secondary">Type </span>
                                  <span class="text--primary">{{
                                    item.type
                                  }}</span>
                                </p>
                                <p class="ma-2">
                                  <span class="text--secondary">Species: </span>
                                  <span class="text--primary">{{
                                    item.species
                                  }}</span>
                                </p>
                                <p class="ma-2">
                                  <span class="text--secondary"
                                    >Create date:
                                  </span>
                                  <span class="text--primary">{{
                                    item.createTime
                                  }}</span>
                                </p>
                                <p class="ma-2">
                                  <span class="text--secondary">Creator: </span>
                                  <span class="text--primary">{{
                                    item.creator
                                  }}</span>
                                </p>
                                <p class="ma-2">
                                  <span class="text--secondary">Title: </span>
                                  <span class="text--primary">{{
                                    item.title
                                  }}</span>
                                </p>
                                <p class="ma-2">
                                  <span class="text--secondary"
                                    >Description:
                                  </span>
                                  <span class="text--primary">{{
                                    item.description
                                  }}</span>
                                </p>
                              </v-card-text>
                              <v-card-actions class="mx-2">
                                <a
                                  class="text-decoration-none"
                                  :href="'submit/multiome/' + item.jobid"
                                  ><v-btn>Browse</v-btn>
                                </a>
                                <v-btn
                                  class="mx-2"
                                  @click="openDialog(item.jobid)"
                                  >Delete</v-btn
                                >
                              </v-card-actions>
                            </v-card>
                          </v-col>
                        </div></v-row
                      ></v-expansion-panel-content
                    >
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
              <div v-else><p>Please login to enable private workspace</p></div>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-col>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="warning"> Warning </v-card-title>

          <v-card-text class="my-2">
            Are you sure you want to delete this job?
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="deleteJob(selectedJobid)">
              Confirm
            </v-btn>
            <v-btn color="primary" text @click="dialog = false"> Cancel </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    tab: 0,
    project: [],
    panel: [],
    dialog: false,
    selectedJobid: '',
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),

  computed: {
    projectCreateDate() {
      return new Date().toISOString().split('T')[0]
    },
    isLogin() {
      if (this.$store.getters.loggedInUser) {
        return true
      } else {
        return false
      }
    },
    allProjectNames() {
      const projectNameSet = new Set()

      this.project.forEach((item) => projectNameSet.add(item.originalname))
      return [...projectNameSet]
    },
  },
  async mounted() {
    this.project = await this.getProjects()
  },
  methods: {
    async getProjects() {
      const tmp = await this.$axios
        .get('deepmaps/api/file')
        .then((res) => res.data)
      const res = tmp
        .filter(
          (item) =>
            item.creator === this.$store.getters.loggedInUser &&
            !item.fieldname.includes('label')
        )
        .map((item) => {
          switch (item.fieldname) {
            case 'singleRna':
              item.type = 'Single scRNA-seq dataset'
              break
            case 'multipleRna':
              item.type = 'Multiple scRNA-seq dataset'
              break
            case 'multiome':
              item.type = 'scRNA-seq and scATAC-seq'
              break
            default:
              item.type = 0
          }
          return item
        })
        .filter((item) => item.status !== 'archive')
        .sort((a, b) => new Date(b.createTime) - new Date(a.createTime))

      return res
    },

    openDialog(jobid) {
      this.dialog = true
      this.selectedJobid = jobid
    },

    async deleteJob(jobid) {
      this.dialog = false
      await this.$axios
        .post('deepmaps/api/file/archive', {
          jobid,
        })
        .then((res) => res.data)
      this.project = await this.getProjects()
    },
  },
}
</script>

<style lang="scss" scoped></style>
