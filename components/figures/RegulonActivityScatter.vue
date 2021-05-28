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
            <p>TODO</p>
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
                      v-model="lowColor"
                      :items="colorList"
                      label="low regulon activity color"
                      dense
                    ></v-select>
                    <v-select
                      v-model="highColor"
                      :items="colorList"
                      label="high regulon activity color"
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
      <ECharts ref="chart" :option="option2d" class="no-drag" /></grid-item
  ></v-card>
</template>

<script>
import * as echarts from 'echarts'
import { createComponent } from 'echarts-for-vue'
// import Coords from 'static/json/regulon/feature_coord.json'
import EchartsService from '~/services/EchartsService.js'
// import ApiService from '~/services/ApiService.js'

export default {
  components: {
    ECharts: createComponent({ echarts }),
  },
  props: {
    src: { type: Object, required: true },
    setting: {
      type: Object,
      required: true,
      default: () => ({ title: '', h: 2, x: 0, y: 0, i: '0' }),
    },
  },
  data() {
    return {
      hover: false,
      is3d: false,
      theme: 'light',
      themeList: ['light', 'dark'],
      pointSize: 4,
      lowColor: 'grey',
      highColor: 'blue',
      colorList: ['grey', 'blue', 'red', 'green'],

      violinGroup: 'seurat_clusters',
    }
  },
  computed: {
    option2d() {
      const data = this.src.embedding

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
          min: this.src.legend[0],
          max: this.src.legend[1],
          dimension: 4,
          orient: 'vertical',
          right: 10,
          top: 'center',
          text: ['HIGH', 'LOW'],
          calculable: true,
          inRange: {
            color: [this.lowColor, this.highColor],
          },
        },
        tooltip: {
          position: 'top',
          backgroundColor: ['rgba(255,255,255,0.7)'],
          formatter(obj) {
            const value = obj.value
            return (
              '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
              ' ' +
              value[4] +
              '</div><div>' +
              value[0] +
              '</div><div>' +
              '<br>'
            )
          },
        },
        grid: {
          left: 60,
          right: 120,
          bottom: 60,
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
          name: 'featureplot',
          data,
          type: 'scatter',
          encode: { x: 1, y: 2 },
          symbolSize: this.pointSize,
        },
      }
    },
  },
  watch: {},
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
