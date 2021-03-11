<template>
  <ECharts ref="chart" :option="option" />
</template>

<script>
import * as echarts from 'echarts'
import { createComponent } from 'echarts-for-vue'

export default {
  components: {
    ECharts: createComponent({ echarts }), // use as a component
  },
  async fetch() {
    this.graph = await import(`static/json/les-miserables.json`)
  },
  data() {
    return {
      graph: {},
    }
  },
  computed: {
    option() {
      this.graph.nodes.forEach(function (node) {
        node.label = {
          show: node.symbolSize > 30,
        }
      })
      return {
        title: {
          text: 'Les Miserables',
          subtext: 'Circular layout',
          top: 'bottom',
          left: 'right',
        },
        tooltip: {},
        legend: [
          {
            data: this.graph.categories.map(function (a) {
              return a.name
            }),
          },
        ],
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'circular',
            circular: {
              rotateLabel: true,
            },
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
          },
        ],
      }
    },
  },
  methods: {
    doSomething() {
      this.$refs.chart.inst.getWidth() // call the method of ECharts instance
    },
  },
}
</script>
