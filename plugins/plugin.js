import Vue from 'vue'
import VueGridLayout from 'vue-grid-layout'
import { plugin } from 'echarts-for-vue'
import * as echarts from 'echarts'
import JsonExcel from 'vue-json-excel'
import Vuelidate from 'vuelidate'
import VueCytoscape from 'vue-cytoscape'
import Particles from 'particles.vue'

Vue.use(Particles)
Vue.use(plugin, { echarts })
Vue.use(VueCytoscape)
Vue.use(Vuelidate)
Vue.component('downloadExcel', JsonExcel)
Vue.component('grid-layout', VueGridLayout.GridLayout)
Vue.component('grid-item', VueGridLayout.GridItem)

export default { JsonExcel }
