<template>
  <v-row>
    <v-container>
      <v-col lg="12">
        <v-card class="mx-auto">
          <v-img
            class="white--text align-center"
            src="img/main-header.jpg"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          >
            <v-card-title class="justify-center">
              <h1 class="text-h1">
                <strong>DeepMAPS</strong>
              </h1>
            </v-card-title>

            <v-card-title class="justify-center">
              <div class="typewriter">
                Deep learning based Multi-omics Analysis Portal for Single cells
              </div>
            </v-card-title>

            <!-- Data monitor section -->
            <v-row class="mt-10">
              <v-col md="8" offset="2">
                <v-card-title class="justify-center"
                  >Data last updated April 2021</v-card-title
                >
                <v-row class="text-center">
                  <v-col> Function </v-col>
                  <v-col> Created Projects </v-col>
                  <v-col> Submitted jobs </v-col>
                  <v-col> Data source </v-col>
                </v-row>
                <v-row class="text-center">
                  <v-col> 3 </v-col>
                  <v-col> 5 </v-col>
                  <v-col> 15 </v-col>
                  <v-col> 7 </v-col>
                </v-row>
              </v-col>
            </v-row>

            <!-- Public projects -->
            <v-row class="mt-10">
              <v-col md="8" offset="5">
                <v-btn to="/public" rounded large color="primary"
                  >Explore Our Projects
                </v-btn>
              </v-col>
            </v-row>

            <!-- Long search bar -->
            <v-row class="mt-5">
              <v-col md="8" offset="2">
                <v-text-field
                  v-model="searchJobId"
                  solo-inverted
                  flat
                  clearable
                  hide-details
                  label="Search Job"
                  type="search"
                  prepend-inner-icon="mdi-magnify"
                  class="shrink"
                  dark
                />
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </v-col>
    </v-container>

    <!-- Create your own project section -->
    <v-container>
      <v-col lg="12">
        <v-card flat>
          <v-card-title class="justify-center text-h5"
            >Create your own project</v-card-title
          >
          <v-row>
            <v-col>
              <v-card hover>
                <v-card-title class="justify-center">scRNA-Seq</v-card-title>
                <v-col>
                  <v-row justify="center" class="mb-1">
                    <v-btn
                      color="primary"
                      width="150"
                      rounded
                      to="/submit/single-rna"
                      >Example</v-btn
                    >
                  </v-row>
                  <v-row justify="center" class="mb-1"
                    ><v-btn color="primary" width="150" rounded
                      >Learn more</v-btn
                    >
                  </v-row>
                  <v-row justify="center" class="mb-1"
                    ><v-btn
                      to="/upload?type=single-rna"
                      color="primary"
                      width="150"
                      rounded
                      >Get started</v-btn
                    >
                  </v-row>
                </v-col>
              </v-card>
            </v-col>
            <v-col>
              <v-card hover>
                <v-card-title class="justify-center"
                  >Multiple scRNA-Seq</v-card-title
                >
                <v-col>
                  <v-row justify="center" class="mb-1">
                    <v-btn
                      color="primary"
                      width="150"
                      rounded
                      to="/submit/multiple-rna"
                      >Example</v-btn
                    >
                  </v-row>
                  <v-row justify="center" class="mb-1"
                    ><v-btn color="primary" width="150" rounded
                      >Learn more</v-btn
                    >
                  </v-row>
                  <v-row justify="center" class="mb-1"
                    ><v-btn
                      to="/upload?type=multiple-rna"
                      color="primary"
                      width="150"
                      rounded
                      >Get started</v-btn
                    >
                  </v-row>
                </v-col>
              </v-card>
            </v-col>
            <v-col>
              <v-card hover>
                <v-card-title class="justify-center"
                  >scRNA-Seq & scATAc-Seq</v-card-title
                >
                <v-col>
                  <v-row justify="center" class="mb-1">
                    <v-btn
                      color="primary"
                      width="150"
                      rounded
                      to="/submit/multiome"
                      >Example</v-btn
                    >
                  </v-row>
                  <v-row justify="center" class="mb-1"
                    ><v-btn color="primary" width="150" rounded
                      >Learn more</v-btn
                    >
                  </v-row>
                  <v-row justify="center" class="mb-1"
                    ><v-btn
                      to="/upload?type=multiome"
                      color="primary"
                      width="150"
                      rounded
                      >Get started</v-btn
                    >
                  </v-row>
                </v-col>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-container>

    <!-- image display window and sign in -->
    <v-container>
      <v-row class="my-5">
        <v-col cols="6">
          <v-carousel cycle height="580">
            <v-carousel-item class="center">
              <v-img src="img/abstract_workflow.jpg"></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-card hover color="primary" height="360" dark>
              <v-card-subtitle>
                DeepMAPS now supports user accounts! Sign in for access to
                private workspace, project sharing and archive, and long-term
                data storage.
              </v-card-subtitle>
              <v-card-title class="justify-center headline"
                >Sign In</v-card-title
              >
              <!-- Type in field -->
              <v-text-field
                v-model="email"
                class="mx-15"
                label="Email"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="password"
                class="mx-15"
                outlined
                label="Password"
              ></v-text-field>

              <!-- Sign in Three buttons -->
              <v-row justify="center" class="mx-2">
                <v-btn color="primary" rounded to="/Workspace">Sign in</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" rounded>Forgot password</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" rounded>Create an account</v-btn>
              </v-row>
            </v-card>
          </v-row>

          <!-- Cite us -->
          <v-row class="mt-6">
            <v-card hover color="primary" height="220" dark>
              <v-card-title class="justify-center headline"
                >Cite us</v-card-title
              >
              <v-card-text class="justify-center test-h4">{{
                citeus
              }}</v-card-text>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- Visiting monitor -->
    <v-container>
      <v-col lg="12">
        <v-layout justify-center>
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
      </v-col>
    </v-container>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      searchJobId: '',
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
      title: 'DeepMAPS',
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
/*All h1 animate-pop-in css*/
.animate-pop-in {
  animation-delay: 0.5s;
  animation: pop-in 1s cubic-bezier(0, 0.9, 0.3, 1.2) forwards;
  opacity: 0;
}
@keyframes pop-in {
  0% {
    opacity: 0;
    transform: translateY(-4rem) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}

/*Subtitle typewriting anmination */
.typewriter h2 {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: 0.15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 10 10; /* Gives that scrolling effect as the typing happens */
  letter-spacing: 0.05em; /* Adjust as needed */
  animation-delay: 0.5s;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: orange;
  }
}
</style>
