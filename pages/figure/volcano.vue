<template>
  <v-card height="90vh">
    <v-btn @click="doSomething">inst</v-btn>
    <no-ssr>
      <ECharts ref="chart" :option="option2d" />
    </no-ssr>
  </v-card>
</template>

<script>
import * as echarts from 'echarts'
import { createComponent } from 'echarts-for-vue'

import deg from 'static/json/deg.json'

export default {
  components: {
    ECharts: createComponent({ echarts }), // use as a component
  },
  data() {
    return {
      option: 123,
    }
  },
  computed: {
    src() {
      return deg.map((item) => [
        item.avg_log2FC,
        -1 * Math.log10(item.p_val_adj).toFixed(3),
        item.gene,
      ])
    },
    option2d() {
      console.log(this.src)
      return {
        hover: true,
        toolbox: {
          show: true,
          feature: {
            dataZoom: {},
          },
        },
        tooltip: {
          position: 'top',
          backgroundColor: ['rgba(255,255,255,0.7)'],

          formatter(obj) {
            const value = obj.value
            return (
              '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
              'Gene: ' +
              value[2] +
              '</div><div>' +
              'log2 Foldchange: ' +
              value[0] +
              '</div><div>' +
              'adj. p-value: ' +
              value[1] +
              '<br>'
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
          show: true,
          name: 'log2 foldchange',
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
          show: true,
          name: '-log10(adj. p-value)',
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
          data: this.src.slice(0, 533),
          type: 'scatter',
          emphasis: {
            focus: 'self',
          },
          symbolSize: 20,
        },
      }
    },
  },
  methods: {
    doSomething() {
      const dat = this.src.slice(0, 53)
      this.$refs.chart.inst.resize()
      // this.$refs.chart.inst.setOption({
      //   series: [
      //     {
      //       type: 'scatter',
      //       name: 'test',
      //       data: dat,
      //       showAllSymbol: false,
      //       encode: { x: 0, y: 1 },
      //     },
      //   ],
      // })
      console.log(dat)
    },
  },
}
</script>
