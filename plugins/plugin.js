import Vue from 'vue'
import vPlotly from '@statnett/vue-plotly'
import VueGridLayout from 'vue-grid-layout'

const VuePlotly = {
  install(Vue) {
    Vue.component('vue-plotly', vPlotly)
  },
}
Vue.use(VuePlotly)
Vue.component('downloadExcel')
Vue.component('grid-layout', VueGridLayout.GridLayout)
Vue.component('grid-item', VueGridLayout.GridItem)

export default { VuePlotly }
