<template>
  <v-col cols="8" offset="2">
    <v-row class="my-14">
      <!-- Header Text -->
      <v-row>
        <p class="text-h4 text-center">
          <strong>IRIS3</strong>: Integrated Cell-type-specific Regulon
          Inference Server from Single-cell sequencing data
        </p>
      </v-row>
    </v-row>

    <!-- three buttons -->
    <v-row class="my-12" justify="space-between">
      <v-btn to="/upload" color="primary" width="240" rounded x-large>
        new project
      </v-btn>
      <v-btn to="/public" color="primary" width="240" rounded x-large>
        Public projects
      </v-btn>
      <v-btn to="/tutorial" color="primary" width="240" rounded x-large>
        Tutorial
      </v-btn>
    </v-row>

    <v-row class="my-6">
      <v-col>
        <!-- Display window  -->
        <v-carousel
          cycle
          hide-delimiter-background
          show-arrows-on-hover
          height="auto"
        >
          <v-carousel-item>
            <v-img max-width="500" src="img/abstract_workflow.jpg"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <!-- Login  -->
      <v-col>
        <v-card class="mb-8" height="290" outlined>
          <v-card-title>
            Sign In
          </v-card-title>
          <v-text-field
            v-model="email"
            class="mx-6"
            label="Email"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="password"
            class="mx-6"
            outlined
            label="Password"
          ></v-text-field>
          <v-row justify="space-around" class="mb-2">
            <v-btn color="primary" rounded>Sign in</v-btn>
            <v-btn rounded>Forgot password</v-btn>
            <v-btn rounded>Create an account</v-btn>
          </v-row>
        </v-card>

        <!-- news  -->
        <v-card height="220" outlined>
          <!-- THe most updated news add here -->
          <v-card-title class="mb-4">
            News
          </v-card-title>

          <v-card-subtitle>
            <p class="text-h8">
              <strong>{{ newsdate }}</strong> {{ newscontent }}
            </p>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn outlined rounded to="/news">
              More+
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Public projects  -->
    <v-row class="my-6">
      <v-col lg="12">
        <v-card outlined height="220" rounded="lg">
          <v-card-title class="justify-center"
            >Explore public IRIS3 projects
          </v-card-title>
          <v-card-subtitle>
            <p class="text-h7">
              <strong> Project 1: </strong> <v-spacer></v-spacer> {{ citeus }}
            </p>
          </v-card-subtitle>
          <v-card-actions class="justify-center">
            <v-btn outlined rounded to="/public">
              Explore
            </v-btn>
          </v-card-actions></v-card
        >
      </v-col>
    </v-row>

    <!-- Cite  -->
    <v-row class="my-6">
      <v-col lg="12">
        <v-card outlined rounded="lg">
          <v-card-title class="justify-center">Cite us</v-card-title>
          <v-card-subtitle>
            <p class="text-h7">
              <strong>{{ citeus }}</strong>
            </p>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-layout justify-center align-center>
        <client-only>
          <div class="viewer_options">
            <script
              id="clustrmaps"
              type="text/javascript"
              src="//cdn.clustrmaps.com/map_v2.js?d=y6edmNGXh1CPbChW0tW9Ahz11iiWoeE4HDc-yFfav5Y&cl=ffffff&w=a"
            ></script>
          </div>
        </client-only>
      </v-layout>
    </v-row>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      newsdate: '5/2/2020',
      newscontent:
        'The manuscript IRIS3: Integrated Cell-type-specific Regulon Inference Server from Single-cell RNA-Seq has been officially accepted by Nucleic Acids Research!',
      citeus:
        'Ma, A., et al. (2020). IRIS3: integrated cell-type-specific regulon inference server from single-cell RNA-Seq, Nucleic Acids Research, gkaa394',
    }
  },
  methods: {
    showSnackbar(msg, col) {
      this.$notifier.showMessage({ content: msg, color: col })
    },
  },
  head() {
    return {
      title: 'IRIS3',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Integrated Cell-type-specific Regulon Inference Server from Single-cell RNA-Seq',
        },
      ],
    }
  },
}
</script>

<style scoped>
.viewer_options {
  width: 300px !important;
  max-width: 300px !important;
}
</style>
