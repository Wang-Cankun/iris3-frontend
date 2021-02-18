import Vue from 'vue'
import vPlotly from '@statnett/vue-plotly'
import VueGridLayout from 'vue-grid-layout'
import * as d3 from 'd3'
import * as echarts from 'echarts'
import { plugin } from 'echarts-for-vue'

Vue.use(plugin, { echarts })
const VuePlotly = {
  install(Vue) {
    Vue.component('vue-plotly', vPlotly)
  },
}
Vue.use(VuePlotly)
Vue.component('downloadExcel')
Vue.component('grid-layout', VueGridLayout.GridLayout)
Vue.component('grid-item', VueGridLayout.GridItem)

export default { VuePlotly, d3, echarts }
