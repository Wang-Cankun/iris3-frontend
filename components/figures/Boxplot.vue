<template>
  <v-card class="ma-0"
    ><grid-item
      :w="w"
      :h="h"
      :x="x"
      :y="y"
      :i="i"
      class="grid-item-border"
      drag-ignore-from=".no-drag"
    >
      <v-card-title
        class="grey lighten-3 font-weight-bold caption px-2 py-1"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        >{{ title }}
        <v-spacer></v-spacer>
        <div>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon v-show="hover === true" v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <p>TODO</p>
          </v-tooltip>
          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon v-show="hover === true">mdi-download-outline</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="downloadPNG">
                <v-list-item-title>Download PNG</v-list-item-title>
              </v-list-item>
              <v-list-item @click="downloadPDF">
                <v-list-item-title>Download JPG</v-list-item-title>
              </v-list-item>
              <v-list-item @click="downloadCSV">
                <download-excel class="mr-4" :data="src" type="csv">
                  <v-list-item-title>Download file (CSV)</v-list-item-title>
                </download-excel>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-title>
      <ECharts ref="chart" class="no-drag" :option="option" /> </grid-item
  ></v-card>
</template>

<script>
import { createComponent } from 'echarts-for-vue'
import * as echarts from 'echarts'
import EchartsService from '~/services/EchartsService.js'

export default {
  components: {
    ECharts: createComponent({ echarts }), // use as a component
  },
  props: {
    src: { type: Array, required: true },
    title: { type: String, required: true },
    w: { type: Number, required: true, default: 2 },
    h: { type: Number, required: true, default: 2 },
    x: { type: Number, required: true, default: 0 },
    y: { type: Number, required: true, default: 0 },
    i: { type: String, required: true, default: '0' },
  },
  data() {
    return {
      hover: false,
    }
  },
  computed: {
    option() {
      return {
        title: [
          {
            text: '',
            left: 'center',
          },
        ],

        dataset: [
          {
            source: [this.src],
          },
          {
            transform: {
              type: 'boxplot',
              config: { itemNameFormatter: '' },
            },
          },
          {
            fromDatasetIndex: 1,
            fromTransformResult: 1,
          },
        ],
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '25%',
          right: '5%',
          bottom: '15%',
        },
        xAxis: {
          type: 'category',
          name: '',
          boundaryGap: true,
          nameGap: 30,
          splitArea: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          name: '',
          splitArea: {
            show: true,
          },
        },
        series: [
          {
            name: 'boxplot',
            type: 'boxplot',
            datasetIndex: 1,
          },
          {
            name: 'outlier',
            type: 'scatter',
            datasetIndex: 2,
          },
        ],
      }
    },
  },

  methods: {
    downloadPNG() {
      EchartsService.downloadImg(this.$refs.chart.inst, 'png')
    },
    downloadPDF() {
      EchartsService.downloadImg(this.$refs.chart.inst, 'jpg')
    },
    downloadCSV() {
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
