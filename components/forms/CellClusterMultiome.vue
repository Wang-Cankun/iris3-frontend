<template>
  <v-col class="mb-2" cols="12">
    <v-card outlined>
      <v-row>
        <v-col cols="3">
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Integrative clustering
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card class="py-3" outlined color="blue-grey lighten-5">
                  <p class="subtitle-1 font-weight-bold text-center">
                    Integrative clustering
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon color="primary" dark v-on="on"
                          >mdi-help-circle-outline</v-icon
                        >
                      </template>
                      <p>Data integration:</p>
                      <p>Default: Velocity weighted method</p>
                    </v-tooltip>
                  </p>
                  <v-row class="ml-4 mb-0 py-0">
                    <v-col class="py-0" cols="11"
                      ><v-select
                        v-model="integrationSelect"
                        :items="integrationMethods"
                        label=""
                      ></v-select></v-col
                  ></v-row>
                  <v-divider></v-divider>
                  <div v-if="integrationSelect === 'Seurat-WNN'">
                    <v-card class="py-3" outlined color="blue-grey lighten-5">
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
                      >Run</v-btn
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
                ><v-card class="py-3" outlined color="blue-grey lighten-5">
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
                    <v-col cols="8">
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
                <v-card class="py-3" outlined color="blue-grey lighten-5">
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
                <v-card class="py-3" outlined color="blue-grey lighten-5">
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
                <scatter
                  :key="layout[0].i"
                  :x="layout[0].x"
                  :y="layout[0].y"
                  :w="layout[0].w"
                  :h="layout[0].h"
                  :i="layout[0].i"
                  :imagew="600"
                  :imageh="550"
                  :src="umapStatic"
                  :title="layout[0].title"
                >
                </scatter>
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
                  >
                    <v-card-title class="primary white--text caption px-2 py-1"
                      >Differential expression testing <v-spacer></v-spacer>
                      <v-menu bottom left>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn dark icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-download-outline</v-icon>
                          </v-btn>
                        </template>

                        <v-list>
                          <v-list-item @click="downloadPDF">
                            <v-list-item-title
                              >Download Table</v-list-item-title
                            >
                          </v-list-item>
                        </v-list>
                      </v-menu></v-card-title
                    >
                    <v-row
                      ><v-col cols="6">
                        <v-autocomplete
                          v-model="ident1"
                          class="ml-4"
                          :items="currentIdentLevels"
                          label="Ident1"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="6">
                        <v-autocomplete
                          v-model="ident2"
                          class="ml-4"
                          :items="currentIdentLevels"
                          label="Ident2"
                        ></v-autocomplete> </v-col
                    ></v-row>
                    <v-row>
                      <v-col cols="6" class="ma-0">
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
                      <v-col cols="6" class="ma-0">
                        <p class="ml-4 mb-0 title-h4">
                          P-value threshold
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-icon color="primary" dark v-on="on"
                                >mdi-help-circle-outline</v-icon
                              >
                            </template>
                            <p>pvalue</p>
                          </v-tooltip>
                          <v-select
                            v-model="degPvalue"
                            class="px-0"
                            :items="degPvalueList"
                            outlined
                            background-color="white"
                            dense
                          ></v-select>
                        </p>
                      </v-col>
                      <v-col cols="6" class="ma-0">
                        <p class="ml-4 mb-0 title-h4">
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
                              populations. Meant to speed up the function by not
                              testing genes that are very infrequently
                              expressed. Default is 0.2
                            </p>
                          </v-tooltip>
                          <v-text-field
                            v-model="minPct"
                            class="px-0"
                            outlined
                            type="number"
                            step="0.1"
                            background-color="white"
                            dense
                          ></v-text-field>
                        </p>
                      </v-col>
                      <v-col cols="6" class="ma-0">
                        <p class="ml-4 mb-0 title-h4">
                          LogFC threshold
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-icon color="primary" dark v-on="on"
                                >mdi-help-circle-outline</v-icon
                              >
                            </template>
                            <p>
                              Limit testing to genes which show, on average, at
                              least X-fold difference (log-scale) between the
                              two groups of cells. Default is 0.25 Increasing
                              logfc.threshold speeds up the function, but can
                              miss weaker signals.
                            </p>
                          </v-tooltip>
                          <v-text-field
                            v-model="minLfc"
                            class="px-0"
                            outlined
                            type="number"
                            step="0.1"
                            background-color="white"
                            dense
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
                    ></v-data-table></grid-item
                ></v-card>
                <v-card class="ma-0"
                  ><grid-item
                    :x="layout[2].x"
                    :y="layout[2].y"
                    :w="layout[2].w"
                    :h="layout[2].h"
                    :i="layout[2].i"
                    class="grid-item-border"
                    @resized="changeSize"
                  >
                    <v-card-title class="primary white--text caption px-2 py-1"
                      >Gene plots<v-spacer></v-spacer>
                      <v-menu bottom left>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn dark icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-download-outline</v-icon>
                          </v-btn>
                        </template>

                        <v-list>
                          <v-list-item @click="downloadPDF">
                            <v-list-item-title
                              >Download Table</v-list-item-title
                            >
                          </v-list-item>
                        </v-list>
                      </v-menu></v-card-title
                    >
                    <v-row>
                      <v-col cols="3">
                        <v-select
                          v-model="plotGeneAssay"
                          class="ml-4"
                          :items="allAssays"
                          label="Assay"
                        ></v-select> </v-col
                      ><v-col cols="3">
                        <v-autocomplete
                          v-model="plotGeneSymbol"
                          class="ml-4"
                          :items="genes"
                          label="Gene"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="3">
                        <div v-if="idents != ''">
                          <p class="subtitle-2 text--primary mx-4">Split by:</p>
                          <v-autocomplete
                            v-model="violinSplit"
                            class="ml-4"
                            :items="idents"
                            label="Select cell category"
                          ></v-autocomplete>
                        </div>
                      </v-col>
                      <v-col cols="3">
                        <div v-if="idents != ''">
                          <p class="subtitle-2 text--primary mx-4">Group by:</p>
                          <v-autocomplete
                            v-model="violinGroup"
                            class="ml-4"
                            :items="idents"
                            label="Select cell category"
                          ></v-autocomplete>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row justify="center" class="mx-2 mb-2 mt-0">
                      <v-btn
                        class="mx-2 mb-2 mt-0"
                        color="Primary"
                        width="200"
                        @click="runGenePlot()"
                        >Plot</v-btn
                      >
                    </v-row>
                    <v-row v-show="violinGene">
                      <v-col cols="6"
                        ><v-img
                          contain
                          :height="windowSize.y - 130"
                          :max-width="windowSize.x / 2 + 'px'"
                          :max-height="windowSize.y / 2 + 'px'"
                          :src="violinGene"
                        ></v-img
                      ></v-col>
                      <v-col cols="6"
                        ><v-img
                          contain
                          :height="windowSize.y - 130"
                          :max-width="windowSize.x / 2 + 'px'"
                          :max-height="windowSize.y / 2 + 'px'"
                          :src="featureGene"
                        ></v-img
                      ></v-col>
                    </v-row> </grid-item
                ></v-card>
                <enrichment-table
                  :genes="deResult"
                  :x="layout[3].x"
                  :y="layout[3].y"
                  :w="layout[3].w"
                  :h="layout[3].h"
                  :i="layout[3].i"
                ></enrichment-table>
                <div v-if="jobid === 'example'">
                  <coverage-plot
                    :genes="genes"
                    :x="layout[4].x"
                    :y="layout[4].y"
                    :w="layout[4].w"
                    :h="layout[4].h"
                    :i="layout[4].i"
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
import _ from 'lodash'
import ResizeImage from '~/components/utils/ResizeImage'
import EnrichmentTable from '~/components/tables/EnrichmentTable'
import CoveragePlot from '~/components/utils/CoveragePlot'

import ApiService from '~/services/ApiService.js'

export default {
  components: {
    scatter: ResizeImage,
    'enrichment-table': EnrichmentTable,
    'coverage-plot': CoveragePlot,
  },
  props: {
    type: { type: String, required: true, default: 'single_rna' },
  },
  data: () => ({
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
        w: 2,
        h: 2,
        i: '1',
        title: 'Differential gene expression',
      },
      {
        x: 0,
        y: 2,
        w: 4,
        h: 2,
        i: '2',
        title: 'Plotting genes',
      },
      {
        x: 4,
        y: 2,
        w: 2,
        h: 2,
        i: '3',
      },
      {
        x: 0,
        y: 4,
        w: 2,
        h: 2,
        i: '4',
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
    enrichHeaders: [
      { text: 'Index', value: 'index' },
      { text: 'Name', value: 'name' },
      { text: 'Adjusted p-value', value: 'adjPvalue' },
      { text: 'Odds ratio', value: 'odd' },
      { text: 'Combined score', value: 'score' },
      { text: '', value: 'data-table-expand' },
    ],
    expandedKegg: [],
    title: '',
    panel: [0],
    nPCs: '20',
    resolution: '0.5',
    neighbor: '20',
    timeElapsed: 0,
    qcResult: null,
    umapCluster: '',
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
    currentIdent: '',
    currentIdentMerge: [],
    currentIdentLevels: [],
    currentEmbedding: 'umap.rna',
    allEmbeddings: ['pca', 'umap.rna', 'umap.atac', 'HGT'],
    currentAssay: '',
    allAssays: ['RNA', 'SCT', 'ATAC', 'MAESTRO', 'GAS'],
    currentAtlas: '',
    reductionSelect: 'PCA',
    reductionMethods: ['PCA'],
    integrationSelect: 'Velocity weighted method',
    integrationMethods: ['Velocity weighted method', 'Seurat-WNN'],
    clusteringSelect: 'Louvain',
    clusteringMethods: ['Louvain', 'K-means'],
    atlas: [
      'Mouse brain atlas, 160k cells (Zeisel et.al., 2018)',
      'to-be-added',
    ],
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
    umapStatic: '',
    // Renameing
    oldClusterName: '',
    newClusterName: '',
    // DEG
    ident1: 1,
    ident2: 2,
    minPct: 0.2,
    minLfc: 0.4,
    deResult: [],
    deg: [],
    degAssay: 'RNA',
    degPvalue: 0.05,
    degPvalueList: [0.01, 0.05, 0.1],
    // Gene plots
    plotGeneSymbol: '',
    plotGeneAssay: '',
    violinSplit: 'Sex',
    violinGroup: 'seurat_clusters',
    windowSize: {
      x: 700,
      y: 700,
    },
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

      this.umapStatic = await ApiService.postCommand(
        'deepmaps/api/queue/umap-static/',
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

      this.umapStatic = await ApiService.postCommand(
        'deepmaps/api/queue/umap-static/',
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

      this.umapStatic = await ApiService.postCommand(
        'deepmaps/api/queue/umap-static/',
        {
          categoryName: this.currentIdent,
        }
      )
    },
    async runCellCluster() {
      this.$nuxt.$loading.start()
      this.$notifier.showMessage({
        content: 'Running clustering... Estimate time: 3 mins',
        color: 'accent',
        timeout: 70000,
      })
      this.clusterResult = await ApiService.postCommand(
        'deepmaps/api/queue/cluster-multiome/',
        {
          method: 'HGT',
          nPCs: this.nPCs,
          resolution: this.resolution,
          neighbor: this.neighbor,
        }
      )

      // this.currentIdent = ['hgt_cluster']

      this.currentIdentLevels = await ApiService.postCommand(
        'deepmaps/api/queue/set-idents/',
        {
          name: this.currentIdent,
        }
      )

      this.umapCluster = await ApiService.postCommand(
        'deepmaps/api/queue/umap-cluster/'
      )

      this.umapStatic = await ApiService.postCommand(
        'deepmaps/api/queue/umap-static/',
        {
          categoryName: 'hgt_cluster',
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
            content: 'Calculate QC metrics error: ' + error,
            color: 'error',
          })
        })

      await this.$axios
        .post('deepmaps/api/queue/umap-static/', {
          categoryName: this.setExistingCategory,
        })
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

      await this.$axios
        .post('deepmaps/api/queue/umap-static/', {
          categoryName: this.currentIdent,
        })
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

      await this.$axios
        .post('deepmaps/api/queue/umap-static/', {
          categoryName: this.currentIdent,
        })
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
      return 1
    },

    async runDeg() {
      this.deResult = []
      await this.$axios
        .post('deepmaps/api/queue/deg/', {
          ident1: this.ident1,
          ident2: this.ident2,
          min_pct: this.minPct,
          min_lfc: this.minLfc,
          assay: this.degAssay,
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
                  this.deg = _.map(this.deResult, 'gene')
                  this.$notifier.showMessage({
                    content: 'Running DE testing...',
                    color: 'accent',
                  })

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
            content: 'Calculate QC metrics error: ' + error,
            color: 'error',
          })
        })
      this.$notifier.showMessage({
        content: 'Running DE testing...',
        color: 'accent',
      })
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
      this.umapStatic = await ApiService.postCommand(
        'deepmaps/api/queue/umap-static/',
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
    resetAddMetadata() {
      console.log(' ~ file: CellCluster.vue ~ line 944 ~ resetAddMetadata ~ ')
    },
  },
}
</script>
