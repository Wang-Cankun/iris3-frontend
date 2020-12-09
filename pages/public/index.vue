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
              <v-row class="my-4" justify="space-around">
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
                    >1 Pending jobs</v-btn
                  >
<<<<<<< HEAD
=======
                  <v-expand-transition>
                    <v-row>
                      <v-card
                        v-show="expand"
                        color="warning"
                        width="340"
                        height="100"
                      ></v-card>
                    </v-row>
                  </v-expand-transition>
>>>>>>> 0175f257522064334aea0ffaa55f745efe1fd2f4
                </v-col>
                <v-col>
                  <v-btn
                    color="success"
                    rounded="pill"
                    width="340"
                    @click="expand1 = !expand1"
                    >1 Completed jobs</v-btn
                  >
<<<<<<< HEAD
=======
                  <v-expand-transition>
                    <v-row>
                      <v-card v-show="expand1" height="100"></v-card>
                    </v-row>
                  </v-expand-transition>
>>>>>>> 0175f257522064334aea0ffaa55f745efe1fd2f4
                </v-col>
                <v-col>
                  <v-btn
                    color="error"
                    rounded="pill"
                    width="340"
                    @click="expand2 = !expand2"
                    >1 Error jobs</v-btn
                  >
<<<<<<< HEAD
=======
                  <v-expand-transition>
                    <v-row>
                      <v-card v-show="expand2" height="100"></v-card>
                    </v-row>
                  </v-expand-transition>
>>>>>>> 0175f257522064334aea0ffaa55f745efe1fd2f4
                </v-col>
              </v-row>
              <v-row class="px-12">
                <v-expand-transition>
                  <v-card
                    v-show="expand"
                    class="mx-auto my-4"
                    width="1060"
                    outlined
                  >
                    <v-toolbar color="warning" short dark>
                      <v-toolbar-title class="mx-auto"
                        >P00001-XX001</v-toolbar-title
                      >
                    </v-toolbar>
                    <v-row class="ma-2">
                      <v-col justify="center">
                        <v-row justify="center">
                          <v-icon>mdi-account-circle</v-icon>
                          <v-card class="ml-2" outlined rounded="lg"
                            ><v-card-subtitle class="justify-center"
                              >Admin</v-card-subtitle
                            ></v-card
                          >
                        </v-row>
                      </v-col>
                      <v-col justify="center">
                        <v-row justify="center">
                          <v-icon>mdi-calendar-month-outline</v-icon>
                          <v-card class="ml-2" outlined rounded="lg"
                            ><v-card-subtitle class="justify-center"
                              >12/1/2020</v-card-subtitle
                            >
                          </v-card></v-row
                        ></v-col
                      >
                      <v-col justify="center">
                        <v-row justify="center">
                          <v-card class="ml-2" outlined rounded="lg"
                            ><v-card-subtitle class="justify-center"
                              >Public</v-card-subtitle
                            >
                          </v-card></v-row
                        >
                      </v-col>
                    </v-row>
                    <v-row class="mb-4" justify="center">
                      <v-stepper>
                        <v-stepper-header>
                          <v-stepper-step complete step="1">
                            QC
                          </v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step complete editable step="2">
                            Cluster
                          </v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step step="3" complete editable>
                            Gene set
                          </v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step step="4">
                            Motif
                          </v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step step="5">
                            Regulon
                          </v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step step="6">
                            Result
                          </v-stepper-step>
                        </v-stepper-header>
                      </v-stepper>
                    </v-row>
                    <v-row class="mb-4" justify="center">
                      <v-btn color="primary">Add to workspace</v-btn>
                    </v-row>
                  </v-card>
                </v-expand-transition>
              </v-row>
              <!-- Completed jobs  -->
              <v-row class="px-10">
                <v-expand-transition>
                  <v-card
                    v-show="expand1"
                    class="mx-auto my-4"
                    width="1060"
                    outlined
                  >
                    <v-toolbar color="success" short dark>
                      <v-toolbar-title class="mx-auto"
                        >P00002-XX008</v-toolbar-title
                      >
                    </v-toolbar>
                    <v-row class="ma-2">
                      <v-col justify="center">
                        <v-row justify="center">
                          <v-icon>mdi-account-circle</v-icon>
                          <v-card class="ml-2" outlined rounded="lg"
                            ><v-card-subtitle class="justify-center"
                              >Shaopeng</v-card-subtitle
                            ></v-card
                          >
                        </v-row>
                      </v-col>
                      <v-col justify="center">
                        <v-row justify="center">
                          <v-icon>mdi-calendar-month-outline</v-icon>
                          <v-card class="ml-2" outlined rounded="lg"
                            ><v-card-subtitle class="justify-center"
                              >12/2/2020</v-card-subtitle
                            >
                          </v-card></v-row
                        ></v-col
                      >
                      <v-col justify="center">
                        <v-row justify="center">
                          <v-card class="ml-2" outlined rounded="lg"
                            ><v-card-subtitle class="justify-center"
                              >Private</v-card-subtitle
                            >
                          </v-card></v-row
                        >
                      </v-col>
                    </v-row>
                    <v-row class="mb-4" justify="center">
                      <v-stepper>
                        <v-stepper-header>
                          <v-stepper-step complete step="1">
                            QC
                          </v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step complete editable step="2">
                            Cluster
                          </v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step step="3" complete editable>
                            Gene set
                          </v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step step="4" complete editable>
                            Motif
                          </v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step step="5" complete editable>
                            Regulon
                          </v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step step="6" complete editable>
                            Result
                          </v-stepper-step>
                        </v-stepper-header>
                      </v-stepper>
                    </v-row>
                    <v-row class="mb-4" justify="center">
                      <v-btn color="primary">Add to workspace</v-btn>
                    </v-row>
                  </v-card>
                </v-expand-transition>
              </v-row>
              <!-- Error jobs  -->
              <v-row class="px-8">
                <v-expand-transition>
                  <v-card
                    v-show="expand2"
                    class="mx-auto my-4"
                    width="1060"
                    outlined
                  >
                    <v-toolbar color="error" short dark>
                      <v-toolbar-title class="mx-auto"
                        >P00005-XX007</v-toolbar-title
                      >
                    </v-toolbar>
                    <v-row class="ma-2">
                      <v-col justify="center">
                        <v-row justify="center">
                          <v-icon>mdi-account-circle</v-icon>
                          <v-card class="ml-2" outlined rounded="lg"
                            ><v-card-subtitle class="justify-center"
                              >Shaopeng</v-card-subtitle
                            ></v-card
                          >
                        </v-row>
                      </v-col>
                      <v-col justify="center">
                        <v-row justify="center">
                          <v-icon>mdi-calendar-month-outline</v-icon>
                          <v-card class="ml-2" outlined rounded="lg"
                            ><v-card-subtitle class="justify-center"
                              >11/30/2020</v-card-subtitle
                            >
                          </v-card></v-row
                        ></v-col
                      >
                      <v-col justify="center">
                        <v-row justify="center">
                          <v-card class="ml-2" outlined rounded="lg"
                            ><v-card-subtitle class="justify-center"
                              >Private</v-card-subtitle
                            >
                          </v-card></v-row
                        >
                      </v-col>
                    </v-row>
                    <v-row class="mb-4" justify="center">
                      <v-stepper>
                        <v-stepper-header>
                          <v-stepper-step complete step="1">
                            QC
                          </v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step
                            editable
                            :rules="[() => false]"
                            step="2"
                          >
                            Cluster
                          </v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step step="3">
                            Gene set
                          </v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step step="4">
                            Motif
                          </v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step step="5">
                            Regulon
                          </v-stepper-step>
                          <v-divider></v-divider>
                          <v-stepper-step step="6">
                            Result
                          </v-stepper-step>
                        </v-stepper-header>
                      </v-stepper>
                    </v-row>
                    <v-row class="mb-4" justify="center">
                      <v-btn color="primary">Add to workspace</v-btn>
                    </v-row>
                  </v-card>
                </v-expand-transition>
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
