<template>
  <v-row>
    <v-col md="8" offset="2">
      <!-- Main Page content start here -->
      <v-container>
        <v-img dark src="img/Molecular_RNA1.jpg">
          <v-row>
            <!-- Title -->
            <v-col md="8">
              <h1 class="text-h1">
                <strong>DeepMAPS</strong>
              </h1>
            </v-col>
            <v-col md="4">
              <v-card outlined hover light class="mr-1">
                <v-card-title justify="center"
                  >News Example news content</v-card-title
                >
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="9">
              <div class="typewriter">
                <h2 class="text-h6">
                  Deep learning based Multi-omics Analysis Portal for Single
                  cells
                </h2>
              </div>
            </v-col>
          </v-row>
        </v-img>
      </v-container>

      <!-- divider -->
      <v-row>
        <v-col>
          <v-carousel cycle height="580">
            <v-carousel-item class="center">
              <v-img max-width="500" src="img/abstract_workflow.jpg"></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col>
          <v-row>
            <v-card flat height="30"></v-card>
            <v-card hover width="620" class="mb-1 text-h5">
              <v-card-subtitle>
                DeepMAPS now supports user accounts! Sign in for access to
                private workspace, project sharing and archive, and long-term
                data storage.
              </v-card-subtitle>
            </v-card>
          </v-row>

          <v-row>
            <!-- Sign in part -->
            <v-card
              class="my-10"
              color="#BBDEFB"
              height="260"
              width="620"
              outlined
              justify="center"
            >
              <v-card-title class="justify-center">Sign In</v-card-title>
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
                <v-btn rounded>Forgot password</v-btn>
                <v-spacer></v-spacer>
                <v-btn rounded>Create an account</v-btn>
              </v-row>
            </v-card>
          </v-row>

          <!-- Data monitor section -->
          <v-row>
            <v-card width="620">
              <v-card-title class="justify-center"
                >Data last updated February 2021</v-card-title
              >
              <v-row class="text-center">
                <v-col> Function </v-col>
                <v-col> Created Projects </v-col>
                <v-col> Submitted jobs </v-col>
                <v-col> Data source </v-col>
              </v-row>
              <v-row class="text-center">
                <v-col> 0 </v-col>
                <v-col> 0 </v-col>
                <v-col> 0 </v-col>
                <v-col> 0 </v-col>
              </v-row>
            </v-card>
          </v-row>
        </v-col>
      </v-row>

      <v-card flat height="100"></v-card>
      <v-row>
        <v-col md="5" offset="5"> This is the search bar for ... </v-col>
      </v-row>
      <!-- Long search bar -->
      <v-row>
        <v-col md="8" offset="2">
          <v-text-field
            v-model="searchJobId"
            solo-inverted
            flat
            clearable
            hide-details
            label="Search Job ID"
            type="search"
            prepend-inner-icon="mdi-magnify"
            class="shrink"
          />
        </v-col>
      </v-row>

      <v-card flat height="100"></v-card>

      <!-- Create your own project section -->
      <v-card flat class="my-20">
        <v-card-title class="justify-center text-h5"
          >Create your own project</v-card-title
        >
        <v-row>
          <v-col>
            <v-card class="ml-2" hover>
              <v-card-title class="justify-center">scRNA-Seq</v-card-title>
              <v-col>
                <v-row justify="center" class="mb-1">
                  <v-btn color="primary" width="150" rounded>Example</v-btn>
                </v-row>
                <v-row justify="center" class="mb-1"
                  ><v-btn color="primary" width="150" rounded>Learn more</v-btn>
                </v-row>
                <v-row justify="center" class="mb-1"
                  ><v-btn color="primary" width="150" rounded
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
                  <v-btn color="primary" width="150" rounded>Example</v-btn>
                </v-row>
                <v-row justify="center" class="mb-1"
                  ><v-btn color="primary" width="150" rounded>Learn more</v-btn>
                </v-row>
                <v-row justify="center" class="mb-1"
                  ><v-btn color="primary" width="150" rounded
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
                  <v-btn color="primary" width="150" rounded>Example</v-btn>
                </v-row>
                <v-row justify="center" class="mb-1"
                  ><v-btn color="primary" width="150" rounded>Learn more</v-btn>
                </v-row>
                <v-row justify="center" class="mb-1"
                  ><v-btn color="primary" width="150" rounded
                    >Get started</v-btn
                  >
                </v-row>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <!-- divider -->
      <v-card flat height="50"></v-card>
      <v-divider></v-divider>
      <v-card flat height="50"></v-card>
      <!-- Publich data exploration section-->
      <v-card flat class="my-20">
        <v-card-title class="justify-center text-h5"
          >Publich data exploration</v-card-title
        >
        <v-row>
          <v-col>
            <v-card class="mr-1" hover>
              <v-card-title class="justify-center">Project1</v-card-title>
              <v-card-subtitle class="justify-center"
                >Create time</v-card-subtitle
              >
            </v-card>
          </v-col>
          <v-col>
            <v-card class="mr-1" hover>
              <v-card-title class="justify-center">Project2</v-card-title>
              <v-card-subtitle class="justify-center"
                >Create time</v-card-subtitle
              >
            </v-card>
          </v-col>
          <v-col>
            <v-card class="mr-1" hover>
              <v-card-title class="justify-center">Project3</v-card-title>
              <v-card-subtitle class="justify-center"
                >Create time</v-card-subtitle
              >
            </v-card>
          </v-col>
          <v-col>
            <v-card class="mr-1" hover>
              <v-card-title class="justify-center">Project4</v-card-title>
              <v-card-subtitle class="justify-center"
                >Create time</v-card-subtitle
              >
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="2" offset="10">
            <v-card class="mr-1">
              <v-card-title class="justify-center">More+</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <!-- divider -->
      <v-card flat height="50"></v-card>
      <v-divider></v-divider>
      <v-card flat height="50"></v-card>

      <v-row>
        <v-col md="6">
          <!-- Citation card -->
          <v-container>
            <v-card
              outlined
              rounded="lg"
              hover
              height="100"
              width="600"
              class="my-20"
            >
              <v-card-title class="justify-center">Cite us</v-card-title>
              <v-card-subtitle>
                <p class="text-h7">
                  <strong>{{ citeus }}</strong>
                </p>
              </v-card-subtitle>
            </v-card>
          </v-container>
        </v-col>
        <v-col>
          <!-- Visiting monitor -->
          <div>
            <v-container>
              <v-row>
                <v-col lg="5" md="5" class="ml-md-auto"> </v-col>
              </v-row>
              <v-row>
                <v-layout justify-end>
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
            </v-container>
          </div>
        </v-col>
      </v-row>
    </v-col>
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
