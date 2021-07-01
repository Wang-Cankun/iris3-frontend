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
        >Cell-cell communication analysis<v-spacer></v-spacer>
        <div>
          <v-tooltip top max-width="500px">
            <template v-slot:activator="{ on }">
              <v-icon v-show="hover === true" v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <p>Cell-cell communication analysis</p>
          </v-tooltip>
          <v-menu bottom left :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon v-show="hover === true">mdi-download-outline</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="downloadPNG(cellchatFigure)">
                <v-list-item-title>Download PNG</v-list-item-title>
              </v-list-item>
              <v-list-item @click="downloadCSV">
                <download-excel
                  class="mr-4"
                  :data="cellchatResult.net"
                  type="csv"
                >
                  <v-list-item-title
                    >Download Ligand-receptor network table
                    (CSV)</v-list-item-title
                  >
                </download-excel>
              </v-list-item>
              <v-list-item @click="downloadCSV">
                <download-excel
                  class="mr-4"
                  :data="cellchatResult.netp"
                  type="csv"
                >
                  <v-list-item-title
                    >Download pathway table (CSV)</v-list-item-title
                  >
                </download-excel>
              </v-list-item>
            </v-list>
          </v-menu>
        </div></v-card-title
      >

      <v-row class="ma-2 no-drag my-0 py-0">
        <v-form ref="form" v-model="valid" lazy-validation class="my-0 py-0">
          <v-col v-if="!isCellchatComplete" cols="12">
            <div class="d-flex flex">
              <v-text-field
                v-model="minCells"
                class="px-1"
                label="Minimal cells in each groups"
                type="number"
                :rules="numberRules"
                required
                dense
              ></v-text-field>
              <v-btn small @click="runCellchat()">Calculate</v-btn>
            </div>
          </v-col>
          <v-col v-else cols="12">
            <v-select
              v-model="type"
              :items="types"
              label="Plot type"
              class="my-0"
              item-text="name"
              item-value="value"
              dense
              @change="clearForm()"
            ></v-select>
            <div
              v-if="type === 'single_pathway'"
              class="d-flex flex align-start justify-space-around"
            >
              <v-select
                v-model="selectedPathway"
                class="px-1"
                :items="pathwayList"
                dense
                label="Pathways"
                :rules="[(v) => !!v || 'Item is required']"
              ></v-select>
              <v-btn small @click="plotCellchatSingle()">plot</v-btn>
            </div>
            <div v-if="type === 'all_network'">
              <v-row class="pa-2">
                <v-col cols="4">
                  <v-tooltip top max-width="500px" clas>
                    <template v-slot:activator="{ on }">
                      <v-select
                        v-model="ident1"
                        :items="identLevels"
                        return-object
                        dense
                        label="Source"
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
                                :color="
                                  ident1.length > 0 ? 'indigo darken-4' : ''
                                "
                              >
                                {{ iconSelect(ident1, identLevels) }}
                              </v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>
                                Select All
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider class="mt-2"></v-divider> </template
                      ></v-select>
                    </template>
                    <span>Select one or more clusters </span>
                  </v-tooltip>
                </v-col>
                <v-col cols="4">
                  <v-tooltip top max-width="500px">
                    <template v-slot:activator="{ on }">
                      <v-select
                        v-model="ident2"
                        :items="identLevels"
                        return-object
                        dense
                        label="Target"
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
                                :color="
                                  ident2.length > 0 ? 'indigo darken-4' : ''
                                "
                              >
                                {{ iconSelect(ident2, identLevels) }}
                              </v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>
                                Select All
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider class="mt-2"></v-divider> </template
                      ></v-select>
                    </template>
                    <span>Select one or more clusters </span>
                  </v-tooltip>
                </v-col>
                <v-col cols="4">
                  <v-btn small @click="plotCellchatAll()">plot</v-btn></v-col
                >
              </v-row>
            </div>
            <div v-if="type === 'single_lr_pathway'">
              <v-row class="pa-2">
                <v-col cols="4">
                  <v-select
                    v-model="selectedPathway"
                    class="px-1"
                    :items="pathwayList"
                    dense
                    label="Pathways"
                    :rules="[(v) => !!v || 'Item is required']"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                    v-model="selectedLr"
                    class="px-1"
                    :items="lrList"
                    dense
                    label="Enriched ligand-receptor"
                    :rules="[(v) => !!v || 'Item is required']"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-btn small @click="plotCellchatLr()">plot</v-btn></v-col
                >
              </v-row>
            </div>
            <div v-if="type === 'some_network'" class="d-flex flex">
              <v-row class="pa-2">
                <v-col cols="3">
                  <v-tooltip top max-width="500px" clas>
                    <template v-slot:activator="{ on }">
                      <v-select
                        v-model="ident1"
                        :items="identLevels"
                        return-object
                        dense
                        label="Source"
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
                                :color="
                                  ident1.length > 0 ? 'indigo darken-4' : ''
                                "
                              >
                                {{ iconSelect(ident1, identLevels) }}
                              </v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>
                                Select All
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider class="mt-2"></v-divider> </template
                      ></v-select>
                    </template>
                    <span>Select one or more clusters </span>
                  </v-tooltip>
                </v-col>
                <v-col cols="3">
                  <v-tooltip top max-width="500px">
                    <template v-slot:activator="{ on }">
                      <v-select
                        v-model="ident2"
                        :items="identLevels"
                        return-object
                        dense
                        label="Target"
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
                                :color="
                                  ident2.length > 0 ? 'indigo darken-4' : ''
                                "
                              >
                                {{ iconSelect(ident2, identLevels) }}
                              </v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>
                                Select All
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider class="mt-2"></v-divider> </template
                      ></v-select>
                    </template>
                    <span>Select one or more clusters </span>
                  </v-tooltip>
                </v-col>
                <v-col cols="3">
                  <v-select
                    v-model="selectedPathway"
                    class="px-1"
                    :items="pathwayList"
                    dense
                    label="Pathways"
                    :rules="[(v) => !!v || 'Item is required']"
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-btn small @click="plotCellchatSome()">plot</v-btn></v-col
                >
              </v-row>
            </div>
          </v-col>
        </v-form>
      </v-row>

      <div v-show="cellchatFigure" class="no-drag">
        <v-img
          contain
          :height="windowSize.y - 70"
          :max-width="windowSize.x + 'px'"
          :max-height="windowSize.y - 150"
          :src="cellchatFigure"
        ></v-img>
      </div> </grid-item
  ></v-card>
</template>

<script>
import ApiService from '~/services/ApiService.js'

export default {
  props: {
    activeIdent: { type: String, required: true },
    setting: {
      type: Object,
      required: true,
      default: () => ({ title: '', h: 2, x: 0, y: 0, i: '0' }),
    },
    imagew: { type: Number, required: false, default: 500 },
    imageh: { type: Number, required: false, default: 300 },
  },

  data() {
    return {
      valid: true,
      types: [
        { name: 'All interactions from two cell groups', value: 'all_network' },
        {
          name: 'All interactions associated with certain signaling pathways',
          value: 'some_network',
        },
        { name: 'Individual signaling pathway', value: 'single_pathway' },
        {
          name: 'Each ligand-receptor pair to the overall signaling pathway',
          value: 'single_lr_pathway',
        },
      ],
      networkTypes: [
        { name: 'Signaling pathways ', value: 'netp' },
        { name: 'Ligand-Receptor pairs ', value: 'net' },
      ],
      networkType: 'netp',
      windowSize: {
        x: 730,
        y: 850,
      },
      hover: false,
      type: 'all_network',
      cellchatResult: {},
      minCells: 10,
      isCellchatComplete: false,
      selectedPathway: '',
      selectedLr: '',
      cellchatFigure: '',
      ident1: [],
      ident2: [],
      // Form rules
      numberRules: [
        (v) => !!v || 'Number is required',
        (v) => (v && v >= 0) || 'Number should be positive',
      ],
      rangeRules: [
        (v) => !!v || 'Range is required',
        (v) => (v && v > 0) || 'Range should be greater than 0',
      ],
    }
  },
  computed: {
    jobType() {
      // const params = this.$route.params
      return 'single_rna_example'
    },
    pathwayList() {
      return this.cellchatResult.pathway
    },
    lrList() {
      return this.cellchatResult.enrichedLR
    },
    identLevels() {
      return this.cellchatResult.idents
    },
  },
  methods: {
    changeSize(i, newH, newW, newHPx, newWPx) {
      this.windowSize.x = newWPx
      this.windowSize.y = newHPx
    },
    clearForm() {
      // this.$refs.form.reset()
      this.cellchatFigure = ''
    },
    downloadPNG(cellchatFigure) {
      if (!cellchatFigure) {
        this.$notifier.showMessage({
          content: 'Please generate the figure first',
          color: 'error',
        })
      } else {
        const link = document.createElement('a')
        link.href = cellchatFigure
        link.setAttribute('download', 'coverage_plot.png')
        document.body.appendChild(link)
        link.click()
      }
    },
    async runCellchat() {
      if (!this.$refs.form.validate()) {
        this.$notifier.showMessage({
          content: 'Please check your inputs.',
          color: 'error',
        })
        this.$refs.form.resetValidation()
      } else {
        this.$nuxt.$loading.start()
        this.cellchatResult = await ApiService.postCommand(
          'deepmaps/api/queue/run-r/',
          {
            type: 'run-cellchat',
            job: this.jobType,
            active_idents: 'seurat_clusters',
          }
        )
        this.isCellchatComplete = true
        await this.$nuxt.$loading.finish()
      }
    },
    async plotCellchatSingle() {
      if (!this.$refs.form.validate()) {
        this.$notifier.showMessage({
          content: 'Please check your inputs.',
          color: 'error',
        })
        this.$refs.form.resetValidation()
      } else {
        this.$nuxt.$loading.start()
        this.cellchatFigure = await await ApiService.postCommand(
          'deepmaps/api/queue/run-r-static/',
          {
            type: 'plot-cellchat',
            mode: this.type,
            pathway_show: this.selectedPathway,
          }
        )
        this.$nuxt.$loading.finish()
      }
    },
    async plotCellchatAll() {
      if (!this.$refs.form.validate()) {
        this.$notifier.showMessage({
          content: 'Please check your inputs.',
          color: 'error',
        })
        this.$refs.form.resetValidation()
      } else {
        this.$nuxt.$loading.start()
        this.cellchatFigure = await await ApiService.postCommand(
          'deepmaps/api/queue/run-r-static/',
          {
            type: 'plot-cellchat',
            mode: this.type,
            ident1: this.ident1,
            ident2: this.ident2,
          }
        )
        this.$nuxt.$loading.finish()
      }
    },
    async plotCellchatSome() {
      if (!this.$refs.form.validate()) {
        this.$notifier.showMessage({
          content: 'Please check your inputs.',
          color: 'error',
        })
        this.$refs.form.resetValidation()
      } else {
        this.$nuxt.$loading.start()
        this.cellchatFigure = await await ApiService.postCommand(
          'deepmaps/api/queue/run-r-static/',
          {
            type: 'plot-cellchat',
            mode: this.type,
            ident1: this.ident1,
            ident2: this.ident2,
            pathway_show: this.selectedPathway,
            slot: 'netP',
          }
        )
        this.$nuxt.$loading.finish()
      }
    },
    async plotCellchatLr() {
      if (!this.$refs.form.validate()) {
        this.$notifier.showMessage({
          content: 'Please check your inputs.',
          color: 'error',
        })
        this.$refs.form.resetValidation()
      } else {
        this.$nuxt.$loading.start()
        this.cellchatFigure = await await ApiService.postCommand(
          'deepmaps/api/queue/run-r-static/',
          {
            type: 'plot-cellchat',
            mode: this.type,
            pathway_show: this.selectedPathway,
            lr_show: this.selectedLr,
          }
        )
        this.$nuxt.$loading.finish()
      }
    },
    endRules(v) {
      if (v - this.chrStart < 100) {
        return 'End should be at least 100 bps larger than start'
      }
      if (!v) {
        return 'Range is required'
      }
      if (v <= 0) {
        return 'Range should be greater than 0'
      }
      return true
    },
    downloadCSV() {
      return 1
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
          this.ident1 = this.identLevels
        }
      })
    },
    toggleIdent2() {
      this.$nextTick(() => {
        if (this.ident2.length > 0) {
          this.ident2 = []
        } else {
          this.ident2 = this.identLevels
        }
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
