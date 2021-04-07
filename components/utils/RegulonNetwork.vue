<template>
  <v-card class="ma-0"
    ><grid-item :w="w" :h="h" :x="x" :y="y" :i="i" class="grid-item-border">
      <v-card-title
        class="primary white--text caption px-2 py-1"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        >{{ title }}
        <v-spacer></v-spacer>
        <div v-show="hover === true">
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
              <v-list-item @click="downloadJPG">
                <v-list-item-title>Download JPG</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div></v-card-title
      >
      <ECharts ref="chart" :option="option" /> </grid-item
  ></v-card>
</template>

<script>
import * as echarts from 'echarts'
import { createComponent } from 'echarts-for-vue'

import EchartsService from '~/services/EchartsService.js'

export default {
  components: {
    ECharts: createComponent({ echarts }), // use as a component
  },
  props: {
    title: { type: String, required: true },
    graph: { type: Object, required: true },
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
          text: '',
          subtext: '',
          top: 'top',
          left: 'left',
        },
        tooltip: {},
        legend: [
          {
            data: this.graph.categories.map((cate) => cate.name),
          },
        ],
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: '',
            type: 'graph',
            layout: 'none',
            draggable: true,
            selectMode: 'multiple',
            data: this.graph.nodes,
            links: this.graph.links,
            categories: this.graph.categories,
            roam: true,
            label: {
              position: 'right',
              formatter: '{b}',
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3,
            },
            emphasis: {
              blurScope: 'global',
              focus: 'adjacency',
              label: {
                position: 'right',
                show: true,
              },
              lineStyle: {
                width: 10,
              },
            },
          },
        ],
      }
    },
  },
  methods: {
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
    downloadPNG() {
      EchartsService.downloadImg(this.$refs.chart.inst, 'png')
    },
    downloadJPG() {
      EchartsService.downloadImg(this.$refs.chart.inst, 'jpg')
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
