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
      <cell-label-table></cell-label-table>
    </v-card>
  </v-col>
</template>

<script>
import CellLabelTable from '~/components/results/CellLabelTable.vue'
export default {
  name: 'UploadDataResults',
  components: {
    'cell-label-table': CellLabelTable,
  },
  data: () => ({
    pieData1: [
      {
        values: [5, 1],
        labels: ['0', '1'],
        type: 'pie',
      },
    ],
    layout1: {
      title: {
        text: 'Cell cluster',
        font: {
          size: 20,
        },
      },
      autosize: true,
      width: 300,
      height: 500,
      margin: {
        l: 20,
        r: 20,
        b: 210,
        t: 50,
        pad: 4,
      },
      legend: {
        font: {
          size: 14,
        },
        orientation: 'h',
      },
    },
    pieData2: [
      {
        values: [3, 3],
        labels: ['WT', 'KO'],
        type: 'pie',
      },
    ],
    layout2: {
      title: {
        text: 'Sample',
        font: {
          size: 20,
        },
      },
      autosize: true,
      width: 300,
      height: 500,
      margin: {
        l: 20,
        r: 20,
        b: 210,
        t: 50,
        pad: 4,
      },
      legend: {
        font: {
          size: 14,
        },
        orientation: 'h',
      },
    },
    pieData3: [
      {
        values: [3, 2, 1],
        labels: ['0', '1', '2'],
        type: 'pie',
      },
    ],
    layout3: {
      title: {
        text: 'Time',
        font: {
          size: 20,
        },
      },
      autosize: true,
      width: 300,
      height: 500,
      margin: {
        l: 20,
        r: 20,
        b: 210,
        t: 50,
        pad: 4,
      },
      legend: {
        font: {
          size: 14,
        },
        orientation: 'h',
      },
    },
    options: {
      toImageButtonOptions: {
        format: 'png', // one of png, svg, jpeg, webp
        filename: 'download_piechart' + new Date().toISOString(),
        height: 700,
        width: 700,
        scale: 1, // Multiply title/legend/axis/canvas sizes by this factor
      },
      showLink: false,
      displaylogo: false,
      modeBarButtonsToRemove: ['hoverClosestPie'],
    },
  }),
}
</script>

<style lang="scss" scoped></style>
