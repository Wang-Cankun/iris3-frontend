<template>
  <v-col class="mb-2" cols="12">
    <v-card outlined>
      <v-row>
        <v-col cols="3">
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel v-if="type === 'multi_rna'">
              <v-expansion-panel-header>
                Data integration
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card class="mt-6" outlined color="blue-grey lighten-5">
                  <p class="subtitle-1 font-weight-bold text-center">
                    Data integration
                  </p>
                  <v-row class="ml-4 mb-0 py-0"
                    ><p class="my-1">Integration method</p>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon color="primary" dark v-on="on"
                          >mdi-help-circle-outline</v-icon
                        >
                      </template>
                      <p>Integration method method:</p>
                      <p>Which integration method to use?</p>
                    </v-tooltip>
                    <v-col class="py-0" cols="11"
                      ><v-select
                        v-model="integrationSelect"
                        :items="integrationMethods"
                        label=""
                      ></v-select></v-col
                  ></v-row>

                  <v-row justify="center">
                    <v-btn
                      class="mx-2 my-4"
                      color="Primary"
                      width="150"
                      @click="runIntegration()"
                      >Run integration</v-btn
                    >
                  </v-row>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Cell clustering
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card class="mt-6" outlined color="blue-grey lighten-5">
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
                        Which dimension reduction technique to use? Default: PCA
                      </p>
                    </v-tooltip>
                    <v-col class="py-0" cols="11"
                      ><v-select
                        v-model="reductionSelect"
                        :items="reductionMethods"
                        label=""
                      ></v-select></v-col
                  ></v-row>
                  <div v-if="reductionSelect === 'PCA'">
                    <p class="ml-4 title-h4">
                      Number of components
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon color="primary" dark v-on="on"
                            >mdi-help-circle-outline</v-icon
                          >
                        </template>
                        <p>
                          Determine the ‘dimensionality’ of the dataset, the top
                          components represent a robust compression of the
                          dataset. Default: 20.
                        </p>
                      </v-tooltip>
                    </p>
                    <v-text-field
                      v-model="nPCs"
                      class="px-6"
                      outlined
                      background-color="white"
                    ></v-text-field>
                    <p class="ml-4 title-h4">
                      Resolution
                      <v-tooltip top>
                        <template v-slot:activator="{ on }">
                          <v-icon color="primary" dark v-on="on"
                            >mdi-help-circle-outline</v-icon
                          >
                        </template>
                        <p>
                          Resolution for clustering in Seurat (form 0-1). Larger
                          number will generate more clusters and smaller number
                          will generate less clusters. Default: 0.5.
                        </p>
                      </v-tooltip>
                    </p>
                    <v-text-field
                      v-model="resolution"
                      class="px-6"
                      outlined
                      background-color="white"
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
                    ></v-text-field>
                  </div>
                  <v-row justify="center">
                    <v-btn
                      class="mx-2 my-4"
                      color="Primary"
                      width="150"
                      @click="runCellCluster()"
                      >Cluster</v-btn
                    >
                  </v-row>
                  <!--
                  <v-divider></v-divider>
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
                  </div>-->
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Active cell category
              </v-expansion-panel-header>
              <v-expansion-panel-content
                ><v-card class="py-3" outlined color="blue-grey lighten-5">
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
                  <v-divider></v-divider>
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
                <v-card class="mt-6" outlined color="blue-grey lighten-5">
                  <p class="subtitle-1 font-weight-bold text-center">
                    Custom cell labeling
                  </p>

                  <v-row class="mx-2 my-2 py-2">
                    <p class="my-1 subtitle-2">Step 1: Create cell filters</p>
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

                    <div class="d-flex flex mt-4">
                      <v-autocomplete
                        v-model="addGeneName"
                        class="px-1"
                        :items="genes"
                        outlined
                        dense
                        label="Gene"
                        background-color="white"
                      ></v-autocomplete>
                      <v-select
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
                <v-card class="mt-6" outlined color="blue-grey lighten-5">
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
                        class="px-1"
                        :items="genes"
                        outlined
                        dense
                        label="Gene"
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
                <!--
                    <scatter
                      :key="layout[0].i"
                      :x="layout[0].x"
                      :y="layout[0].y"
                      :w="layout[0].w"
                      :h="layout[0].h"
                      :i="layout[0].i"
                      :imagew="700"
                      :imageh="550"
                      :src="umapCluster"
                      :values="clusterResult.umap_pts"
                      :title="layout[0].title"
                    >
                    </scatter>
-->
                <v-card class="ma-0"
                  ><grid-item
                    :x="layout[1].x"
                    :y="layout[1].y"
                    :w="layout[1].w"
                    :h="layout[1].h"
                    :i="layout[1].i"
                    class="grid-item-border"
                    drag-ignore-from=".no-drag"
                    @resized="changeTableSize"
                  >
                    <v-card-title
                      class="primary white--text caption px-2 py-1"
                      @mouseover="degHover = true"
                      @mouseleave="degHover = false"
                      >Differential gene expression analysis<v-spacer
                      ></v-spacer>
                      <div>
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon
                              v-show="degHover === true"
                              color="white"
                              v-on="on"
                              >mdi-help-circle-outline</v-icon
                            >
                          </template>
                          <p>TODO</p>
                        </v-tooltip>
                        <v-menu bottom left :close-on-content-click="false">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn dark icon v-bind="attrs" v-on="on">
                              <v-icon v-show="degHover === true"
                                >mdi-download-outline</v-icon
                              >
                            </v-btn>
                          </template>

                          <v-list>
                            <v-list-item @click="1">
                              <download-excel
                                class="mr-4"
                                :data="deResult"
                                type="csv"
                              >
                                <v-list-item-title
                                  >Download file (CSV)</v-list-item-title
                                >
                              </download-excel>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div></v-card-title
                    >
                    <div class="no-drag">
                      <v-row>
                        <v-col cols="6">
                          <v-autocomplete
                            v-model="ident1"
                            class="ml-4"
                            :items="currentIdentLevels"
                            label="Group 1"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="6">
                          <v-autocomplete
                            v-model="ident2"
                            class="ml-4"
                            :items="currentIdentLevels"
                            label="Group 2"
                          ></v-autocomplete>
                        </v-col>
                        <!--<v-col cols="6" class="ma-0">
                        <p class="ml-4 mb-0 title-h4">
                          Assay
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-icon color="primary" dark v-on="on"
                                >mdi-help-circle-outline</v-icon
                              >
                            </template>
                            <p>Assay</p>
                          </v-tooltip>
                          <v-select
                            v-model="degAssay"
                            class="px-0"
                            :items="allAssays"
                            outlined
                            dense
                          ></v-select>
                        </p>
                      </v-col>
                      -->
                      </v-row>
                      <v-row>
                        <v-col cols="4" class="ma-0">
                          <p class="ml-4 mb-0 body-1">
                            P-value cutoff
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-icon color="primary" dark v-on="on"
                                  >mdi-help-circle-outline</v-icon
                                >
                              </template>
                              <p>pvalue</p>
                            </v-tooltip>
                            <v-text-field
                              v-model="degPvalue"
                              class="px-0"
                              outlined
                              type="number"
                              step="0.01"
                              background-color="white"
                              dense
                            ></v-text-field>
                          </p>
                        </v-col>
                        <v-col cols="4">
                          <p class="ml-4 mb-0 body-1">
                            Min cell percent
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-icon color="primary" dark v-on="on"
                                  >mdi-help-circle-outline</v-icon
                                >
                              </template>
                              <p>
                                Only test genes that are detected in a minimum
                                fraction of min.pct cells in either of the two
                                populations. Meant to speed up the function by
                                not testing genes that are very infrequently
                                expressed. Default is 0.2
                              </p>
                            </v-tooltip>
                            <v-text-field
                              v-model="minPct"
                              class="px-0"
                              outlined
                              dense
                              background-color="white"
                            ></v-text-field>
                          </p>
                        </v-col>
                        <v-col cols="4" class="ma-0">
                          <p class="ml-4 mb-0 body-1">
                            LogFC threshold
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-icon color="primary" dark v-on="on"
                                  >mdi-help-circle-outline</v-icon
                                >
                              </template>
                              <p>
                                Limit testing to genes which show, on average,
                                at least X-fold difference (log-scale) between
                                the two groups of cells. Default is 0.25
                                Increasing logfc.threshold speeds up the
                                function, but can miss weaker signals.
                              </p>
                            </v-tooltip>
                            <v-text-field
                              v-model="minLfc"
                              class="px-0"
                              outlined
                              dense
                              background-color="white"
                            ></v-text-field>
                          </p>
                        </v-col>
                      </v-row>
                      <v-row justify="center" class="mx-2 mb-2 mt-0">
                        <v-btn
                          class="mx-2 mb-2 mt-0"
                          color="Primary"
                          width="200"
                          @click="runDeg()"
                          >Update</v-btn
                        >
                      </v-row>
                      <v-data-table
                        dense
                        :headers="headers"
                        :items="deResult"
                        item-key="name"
                        :items-per-page="5"
                        class="elevation-1"
                      ></v-data-table></div></grid-item
                ></v-card>
                <feature-scatter
                  :title="layout[2].title"
                  :x="layout[2].x"
                  :y="layout[2].y"
                  :w="layout[2].w"
                  :h="layout[2].h"
                  :i="layout[2].i"
                  :genes="genes"
                ></feature-scatter>
                <enrichment-table
                  :genes="deResult"
                  :x="layout[3].x"
                  :y="layout[3].y"
                  :w="layout[3].w"
                  :h="layout[3].h"
                  :i="layout[3].i"
                ></enrichment-table>
              </grid-layout>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>
<script>
import _ from 'lodash'
import FeatureScatter from '@/components/figures/FeatureScatter'
import ClusterScatter from '~/components/figures/ClusterScatter'
import EnrichmentTable from '~/components/tables/EnrichmentTable'

import ApiService from '~/services/ApiService.js'
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export default {
  components: {
    'cluster-scatter': ClusterScatter,
    'enrichment-table': EnrichmentTable,
    'feature-scatter': FeatureScatter,
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
        w: 4,
        h: 2,
        i: '2',
        title: 'Feature plot',
      },
      {
        x: 4,
        y: 2,
        w: 2,
        h: 2,
        i: '3',
        title: 'Cell type annotation',
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
    umapCluster: '',
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
      this.currentIdentMerge = []
      await this.$axios
        .post('deepmaps/api/queue/set-idents/', {
          name: currentIdent,
        })
        .then((response) => {
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.currentIdentLevels = response.data.returnvalue
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  clearInterval(checkComplete)
                  this.$notifier.showMessage({
                    content: `Set cell category to ${currentIdent}`,
                    color: 'success',
                  })
                }
              })
          }, 1000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Get idents error!',
            color: 'error',
          })
        })

      await this.$axios
        .post('deepmaps/api/queue/umap-cluster/')
        .then((response) => {
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.umapStatic = response.data.returnvalue
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  clearInterval(checkComplete)
                  this.$notifier.showMessage({
                    content: 'Updated UMAP plot',
                    color: 'success',
                  })
                }
              })
          }, 1000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot Cell UMAP error!',
            color: 'error',
          })
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
    },
    async runIntegration() {
      this.$nuxt.$loading.start()
      if (this.$route.params.id === 'example') {
        await sleep(8000)
      } else {
        await sleep(30000)
      }
      this.panel = [1]
      this.$nuxt.$loading.finish()
    },
    async runCellCluster() {
      this.$notifier.showMessage({
        content: 'Running clustering...',
        color: 'accent',
      })
      this.$nuxt.$loading.start()
      if (this.type === 'multi_rna') {
        await setTimeout(() => {}, 20000)
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
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Clustering error!',
            color: 'error',
          })
        })

      await this.$axios
        .post('deepmaps/api/queue/set-idents/', {
          name: this.currentIdent,
        })
        .then((response) => {
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.currentIdentLevels = response.data.returnvalue
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  clearInterval(checkComplete)
                  this.$notifier.showMessage({
                    content: 'Set new idents',
                    color: 'success',
                  })
                }
              })
          }, 1000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Get idents error!',
            color: 'error',
          })
        })

      await this.$axios
        .post('deepmaps/api/queue/umap-cluster/')
        .then((response) => {
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.umapCluster = response.data.returnvalue
                  this.timeElapsed =
                    (response.data.finishedOn - response.data.processedOn) /
                    1000
                  clearInterval(checkComplete)
                  this.$notifier.showMessage({
                    content: 'Updated UMAP plot',
                    color: 'success',
                  })
                }
              })
          }, 1000)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot Cell UMAP error!',
            color: 'error',
          })
        })

      this.clusterScatterData = await ApiService.postCommand(
        'deepmaps/api/queue/embedding-coords/',
        {
          categoryName: this.currentIdent,
        }
      )

      await this.$axios
        .post('deepmaps/api/queue/select-category/')
        .then((response) => {
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
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
          }, 500)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot Cell UMAP error!',
            color: 'error',
          })
        })

      await this.$axios.post('deepmaps/api/queue/genes/').then((response) => {
        this.genes = response.data
      })
      await this.$axios.post('deepmaps/api/queue/idents/').then((response) => {
        this.allIdents = response.data
        this.idents = response.data.map((item) => item.ident)
        this.violinSplitItems = response.data
        this.violinSplitItems.push('NULL')
      })
      this.$nuxt.$loading.finish()
    },

    async renameCluster() {
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
                    content: 'Changed cell category',
                    color: 'success',
                  })
                }
              })
          }, 500)
        })
        .catch((error) => {
          console.log({ error })
          this.$notifier.showMessage({
            content: 'Plot Cell UMAP error!',
            color: 'error',
          })
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
                if (++i === 10) {
                  clearInterval(checkComplete)
                }
              })
          }, 1000)
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: 'Calculate QC metrics error: ' + error,
            color: 'error',
          })
        })

      await this.setActiveIdents(this.currentIdent)
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
                if (++i === 10) {
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

      await this.setActiveIdents(this.currentIdent)
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
                if (++i === 10) {
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

    async runDeg() {
      this.deResult = []
      this.$nuxt.$loading.start()
      await this.$axios
        .post('deepmaps/api/queue/deg/', {
          ident1: this.ident1,
          ident2: this.ident2,
          min_pct: this.minPct,
          min_lfc: this.minLfc,
          assay: 'RNA',
          pvalue: this.degPvalue,
        })
        .then((response) => {
          let i = 0
          const checkComplete = setInterval(async () => {
            await this.$axios
              .get('deepmaps/api/queue/' + response.data.id)
              .then((response) => {
                if (response.data.returnvalue !== null) {
                  this.deResult = response.data.returnvalue[0]
                  if (!response.data.returnvalue[0]) {
                    this.$notifier.showMessage({
                      content: 'DEG not found',
                      color: 'error',
                    })
                  }
                  this.deg = _.map(this.deResult, 'gene')

                  clearInterval(checkComplete)
                }
                if (++i === 10) {
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
      this.$nuxt.$loading.finish()
    },

    async runGenePlot() {
      this.$notifier.showMessage({
        content: `Plotting ${this.gene} gene...`,
        color: 'accent',
      })
      await this.$axios
        .post('deepmaps/api/queue/violin-gene/', {
          gene: this.gene,
          split: this.violinSplit,
          group: this.violinGroup,
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
      this.featureScatterData = await ApiService.postCommand(
        'deepmaps/api/queue/feature-coords/',
        {
          gene: this.gene,
          assay: 'RNA',
        }
      )
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
    runQubic() {
      this.$notifier.showMessage({
        content: 'Start CTSR identification!',
        color: 'accent',
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
