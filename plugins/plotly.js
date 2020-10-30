import Vue from 'vue'
import vPlotly from '@statnett/vue-plotly'
import vdr from 'vue-draggable-resizable-gorkys'

import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'

const VuePlotly = {
  install(Vue) {
    Vue.component('vue-plotly', vPlotly)
  },
}
Vue.use(VuePlotly)
Vue.component('downloadExcel')

Vue.component('vdr', vdr)
export default { VuePlotly }
