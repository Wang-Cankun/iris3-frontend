<template>
  <ECharts ref="chart" :option="option" />
</template>

<script>
import * as echarts from 'echarts'
import { createComponent } from 'echarts-for-vue'
import graph from 'static/json/les-miserables.json'

export default {
  components: {
    ECharts: createComponent({ echarts }), // use as a component
  },

  data() {
    return {}
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
          text: 'Les Miserables',
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
            name: 'Les Miserables',
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
    doSomething() {
      this.$refs.chart.inst.getWidth() // call the method of ECharts instance
    },
  },
}
</script>
