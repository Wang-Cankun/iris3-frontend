<template>
  <v-card class="ma-0" @mouseover="hover = true" @mouseleave="hover = false"
    ><grid-item
      :w="setting.w"
      :h="setting.h"
      :x="setting.x"
      :y="setting.y"
      :i="setting.i"
      class="grid-item-border"
      drag-ignore-from=".no-drag"
      @resized="changeSize"
    >
      <v-card-title class="grey lighten-3 font-weight-bold caption px-2 py-1"
        >{{ setting.title }} <v-spacer></v-spacer>
        <div>
          <v-tooltip top max-width="500px">
            <template v-slot:activator="{ on }">
              <v-icon v-show="hover === true" v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <p>Differential gene expression analysis table: to be updated</p>
          </v-tooltip>
          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon v-show="hover === true">mdi-download-outline</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="1">
                <download-excel class="mr-4" data="" type="csv">
                  <v-list-item-title>Download file (CSV)</v-list-item-title>
                </download-excel>
              </v-list-item>
            </v-list>
          </v-menu>
        </div></v-card-title
      >
      <div class="no-drag">
        <v-row class="mx-4 mt-2">
          <v-col cols="4" class="my-0">
            <v-tooltip top max-width="500px">
              <template v-slot:activator="{ on }">
                <v-select
                  v-model="ident1"
                  :items="idents"
                  return-object
                  label="Group 1"
                  dense
                  multiple
                  @mouseenter.native="on.mouseenter"
                  @mouseleave.native="on.mouseleave"
                  ><template v-slot:selection="{ item, index }">
                    <v-chip v-show="index === 0">
                      <span>{{ item }}</span>
                    </v-chip>
                    <span v-show="index === 1" class="grey--text caption">
                      (+{{ ident1.length - 1 }} others)
                    </span>
                  </template>
                  <template v-slot:prepend-item>
                    <v-list-item ripple @click="toggleIdent1">
                      <v-list-item-action>
                        <v-icon
                          :color="idents.length > 0 ? 'indigo darken-4' : ''"
                        >
                          {{ iconSelect(ident1, idents) }}
                        </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title> Select All </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider> </template
                ></v-select>
              </template>
              <span
                >Select one or more clusters for differential gene expression
                analysis</span
              >
            </v-tooltip>
          </v-col>
          <v-col cols="4" class="my-0">
            <v-tooltip top max-width="500px">
              <template v-slot:activator="{ on }">
                <v-select
                  v-model="ident2"
                  :items="idents"
                  return-object
                  dense
                  label="Group 2"
                  multiple
                  @mouseenter.native="on.mouseenter"
                  @mouseleave.native="on.mouseleave"
                  ><template v-slot:selection="{ item, index }">
                    <v-chip v-show="index === 0">
                      <span>{{ item }}</span>
                    </v-chip>
                    <span v-show="index === 1" class="grey--text caption">
                      (+{{ ident2.length - 1 }} others)
                    </span>
                  </template>
                  <template v-slot:prepend-item>
                    <v-list-item ripple @click="toggleIdent2">
                      <v-list-item-action>
                        <v-icon
                          :color="idents.length > 0 ? 'indigo darken-4' : ''"
                        >
                          {{ iconSelect(ident2, idents) }}
                        </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title> Select All </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider> </template
                ></v-select>
              </template>
              <span
                >Select one or more clusters for differential gene expression
                analysis</span
              >
            </v-tooltip>
          </v-col>
          <v-col cols="4" class="my-0">
            <v-tooltip top max-width="500px">
              <template v-slot:activator="{ on }">
                <v-select
                  v-model="selectedDirection"
                  class="px-0"
                  dense
                  :items="allDirections"
                  label="Direction"
                  return-object
                  @mouseenter.native="on.mouseenter"
                  @mouseleave.native="on.mouseleave"
                >
                </v-select>
              </template>
              <p>
                Only return positive markers, negative markers, or all
                directions (all directions by default)
              </p>
            </v-tooltip>
          </v-col>
          <v-col cols="3" class="my-0 py-0"
            ><v-tooltip top max-width="500px">
              <template v-slot:activator="{ on }">
                <v-select
                  v-model="degPvalue"
                  class="px-0"
                  dense
                  :items="degPvalueList"
                  label="p-value threshold"
                  @mouseenter.native="on.mouseenter"
                  @mouseleave.native="on.mouseleave"
                ></v-select>
              </template>
              <span>The false discovery rate (FDR) adjusted p-value</span>
            </v-tooltip></v-col
          >
          <v-col cols="3" class="my-0 py-0"
            ><v-tooltip top max-width="500px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="minPct"
                  class="px-0"
                  type="number"
                  dense
                  step="0.1"
                  label="min cell percentage"
                  v-on="on"
                ></v-text-field>
              </template>
              <p>
                Only test genes that are detected in a minimum fraction of
                min.pct cells in either of the two populations.
              </p>
              <p>
                Meant to speed up the function by not testing genes that are
                very infrequently expressed.
              </p>
              <p>Default: 0.1</p>
            </v-tooltip></v-col
          >
          <v-col cols="3" class="my-0 py-0"
            ><v-tooltip top max-width="500px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="minLfc"
                  class="px-0"
                  type="number"
                  dense
                  step="0.1"
                  label="logFC threshold"
                  v-on="on"
                ></v-text-field>
              </template>
              <p>
                Limit testing to genes which show, on average, at least X-fold
                difference (log-scale) between the two groups of cells.
              </p>
              <p>
                Increasing logfc.threshold speeds up the function, but can miss
                weaker signals.
              </p>
              <p>Default: 0.25</p>
            </v-tooltip>
          </v-col>

          <v-col cols="3" class="my-0 py-0"
            ><v-btn small class="mx-2 mb-2 mt-0" @click="run()"
              >Calculate</v-btn
            >
          </v-col>
        </v-row>

        <div v-if="deResult.length">
          <v-row>
            <v-col cols="6"
              ><v-text-field
                v-model="search"
                prepend-icon="mdi-magnify"
                label="Search"
                single-line
                dense
              ></v-text-field
            ></v-col>
            <v-col cols="6"
              ><v-btn small @click="dialog = true">Visualize</v-btn></v-col
            >
          </v-row>
          <v-data-table
            dense
            :search="search"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :height="tableHeight"
            :max-height="maxHeight"
            :headers="headers"
            :items="deResult"
            item-key="tf"
            :items-per-page="10"
            class="elevation-0"
          >
          </v-data-table>
        </div></div></grid-item
    ><v-dialog v-model="dialog" max-width="75vw" height="90vh">
      <v-card>
        <v-card-title class="grey lighten-3 font-weight-bold">
          Visualize differentially expressed genes
        </v-card-title>

        <v-card-text class="mt-4">
          <v-row>
            <v-col cols="3">
              <v-tooltip top max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-select
                    v-model="selectedPlot"
                    class="px-0"
                    dense
                    :items="allPlots"
                    label="Plot type"
                    return-object
                    item-text="name"
                    item-value="value"
                    @mouseenter.native="on.mouseenter"
                    @mouseleave.native="on.mouseleave"
                  >
                  </v-select>
                </template>
                <p>Plot type</p>
              </v-tooltip>
            </v-col>
            <v-col cols="3"
              ><v-btn small @click="setEcharts()">Draw</v-btn></v-col
            >
          </v-row>
        </v-card-text>

        <v-card height="65vh" elevation="0">
          <v-divider></v-divider>
          <ECharts ref="chart2" height="65vh" :option="optionVolcano" />
        </v-card>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog></v-card
  >
</template>

<script>
import * as echarts from 'echarts'
import { createComponent } from 'echarts-for-vue'
import ApiService from '~/services/ApiService.js'

export default {
  components: {
    ECharts: createComponent({ echarts }), // use as a component
  },
  props: {
    idents: { type: Array, required: true },
    setting: {
      type: Object,
      required: true,
      default: () => ({ title: '', h: 2, x: 0, y: 0, i: '0' }),
    },
  },
  data() {
    return {
      hover: false,
      dialog: false,
      showPlot: false,
      headers: [
        { text: 'Gene', value: 'gene' },
        { text: 'pct.1', value: 'pct.1' },
        { text: 'pct.2', value: 'pct.2' },
        { text: 'logFC', value: 'avg_log2FC' },
        { text: 'adjusted p-value', value: 'p_val_adj' },
      ],
      // DEG
      search: '',
      selectedDirection: 'all',
      allDirections: ['up', 'down', 'all'],
      ident1: [],
      ident2: [],
      minPct: 0.1,
      minLfc: 0.25,
      deResult: [],
      deg: [],
      degAssay: 'RNA',
      degPvalue: 0.05,
      degPvalueList: [0.01, 0.05, 0.1],
      tableHeight: 320,
      footerHeight: 240,
      sortBy: 'avg_log2FC',
      sortDesc: true,
      maxHeight: 300,
      selectedPlot: { name: 'Volcano plot', value: 'volcano' },
      allPlots: [{ name: 'Volcano plot', value: 'volcano' }],
    }
  },

  computed: {
    volcanoSrc() {
      return this.deResult.map((item) => [
        item.avg_log2FC,
        -1 * Math.log10(item.p_val_adj).toFixed(3),
        item.gene,
        item.p_val_adj,
      ])
    },
    optionVolcano() {
      return {
        hover: true,
        toolbox: {
          show: true,
          feature: {
            dataZoom: {},
          },
        },
        tooltip: {
          position: 'top',
          backgroundColor: ['rgba(255,255,255,0.7)'],

          formatter(obj) {
            const value = obj.value
            return (
              '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
              'Gene: ' +
              value[2] +
              '</div><div>' +
              'log2 Foldchange: ' +
              value[0] +
              '</div><div>' +
              'adj. p-value: ' +
              value[3] +
              '<br>'
            )
          },
        },
        grid: {
          left: 20,
          right: 100,
          bottom: 20,
          containLabel: true,
        },
        xAxis: {
          show: true,
          name: 'log2 foldchange',
          type: 'value',
          nameGap: 16,
          nameTextStyle: {
            fontSize: 12,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          show: true,
          name: '-log10(adj. p-value)',
          type: 'value',
          nameGap: 16,
          nameTextStyle: {
            fontSize: 12,
          },
          splitLine: {
            show: false,
          },
        },
        series: {
          data: this.volcanoSrc,
          type: 'scatter',
          emphasis: {
            focus: 'self',
          },
          encode: { x: 0, y: 1 },
          symbolSize: 20,
        },
      }
    },
  },
  methods: {
    async run() {
      // eslint-disable-next-line eqeqeq

      const new1 = JSON.stringify(this.ident1)
      const new2 = JSON.stringify(this.ident2)

      if (!this.ident1.length || !this.ident2.length) {
        this.$notifier.showMessage({
          content: 'Please select two different groups',
          color: 'error',
        })
      } else if (new1 !== new2) {
        this.$nuxt.$loading.start()
        this.deResult = await ApiService.postCommand(
          'deepmaps/api/queue/run-r/',
          {
            type: 'deg',
            ident1: this.ident1,
            ident2: this.ident2,
            min_pct: this.minPct,
            min_lfc: this.minLfc,
            assay: this.degAssay,
            pvalue: this.degPvalue,
            direction: this.selectedDirection,
          }
        )

        await ApiService.sleep(1000)
        this.$store.dispatch('calc/updateDeg', this.deResult)
        this.$nuxt.$loading.finish()
      } else {
        this.$notifier.showMessage({
          content: 'Please select two different groups',
          color: 'error',
        })
      }
    },
    changeSize(i, newH, newW, newHPx, newWPx) {
      this.maxHeight = newWPx - this.footerHeight
      this.tableHeight = newHPx - this.footerHeight
    },
    iconSelect(selected, identLevels) {
      if (this.isSelectAll(selected, identLevels)) return 'mdi-close-box'
      if (this.isSelectSome(selected, identLevels)) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    isSelectAll(selected, identLevels) {
      return selected.length === identLevels.length
    },
    isSelectSome(selected, identLevels) {
      return selected.length > 0 && !this.isSelectAll(selected, identLevels)
    },
    toggleIdent1() {
      this.$nextTick(() => {
        if (this.ident1.length > 0) {
          this.ident1 = []
        } else {
          this.ident1 = this.idents
        }
      })
    },
    toggleIdent2() {
      this.$nextTick(() => {
        if (this.ident2.length > 0) {
          this.ident2 = []
        } else {
          this.ident2 = this.idents
        }
      })
    },
    setEcharts() {
      this.showPlot = true
      console.log(this.volcanoSrc)
      const dat = this.volcanoSrc.slice(0, 100)
      this.$refs.chart2.inst.setOption({
        series: [
          {
            type: 'scatter',
            name: 'test',
            data: dat,
            showAllSymbol: false,
            encode: { x: 0, y: 1 },
          },
        ],
      })
      this.$refs.chart2.inst.resize()
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
