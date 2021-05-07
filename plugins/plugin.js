import Vue from 'vue'
import VueGridLayout from 'vue-grid-layout'
import { plugin } from 'echarts-for-vue'
import * as echarts from 'echarts'
import JsonExcel from 'vue-json-excel'
import Vuelidate from 'vuelidate'
import VueCytoscape from 'vue-cytoscape'
import theme1 from '@/static/json/echarts/theme1'

Vue.use(plugin, { echarts })
Vue.use(VueCytoscape)
Vue.use(Vuelidate)
echarts.registerTheme(theme1)
Vue.component('downloadExcel', JsonExcel)
Vue.component('grid-layout', VueGridLayout.GridLayout)
Vue.component('grid-item', VueGridLayout.GridItem)

export default { JsonExcel }
