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
        class="primary white--text caption px-2 py-1"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        >{{ title }} <v-spacer></v-spacer>
        <div>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon v-show="hover === true" color="white" v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <p>TODO</p>
          </v-tooltip>
          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark icon v-bind="attrs" v-on="on">
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
                <download-excel class="mr-4" :data="values" type="csv">
                  <v-list-item-title>Download file (CSV)</v-list-item-title>
                </download-excel>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-title>
      <ECharts ref="chart" :option="option" class="no-drag" /> </grid-item
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
    // src: { type: String, required: true },
    title: { type: String, required: true },
    name: { type: Array, required: true },
    values: { type: Array, required: true },
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
        title: {
          text: this.title,
          subtext: '',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          bottom: 10,
          left: 'center',
          // data: [
          //   '1_oligodendrocytes',
          //   '2_pyramidal_CA1',
          //   '3_pyramidal_SS',
          //   '4_microglia',
          //   '5_interneurons',
          //   '6_endothelial_mural',
          //   '7_astrocytes_ependymal',
          // ],
          data: this.names,
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            // data: [
            //   { value: 820, name: '1_oligodendrocytes' },
            //   { value: 939, name: '2_pyramidal_CA1' },
            //   { value: 399, name: '3_pyramidal_SS' },
            //   { value: 98, name: '4_microglia' },
            //   { value: 290, name: '5_interneurons' },
            //   { value: 235, name: '6_endothelial_mural' },
            //   { value: 224, name: '7_astrocytes_ependymal' },
            // ],
            data: this.values,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
    },
  },
  mounted() {
    this.$refs.chart.inst.on('click', (params) => {
      this.$notifier.showAlert({
        content: `Selected ${params.name} from ${params.seriesType} chart`,
        value: `${params.value}`,
        color: 'success',
      })
    })
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
