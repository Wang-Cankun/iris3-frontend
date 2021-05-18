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
                      label="low expression color"
                      dense
                    ></v-select>
                    <v-select
                      v-model="highColor"
                      :items="colorList"
                      label="high expression color"
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
      <div class="no-drag">
        <div v-if="src.axis[0] !== 0"></div>
      </div>
      <ECharts ref="chart" :option="option" class="no-drag" /></grid-item
  ></v-card>
</template>

<script>
import * as echarts from 'echarts'
import { createComponent } from 'echarts-for-vue'
import graph from 'static/json/les-miserables.json'
import EchartsService from '~/services/EchartsService.js'
import ApiService from '~/services/ApiService.js'

export default {
  components: {
    ECharts: createComponent({ echarts }),
  },
  props: {
    // src: { type: String, required: true },
    title: { type: String, required: true },
    genes: { type: Array, required: true },
    w: { type: Number, required: true, default: 2 },
    h: { type: Number, required: true, default: 2 },
    x: { type: Number, required: true, default: 0 },
    y: { type: Number, required: true, default: 0 },
    i: { type: String, required: true, default: '0' },
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
      gene: 'Gad1',
      src: { axis: [0, 1], legend: [0, 1], dimension: 1 },
    }
  },
  computed: {
    option() {
      graph.nodes.forEach(function (node) {
        node.label = {
          show: node.symbolSize > 30,
        }
      })
      return {
        title: {
          text: 'Example circos',
          subtext: 'Circular layout',
          top: 'bottom',
          left: 'right',
        },
        tooltip: {},
        legend: [
          {
            data: graph.categories.map(function (a) {
              return a.name
            }),
          },
        ],
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: 'Example circos',
            type: 'graph',
            layout: 'circular',
            circular: {
              rotateLabel: true,
            },
            data: graph.nodes,
            links: graph.links,
            categories: graph.categories,
            roam: true,
            label: {
              position: 'right',
              formatter: '{b}',
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3,
            },
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
    changeTheme(theme) {
      // this.$refs.chart.inst.setOption(theme)
    },
    doSomething() {
      this.$refs.chart.inst.getWidth() // call the method of ECharts instance
    },
    async run() {
      this.src = await ApiService.postCommand(
        'deepmaps/api/queue/feature-coords/',
        {
          gene: this.gene,
          assay: 'RNA',
        }
      )
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
