<template>
  <v-col class="mb-2" cols="12">
    <v-card outlined>
      <v-row class="my-2">
        <v-col cols="3">
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel v-if="type === 'multi_rna'">
              <v-expansion-panel-header>
                Data integration
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="subtitle-1 font-weight-bold text-center">
                  Data integration
                </p>
                <v-row class="mb-0 py-0">
                  <v-col class="py-0" cols="12">
                    <v-tooltip top max-width="500px">
                      <template v-slot:activator="{ on }">
                        <v-select
                          v-model="integrationSelect"
                          :items="integrationMethods"
                          label="Integration tool"
                          @mouseenter.native="on.mouseenter"
                          @mouseleave.native="on.mouseleave"
                        ></v-select>
                      </template>
                      <p>
                        Seurat: data integration based on canonical correlation
                        analysis (CCA) analysis
                      </p>
                      <p>
                        Harmony: Fast, sensitive, and accurate integration of
                        single cell data
                      </p>
                    </v-tooltip>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-btn
                    class="mx-2 my-4"
                    color="Primary"
                    width="150"
                    @click="runIntegration()"
                    >Run integration</v-btn
                  >
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Cell clustering
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="subtitle-1 font-weight-bold text-center">
                  Cell clustering
                </p>
                <v-row>
                  <v-col cols="6"
                    ><v-tooltip top max-width="500px">
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="nPCs"
                          label="Number of PCs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <span
                        >Determine the ‘dimensionality’ of the dataset, the top
                        components represent a robust compression of the
                        dataset. Default: 20.</span
                      >
                    </v-tooltip></v-col
                  >

                  <v-col cols="6"
                    ><v-tooltip top max-width="500px">
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="resolution"
                          label="Clustering resolution"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <span
                        >Resolution for clustering in Seurat (form 0-1). Larger
                        number will generate more clusters and smaller number
                        will generate less clusters. Default: 0.5.</span
                      >
                    </v-tooltip></v-col
                  >
                </v-row>
                <v-row class="ma-0" justify="center">
                  <v-btn class="my-2" @click="runCellCluster()"
                    >Calculate</v-btn
                  >
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel v-if="clusterScatterData.axis[0] !== 0">
              <v-expansion-panel-header>
                Cell identity
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="subtitle-1 font-weight-bold text-center">
                  Set active cell identity
                </p>
                <v-select
                  v-model="currentIdent"
                  :items="idents"
                  label="Select identity"
                  @change="setActiveIdents(currentIdent)"
                ></v-select>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel v-if="clusterScatterData.axis[0] !== 0">
              <v-expansion-panel-header>
                Cell labeling
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="subtitle-1 font-weight-bold text-center">
                  Rename clusters
                </p>

                <v-col class="px-0" cols="12"
                  ><v-select
                    v-model="oldClusterName"
                    label="Old cluster name"
                    :items="currentIdentLevels"
                    hide-details="auto"
                    background-color="white"
                    dense
                  ></v-select
                ></v-col>
                <v-col class="px-0 py-0" cols="12">
                  <v-text-field
                    v-model="newClusterName"
                    label="New cluster name"
                    dense
                    background-color="white"
                  ></v-text-field
                ></v-col>
                <v-col cols="4" class="mt-0 mx-0 px-0"
                  ><v-btn small @click="renameCluster()">Rename</v-btn></v-col
                >
                <v-divider />
                <p class="subtitle-1 font-weight-bold text-center">
                  Custom cell labeling
                </p>
                <p class="mt-2 subtitle-2">Step 1: Create cell filters</p>
                <v-row class="py-2">
                  <v-col cols="6">
                    <v-select
                      v-model="filterCategoryName"
                      :items="idents"
                      label="Category"
                      dense
                      background-color="white"
                    ></v-select>
                    <v-select
                      v-model="filterCategoryLevel"
                      :items="filterCategoryLevels"
                      label="Cluster"
                      dense
                      multiple
                      background-color="white"
                    ></v-select>
                    <v-spacer></v-spacer>
                    <v-btn small @click="addClusterFilter()"
                      >Add cluster filter</v-btn
                    >
                  </v-col>
                  <v-divider vertical />
                  <v-col cols="5">
                    <v-autocomplete
                      v-model="addGeneName"
                      label="Gene"
                      :items="genes"
                      placeholder="Name"
                      class="px-1"
                      dense
                      background-color="white"
                    ></v-autocomplete
                    ><v-select
                      v-model="addGeneDirection"
                      :items="addGeneDirectionItems"
                      label="Direction"
                      class="px-1"
                      dense
                      background-color="white"
                    ></v-select>
                    <v-text-field
                      v-model="addGeneThres"
                      label="Threshold"
                      placeholder="Number"
                      class="px-1"
                      dense
                      background-color="white"
                    ></v-text-field>
                    <v-btn small @click="addGeneFilter()"
                      >Add gene filter</v-btn
                    >
                  </v-col>

                  <v-col class="py-2" cols="12">
                    <v-list dense>
                      <v-list-item-title>Filters applied:</v-list-item-title>
                      <v-list-item
                        v-for="(item, index) in filterPayload"
                        :key="index"
                        class="my-0 py-0"
                      >
                        <v-list-item-content class="my-0 py-0">
                          <div v-if="item.type === 'gene'">
                            {{ item.name }} {{ item.direction }}
                            {{ item.thres }}
                          </div>
                          <div v-if="item.type === 'cluster'">
                            {{ item.direction }} {{ item.category[0] }}:
                            {{ item.level }}
                          </div>
                        </v-list-item-content>
                        <v-list-item-action class="my-0 py-0">
                          <v-btn icon @click="removeCurrentFilter(index)">
                            <v-icon color="grey lighten-1">mdi-delete</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                      <v-list-item-action v-if="filterPayload.length">
                        <v-btn small @click="removeAllFilter()">
                          Remove all
                        </v-btn>
                      </v-list-item-action>
                    </v-list>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <p class="mt-2 subtitle-2">Step 2: Assign cells to new label</p>
                <v-row class="py-2">
                  <v-col cols="7"
                    ><v-text-field
                      v-model="addCategoryName"
                      label="1. Set new category"
                      placeholder="Type new categoty name"
                      hide-details="auto"
                      background-color="white"
                      dense
                    ></v-text-field
                  ></v-col>

                  <v-col cols="7"
                    ><v-text-field
                      v-model="addLabelName"
                      label="2. Add new label"
                      placeholder="Type label name"
                      hide-details="auto"
                      background-color="white"
                      dense
                    ></v-text-field
                  ></v-col>
                  <v-col cols="4"
                    ><v-btn small @click="assignCells()"
                      >Assign cells</v-btn
                    ></v-col
                  >
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel v-if="clusterScatterData.axis[0] !== 0">
              <v-expansion-panel-header>
                Cell selection
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="subtitle-1 font-weight-bold text-center">
                  Cell selection
                </p>
                <v-row class="py-2">
                  <v-col cols="6">
                    <v-select
                      v-model="selectionCategoryName"
                      :items="idents"
                      label="Category"
                      dense
                      background-color="white"
                    ></v-select>
                    <v-select
                      v-model="selectionCategoryLevel"
                      :items="selectionCategoryLevels"
                      label="Cluster"
                      dense
                      multiple
                      background-color="white"
                    ></v-select>
                    <v-spacer></v-spacer>
                    <v-btn small @click="addClusterSelection()"
                      >Add cluster filter</v-btn
                    >
                  </v-col>
                  <v-divider vertical />
                  <v-col cols="5">
                    <v-autocomplete
                      v-model="selectionGeneName"
                      label="Gene"
                      :items="genes"
                      placeholder="Name"
                      class="px-1"
                      dense
                      background-color="white"
                    ></v-autocomplete
                    ><v-select
                      v-model="selectionGeneDirection"
                      :items="selectionGeneDirectionItems"
                      label="Direction"
                      class="px-1"
                      dense
                      background-color="white"
                    ></v-select>
                    <v-text-field
                      v-model="selectionGeneThres"
                      label="Threshold"
                      placeholder="Number"
                      class="px-1"
                      dense
                      background-color="white"
                    ></v-text-field>
                    <v-btn small @click="addGeneSelection()"
                      >Add gene filter</v-btn
                    >
                  </v-col>

                  <v-col class="py-2" cols="12">
                    <p class="my-2">Selections applied:</p>
                    <ul>
                      <li
                        v-for="(item, index) in selectionPayload"
                        :key="index"
                      >
                        <div v-if="item.type === 'gene'">
                          {{ item.name }} {{ item.direction }}
                          {{ item.thres }}
                        </div>
                        <div v-if="item.type === 'cluster'">
                          {{ item.direction }} {{ item.category[0] }}:
                          {{ item.level }}
                        </div>
                      </li>
                    </ul></v-col
                  >
                </v-row>
                <v-divider></v-divider>
                <v-row class="mx-2 my-2 py-2">
                  <v-btn class="mx-2 my-4" @click="subsetCells()"
                    >Subset cells</v-btn
                  >
                  <div v-show="showResetBtn">
                    <v-btn class="mx-2 my-4" @click="restoreCells()"
                      >Reset</v-btn
                    >
                  </div>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col cols="9">
          <div v-if="clusterScatterData.axis[0] !== 0">
            <div>
              <grid-layout
                :layout.sync="layout"
                :col-num="6"
                :row-height="300"
                :is-draggable="true"
                :is-resizable="true"
                :is-mirrored="false"
                :vertical-compact="true"
                :margin="[10, 10]"
                :use-css-transforms="true"
              >
                <cluster-scatter
                  :setting="layout[0]"
                  :imagew="600"
                  :imageh="550"
                  :src="clusterScatterData"
                >
                </cluster-scatter>
                <deg-table
                  :setting="layout[1]"
                  :idents="currentIdentLevels"
                ></deg-table>
                <feature-scatter
                  :setting="layout[2]"
                  :genes="genes"
                ></feature-scatter>
                <feature-violin
                  :setting="layout[3]"
                  :genes="genes"
                  :idents="idents"
                ></feature-violin>
                <enrichment-table :setting="layout[4]"></enrichment-table>
                <cell-chat
                  :setting="layout[5]"
                  :active-ident="currentIdent"
                ></cell-chat>
              </grid-layout>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script>
import CellChatPlot from '@/components/figures/CellChatPlot'

import FeatureScatter from '@/components/figures/FeatureScatter'
import FeatureViolinStatic from '~/components/figures/FeatureViolinStatic'

import ClusterScatter from '~/components/figures/ClusterScatter'
import EnrichmentTable from '~/components/tables/EnrichmentTable'
import DegTable from '~/components/tables/DegTable'
import ApiService from '~/services/ApiService.js'

export default {
  components: {
    'cluster-scatter': ClusterScatter,
    'enrichment-table': EnrichmentTable,
    'feature-scatter': FeatureScatter,
    'feature-violin': FeatureViolinStatic,
    'deg-table': DegTable,
    'cell-chat': CellChatPlot,
  },
  props: {
    type: { type: String, required: true, default: 'single_rna' },
  },
  data: () => ({
    degHover: false,
    genePlotsHover: false,
    layout: [
      {
        x: 0,
        y: 0,
        w: 3,
        h: 2,
        i: '0',
        title: 'Clustering plot',
      },
      {
        x: 3,
        y: 0,
        w: 3,
        h: 2,
        i: '1',
        title: 'Differential gene expression analysis',
      },
      {
        x: 0,
        y: 2,
        w: 3,
        h: 2,
        i: '2',
        title: 'Gene scatter plot',
      },
      {
        x: 3,
        y: 2,
        w: 3,
        h: 2,
        i: '3',
        title: 'Gene violin plot',
      },
      {
        x: 0,
        y: 4,
        w: 3,
        h: 2,
        i: '4',
      },
      {
        x: 3,
        y: 4,
        w: 3,
        h: 3,
        i: '5',
      },
    ],
    degList: [
      {
        gene: 'gene1',
        avg_log2FC: 2,
        p_val_adj: 0.01,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
    ],
    headers: [
      {
        text: 'Gene',
        align: 'start',
        sortable: false,
        value: 'gene',
      },
      { text: 'LogFC', value: 'avg_log2FC' },
      { text: 'Adj.p.value', value: 'p_val_adj' },
    ],
    gseaHeaders: [
      { text: 'pathway', value: 'pathway' },
      { text: 'Adjusted p-value', value: 'padj' },
      { text: 'NES', value: 'NES' },
      { text: 'size', value: 'size' },
      { text: '', value: 'data-table-expand' },
    ],
    expandedKegg: [],
    tab: null,
    title: '',
    panel: [0],
    nPCs: '20',
    resolution: '0.5',
    neighbor: '20',
    timeElapsed: 0,
    qcResult: null,
    clusterScatterData: { axis: [0, 1], legend: [0, 1], dimension: 1 },
    umapGene: '',
    violinGene: '',
    featureGene: '',
    dotPlot: '',
    clusterResult: '',
    annotateResult: '',
    newCellType: [],
    addGeneName: '',
    addGeneDirection: '>',
    addGeneDirectionItems: ['>', '<', '='],
    addGeneThres: '',
    filterMetaDirection: 'in',
    filterMetaDirectionItems: ['in', 'not in'],
    addLabelName: '',
    setExistingCategory: '',
    setExistingCategoryItems: [],
    gene: 'Gad1',
    genes: '',
    currentIdent: 'seurat_clusters',
    currentIdentMerge: [],
    currentIdentLevels: [],
    currentAtlas: '',
    reductionSelect: 'PCA',
    reductionMethods: ['PCA', 'HGT'],
    integrationSelect: 'Seurat',
    integrationMethods: ['Seurat', 'Harmony'],
    atlas: [
      'Mouse brain atlas, 160k cells (Zeisel et.al., 2018)',
      'to-be-added',
    ],
    idents: [],
    violinSplit: 'Sex',
    resHistory: [],
    // DEG
    ident1: 1,
    ident2: 2,
    minPct: 0.2,
    minLfc: 0.8,
    deResult: [],
    deg: [],
    degAssay: 'RNA',
    degPvalue: 0.05,
    addTransferMetadataDialog: false,
    addMetadataDialog: false,
    tableHeight: 455,
    // Add metadata
    displayAddMetadata: '',
    addCategoryName: '',
    activeCategory: '',
    activeCategoryLevels: [],
    filterCategoryName: '',
    filterCategoryLevel: '',
    filterPayload: [],
    selectionGeneName: '',
    selectionGeneDirection: '>',
    selectionGeneDirectionItems: ['>', '<', '='],
    selectionGeneThres: '',
    selectionCategoryName: '',
    selectionCategoryLevel: '',
    selectionPayload: [],
    showResetBtn: false,
    isSubset: false,
    allIdents: [],
    selectedCells: [],
    umapStatic: '',
    // Renameing
    oldClusterName: '',
    newClusterName: '',
    // GSEA
    gseaDatabase: '',
    allGseaDatabases: [
      { name: 'Hallmark gene sets (H)', value: 'H' },
      { name: 'Positional gene sets (C1)', value: 'C1' },
      { name: 'Curated gene sets (C2)', value: 'C2' },
      { name: 'Regulatory target gene sets (C3)', value: 'C3' },
      { name: 'Computational gene sets (C4)', value: 'C4' },
      { name: 'Ontology gene sets (C5)', value: 'C5' },
      { name: 'Oncogenic signature gene sets (C6)', value: 'C6' },
      { name: 'Immunologic signature gene sets (C7)', value: 'C7' },
    ],
    windowSize: {
      x: 600,
      y: 600,
    },
    violinGroup: 'seurat_clusters',
  }),
  computed: {
    identList() {
      if (this.currentIdent === 'cell_type') {
        return [
          '1_oligodendrocytes',
          '2_pyramidal_CA1',
          '3_pyramidal_SS',
          '4_microglia',
          '5_interneurons',
          '6_endothelial_mural',
          '7_astrocytes_ependymal',
        ]
      } else if (this.clusterResult !== '') return this.currentIdentList
      else return [1, 2]
    },
    cellClusterArray() {
      return this.currentIdentLevels
    },
    filterCategoryLevels() {
      return this.allIdents
        .filter((item) => item.ident === this.filterCategoryName)
        .map((item) => item.levels)
        .flat()
    },
    selectionCategoryLevels() {
      return this.allIdents
        .filter((item) => item.ident === this.selectionCategoryName)
        .map((item) => item.levels)
        .flat()
    },
  },
  watch: {
    deg() {},
  },
  methods: {
    changeSize(i, newH, newW, newHPx, newWPx) {
      this.windowSize.x = newWPx
      this.windowSize.y = newHPx
    },
    async mergeIdents() {
      await this.$axios
        .post('deepmaps/api/queue/merge-idents/', {
          newClusterIds: this.currentIdentMerge,
        })
        .then((response) => {
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.currentIdent = response.data.returnvalue.new_ident

                  this.currentIdentLevels = response.data.returnvalue.new_levels
                  this.currentIdentMerge = []
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  clearInterval(checkComplete)
                  this.$notifier.showMessage({
                    content: 'Merge clusters success!',
                    color: 'success',
                  })
                }
              })
          }, 1000)
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: 'Get idents error!' + error,
            color: 'error',
          })
        })
      await this.$axios.post('deepmaps/api/queue/idents/').then((response) => {
        this.allIdents = response.data
        this.idents = response.data.map((item) => item.ident)
        this.violinSplitItems = response.data
        this.violinSplitItems.push('NULL')
      })
      await this.setActiveIdents(this.currentIdent)

      this.clusterScatterData = await ApiService.postCommand(
        'deepmaps/api/queue/embedding-coords/',
        {
          categoryName: this.currentIdent,
        }
      )
    },

    async setActiveIdents(currentIdent) {
      this.$nuxt.$loading.start()
      this.currentIdentMerge = []
      this.currentIdentLevels = await ApiService.postCommand(
        'deepmaps/api/queue/set-idents/',
        { name: this.currentIdent }
      )

      await this.$axios.post('deepmaps/api/queue/idents/').then((response) => {
        this.allIdents = response.data
        this.idents = response.data.map((item) => item.ident)
        this.violinSplitItems = response.data
        this.violinSplitItems.push('NULL')
      })

      this.clusterScatterData = await ApiService.postCommand(
        'deepmaps/api/queue/embedding-coords/',
        {
          categoryName: this.currentIdent,
        }
      )
      this.$nuxt.$loading.finish()
    },
    async runIntegration() {
      this.$nuxt.$loading.start()
      if (this.$route.params.id === 'example') {
        await ApiService.sleep(6000)
      } else {
        await ApiService.sleep(12000)
      }
      this.panel = [1]
      this.$nuxt.$loading.finish()
    },
    async runCellCluster() {
      this.$nuxt.$loading.start()
      if (this.type === 'multi_rna') {
        await ApiService.sleep(2000)
      }
      await this.$axios
        .post('deepmaps/api/queue/cluster/', {
          nPCs: this.nPCs,
          resolution: this.resolution,
          neighbor: this.neighbor,
        })
        .then((response) => {
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.resHistory.push(this.resolution)
                  this.clusterResult = response.data.returnvalue
                  clearInterval(checkComplete)
                }
              })
          }, 2000)
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: `Error: ${error}`,
            color: 'error',
          })
        })

      this.currentIdentLevels = await ApiService.postCommand(
        'deepmaps/api/queue/set-idents/',
        { name: this.currentIdent }
      )

      this.setExistingCategoryItems = await ApiService.postCommand(
        'deepmaps/api/queue/select-category/'
      ).available_category

      await this.$axios.post('deepmaps/api/queue/genes/').then((response) => {
        this.genes = response.data
      })
      await this.$axios.post('deepmaps/api/queue/idents/').then((response) => {
        this.allIdents = response.data
        this.idents = response.data.map((item) => item.ident)
        this.violinSplitItems = response.data
        this.violinSplitItems.push('NULL')
      })
      this.clusterScatterData = await ApiService.postCommand(
        'deepmaps/api/queue/embedding-coords/',
        {
          categoryName: this.currentIdent,
        }
      )
      this.$store.dispatch('calc/updateFlag', 1)
      this.$store.dispatch('calc/updateFlag', 2)
      this.$nuxt.$loading.finish()
    },

    async renameCluster() {
      this.$nuxt.$loading.start()
      this.currentIdentLevels.new_levels = await ApiService.postCommand(
        'deepmaps/api/queue/rename-idents/',
        {
          old_name: this.oldClusterName,
          new_name: this.newClusterName,
        }
      )

      this.currentIdentLevels = await ApiService.postCommand(
        'deepmaps/api/queue/set-idents/',
        {
          name: this.currentIdent,
        }
      )

      this.oldClusterName = ''
      this.newClusterName = ''
      await this.$axios.post('deepmaps/api/queue/idents/').then((response) => {
        this.allIdents = response.data
        this.idents = response.data.map((item) => item.ident)
        this.violinSplitItems = response.data
        this.violinSplitItems.push('NULL')
      })
      this.clusterScatterData = await ApiService.postCommand(
        'deepmaps/api/queue/embedding-coords/',
        {
          categoryName: this.currentIdent,
        }
      )
      this.$nuxt.$loading.finish()
    },
    async setCategory(name) {
      await this.$axios.post('deepmaps/api/queue/idents/').then((response) => {
        this.allIdents = response.data
        this.idents = response.data.map((item) => item.ident)
        this.violinSplitItems = response.data
        this.violinSplitItems.push('NULL')
      })
      const setCategoryResult = await ApiService.postCommand(
        'deepmaps/api/queue/select-category/',
        {
          categoryName: name,
        }
      )

      this.currentIdent = setCategoryResult.active_category
      this.setExistingCategory = setCategoryResult.active_category[0]
      this.activeCategory = setCategoryResult.active_category[0]
      this.activeCategoryLevels = setCategoryResult.active_category_levels
      this.setExistingCategoryItems = setCategoryResult.available_category
    },

    addGeneFilter() {
      if (this.addGeneName && this.addGeneThres) {
        this.filterPayload = [
          {
            type: 'gene',
            name: this.addGeneName,
            direction: this.addGeneDirection,
            thres: this.addGeneThres,
          },
          ...this.filterPayload,
        ]

        this.$notifier.showMessage({
          content: `Added filter: ${this.addGeneName} ${this.addGeneDirection} ${this.addGeneThres}`,
          color: 'success',
        })
        this.addGeneName = this.addGeneThres = ''
      } else {
        this.$notifier.showMessage({
          content: 'Please provide valid gene filter...',
          color: 'error',
        })
      }

      return 1
    },
    addClusterFilter() {
      if (this.filterCategoryName && this.filterCategoryLevel) {
        for (const categoryLevel of this.filterCategoryLevel) {
          this.filterPayload = [
            {
              type: 'cluster',
              direction: this.filterMetaDirection,
              category: this.filterCategoryName,
              level: categoryLevel,
            },
            ...this.filterPayload,
          ]
        }

        this.$notifier.showMessage({
          content: `Added filter: ${this.filterCategoryName} ${this.filterCategoryLevel}`,
          color: 'success',
        })
        this.filterCategoryName = this.filterCategoryLevel = ''
      } else {
        this.$notifier.showMessage({
          content: 'Please provide valid cluster filter...',
          color: 'error',
        })
      }
      return 1
    },

    async assignCells() {
      if (!this.addCategoryName) {
        this.$notifier.showMessage({
          content: 'Please set new category',
          color: 'error',
        })
      } else if (!this.filterPayload.length) {
        this.$notifier.showMessage({
          content: 'Please add filters in step 1',
          color: 'error',
        })
      } else if (!this.addLabelName) {
        this.$notifier.showMessage({
          content: 'Please add a new label',
          color: 'error',
        })
      } else {
        this.$nuxt.$loading.start()
        await this.setCategory(this.addCategoryName)
        const payload = {
          newLevelName: this.addLabelName,
          filterPayload: this.filterPayload,
        }
        this.selectedCells = await ApiService.postCommand(
          'deepmaps/api/queue/select-cells/',
          payload
        )
        this.filterPayload = []
        await this.setActiveIdents(this.currentIdent)
        this.clusterScatterData = await ApiService.postCommand(
          'deepmaps/api/queue/embedding-coords/',
          {
            categoryName: this.currentIdent,
          }
        )
        this.$nuxt.$loading.finish()
      }
    },

    addGeneSelection() {
      if (this.selectionGeneName && this.selectionGeneThres) {
        this.selectionPayload = [
          {
            type: 'gene',
            name: this.selectionGeneName,
            direction: this.selectionGeneDirection,
            thres: this.selectionGeneThres,
          },
          ...this.selectionPayload,
        ]

        this.$notifier.showMessage({
          content: `Added filter: ${this.selectionGeneName} ${this.selectionGeneDirection} ${this.selectionGeneThres}`,
          color: 'success',
        })
        this.selectionGeneName = this.selectionGeneThres = ''
      } else {
        this.$notifier.showMessage({
          content: 'Please provide valid gene filter...',
          color: 'error',
        })
      }

      return 1
    },
    addClusterSelection() {
      if (this.selectionCategoryName && this.selectionCategoryLevel) {
        for (const categoryLevel of this.selectionCategoryLevel) {
          this.selectionPayload = [
            {
              type: 'cluster',
              direction: this.selectionMetaDirection,
              category: this.selectionCategoryName,
              level: categoryLevel,
            },
            ...this.selectionPayload,
          ]
        }

        this.$notifier.showMessage({
          content: `Added filter: ${this.selectionCategoryName} ${this.selectionCategoryLevel}`,
          color: 'success',
        })
        this.selectionCategoryName = this.selectionCategoryLevel = ''
      } else {
        this.$notifier.showMessage({
          content: 'Please provide valid cluster filter...',
          color: 'error',
        })
      }
      return 1
    },

    async subsetCells() {
      if (!this.selectionPayload.length) {
        this.$notifier.showMessage({
          content: 'Please add cell selection filters',
          color: 'error',
        })
      } else {
        this.$nuxt.$loading.start()
        this.subCells = await ApiService.postCommand(
          'deepmaps/api/queue/subset-cells/',
          {
            selectionPayload: this.selectionPayload,
          }
        )

        this.selectionPayload = []
        await this.setActiveIdents(this.currentIdent)
        this.clusterScatterData = await ApiService.postCommand(
          'deepmaps/api/queue/embedding-coords/',
          {
            categoryName: this.currentIdent,
          }
        )
        this.showResetBtn = true
        this.isSubset = true
        this.$nuxt.$loading.finish()
      }
    },

    async restoreCells() {
      if (this.isSubset) {
        this.$nuxt.$loading.start()
        await ApiService.postCommand('deepmaps/api/queue/set-obj/', {
          type: 'full',
        })
        this.clusterScatterData = await ApiService.postCommand(
          'deepmaps/api/queue/embedding-coords/',
          {
            categoryName: this.currentIdent,
          }
        )
        this.isSubset = false
        this.$nuxt.$loading.finish()
      } else {
        this.$notifier.showMessage({
          content: `Reset function only works on subset data`,
          color: 'error',
        })
      }
    },

    downloadPDF() {},
    async addMetadata() {
      this.$notifier.showMessage({
        content: `Applying cell type...`,
        color: 'accent',
      })
      this.addMetadataDialog = false
      await this.$axios
        .post('deepmaps/api/queue/annotate-cell-type/', {
          gene: this.gene,
        })
        .then((response) => {
          setTimeout(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                this.annotateResult = response.data.returnvalue
                this.timeElapsed =
                  (response.data.finishedOn - response.data.processedOn) / 1000
              })
          }, 3000)
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: `Error: ${error}`,
            color: 'error',
          })
        })
      await this.$axios.post('deepmaps/api/queue/idents/').then((response) => {
        this.allIdents = response.data
        this.idents = response.data.map((item) => item.ident)
        this.violinSplitItems = response.data
        this.violinSplitItems.push('NULL')
      })
    },
    async addReference() {
      this.$notifier.showMessage({
        content: `Transfering cell type based on reference dataset...`,
        color: 'accent',
      })
      this.addTransferMetadataDialog = false
      await this.$axios
        .post('deepmaps/api/queue/transfer-cell-type/', {
          gene: this.gene,
        })
        .then((response) => {
          setTimeout(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                this.annotateResult = response.data.returnvalue
                this.timeElapsed =
                  (response.data.finishedOn - response.data.processedOn) / 1000
              })
          }, 3000)
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: `Error: ${error}`,
            color: 'error',
          })
        })
      await this.$axios.post('deepmaps/api/queue/idents/').then((response) => {
        this.allIdents = response.data
        this.idents = response.data.map((item) => item.ident)
        this.violinSplitItems = response.data
        this.violinSplitItems.push('NULL')
      })
    },

    downloadPNG(src) {
      const link = document.createElement('a')
      link.href = src
      link.setAttribute('download', 'Image_png.png')
      document.body.appendChild(link)
      link.click()
    },
    changeTableSize(i, newH, newW, newHPx, newWPx) {
      this.tableHeight = newHPx - 155
    },
    removeCurrentFilter(index) {
      this.filterPayload.splice(index, 1)
    },
    removeAllFilter() {
      this.filterPayload = []
    },
    removeCurrentSelection(index) {
      this.selectionPayload.splice(index, 1)
    },
    removeAllSelection() {
      this.selectionPayload = []
    },
  },
}
</script>
