<template>
  <div>
    <v-col cols="9">
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
        <cell-chat
          :setting="layout[0]"
          :active-ident="currentIdent"
        ></cell-chat>
      </grid-layout>
      {{ res1 }}
    </v-col>
  </div>
</template>

<script>
import CellChatPlot from '@/components/figures/CellChatPlot'
import res from 'static/json/feature_coord.json'
import ApiService from '~/services/ApiService.js'

export default {
  components: {
    'cell-chat': CellChatPlot,
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
      res1: [
        {
          date: '2000',
          value: '208.4968974',
        },
        {
          date: '2000',
          value: '160.5328879',
        },
        {
          date: '2002',
          value: '292.3321976',
        },
        {
          date: '1998',
          value: '95.07969441',
        },
      ],
      currentIdent: 'seurat_clusters',
      IdentList: ['seurat_clusters', 'Sex', 'Label'],
    }
  },
  computed: {},
  methods: {
    async run() {
      console.log(res)
      this.res1 = res
      this.result = await ApiService.postCommand(
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
