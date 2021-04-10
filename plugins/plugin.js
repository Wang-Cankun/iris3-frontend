import Vue from 'vue'
import VueGridLayout from 'vue-grid-layout'
import * as echarts from 'echarts'
import { plugin } from 'echarts-for-vue'
import JsonExcel from 'vue-json-excel'
import Vuelidate from 'vuelidate'
import VueCytoscape from 'vue-cytoscape'

Vue.use(VueCytoscape)
// Vue.use(cytoscape)
Vue.use(Vuelidate)
Vue.use(plugin, { echarts })
Vue.component('downloadExcel', JsonExcel)
Vue.component('grid-layout', VueGridLayout.GridLayout)
Vue.component('grid-item', VueGridLayout.GridItem)
export default { echarts, JsonExcel }
