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
                            href="/submit/single-rna/example"
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
                            href="/submit/multiple-rna/example"
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
                            href="/submit/multiome/example"
                            ><v-btn>Browse</v-btn>
                          </a>
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-container>
            </v-tab-item>

            <!-- Saved projects tab -->
            <v-tab-item>
              <div v-if="isLogin">
                <v-flex v-for="(item, idx) in project" :key="idx" flex>
                  <v-card class="ma-1">
                    <v-card-title class="justify-left"
                      >{{ idx + 1 }}: {{ item.originalname }}</v-card-title
                    >
                    <v-card-text>
                      <p class="ma-2">
                        <span class="text--secondary">ID: </span>
                        <span class="text--primary">{{ item.jobid }}</span>
                      </p>
                      <p class="ma-2">
                        <span class="text--secondary">Type </span>
                        <span class="text--primary">{{ item.type }}</span>
                      </p>
                      <p class="ma-2">
                        <span class="text--secondary">Species: </span>
                        <span class="text--primary">{{ item.species }}</span>
                      </p>
                      <p class="ma-2">
                        <span class="text--secondary">Create date: </span>
                        <span class="text--primary">{{ item.createTime }}</span>
                      </p>
                      <p class="ma-2">
                        <span class="text--secondary">Creator: </span>
                        <span class="text--primary">{{ item.creator }}</span>
                      </p>
                    </v-card-text>
                    <v-card-actions class="mx-2">
                      <a
                        class="text-decoration-none"
                        :href="'/submit/multiome/' + item.jobid"
                        ><v-btn>Browse</v-btn>
                      </a>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </div>
              <div v-else>Please login to enable private workspace</div>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-col>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    tab: 0,
    project: [],
    show2: false,
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

      return res
    },
  },
}
</script>

<style lang="scss" scoped></style>
