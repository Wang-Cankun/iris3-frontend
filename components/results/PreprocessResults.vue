<template>
  <v-col class="ml-5" cols="8">
    <v-card class="overflow-hidden">
      <v-card-text class="mt-4 grey--text body-1 text--darken-3">
        Metadata summary</v-card-text
      >
      <v-row
        ><v-col xs="6" md="6" lg="3">
          <vue-plotly
            :data="pieData1"
            :layout="layout1"
            :options="options"
          /> </v-col
        ><v-col xs="6" md="6" lg="3">
          <vue-plotly
            :data="pieData2"
            :layout="layout2"
            :options="options"
          /> </v-col
        ><v-col xs="6" md="6" lg="3">
          <vue-plotly
            :data="pieData3"
            :layout="layout3"
            :options="options"
          /> </v-col
      ></v-row>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'PreprocessResults',
  components: {},
  data: () => ({}),
}
</script>

<style lang="scss" scoped></style>
