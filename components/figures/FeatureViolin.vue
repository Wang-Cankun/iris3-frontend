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
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              v-model="gene"
              class="ml-4"
              :items="genes"
              label="Gene"
              dense
            ></v-autocomplete>
            <v-btn
              class="mx-2 mb-2 mt-0"
              color="Primary"
              small
              @click="Calculate()"
              >Plot</v-btn
            >
          </v-col>
        </v-row>
      </div>
      <ECharts ref="chart" :option="option2d" class="no-drag" /></grid-item
  ></v-card>
</template>

<script>
import * as echarts from 'echarts'
import { createComponent } from 'echarts-for-vue'
import res from 'static/json/feature_coord.json'
import EchartsService from '~/services/EchartsService.js'
import ApiService from '~/services/ApiService.js'

const d3 = Object.assign(
  {},
  require('d3-shape'),
  require('d3-scale'),
  require('d3-array'),
  require('d3-color')
)

function kernelDensityEstimator(kernel, X) {
  return function (V) {
    return X.map(function (x) {
      return [
        x,
        d3.mean(V, function (v) {
          return kernel(x - v)
        }),
      ]
    })
  }
}
function kernelEpanechnikov(k) {
  return function (v) {
    return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0
  }
}

export default {
  components: {
    ECharts: createComponent({ echarts }),
  },
  props: {
    // src: { type: String, required: true },
    title: { type: String, required: true },
    genes: { type: Array, required: true },
    // src: {
    //   type: Object,
    //   required: true,
    //   default: () => ({ axis: [0, 1], legend: [0, 1], dimension: 1 }),
    // },
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
      //
      windowSize: {
        x: 600,
        y: 600,
      },
      violinGroup: 'seurat_clusters',
      gene: 'Gad1',
    }
  },
  computed: {
    src() {
      return res
    },
    option2d() {
      const data = this.src
      const columns = [...new Set(data.map((v) => v.date))].sort(
        (a, b) => a - b
      )
      const dataSource = columns.map((date) =>
        data.filter((item) => item.date === date).map((item) => item.value)
      )

      const option = {
        grid: {
          top: '10%',
          left: '10%',
          right: '10%',
          bottom: '10%',
        },
        xAxis: {
          type: 'category',
          data: columns,
          boundaryGap: true,
          nameGap: 30,
          splitArea: {
            show: false,
          },
          axisLabel: {
            color: '#999',
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: ['#ccc'],
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          z: 2,
          type: 'value',
          // name: '(元/㎡)',
          nameTextStyle: {
            color: '#999',
            padding: [0, 30, 0, 0],
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: ['#EEE'],
            },
          },
          axisLabel: {
            color: '#999',
          },
        },
        series: [
          {
            type: 'custom',
            color: ['#B1D0FA'],
            name: 'violin plot',
            renderItem: (params, api) => {
              const categoryIndex = api.value(0)

              const min = Math.min(...dataSource[categoryIndex])
              const max = Math.max(...dataSource[categoryIndex])
              const liner = d3
                .scaleLinear()
                .domain([min - 50, max + 50])
                .ticks(20)
              const density = kernelDensityEstimator(
                kernelEpanechnikov(7),
                liner
              )(dataSource[categoryIndex])

              const maxDens = Math.max(...density.map((v) => v[1]))

              const points = density.map((v) => {
                const [y, dens] = v
                const point = api.coord([categoryIndex, y])
                point[0] +=
                  (((api.size([0, 0])[0] / 2) * dens) / maxDens) * 0.85
                return point
              })

              const points2 = density.map((v) => {
                const [y, dens] = v
                const point = api.coord([categoryIndex, y])
                point[0] -= (((api.size([0, 0])[0] / 2) * dens) / maxDens) * 0.2
                return point
              })

              console.log(points)
              const lineGenerator = d3.line().curve(d3.curveBasis)
              const pathData = lineGenerator(points)
              const pathData2 = lineGenerator(points2)

              return {
                z: 2,
                type: 'path',
                shape: {
                  pathData: pathData + pathData2,
                },
                style: api.style({
                  fill: api.visual('color'),
                  stroke: '#428EEE',
                  lineWidth: 1,
                }),
                styleEmphasis: api.style({
                  fill: d3.color(api.visual('color')).darker(0.05),
                  stroke: d3.color('#428EEE').darker(0.05),
                  lineWidth: 2,
                }),
              }
            },
            tooltip: [0],
            encode: {
              x: 0,
              y: dataSource[
                d3.scan(dataSource, function (a, b) {
                  return b.length - a.length
                })
              ].map((v, i) => i + 1),
            },
            data: dataSource.map((v, i) => [i, ...v]),
          },
          {
            type: 'custom',
            color: ['#EE428E'],
            name: 'violin plot',
            renderItem: (params, api) => {
              const categoryIndex = api.value(0)

              const min = Math.min(...dataSource[categoryIndex])
              const max = Math.max(...dataSource[categoryIndex])
              const liner = d3
                .scaleLinear()
                .domain([min - 50, max + 50])
                .ticks(20)
              const density = kernelDensityEstimator(
                kernelEpanechnikov(7),
                liner
              )(dataSource[categoryIndex])

              const maxDens = Math.max(...density.map((v) => v[1]))

              const points = density.map((v) => {
                const [y, dens] = v
                const point = api.coord([categoryIndex, y])
                point[0] +=
                  (((api.size([0, 0])[0] / 2) * dens) / maxDens) * 0.85
                return point
              })

              const points2 = density.map((v) => {
                const [y, dens] = v
                const point = api.coord([categoryIndex, y])
                point[0] -=
                  (((api.size([0, 0])[0] / 2) * dens) / maxDens) * 0.85

                return point
              })

              const lineGenerator = d3.line().curve(d3.curveBasis)
              const pathData = lineGenerator(points)
              const pathData2 = lineGenerator(points2)

              return {
                z: 2,
                type: 'path',
                shape: {
                  pathData: pathData + pathData2,
                },
                style: api.style({
                  fill: api.visual('color'),
                  stroke: '#EE428E',
                  lineWidth: 1,
                }),
                styleEmphasis: api.style({
                  fill: d3.color(api.visual('color')).darker(0.05),
                  stroke: d3.color('#EE428E').darker(0.05),
                  lineWidth: 2,
                }),
              }
            },
            tooltip: 1,
            encode: {
              x: 0,
              y: dataSource[
                d3.scan(dataSource, function (a, b) {
                  return b.length - a.length
                })
              ].map((v, i) => i + 1),
            },
            data: dataSource.map((v, i) => [i, ...v]),
          },
          {
            type: 'scatter',
            name: 'scatter',
            data: dataSource.map((v, i) => v.map((item) => [i, item])).flat(),
            seriesLayoutBy: 'column',
            itemStyle: {
              color: '#77bef7',
            },
          },
        ],
      }
      return option
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
