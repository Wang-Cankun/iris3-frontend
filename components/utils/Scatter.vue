<template>
  <v-card class="ma-0"
    ><grid-item :w="w" :h="h" :x="x" :y="y" :i="i" class="grid-item-border">
      <v-card-title class="primary white--text caption px-2 py-1"
        >{{ title }} <v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="downloadPNG">
              <v-list-item-title>Download PNG</v-list-item-title>
            </v-list-item>
            <v-list-item @click="downloadPDF">
              <v-list-item-title>Download PDF</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu></v-card-title
      >
      <ECharts ref="chart" :option="option" /> </grid-item
  ></v-card>
</template>

<script>
import * as echarts from 'echarts'
import { createComponent } from 'echarts-for-vue'
import ecStat from 'echarts-stat'
echarts.registerTransform(ecStat.transform.clustering)

export default {
  components: {
    ECharts: createComponent({ echarts }), // use as a component
  },
  props: {
    // src: { type: String, required: true },
    title: { type: String, required: true },
    values: { type: Array, required: true },
    w: { type: Number, required: true, default: 2 },
    h: { type: Number, required: true, default: 2 },
    x: { type: Number, required: true, default: 0 },
    y: { type: Number, required: true, default: 0 },
    i: { type: String, required: true, default: '0' },
  },
  data() {
    return {
      src: 1,
    }
  },
  computed: {
    option() {
      const data = this.values.map((u) => [u.umap1, u.umap2])
      const CLUSTER_COUNT = 7
      const DIENSIION_CLUSTER_INDEX = 2
      const COLOR_ALL = [
        '#37A2DA',
        '#e06343',
        '#37a354',
        '#b55dba',
        '#b5bd48',
        '#8378EA',
        '#96BFFF',
        '#751431',
      ]
      const pieces = []
      for (let i = 0; i < CLUSTER_COUNT; i++) {
        pieces.push({
          value: i,
          label: 'Cluster ' + i,
          color: COLOR_ALL[i],
        })
      }
      return {
        dataset: [
          {
            source: data,
          },
          {
            transform: {
              type: 'ecStat:clustering',
              // print: true,
              config: {
                clusterCount: CLUSTER_COUNT,
                outputType: 'single',
                outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX,
              },
            },
          },
        ],
        tooltip: {
          position: 'top',
        },
        visualMap: {
          type: 'piecewise',
          top: 'middle',
          min: 0,
          max: CLUSTER_COUNT,
          left: 10,
          splitNumber: CLUSTER_COUNT,
          dimension: DIENSIION_CLUSTER_INDEX,
          pieces,
        },
        grid: {
          left: 120,
        },
        xAxis: {},
        yAxis: {},
        series: {
          type: 'scatter',
          encode: { tooltip: [0, 1] },
          symbolSize: 4,
          itemStyle: {
            borderColor: '#555',
          },
          datasetIndex: 1,
        },
      }
    },
  },
  methods: {
    downloadPNG() {
      const link = document.createElement('a')
      link.href = this.src
      link.setAttribute('download', 'Image_png.png')
      document.body.appendChild(link)
      link.click()
    },
    downloadPDF() {
      return 1
    },
    resizeEvent(i, newH, newW, newHPx, newWPx) {
      console.log(
        'RESIZE i=' +
          i +
          ', H=' +
          newH +
          ', W=' +
          newW +
          ', H(px)=' +
          newHPx +
          ', W(px)=' +
          newWPx
      )
    },
    doSomething() {
      this.$refs.chart.inst.getWidth() // call the method of ECharts instance
    },
  },
}
</script>

<style lang="scss" scoped>
.grid-item-border {
  border: 1px solid #d3d3d3;
  flex-direction: column;
  position: relative;
  display: flex;
  height: 100%;
  border-radius: 4px;
  background: white;
}
</style>
