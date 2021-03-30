<template>
  <v-card class="ma-0"
    ><grid-item :w="w" :h="h" :x="x" :y="y" :i="i" class="grid-item-border">
      <v-card-title class="primary white--text caption px-2 py-1"
        >{{ title }} <v-spacer></v-spacer>

        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="downloadPNG">
              <v-list-item-title>Download PNG</v-list-item-title>
            </v-list-item>
            <v-list-item @click="downloadPDF">
              <v-list-item-title>Download PDF</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu></v-card-title
      >
      <ECharts ref="chart" :option="option" /> </grid-item
  ></v-card>
</template>

<script>
import { createComponent } from 'echarts-for-vue'
import * as echarts from 'echarts'
export default {
  components: {
    ECharts: createComponent({ echarts }), // use as a component
  },
  props: {
    src: { type: Array, required: true },
    title: { type: String, required: true },
    w: { type: Number, required: true, default: 2 },
    h: { type: Number, required: true, default: 2 },
    x: { type: Number, required: true, default: 0 },
    y: { type: Number, required: true, default: 0 },
    i: { type: String, required: true, default: '0' },
  },
  data() {
    return {
      src2: 1,
    }
  },
  computed: {
    option() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          data: this.src.map((item) => item.breaks),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: this.title,
            data: this.src.map((item) => item.counts),
            type: 'bar',
          },
        ],
      }
    },
  },
  mounted() {
    // this.$refs.chart.inst.on('mousemove', (params) => {
    //   this.doSomething()
    //   this.$notifier.showMessage({
    //     content: `Current type: ${params.seriesType}; name: ${params.name};
    //     value: ${params.value}`,
    //     color: 'accent',
    //   })
    // })
  },
  methods: {
    downloadPNG() {
      const link = document.createElement('a')
      link.href = this.src
      link.setAttribute('download', 'Image_png.png')
      document.body.appendChild(link)
      link.click()
    },
    downloadPDF() {
      return 1
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
    doSomething() {},
    emitNotifier() {
      this.$refs.chart.inst.on('mousemove', (params) => {
        this.$notifier.showMessage({
          content: 'mouse move notifier',
          color: 'accent',
        })
      })
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
