<template>
  <v-col class="mb-2" cols="12">
    <v-card outlined>
      <v-row>
        <v-col class="my-4" cols="3">
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Integrative clustering
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="subtitle-1 font-weight-bold text-center">
                  Integrative clustering
                </p>
                <v-row class="mb-0 py-0">
                  <v-col class="py-0" cols="12">
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-select
                          v-model="integrationSelect"
                          :items="integrationMethods"
                          label="Method"
                          @mouseenter.native="on.mouseenter"
                          @mouseleave.native="on.mouseleave"
                        ></v-select>
                      </template>
                      <span> TODO</span>
                    </v-tooltip>
                  </v-col>
                  <div v-if="integrationSelect === 'Velocity weighted method'">
                    <v-col cols="12"
                      ><v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="resolution"
                            label="Clustering resolution"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <span
                          >Resolution for clustering in Seurat (form 0-1).
                          Larger number will generate more clusters and smaller
                          number will generate less clusters. Default:
                          0.5.</span
                        >
                      </v-tooltip></v-col
                    >
                  </div></v-row
                >

                <div v-if="integrationSelect === 'Seurat-WNN'">
                  <v-row>
                    <v-col cols="6"
                      ><v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="nPCs"
                            label="Number of PCs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <span
                          >Determine the ‘dimensionality’ of the dataset, the
                          top components represent a robust compression of the
                          dataset. Default: 20.</span
                        >
                      </v-tooltip></v-col
                    >

                    <v-col cols="6"
                      ><v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="resolution"
                            label="Clustering resolution"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <span
                          >Resolution for clustering in Seurat (form 0-1).
                          Larger number will generate more clusters and smaller
                          number will generate less clusters. Default:
                          0.5.</span
                        >
                      </v-tooltip></v-col
                    >
                  </v-row>
                </div>
                <v-row class="ma-0" justify="center">
                  <v-btn class="my-2" @click="runCellCluster()"
                    >Calculate</v-btn
                  >
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel v-if="clusterScatterData.axis[0] !== 0">
              <v-expansion-panel-header>
                Cell category
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p class="subtitle-1 font-weight-bold text-center">
                  Active cell category
                </p>
                <v-select
                  v-model="currentIdent"
                  :items="idents"
                  label="Select category"
                  @change="setActiveIdents(currentIdent)"
                ></v-select>
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
                <v-col class="px-0" cols="12">
                  <v-text-field
                    v-model="newClusterName"
                    label="New cluster name"
                    dense
                    background-color="white"
                  ></v-text-field
                ></v-col>
                <v-col cols="4" class="mt-0"
                  ><v-btn @click="renameCluster()">Rename</v-btn></v-col
                >
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel v-if="clusterScatterData.axis[0] !== 0">
              <v-expansion-panel-header>
                Custom cell labeling
              </v-expansion-panel-header>
              <v-expansion-panel-content>
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
                      <v-list-item-action>
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
                      label="Set new category"
                      placeholder="Type categoty name"
                      hide-details="auto"
                      background-color="white"
                      dense
                    ></v-text-field
                  ></v-col>

                  <v-col cols="4"></v-col>

                  <v-col cols="7"
                    ><v-text-field
                      v-model="addLabelName"
                      label="Add new label"
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
                    <v-list dense>
                      <v-list-item-title>Selections applied:</v-list-item-title>
                      <v-list-item
                        v-for="(item, index) in selectionPayload"
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
                          <v-btn icon @click="removeCurrentSelection(index)">
                            <v-icon color="grey lighten-1">mdi-delete</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                      <v-list-item-action>
                        <v-btn small @click="removeAllSelection()">
                          Remove all
                        </v-btn>
                      </v-list-item-action>
                    </v-list>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row class="mx-2 my-2 py-2">
                  <v-btn class="mx-2 my-4" @click="subsetCells()"
                    >Subset cells</v-btn
                  >
                  <v-btn class="mx-2 my-4" @click="restoreCells()">Reset</v-btn>
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
                <div v-if="jobid === 'example'">
                  <coverage-plot
                    :genes="genes"
                    :setting="layout[5]"
                  ></coverage-plot>
                </div>
              </grid-layout>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script>
import FeatureScatter from '~/components/figures/FeatureScatter'
import ClusterScatter from '~/components/figures/ClusterScatter'
import CoveragePlot from '~/components/figures/CoveragePlot'
import FeatureViolinStatic from '~/components/figures/FeatureViolinStatic'
import EnrichmentTable from '~/components/tables/EnrichmentTable'

import DegTable from '~/components/tables/DegTable'

import ApiService from '~/services/ApiService.js'

export default {
  components: {
    'cluster-scatter': ClusterScatter,
    'enrichment-table': EnrichmentTable,
    'coverage-plot': CoveragePlot,
    'feature-violin': FeatureViolinStatic,
    'feature-scatter': FeatureScatter,
    'deg-table': DegTable,
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
        title: 'UMAP plot',
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
        h: 2,
        i: '5',
      },
    ],
    title: '',
    panel: [0],
    nPCs: '20',
    resolution: '0.5',
    neighbor: '20',
    timeElapsed: 0,
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
    genes: [],
    currentIdent: '',
    currentIdentMerge: [],
    currentIdentLevels: [],
    currentEmbedding: 'umap.rna',
    allEmbeddings: ['pca', 'umap.rna', 'umap.atac', 'HGT'],
    currentAssay: '',
    allAssays: ['RNA', 'SCT', 'ATAC', 'MAESTRO', 'GAS'],
    reductionSelect: 'PCA',
    reductionMethods: ['PCA'],
    integrationSelect: 'Velocity weighted method',
    integrationMethods: ['Velocity weighted method', 'Seurat-WNN'],
    hgtParamSelect: 'ba_2000_indim_256_nhid_128_nhead_8_nlayers_2_dropout_0.0',
    hgtParamList: [
      'ba_2000_indim_256_nhid_128_nhead_8_nlayers_2_dropout_0.0',
      'ba_1000_indim_128_nhid_64_nhead_8_nlayers_2_dropout_0.0',
    ],
    clusteringSelect: 'Louvain',
    clusteringMethods: ['Louvain', 'K-means'],
    idents: [],
    addTransferMetadataDialog: false,
    addMetadataDialog: false,
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
    allIdents: [],
    selectedCells: [],
    clusterScatterData: { axis: [0, 1], legend: [0, 1], dimension: 1 },
    // Renameing
    oldClusterName: '',
    newClusterName: '',

    // Gene plots
    plotGeneSymbol: '',
    plotGeneAssay: '',
    violinSplit: 'Sex',
    violinGroup: 'seurat_clusters',
    windowSize: {
      x: 700,
      y: 700,
    },
    tmpGenes: [
      'CTCF',
      'DEAF1',
      'IKZF1',
      'TP53',
      'SREBF2',
      'ESR1',
      'ZNF740',
      'ZBTB7A',
      'SMAD3',
      'AHR',
    ],
  }),
  computed: {
    jobid() {
      return this.$route.params.id
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
  watch: {},
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
                  this.currentIdent = response.data.returnvalue.new_ident[0]
                  this.currentIdentLevels = response.data.returnvalue.new_levels
                  this.currentIdentMerge = []
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  clearInterval(checkComplete)
                  this.$notifier.showMessage({
                    content: 'Merged cell category',
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
    },
    async setActiveIdents() {
      this.currentIdentMerge = []
      this.$notifier.showMessage({
        content: `Set cell category to ${this.currentIdent}`,
        color: 'accent',
      })
      this.$nuxt.$loading.start()
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

    async setActiveEmbedding(currentEmbedding) {
      this.$nuxt.$loading.start()

      const result = await ApiService.postCommand(
        'deepmaps/api/queue/set-embedding/',
        {
          name: currentEmbedding,
        }
      )
      this.allEmbeddings = result.all_embeddings
      this.currentEmbedding = result.all_embeddings[result.embedding_idx[0]]

      this.clusterScatterData = await ApiService.postCommand(
        'deepmaps/api/queue/embedding-coords/',
        {
          categoryName: this.currentIdent,
        }
      )
      await this.$axios.post('deepmaps/api/queue/idents/').then((response) => {
        this.allIdents = response.data
        this.idents = response.data.map((item) => item.ident)
        this.violinSplitItems = response.data
        this.violinSplitItems.push('NULL')
      })
      this.$nuxt.$loading.finish()
    },
    async setActiveAssay(currentAssay) {
      this.$nuxt.$loading.start()
      this.$notifier.showMessage({
        content: `Set data assay to ${currentAssay}`,
        color: 'accent',
      })
      const result = await ApiService.postCommand(
        'deepmaps/api/queue/set-assay/',
        {
          name: currentAssay,
        }
      )
      this.allAssays = result.all_assays
      this.currentAssay = result.all_assays[result.assay_idx[0]]

      this.clusterScatterData = await ApiService.postCommand(
        'deepmaps/api/queue/embedding-coords/',
        {
          categoryName: this.currentIdent,
        }
      )
      this.$nuxt.$loading.finish()
    },
    async runCellCluster() {
      this.$nuxt.$loading.start()

      this.clusterResult = await ApiService.postCommand(
        'deepmaps/api/queue/cluster-multiome/',
        {
          method: this.integrationSelect,
          nPCs: this.nPCs,
          resolution: this.resolution,
          neighbor: this.neighbor,
        }
      )

      this.currentIdent = 'hgt_cluster'

      this.currentIdentLevels = await ApiService.postCommand(
        'deepmaps/api/queue/set-idents/',
        {
          name: this.currentIdent,
        }
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
      let tmp = await ApiService.postCommand('deepmaps/api/queue/assays/')
      this.allAssays = tmp.all_assays
      this.currentAssay = tmp.all_assays[tmp.assay_idx[0]]

      tmp = await ApiService.postCommand('deepmaps/api/queue/embeddings/')
      this.allEmbeddings = tmp.all_embeddings
      this.currentEmbedding = tmp.all_embeddings[tmp.embedding_idx[0]]

      this.clusterScatterData = await ApiService.postCommand(
        'deepmaps/api/queue/embedding-coords/',
        {
          categoryName: this.currentIdent,
        }
      )
      this.$nuxt.$loading.finish()
      this.$store.dispatch('calc/updateFlag', 1)
      this.$store.dispatch('calc/updateFlag', 2)
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

    async renameCluster() {
      this.$nuxt.$loading.start()
      this.currentIdentLevels.new_levels = await ApiService.postCommand(
        'deepmaps/api/queue/rename-idents/',
        {
          old_name: this.oldClusterName,
          new_name: this.newClusterName,
        }
      )
      this.clusterScatterData = await ApiService.postCommand(
        'deepmaps/api/queue/embedding-coords/',
        {
          categoryName: this.currentIdent,
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
      this.$nuxt.$loading.finish()
    },
    openMetadataDiaglog() {
      this.addMetadataDialog = true
    },
    openAddTransferMetadataDialog() {
      this.addTransferMetadataDialog = true
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
