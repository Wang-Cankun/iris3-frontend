<template>
  <v-card class="ma-0"
    ><grid-item :w="w" :h="h" :x="x" :y="y" :i="i" class="grid-item-border">
      <v-card-title
        class="primary white--text caption px-2 py-2"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        >{{ title }} <v-spacer></v-spacer>
        <div v-show="hover === true">
          <v-tooltip top class="my-0 py-0">
            <template v-slot:activator="{ on }">
              <v-icon color="white" dark v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <p>Tooltip content</p>
          </v-tooltip>
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon>mdi-download-outline</v-icon>
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
      <ECharts ref="chart" :option="option" /> </grid-item
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
  mounted() {
    // this.$refs.chart.inst.on('mousemove', (params) => {
    //   console.log(params)
    //   this.$notifier.showMessage({
    //     content: `Current type: ${params.seriesType}; name: ${params.name};
    //     value: ${params.value}`,
    //     color: 'accent',
    //   })
    // })
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
