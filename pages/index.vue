<template>
  <v-container>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="3"
        ><img width="600px" src="img/abstract_workflow.jpg"
      /></v-col>
      <v-col cols="8">
        <v-layout column justify-center align-center>
          <img width="500px" src="img/iris3_logo_clip2.svg" />
          <v-flex class="text-xs-center" mt-3>
            <blockquote class="blockquote text-xs-center">
              Integrated Cell-type-specific Regulon Inference Server from
              Single-cell RNA-Seq
            </blockquote>
          </v-flex>
        </v-layout></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
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
