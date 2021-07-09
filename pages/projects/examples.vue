<template>
  <div height="100%" class="ma-4">
    <v-row class="my-6 justify-center">
      <v-row class="justify-center">
        <p class="text-h5 font-weight-bold">Examples</p>
      </v-row>
    </v-row>
    <v-row>
      <v-col cols="4">
        <div id="ana"></div>
      </v-col>
      <v-col cols="8">
        <p class="text-h6 font-weight-bold">Filters:</p>
        <v-row>
          <v-col xl="4" lg="6" md="6" sm="12"
            ><v-select
              v-model="selectedSpecies"
              label="Species"
              :items="allSpecies"
              item-text="name"
              item-value="value"
              placeholder="Name"
              class="px-1"
            ></v-select
          ></v-col>
          <v-col xl="4" lg="6" md="6" sm="12"
            ><v-autocomplete
              v-model="selectedIds"
              label="Tissue"
              :items="allIds"
              item-text="name"
              item-value="value"
              placeholder="tissue"
              class="px-1"
              multiple
              ><template v-slot:selection="{ item, index }">
                <v-chip v-show="index === 0">
                  <span>{{ item }}</span>
                </v-chip>
                <span v-show="index === 1" class="grey--text caption">
                  (+{{ selectedIds.length - 1 }} others)
                </span>
              </template>
              <template v-slot:prepend-item>
                <v-list-item ripple @click="toggleSelectIds">
                  <v-list-item-action>
                    <v-icon
                      :color="selectedIds.length > 0 ? 'indigo darken-4' : ''"
                    >
                      {{ iconSelect(selectedIds, allIds) }}
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title> Select All </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider> </template></v-autocomplete
          ></v-col>
        </v-row>
        <p class="text-h6 font-weight-bold">Results:</p>
        <v-row>
          <v-col
            v-for="(data, key) in selectedDatasets"
            :key="key"
            xl="3"
            lg="4"
            md="4"
            sm="6"
          >
            <v-card>
              <v-card-title class="mx-2 justify-center">{{
                data.title
              }}</v-card-title>
              <v-card-text>
                <p class="ma-2">
                  <span class="text--secondary">Type </span>
                  <span class="text--primary">{{ data.type }}</span>
                </p>
                <p class="ma-2">
                  <span class="text--secondary">Species: </span>
                  <span class="text--primary">{{ data.speciesName }}</span>
                </p>
                <p class="ma-2">
                  <span class="text--secondary">Tissue: </span>
                  <span class="text--primary">{{ data.tissueName }}</span>
                </p>
                <p class="ma-2">
                  <span class="text--secondary">Number of cells: </span>
                  <span class="text--primary">{{ data.cells }}</span>
                </p>
                <p class="ma-2">
                  <span class="text--secondary">Create date: </span>
                  <span class="text--primary"> {{ data.createDate }}</span>
                </p>
                <p class="ma-2">
                  <span class="text--secondary">Creator: </span>
                  <span class="text--primary">{{ data.creator }}</span>
                </p>
              </v-card-text>
              <v-card-actions class="mx-2">
                <a class="text-decoration-none" href="submit/single-rna/example"
                  ><v-btn>Browse</v-btn>
                </a>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { xor } from 'lodash'
import { render } from '@ebi-gene-expression-group/anatomogram'
import metadata from '@ebi-gene-expression-group/anatomogram/lib/json/svgsMetadata.json'
const unique = (value, index, self) => self.indexOf(value) === index
export default {
  data() {
    return {
      selectedSpecies: 'homo_sapiens',
      selectedIds: [],
    }
  },
  computed: {
    projectCreateDate() {
      return new Date().toISOString().split('T')[0]
    },
    allSpecies() {
      // return [...new Set(metadata.map((item) => item.species))]
      return [
        { name: 'Human', value: 'homo_sapiens' },
        { name: 'Mouse', value: 'mus_musculus' },
      ]
    },
    allIds() {
      // return [...new Set(metadata.map((item) => item.ids).flat())]
      const new1 = metadata
        .filter((item) => item.species === this.selectedSpecies)
        .map((item) => item.ids)
        .flat()
      new1.push('brain')
      new1.push('blood')
      return new1
    },
    allIds2() {
      // return [...new Set(metadata.map((item) => item.ids).flat())]
      return [
        'UBERON_0000451',
        'UBERON_0000955',
        'brain',
        'UBERON_0001021',
        'UBERON_0000178',
        'blood',
      ]
    },
    allPublicDatasets() {
      return [
        {
          title: 'Mouse brain data (Zeisel, et al. 2015)',
          type: 'Single scRNA-seq dataset',
          tissueName: 'Brain',
          tissueId: ['UBERON_0000451', 'UBERON_0000955', 'brain'],
          speciesId: 'mus_musculus',
          speciesName: 'Mouse',
          cells: '3005',
          createDate: this.projectCreateDate,
          creator: 'admin',
        },
        {
          title: 'Human IFNB-Stimulated and Control PBMCs',
          type: 'Multiple scRNA-seq dataset',
          tissueName: 'blood',
          tissueId: ['UBERON_0001021', 'UBERON_0000178', 'blood'],
          speciesId: 'homo_sapiens',
          speciesName: 'human',
          cells: '3000',
          createDate: this.projectCreateDate,
          creator: 'admin',
        },
        {
          title: '10X Multiome Human PBMC granulocyte 3k cells',
          type: 'scRNA-seq and scATAC-seq',
          tissueName: 'blood',
          tissueId: ['UBERON_0001021', 'UBERON_0000178', 'blood'],
          speciesId: 'homo_sapiens',
          speciesName: 'human',
          cells: '3000',
          createDate: this.projectCreateDate,
          creator: 'admin',
        },
      ]
    },
    selectedDatasets() {
      return this.allPublicDatasets.filter(
        (item) =>
          item.speciesId === this.selectedSpecies &&
          this.selectedIds.some((id) => item.tissueId.includes(id))
      )
    },
  },
  watch: {
    selectedSpecies() {
      this.loadGram()
    },
    selectedIds() {
      this.loadGram()
    },
  },
  mounted() {
    this.selectedIds = this.allIds
    this.loadGram()
  },
  methods: {
    mouseIn(id) {
      // console.log('in', id)
    },
    mouseOut(id) {
      // console.log('out', id)
    },
    mouseClick(id) {
      this.selectedIds = xor(this.selectedIds, id)
      // console.log('click', id)
    },

    getAllIds(species) {
      metadata
        .filter((svgMetadata) => svgMetadata.species === species)
        .reduce((acc, svgMetadata) => acc.concat(svgMetadata.ids), [])
        .filter(unique)
        .sort()
    },

    loadGram() {
      const options = {
        species: this.selectedSpecies,
        atlasUrl: 'localhost',
        showIds: this.allIds,
        selectIds: this.selectedIds,
        onMouseOver: this.mouseIn,
        onMouseOut: this.mouseOut,
        onClick: this.mouseClick,
      }
      return render(options, 'ana')
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
    toggleSelectIds() {
      this.$nextTick(() => {
        if (this.selectedIds.length > 0) {
          this.selectedIds = []
        } else {
          this.selectedIds = this.allIds
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
