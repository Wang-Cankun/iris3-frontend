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
      @resized="changeSize"
    >
      <v-card-title
        class="grey lighten-3 font-weight-bold caption px-2 py-1"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        >Regulon heatmap <v-spacer></v-spacer>
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
                      Settings: todo
                    </p>
                  </div>
                </div></v-list-item
              >
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
                <download-excel class="mr-4" data="" type="csv">
                  <v-list-item-title>Download file (CSV)</v-list-item-title>
                </download-excel>
              </v-list-item>
            </v-list>
          </v-menu>
        </div></v-card-title
      >
      <ECharts ref="chart" :option="option" class="no-drag" /> </grid-item
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
      heatmap: '',
      windowSize: {
        x: 420,
        y: 600,
      },
    }
  },
  computed: {
    option() {
      const row = ['1', '2', '3', '4', '5']
      const column = [
        'CTCF',
        'DEAF1',
        'IKZF1',
        'TP53',
        'SREBF2',
        'ESR1',
        'ZNF740',
        'ZBTB7A',
        'SMAD3',
        'AHR',
        'ARNT',
        'NR1H3',
        'SMAD1',
        'CEBPB',
        'SREBF1',
        'NR2C2',
        'TCF12',
        'MYC',
        'SMAD4',
        'VDR',
        'ZNF589',
        'REST',
        'RARG',
        'E2F6',
        'SP4',
        'NR2F6',
        'MAFF',
        'ZNF143',
        'SP1',
        'ZNF263',
        'ZNF350',
        'TBX21',
        'PATZ1',
        'BCL6',
        'CLOCK',
        'SP2',
        'MEF2C',
        'FOXP1',
        'ETS1',
        'CEBPD',
      ]
      const data = [
        [0, 0, 0.1232],
        [1, 0, 0.0844],
        [2, 0, 0.0901],
        [3, 0, 0.1042],
        [4, 0, 0.1074],
        [0, 1, 0.5199],
        [1, 1, 0.4651],
        [2, 1, 0],
        [3, 1, 0],
        [4, 1, 0],
        [0, 2, 0.0987],
        [1, 2, 0.081],
        [2, 2, 0.0961],
        [3, 2, 0.1251],
        [4, 2, 0.11],
        [0, 3, 0.095],
        [1, 3, 0.0569],
        [2, 3, 0.0442],
        [3, 3, 0.0551],
        [4, 3, 0.0696],
        [0, 4, 0.3459],
        [1, 4, 0.3002],
        [2, 4, 0.2578],
        [3, 4, 0.2732],
        [4, 4, 0.3493],
        [0, 5, 0.3454],
        [1, 5, 0.2748],
        [2, 5, 0.2478],
        [3, 5, 0.2569],
        [4, 5, 0.3275],
        [0, 6, 0.1378],
        [1, 6, 0.1154],
        [2, 6, 0.0918],
        [3, 6, 0.1237],
        [4, 6, 0.1388],
        [0, 7, 0.2588],
        [1, 7, 0.2345],
        [2, 7, 0.1841],
        [3, 7, 0.21],
        [4, 7, 0.268],
        [0, 8, 0.1996],
        [1, 8, 0.17],
        [2, 8, 0.1166],
        [3, 8, 0.1408],
        [4, 8, 0.2065],
        [0, 9, 0.2595],
        [1, 9, 0.2596],
        [2, 9, 0.2163],
        [3, 9, 0.2384],
        [4, 9, 0.3022],
        [0, 10, 0.5546],
        [1, 10, 0.3637],
        [2, 10, 0.3516],
        [3, 10, 0.3701],
        [4, 10, 0.3801],
        [0, 11, 0.1795],
        [1, 11, 0.1247],
        [2, 11, 0.1172],
        [3, 11, 0],
        [4, 11, 0.1653],
        [0, 12, 0.782],
        [1, 12, 0.5714],
        [2, 12, 0.4288],
        [3, 12, 0.5508],
        [4, 12, 0.6527],
        [0, 13, 0.113],
        [1, 13, 0.102],
        [2, 13, 0.087],
        [3, 13, 0.0932],
        [4, 13, 0.1265],
        [0, 14, 0.2755],
        [1, 14, 0.1771],
        [2, 14, 0.148],
        [3, 14, 0.1943],
        [4, 14, 0.2051],
        [0, 15, 0.2537],
        [1, 15, 0],
        [2, 15, 0.1754],
        [3, 15, 0.1634],
        [4, 15, 0.2061],
        [0, 16, 0.1777],
        [1, 16, 0.1533],
        [2, 16, 0.1487],
        [3, 16, 0.1497],
        [4, 16, 0.1843],
        [0, 17, 0.2786],
        [1, 17, 0.1749],
        [2, 17, 0.1604],
        [3, 17, 0.1859],
        [4, 17, 0.2327],
        [0, 18, 0.3328],
        [1, 18, 0.2887],
        [2, 18, 0.2713],
        [3, 18, 0.2783],
        [4, 18, 0.3566],
        [0, 19, 0.1552],
        [1, 19, 0.1065],
        [2, 19, 0.0805],
        [3, 19, 0.1213],
        [4, 19, 0.1321],
        [0, 20, 0.1064],
        [1, 20, 0.1175],
        [2, 20, 0.1167],
        [3, 20, 0],
        [4, 20, 0.1396],
        [0, 21, 0.2439],
        [1, 21, 0.1836],
        [2, 21, 0.1726],
        [3, 21, 0.2116],
        [4, 21, 0.2464],
        [0, 22, 0.0617],
        [1, 22, 0.0984],
        [2, 22, 0.0962],
        [3, 22, 0.0912],
        [4, 22, 0.1074],
        [0, 23, 0.2361],
        [1, 23, 0.1693],
        [2, 23, 0],
        [3, 23, 0],
        [4, 23, 0],
        [0, 24, 0.2781],
        [1, 24, 0.2222],
        [2, 24, 0.1956],
        [3, 24, 0.1896],
        [4, 24, 0],
        [0, 25, 0.3081],
        [1, 25, 0.2403],
        [2, 25, 0.2088],
        [3, 25, 0.2285],
        [4, 25, 0.2776],
        [0, 26, 0.2687],
        [1, 26, 0],
        [2, 26, 0.2057],
        [3, 26, 0.2333],
        [4, 26, 0.2707],
        [0, 27, 0.2203],
        [1, 27, 0.1617],
        [2, 27, 0.1678],
        [3, 27, 0.1693],
        [4, 27, 0.2019],
        [0, 28, 0.3037],
        [1, 28, 0.2436],
        [2, 28, 0.2099],
        [3, 28, 0.2521],
        [4, 28, 0.3001],
        [0, 29, 0.1363],
        [1, 29, 0.1049],
        [2, 29, 0.0783],
        [3, 29, 0.0971],
        [4, 29, 0.1173],
        [0, 30, 0.2162],
        [1, 30, 0.1948],
        [2, 30, 0.1704],
        [3, 30, 0.1917],
        [4, 30, 0.2063],
        [0, 31, 0.0484],
        [1, 31, 0.04],
        [2, 31, 0.0179],
        [3, 31, 0],
        [4, 31, 0.0493],
        [0, 32, 0.1083],
        [1, 32, 0.1006],
        [2, 32, 0.0889],
        [3, 32, 0.109],
        [4, 32, 0],
        [0, 33, 0.0388],
        [1, 33, 0.058],
        [2, 33, 0.0407],
        [3, 33, 0],
        [4, 33, 0.0511],
        [0, 34, 0.5057],
        [1, 34, 0],
        [2, 34, 0.2605],
        [3, 34, 0],
        [4, 34, 0.4151],
        [0, 35, 0.0876],
        [1, 35, 0.0736],
        [2, 35, 0.0473],
        [3, 35, 0.0562],
        [4, 35, 0],
        [0, 36, 0.1305],
        [1, 36, 0.1175],
        [2, 36, 0.1253],
        [3, 36, 0],
        [4, 36, 0.1616],
        [0, 37, 0.361],
        [1, 37, 0.2997],
        [2, 37, 0.2301],
        [3, 37, 0],
        [4, 37, 0.3662],
        [0, 38, 0.3366],
        [1, 38, 0.2938],
        [2, 38, 0.2412],
        [3, 38, 0.2718],
        [4, 38, 0.3413],
        [0, 39, 0.4285],
        [1, 39, 0.352],
        [2, 39, 0],
        [3, 39, 0],
        [4, 39, 0.3788],
      ]
      return {
        tooltip: {
          position: 'top',
        },
        grid: {
          height: '80%',
          top: '5%',
          left: '15%',
        },
        xAxis: {
          type: 'category',
          data: row,
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          type: 'category',
          data: column,
          splitArea: {
            show: true,
          },
        },
        visualMap: {
          min: 0,
          max: 1,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          right: '5%',
          inRange: {
            color: ['white', 'red'],
          },
        },
        series: [
          {
            name: 'Activity',
            type: 'heatmap',
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
    },
  },
  watch: {
    genes() {
      this.runHeatmapStatic()
    },
  },
  methods: {
    downloadPNG() {
      EchartsService.downloadImg(this.$refs.chart.inst, 'png')
    },
    downloadPDF() {
      EchartsService.downloadImg(this.$refs.chart.inst, 'jpg')
    },
    downloadTable() {
      this.$notifier.showMessage({
        content: 'Downloading table...',
        color: 'Success',
      })
    },
    changeSize(i, newH, newW, newHPx, newWPx) {
      this.windowSize.x = newWPx
      this.windowSize.y = newHPx
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
    async copyGenes(genes) {
      try {
        await this.$copyText(genes.join('\n'))
      } catch (e) {
        console.error(e)
      }
    },
    runHeatmapStatic() {
      console.log('Run regulon heatmap')
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
