<template>
  <v-col class="mb-2" cols="12">
    <v-card outlined>
      <v-row>
        <v-col class="my-2" cols="3">
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Integrative clustering
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card class="py-3" outlined>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <p
                        class="subtitle-1 font-weight-bold text-center"
                        v-on="on"
                      >
                        Integrative clustering
                      </p>
                    </template>
                    <span> TODO</span>
                  </v-tooltip>
                  <v-row class="ml-4 mb-0 py-0">
                    <v-col class="py-0" cols="11">
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
                    </v-col></v-row
                  >
                  <div v-if="integrationSelect === 'Seurat-WNN'">
                    <v-card class="py-3" outlined>
                      <p class="subtitle-1 font-weight-bold text-center">
                        Cell clustering
                      </p>
                      <v-row class="ml-4 mb-0 py-0"
                        ><p class="my-1">Dimension reduction</p>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon color="primary" dark v-on="on"
                              >mdi-help-circle-outline</v-icon
                            >
                          </template>
                          <p>Dimension reduction methods:</p>
                          <p>
                            Which dimension reduction technique to use? Default:
                            PCA
                          </p>
                        </v-tooltip>
                        <v-col class="py-0" cols="11"
                          ><v-select
                            v-model="reductionSelect"
                            :items="reductionMethods"
                            label=""
                          ></v-select></v-col
                      ></v-row>
                      <p class="ml-4 title-h4">
                        Number of components
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon color="primary" dark v-on="on"
                              >mdi-help-circle-outline</v-icon
                            >
                          </template>
                          <p>
                            Determine the ‘dimensionality’ of the dataset, the
                            top components represent a robust compression of the
                            dataset. Default: 20.
                          </p>
                        </v-tooltip>
                      </p>
                      <v-text-field
                        v-model="nPCs"
                        class="px-6"
                        outlined
                        dense
                        background-color="white"
                      ></v-text-field>
                      <v-row class="ml-4 mb-0 py-0"
                        ><p class="my-1">Clustering method</p>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon color="primary" dark v-on="on"
                              >mdi-help-circle-outline</v-icon
                            >
                          </template>
                          <p>Dimension reduction methods:</p>
                          <p>
                            Which dimension reduction technique to use? Default:
                            PCA
                          </p>
                        </v-tooltip>
                        <v-col class="py-0" cols="11"
                          ><v-select
                            v-model="clusteringSelect"
                            :items="clusteringMethods"
                            label=""
                          ></v-select></v-col
                      ></v-row>
                      <p class="ml-4 title-h4">
                        Resolution
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon color="primary" dark v-on="on"
                              >mdi-help-circle-outline</v-icon
                            >
                          </template>
                          <p>
                            Resolution for clustering in Seurat (form 0-1).
                            Larger number will generate more clusters and
                            smaller number will generate less clusters. Default:
                            0.5.
                          </p>
                        </v-tooltip>
                      </p>
                      <v-text-field
                        v-model="resolution"
                        class="px-6"
                        outlined
                        background-color="white"
                        dense
                      ></v-text-field>
                      <p class="ml-4 title-h4">
                        Number of neighbors
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon color="primary" dark v-on="on"
                              >mdi-help-circle-outline</v-icon
                            >
                          </template>
                          <p>
                            Defines k for the k-nearest neighbor algorithm.
                            Default: 20.
                          </p>
                        </v-tooltip>
                      </p>
                      <v-text-field
                        v-model="neighbor"
                        class="px-6"
                        outlined
                        background-color="white"
                        dense
                      ></v-text-field>
                    </v-card>
                  </div>
                  <v-row justify="center">
                    <v-btn
                      class="mx-2 my-4"
                      color="Primary"
                      width="150"
                      @click="runCellCluster()"
                      >Calculate</v-btn
                    >
                  </v-row>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <!--
              <v-expansion-panel>
              <v-expansion-panel-header>
                Cell clustering
              </v-expansion-panel-header>
              
              <v-expansion-panel-content>
                <div v-if="idents !== []">
                  <p class="subtitle-1 font-weight-bold text-center">
                    Merge clusters
                  </p>
                  <v-autocomplete
                    v-model="currentIdentMerge"
                    class="ml-4"
                    :items="currentIdentLevels"
                    label="Select clusters"
                    multiple
                  ></v-autocomplete>
                  <v-row justify="center">
                    <v-btn
                      class="mx-2 my-4"
                      color="Primary"
                      width="150"
                      @click="mergeIdents()"
                      >MERGE</v-btn
                    >
                  </v-row>
                        <p class="subtitle-1 font-weight-bold text-center">
                          Re-cluster
                        </p>
                        <v-autocomplete
                          v-model="currentIdentMerge"
                          class="ml-4"
                          :items="currentIdentLevels"
                          label="Select identity"
                          multiple
                        ></v-autocomplete>
                        <v-row justify="center">
                          <v-btn
                            class="mx-2 my-4"
                            color="Primary"
                            width="150"
                            @click="mergeIdents()"
                            >RE-cluster</v-btn
                          >
                        </v-row>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>-->
            <v-expansion-panel>
              <v-expansion-panel-header>
                Active metadata
              </v-expansion-panel-header>
              <v-expansion-panel-content
                ><v-card class="py-3" outlined>
                  <!--<p class="subtitle-1 font-weight-bold text-center">
                    Active assay
                  </p>
                  <div class="d-flex justify-between">
                    <v-select
                      v-model="currentAssay"
                      class="ml-4"
                      :items="allAssays"
                      label="Select assay"
                      @change="setActiveAssay(currentAssay)"
                    ></v-select>
                  </div>
                  <v-divider />-->

                  <p class="subtitle-1 font-weight-bold text-center">
                    Active embedding
                  </p>
                  <div class="d-flex justify-between">
                    <v-select
                      v-model="currentEmbedding"
                      class="ml-4"
                      :items="allEmbeddings"
                      label="Select embedding"
                      @change="setActiveEmbedding(currentEmbedding)"
                    ></v-select>
                  </div>
                  <v-divider />
                  <p class="subtitle-1 font-weight-bold text-center">
                    Active cell category
                  </p>
                  <v-select
                    v-model="currentIdent"
                    class="ml-4"
                    :items="idents"
                    label="Select category"
                    @change="setActiveIdents(currentIdent)"
                  ></v-select>
                  <v-divider />
                  <p class="subtitle-1 font-weight-bold text-center">
                    Rename clusters
                  </p>
                  <v-row class="mx-2 my-2 py-2">
                    <v-col cols="12"
                      ><v-select
                        v-model="oldClusterName"
                        class="px-1"
                        label="Old cluster name"
                        :items="currentIdentLevels"
                        outlined
                        hide-details="auto"
                        background-color="white"
                        dense
                      ></v-select
                    ></v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="newClusterName"
                        label="New cluster name"
                        placeholder="Number"
                        class="px-1"
                        outlined
                        dense
                        background-color="white"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="4"
                      ><v-btn @click="renameCluster()">Rename</v-btn></v-col
                    ></v-row
                  >
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Custom cell labeling
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card class="py-3" outlined>
                  <p class="subtitle-1 font-weight-bold text-center">
                    Custom cell labeling
                  </p>

                  <v-row class="mx-2 my-2 py-2">
                    <p class="my-1 subtitle-2">Step 1: Create cell filters</p>
                    <v-col cols="12">
                      <div class="d-flex flex">
                        <v-select
                          v-model="filterCategoryName"
                          :items="idents"
                          label="Category"
                          class="px-1 col-2"
                          outlined
                          dense
                          background-color="white"
                        ></v-select>
                        <v-select
                          v-model="filterCategoryLevel"
                          :items="filterCategoryLevels"
                          label="Cluster"
                          class="px-1 col-2"
                          outlined
                          dense
                          multiple
                          background-color="white"
                        ></v-select>
                      </div>

                      <v-btn color="Primary" @click="addClusterFilter()"
                        >Add cluster filter</v-btn
                      >
                    </v-col>
                    <v-col cols="12">
                      <div class="d-flex flex mt-4">
                        <v-autocomplete
                          v-model="addGeneName"
                          label="Gene"
                          :items="genes"
                          placeholder="Name"
                          class="px-1"
                          outlined
                          dense
                          background-color="white"
                        ></v-autocomplete
                        ><v-select
                          v-model="addGeneDirection"
                          :items="addGeneDirectionItems"
                          label="Direction"
                          class="px-1"
                          outlined
                          dense
                          background-color="white"
                        ></v-select>
                        <v-text-field
                          v-model="addGeneThres"
                          label="Thres"
                          placeholder="Number"
                          class="px-1"
                          outlined
                          dense
                          background-color="white"
                        ></v-text-field>
                      </div>
                      <v-btn color="Primary" @click="addGeneFilter()"
                        >Add gene filter</v-btn
                      ></v-col
                    >

                    <v-col class="py-0" cols="12">
                      <p class="my-1">Filters applied:</p>
                      <ul>
                        <li v-for="(item, index) in filterPayload" :key="index">
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
                    <p class="my-1 subtitle-2">
                      Step 2: Assign cells to new label
                    </p>

                    <v-col cols="12"
                      ><v-text-field
                        v-model="addCategoryName"
                        label="Set new category"
                        placeholder="Type categoty name"
                        outlined
                        hide-details="auto"
                        background-color="white"
                        dense
                      ></v-text-field
                    ></v-col>

                    <v-col cols="4"
                      ><v-btn @click="setCategory(addCategoryName)"
                        >SET</v-btn
                      ></v-col
                    >

                    <v-col cols="12"
                      ><v-text-field
                        v-model="addLabelName"
                        label="Add new label"
                        placeholder="Type label name"
                        outlined
                        hide-details="auto"
                        background-color="white"
                        dense
                      ></v-text-field
                    ></v-col>
                    <v-btn
                      class="mx-2 my-4"
                      color="Accent"
                      @click="assignCells()"
                      >Assign cells</v-btn
                    >
                  </v-row>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Cell selection
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card class="py-3" outlined>
                  <p class="subtitle-1 font-weight-bold text-center">
                    Cell selection
                  </p>

                  <v-row class="mx-2 my-2 py-2">
                    <div class="d-flex flex">
                      <v-select
                        v-model="selectionCategoryName"
                        cols="3"
                        :items="idents"
                        label="Category"
                        class="px-1 col-2"
                        outlined
                        dense
                        background-color="white"
                      ></v-select>
                      <v-select
                        v-model="selectionCategoryLevel"
                        cols="3"
                        :items="selectionCategoryLevels"
                        label="Cluster"
                        class="px-1 col-2"
                        outlined
                        dense
                        multiple
                        background-color="white"
                      ></v-select>
                    </div>
                    <v-btn color="Primary" @click="addClusterSelection()"
                      >Add cluster filter</v-btn
                    >

                    <div class="d-flex flex mt-4">
                      <v-autocomplete
                        v-model="selectionGeneName"
                        label="Gene"
                        :items="genes"
                        placeholder="Name"
                        class="px-1"
                        outlined
                        dense
                        background-color="white"
                      ></v-autocomplete
                      ><v-select
                        v-model="selectionGeneDirection"
                        cols="3"
                        :items="selectionGeneDirectionItems"
                        label="Direction"
                        class="px-1"
                        outlined
                        dense
                        background-color="white"
                      ></v-select>
                      <v-text-field
                        v-model="selectionGeneThres"
                        label="Thres"
                        placeholder="Number"
                        class="px-1"
                        outlined
                        dense
                        background-color="white"
                      ></v-text-field>
                    </div>
                    <v-btn color="Primary" @click="addGeneSelection()"
                      >Add gene filter</v-btn
                    >

                    <v-col class="py-0" cols="12">
                      <p class="my-1">Selections applied:</p>
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

                  <v-row class="mx-2 my-2 py-2">
                    <v-btn
                      class="mx-2 my-4"
                      color="Accent"
                      @click="subsetCells()"
                      >Subset cells</v-btn
                    >
                    <v-btn
                      class="mx-2 my-4"
                      color="Accent"
                      @click="restoreCells()"
                      >Reset</v-btn
                    >
                  </v-row>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col cols="9">
          <div v-if="clusterResult !== ''">
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
                  :key="layout[0].i"
                  :x="layout[0].x"
                  :y="layout[0].y"
                  :w="layout[0].w"
                  :h="layout[0].h"
                  :i="layout[0].i"
                  :imagew="600"
                  :imageh="550"
                  :src="clusterScatterData"
                  :title="layout[0].title"
                >
                </cluster-scatter>
                <deg-table
                  :setting="layout[1]"
                  :genes="genes"
                  :idents="currentIdentLevels"
                ></deg-table>
                <feature-scatter
                  :title="layout[2].title"
                  :x="layout[2].x"
                  :y="layout[2].y"
                  :w="layout[2].w"
                  :h="layout[2].h"
                  :i="layout[2].i"
                  :genes="genes"
                ></feature-scatter>
                <feature-violin
                  :setting="layout[3]"
                  :genes="genes"
                  :idents="idents"
                ></feature-violin>
                <enrichment-table
                  :x="layout[4].x"
                  :y="layout[4].y"
                  :w="layout[4].w"
                  :h="layout[4].h"
                  :i="layout[4].i"
                ></enrichment-table>
                <div v-if="jobid === 'example'">
                  <coverage-plot
                    :genes="genes"
                    :x="layout[5].x"
                    :y="layout[5].y"
                    :w="layout[5].w"
                    :h="layout[5].h"
                    :i="layout[5].i"
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
        title: 'Gene violin  plot',
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
        w: 2,
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
    umapCluster: '',
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
    runIntegration() {
      return 1
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
      this.currentIdentLevels = await ApiService.postCommand(
        'deepmaps/api/queue/set-idents/',
        { name: this.currentIdent }
      )

      this.umapCluster = await ApiService.postCommand(
        'deepmaps/api/queue/umap-cluster/'
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
    },

    async setActiveEmbedding(currentEmbedding) {
      this.$notifier.showMessage({
        content: `Set cell embedding to ${currentEmbedding}`,
        color: 'accent',
      })
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
    },
    async setActiveAssay(currentAssay) {
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
    },
    async runCellCluster() {
      this.$nuxt.$loading.start()

      this.clusterResult = await ApiService.postCommand(
        'deepmaps/api/queue/cluster-multiome/',
        {
          method: 'HGT',
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

      this.umapCluster = await ApiService.postCommand(
        'deepmaps/api/queue/umap-cluster/'
      )

      this.clusterScatterData = await ApiService.postCommand(
        'deepmaps/api/queue/embedding-coords/',
        {
          categoryName: this.currentIdent,
        }
      )
      this.$nuxt.$loading.finish()
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
      console.log(tmp)
      this.allAssays = tmp.all_assays
      this.currentAssay = tmp.all_assays[tmp.assay_idx[0]]

      tmp = await ApiService.postCommand('deepmaps/api/queue/embeddings/')
      this.allEmbeddings = tmp.all_embeddings
      this.currentEmbedding = tmp.all_embeddings[tmp.embedding_idx[0]]
      console.log(tmp)
    },

    async setCategory(name) {
      await this.$axios.post('deepmaps/api/queue/idents/').then((response) => {
        this.allIdents = response.data
        this.idents = response.data.map((item) => item.ident)
        this.violinSplitItems = response.data
        this.violinSplitItems.push('NULL')
      })

      await this.$axios
        .post('deepmaps/api/queue/select-category/', {
          categoryName: name,
        })
        .then((response) => {
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.currentIdent = response.data.returnvalue.active_category
                  this.setExistingCategory =
                    response.data.returnvalue.active_category[0]
                  this.activeCategory =
                    response.data.returnvalue.active_category[0]
                  this.activeCategoryLevels =
                    response.data.returnvalue.active_category_levels
                  this.setExistingCategoryItems =
                    response.data.returnvalue.available_category
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  clearInterval(checkComplete)
                  this.$notifier.showMessage({
                    content: 'Updated cell category',
                    color: 'success',
                  })
                }
              })
          }, 1000)
        })
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
      const payload = {
        newLevelName: this.addLabelName,
        filterPayload: this.filterPayload,
      }
      console.log(payload)
      await this.$axios
        .post('deepmaps/api/queue/select-cells/', payload)
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.filterPayload = []
                  this.selectedCells = response.data.returnvalue

                  clearInterval(checkComplete)
                }
                if (++i === 100) {
                  clearInterval(checkComplete)
                }
              })
          }, 1000)
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: 'Error: ' + error,
            color: 'error',
          })
        })

      this.clusterScatterData = await ApiService.postCommand(
        'deepmaps/api/queue/embedding-coords/',
        {
          categoryName: this.currentIdent,
        }
      )
      return 1
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
      console.log({
        selectionPayload: this.selectionPayload,
      })
      await this.$axios
        .post('deepmaps/api/queue/subset-cells/', {
          selectionPayload: this.selectionPayload,
        })
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.selectionPayload = []
                  this.subCells = response.data.returnvalue

                  clearInterval(checkComplete)
                }
                if (++i === 100) {
                  clearInterval(checkComplete)
                }
              })
          }, 1000)
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: 'Subsets error: ' + error,
            color: 'error',
          })
        })

      this.clusterScatterData = await ApiService.postCommand(
        'deepmaps/api/queue/embedding-coords/',
        {
          categoryName: this.currentIdent,
        }
      )
      return 1
    },

    async restoreCells() {
      await this.$axios
        .post('deepmaps/api/queue/set-obj/', {
          type: 'full',
        })
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  clearInterval(checkComplete)
                }
                if (++i === 100) {
                  clearInterval(checkComplete)
                }
              })
          }, 1000)
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: 'Subsets error: ' + error,
            color: 'error',
          })
        })

      this.clusterScatterData = await ApiService.postCommand(
        'deepmaps/api/queue/embedding-coords/',
        {
          categoryName: this.currentIdent,
        }
      )
      return 1
    },

    async runGenePlot() {
      this.$notifier.showMessage({
        content: `Plotting ${this.gene} gene...`,
        color: 'accent',
      })
      await this.$axios
        .post('deepmaps/api/queue/violin-gene/', {
          gene: this.plotGeneSymbol,
          split: this.violinSplit,
          group: this.violinGroup,
          assay: this.plotGeneAssay,
        })
        .then((response) => {
          setTimeout(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                this.violinGene = response.data.returnvalue
                this.timeElapsed =
                  (response.data.finishedOn - response.data.processedOn) / 1000
              })
          }, 3000)
        })
      await this.$axios
        .post('deepmaps/api/queue/feature-gene/', {
          gene: this.plotGeneSymbol,
          assay: this.plotGeneAssay,
        })
        .then((response) => {
          setTimeout(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                this.featureGene = response.data.returnvalue
                this.timeElapsed =
                  (response.data.finishedOn - response.data.processedOn) / 1000
              })
          }, 3000)
        })
    },
    async showDotPlot() {
      await this.$axios
        .post('deepmaps/api/queue/dot-plot/', {
          top: 3,
        })
        .then((response) => {
          setTimeout(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                this.dotPlot = response.data.returnvalue
                this.timeElapsed =
                  (response.data.finishedOn - response.data.processedOn) / 1000
              })
          }, 3000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot genes error!',
            color: 'error',
          })
        })
    },
    async annotateCellType() {
      await this.$axios
        .post('deepmaps/api/queue/dot-plot/', {
          top: 3,
        })
        .then((response) => {
          setTimeout(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                this.dotPlot = response.data.returnvalue
                this.timeElapsed =
                  (response.data.finishedOn - response.data.processedOn) / 1000
              })
          }, 3000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot genes error!',
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
    async renameCluster() {
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
    },
    openMetadataDiaglog() {
      this.addMetadataDialog = true
    },
    openAddTransferMetadataDialog() {
      this.addTransferMetadataDialog = true
    },
    downloadPDF() {
      console.log('donlowad PDF ... ')
    },
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
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Annotate error!',
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
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Annotate error!',
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
  },
}
</script>
