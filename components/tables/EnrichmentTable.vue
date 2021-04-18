<template>
  <v-card class="ma-0"
    ><grid-item :w="w" :h="h" :x="x" :y="y" :i="i" class="grid-item-border">
      <v-card-title class="primary white--text caption px-2 py-1"
        >Gene set enrichment analysis<v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-download-outline</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="downloadTable">
              <download-excel class="mr-4" :data="gseaResult" type="csv">
                <v-list-item-title>Download file (CSV)</v-list-item-title>
              </download-excel>
            </v-list-item>
          </v-list>
        </v-menu></v-card-title
      >
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            v-model="gseaDatabase"
            class="ml-4"
            :items="allGseaDatabases"
            label="MSigDB database"
            return-object
            item-text="name"
            item-value="value"
          >
          </v-autocomplete> </v-col
      ></v-row>

      <v-row justify="center" class="mx-2 mb-2 mt-0">
        <v-btn
          class="mx-2 mb-2 mt-0"
          color="Primary"
          width="200"
          @click="runGSEA()"
          >Run</v-btn
        >
      </v-row>
      <div v-if="gseaResult.length">
        <v-data-table
          dense
          :headers="gseaHeaders"
          :items="gseaResult[0]"
          item-key="name"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </div> </grid-item
  ></v-card>
</template>

<script>
import ApiService from '~/services/ApiService.js'

export default {
  props: {
    genes: { type: Array, required: true },
    w: { type: Number, required: true, default: 2 },
    h: { type: Number, required: true, default: 2 },
    x: { type: Number, required: true, default: 0 },
    y: { type: Number, required: true, default: 0 },
    i: { type: String, required: true, default: '0' },
  },
  data() {
    return {
      gseaHeaders: [
        { text: 'pathway', value: 'pathway' },
        { text: 'Adjusted p-value', value: 'padj' },
        { text: 'NES', value: 'NES' },
        { text: 'size', value: 'size' },
        { text: '', value: 'data-table-expand' },
      ],
      gseaResult: [],
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
    }
  },

  methods: {
    downloadTable() {
      this.$notifier.showMessage({
        content: 'Downloading enrichment result...',
        color: 'Success',
      })
    },
    async runGSEA() {
      if (!this.genes.length) {
        this.$notifier.showMessage({
          content: 'No genes selected!',
          color: 'error',
        })
      } else {
        this.$notifier.showMessage({
          content: 'Running GSEA...',
          color: 'accent',
        })
        this.gseaResult = await ApiService.postCommand(
          'deepmaps/api/queue/gsea-table/',
          {
            genes: this.genes,
            database: this.gseaDatabase.value,
          }
        )
        console.log(this.gseaResult)
      }
    },
    resizeEvent(i, newH, newW, newHPx, newWPx) {
      console.log(
        'RESIZE i=' +
          i +
          ', H=' +
          newH +
          ', W=' +
          newW +
          ', H(px)=' +
          newHPx +
          ', W(px)=' +
          newWPx
      )
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
