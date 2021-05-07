<template>
  <div>
    <v-btn @click="run">Plot</v-btn>
    <v-select
      v-model="currentIdent"
      :items="IdentList"
      label="Ident"
      dense
      @change="run"
    ></v-select>
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
      <div v-if="res1"></div>
      <feature-scatter
        title="cluster"
        :x="layout[0].x"
        :y="layout[0].y"
        :w="layout[0].w"
        :h="layout[0].h"
        :i="layout[0].i"
        :src="res1"
      ></feature-scatter>
    </grid-layout>
    {{ res1 }}
  </div>
</template>

<script>
import FeatureScatter from '@/components/figures/FeatureScatter'
import res from 'static/json/cluster_res.json'
import ApiService from '~/services/ApiService.js'

export default {
  components: {
    'feature-scatter': FeatureScatter,
  },
  data() {
    return {
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
      ],
      result: '',
      res1: { axis: [0, 1], legend: [0, 1], dimension: 1 },
      currentIdent: 'seurat_clusters',
      IdentList: ['seurat_clusters', 'Sex', 'Label'],
    }
  },
  computed: {},
  methods: {
    async run() {
      console.log(res)
      this.res1 = await ApiService.postCommand(
        'deepmaps/api/queue/feature-coords/',
        {
          gene: 'Gad1',
          assay: 'RNA',
        }
      )
      console.log(this.res1)
    },
  },
}
</script>

<style lang="scss" scoped></style>
