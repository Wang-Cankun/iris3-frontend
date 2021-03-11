<template>
  <ECharts ref="chart" :option="option" />
</template>

<script>
import * as echarts from 'echarts'
import { createComponent } from 'echarts-for-vue'
import graph from 'static/json/npmdepgraph.min10.json'

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
          text: 'Graph',
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            // progressiveThreshold: 700,
            data: graph.nodes.map(function (node) {
              return {
                x: node.x,
                y: node.y,
                id: node.id,
                name: node.label,
                symbolSize: node.size,
                itemStyle: {
                  color: node.color,
                },
              }
            }),
            edges: graph.edges.map(function (edge) {
              return {
                source: edge.sourceID,
                target: edge.targetID,
              }
            }),
            emphasis: {
              focus: 'adjacency',
              label: {
                position: 'right',
                show: true,
              },
            },
            roam: true,
            lineStyle: {
              width: 0.5,
              curveness: 0.3,
              opacity: 0.7,
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
