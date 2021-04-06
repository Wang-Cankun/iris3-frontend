<template>
  <v-container>
    <v-row class="my-14 justify-center">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>User Workspace</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
          <v-tab> My Workspace </v-tab>
          <v-tab> My Profile </v-tab>
          <v-tab> Change Password </v-tab>
          <!-- Workspace tab -->
          <v-tab-item
            ><v-tabs v-model="tab">
              <v-tab>My projects</v-tab>
              <v-tab>Saved projects</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <!-- My projects tab -->
              <v-tab-item>
                <v-card class="my-12" color="#BBDEFB" outlined rounded>
                  <v-card-title class="justify-center"
                    >Project title</v-card-title
                  >
                  <v-card outlined class="mx-6" height="100" rounded>
                    <v-card-subtitle
                      >Here are project description</v-card-subtitle
                    >
                  </v-card>
                  <v-row class="ma-6" justify="space-around">
                    <v-card outlined rounded
                      ><v-card-title class="justify-center"
                        >ID: P00001</v-card-title
                      ></v-card
                    >
                    <v-card outlined rounded
                      ><v-card-title class="justify-center"
                        >Owner: XXXX</v-card-title
                      ></v-card
                    >
                    <v-card outlined rounded
                      ><v-card-title class="justify-center"
                        >Created: 10/29/2020</v-card-title
                      ></v-card
                    >
                    <v-card outlined rounded
                      ><v-card-title class="justify-center"
                        >Species: Human</v-card-title
                      ></v-card
                    >
                    <v-card outlined rounded
                      ><v-card-title class="justify-center"
                        >scRNA-Seq</v-card-title
                      ></v-card
                    >
                  </v-row>
                  <v-row class="ma-6" justify="space-around">
                    <v-btn color="warning" rounded="pill" width="300"
                      >0 Pending jobs</v-btn
                    >
                    <v-btn color="success" rounded="pill" width="300"
                      >1 Completed jobs</v-btn
                    >
                    <v-btn color="error" rounded="pill" width="300"
                      >0 Error jobs</v-btn
                    >
                  </v-row>
                </v-card>
              </v-tab-item>

              <!-- Saved projects tab -->
              <v-tab-item>
                <v-card class="my-12" color="#BBDEFB" outlined rounded>
                  <v-card-title class="justify-center"
                    >Project title</v-card-title
                  >
                  <v-card outlined class="mx-6" height="100" rounded>
                    <v-card-subtitle
                      >Here are project description</v-card-subtitle
                    >
                  </v-card>
                  <v-row class="ma-6" justify="space-around">
                    <v-card outlined rounded
                      ><v-card-title class="justify-center"
                        >ID: P00001</v-card-title
                      ></v-card
                    >
                    <v-card outlined rounded
                      ><v-card-title class="justify-center"
                        >Owner: XXXX</v-card-title
                      ></v-card
                    >
                    <v-card outlined rounded
                      ><v-card-title class="justify-center"
                        >Created: 10/29/2020</v-card-title
                      ></v-card
                    >
                    <v-card outlined rounded
                      ><v-card-title class="justify-center"
                        >Species: Human</v-card-title
                      ></v-card
                    >
                    <v-card outlined rounded
                      ><v-card-title class="justify-center"
                        >scRNA-Seq</v-card-title
                      ></v-card
                    >
                  </v-row>
                  <v-row class="ma-6" justify="space-around">
                    <v-btn color="warning" rounded="pill" width="300"
                      >0 Pending jobs</v-btn
                    >
                    <v-btn color="success" rounded="pill" width="300"
                      >1 Completed jobs</v-btn
                    >
                    <v-btn color="error" rounded="pill" width="300"
                      >0 Error jobs</v-btn
                    >
                  </v-row>
                </v-card>

                <v-card class="my-12" color="#BBDEFB" outlined rounded>
                  <v-card-title class="justify-center"
                    >Project title</v-card-title
                  >
                  <v-card outlined class="mx-6" height="100" rounded>
                    <v-card-subtitle
                      >Here are project description</v-card-subtitle
                    >
                  </v-card>
                  <v-row class="ma-6" justify="space-around">
                    <v-card outlined rounded
                      ><v-card-title class="justify-center"
                        >ID: P00001</v-card-title
                      ></v-card
                    >
                    <v-card outlined rounded
                      ><v-card-title class="justify-center"
                        >Owner: XXXX</v-card-title
                      ></v-card
                    >
                    <v-card outlined rounded
                      ><v-card-title class="justify-center"
                        >Created: 10/29/2020</v-card-title
                      ></v-card
                    >
                    <v-card outlined rounded
                      ><v-card-title class="justify-center"
                        >Species: Human</v-card-title
                      ></v-card
                    >
                    <v-card outlined rounded
                      ><v-card-title class="justify-center"
                        >scRNA-Seq</v-card-title
                      ></v-card
                    >
                  </v-row>
                  <v-row class="ma-6" justify="space-around">
                    <v-btn color="warning" rounded="pill" width="300"
                      >0 Pending jobs</v-btn
                    >
                    <v-btn color="success" rounded="pill" width="300"
                      >1 Completed jobs</v-btn
                    >
                    <v-btn color="error" rounded="pill" width="300"
                      >0 Error jobs</v-btn
                    >
                  </v-row>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-tab-item>

          <!-- My profile tab -->
          <v-tab-item>
            <v-card width="980" flat>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Prefix</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field label="Prefix" clearable></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader>Name</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field label="Name" clearable></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader>Email</v-subheader>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="Email address" clearable></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader>Title</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field label="Title" clearable></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader>Institution</v-subheader>
                </v-col>
                <v-col cols="6">
                  <v-text-field label="Institution" clearable></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader>Country</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field label="Country" clearable></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader>Country</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field label="Country" clearable></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader>Registerd date</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-card flat>10/30/2020</v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Last sign in</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-card flat>10/30/2020</v-card>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-btn class="my-4" color="primary" rounded
                  >Update changes</v-btn
                >
              </v-row>
            </v-card>
          </v-tab-item>

          <!-- Change password tab -->
          <v-tab-item>
            <v-card width="980" flat>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Old password</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="password_o"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    label="Old password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-subheader>New password</v-subheader>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="password_n"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show2 ? 'text' : 'password'"
                    label="New password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show2 = !show2"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-btn class="my-4" color="primary" rounded
                  >Update changes</v-btn
                >
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tab: null,
    password_o: '',
    password_n: '',
    show1: false,
    show2: false,
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),
}
</script>
