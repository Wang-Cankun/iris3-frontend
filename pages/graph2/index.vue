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
    this.json = await import(`static/json/npmdepgraph.min10.json`)
  },
  data() {
    return {
      json: {},
    }
  },
  computed: {
    option() {
      this.json.nodes.forEach(function (node) {
        node.label = {
          show: node.symbolSize > 30,
        }
      })
      return {
        title: {
          text: 'NPM Dependencies',
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'none',
            // progressiveThreshold: 700,
            data: this.json.nodes.map(function (node) {
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
            edges: this.json.edges.map(function (edge) {
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
