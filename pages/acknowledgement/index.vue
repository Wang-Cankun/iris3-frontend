<template>
  <v-container>
    <div class="example">
      <apexchart
        width="1400"
        height="300"
        type="heatmap"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </v-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import Vue from 'vue'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

export default {
  name: 'App',
  data() {
    return {
      chartOptions: {
        dataLabels: {
          enabled: false,
        },
        colors: ['#008FFB'],
        xaxis: {
          type: 'category',
        },
        title: {
          text: 'HeatMap Chart (Single color)',
        },
      },
      series: [
        {
          name: 'Metric1',
          data: this.generateData(100, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric2',
          data: this.generateData(100, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric3',
          data: this.generateData(100, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric4',
          data: this.generateData(100, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric5',
          data: this.generateData(100, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric6',
          data: this.generateData(100, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric7',
          data: this.generateData(100, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric8',
          data: this.generateData(100, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: 'Metric9',
          data: this.generateData(100, {
            min: 0,
            max: 90,
          }),
        },
      ],
    }
  },
  methods: {
    generateData(count, yrange) {
      let i = 0
      const series = []
      while (i < count) {
        const x = (i + 1).toString()
        const y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
        series.push({
          x,
          y,
        })
        i++
      }
      return series
    },
  },
}
</script>
