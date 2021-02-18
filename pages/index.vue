<template>
  <v-container width="100">
    <!-- Header Text -->
    <v-parallax height="1000" src="img/RNA_Seq_lead.jpg" class="animate-pop-in">
      <h1 class="text-h1 text-center">
        <strong>IRIS3</strong>
      </h1>
      <v-card-title>
        <div class="typewriter center">
          <h2 class="text-center">
            Integrated Cell-type-specific Regulon Inference Server from
            Single-cell sequencing data
          </h2>
        </div>
      </v-card-title>

      <!-- Login  -->
      <v-col col="2">
        <v-card class="px-12" color="#BBDEFB" height="290" outlined>
          <v-card-title>Sign In</v-card-title>
          <v-text-field
            v-model="email"
            class="mx-12"
            label="Email"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="password"
            class="mx-6"
            outlined
            label="Password"
          ></v-text-field>
          <v-row justify="center" class="mb-2">
            <v-btn color="primary" rounded to="/Workspace">Sign in</v-btn>
            <v-btn rounded>Forgot password</v-btn>
            <v-btn rounded>Create an account</v-btn>
          </v-row>
        </v-card>
      </v-col>

      <!-- Three buttons -->
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
    </v-parallax>

    <!-- news  -->
    <!-- THe most updated news add here -->
    <!-- <v-card height="220" outlined>
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
    </v-card> -->
    <!-- </v-col> -->
    <!-- </v-row> -->

    <v-divider></v-divider>

    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item>
        <!-- Start  -->
        <span slot="opposite"> From us </span>
        <v-card outlined height="220" rounded="lg" class="pa-3">
          <v-card-title class="justify-center"
            >Explore public IRIS3 projects
          </v-card-title>
          <v-card-subtitle>
            <p class="text-h7">
              <strong> Project 1: </strong> <v-spacer></v-spacer>
              {{ citeus }}
            </p>
          </v-card-subtitle>
          <v-card-actions class="justify-center">
            <v-btn outlined rounded to="/public">
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-timeline-item>
      <v-timeline-item>
        <!-- Current event  -->
        <span slot="opposite"> Current event </span>
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item>
            <v-img max-width="500" src="img/abstract_workflow.jpg"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-timeline-item>
      <!-- Citation here  -->
      <v-timeline-item>
        <span slot="opposite"> Interested us </span>
        <v-card outlined rounded="lg" class="pa-2">
          <v-card-title class="justify-center">Cite us</v-card-title>
          <v-card-subtitle>
            <p class="text-h7">
              <strong>{{ citeus }}</strong>
            </p>
          </v-card-subtitle>
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <div class="ma-5 pa-5">
      <v-container>
        <v-row>
          <v-col lg="5" md="5" class="ml-md-auto"> </v-col>
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
      </v-container>
    </div>
  </v-container>
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
/*All h1 animate-pop-in css*/
.animate-pop-in {
  animation-delay: 0.8s;
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
  animation-delay: 1.5s;
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
