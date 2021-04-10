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

      const node2 = graph.nodes.map((node) => {
        return { id: node.id, name: node.name, category: node.category }
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
            name: 'Example Regulon TF-Gene network',
            type: 'graph',
            layout: 'circular',
            circular: {
              rotateLabel: true,
            },
            data: node2,
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
    doSomething() {
      this.$refs.chart.inst.getWidth() // call the method of ECharts instance
    },
  },
}
</script>
