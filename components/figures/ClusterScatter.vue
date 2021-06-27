<template>
  <v-card class="ma-0"
    ><grid-item
      :w="setting.w"
      :h="setting.h"
      :x="setting.x"
      :y="setting.y"
      :i="setting.i"
      class="grid-item-border"
      drag-ignore-from=".no-drag"
    >
      <v-card-title
        class="grey lighten-3 font-weight-bold caption px-2 py-1"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        >{{ setting.title }}
        <v-spacer></v-spacer>
        <div>
          <v-tooltip top max-width="500px">
            <template v-slot:activator="{ on }">
              <v-icon v-show="hover === true" v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <p>Cell cluster scatter plot: to be updated</p>
          </v-tooltip>
          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon v-show="hover === true">mdi-cog</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <div id="create">
                  <div fluid>
                    <p class="subtitle-1 font-weight-bold text-center">
                      Settings
                    </p>
                    <v-select
                      v-model="colorPalette"
                      :items="colorPaletteList"
                      label="Color palette"
                      item-text="name"
                      item-value="color"
                      dense
                    ></v-select>
                    <v-slider
                      v-model="pointSize"
                      label="Point size"
                      :max="10"
                      min="1"
                      thumb-label="always"
                    ></v-slider>
                    <v-divider />
                  </div></div
              ></v-list-item>
            </v-list>
          </v-menu>
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
              <v-list-item @click="1">
                <download-excel class="mr-4" :data="src.embedding" type="csv">
                  <v-list-item-title>Download file (CSV)</v-list-item-title>
                </download-excel>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-title>
      <ECharts ref="chart" :option="option2d" class="no-drag" /> </grid-item
  ></v-card>
</template>

<script>
import * as echarts from 'echarts'
import { createComponent } from 'echarts-for-vue'
import EchartsService from '~/services/EchartsService.js'
import { COLOR_PALETTE } from '~/static/color_palette.js'

export default {
  components: {
    ECharts: createComponent({ echarts }),
  },
  props: {
    src: {
      type: Object,
      required: true,
      default: () => ({ axis: [0, 1], legend: [0], dimension: 1 }),
    },
    setting: {
      type: Object,
      required: true,
      default: () => ({ title: '', h: 2, x: 0, y: 0, i: '0' }),
    },
  },
  data() {
    return {
      hover: false,
      theme: 'light',
      themeList: ['light', 'dark'],
      pointSize: 4,
      colorPalette: [
        '#5A5156',
        '#F6222E',
        '#FE00FA',
        '#16FF32',
        '#3283FE',
        '#FEAF16',
        '#B00068',
        '#1CFFCE',
        '#90AD1C',
        '#2ED9FF',
        '#DEA0FD',
        '#AA0DFE',
        '#F8A19F',
        '#325A9B',
        '#C4451C',
        '#1C8356',
        '#85660D',
        '#B10DA1',
        '#FBE426',
        '#1CBE4F',
        '#FA0087',
        '#FC1CBF',
        '#F7E1A0',
        '#C075A6',
        '#782AB6',
        '#AAF400',
        '#BDCDFF',
        '#822E1C',
        '#B5EFB5',
        '#7ED7D1',
        '#1C7F93',
        '#D85FF7',
        '#683B79',
        '#66B0FF',
        '#3B00FB',
      ],
      colorPaletteList: COLOR_PALETTE,
    }
  },
  computed: {
    option2d() {
      const colorList = this.colorPalette
      const data = this.src.embedding

      const pieces = []
      for (let i = 0; i < this.src.legend.length; i++) {
        pieces.push({
          value: this.src.legend[i],
          label: this.src.legend[i],
          color: colorList[i],
        })
      }
      return {
        hover: true,
        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'filter',
          },
          {
            id: 'dataZoomY',
            type: 'slider',
            yAxisIndex: [0],
            filterMode: 'empty',
            left: 10,
          },
        ],
        visualMap: {
          type: 'piecewise',
          top: 'center',
          orient: 'vertical',
          showLabel: true,
          align: 'right',
          right: 10,
          min: 0,
          max: this.src.legend.length,
          splitNumber: 4,
          dimension: 4,
          padding: 5,
          inverse: false,
          pieces,
        },
        tooltip: {
          position: 'top',
          backgroundColor: ['rgba(255,255,255,0.7)'],

          formatter(obj) {
            const value = obj.value
            return (
              '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
              'Label: ' +
              value[4] +
              '</div><div>' +
              'Identifier: ' +
              value[0] +
              '</div><div>' +
              '[' +
              value[1] +
              ', ' +
              value[2] +
              ']<br>'
            )
          },
        },
        grid: {
          left: 20,
          right: 100,
          bottom: 20,
          containLabel: true,
        },
        xAxis: {
          show: false,
          name: this.src.axis[0],
          type: 'value',
          nameGap: 16,
          nameTextStyle: {
            fontSize: 12,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          show: false,
          name: this.src.axis[1],
          type: 'value',
          nameGap: 16,
          nameTextStyle: {
            fontSize: 12,
          },
          splitLine: {
            show: false,
          },
        },
        series: {
          data,
          type: 'scatter',
          encode: { x: 1, y: 2 },
          symbolSize: this.pointSize,

          itemStyle: {
            borderColor: '#555',
            normal: {
              // The color setting of each column
              color(params) {
                return colorList[params.data[5]]
              },
            },
          },
        },
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
    changeTheme(theme) {
      // this.$refs.chart.inst.setOption(theme)
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
