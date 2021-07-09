<template>
  <div height="100%">
    <v-btn @click="loadGram">open</v-btn>
    <v-row>
      <v-col cols="4">
        <div id="ana"></div>
      </v-col>
      <v-col cols="8">
        <v-row>
          <v-col cols="3"
            ><v-select
              v-model="selectedSpecies"
              label="Species"
              :items="allSpecies"
              placeholder="Name"
              class="px-1"
            ></v-select
          ></v-col>
          <v-col cols="3">{{ selectedIds }}</v-col>
          <v-col cols="3"></v-col>
          <v-col cols="3"></v-col>
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
    allSpecies() {
      // return [...new Set(metadata.map((item) => item.species))]
      return [
        { name: 'Human', value: 'homo_sapiens' },
        { name: 'Mouse', value: 'mus_musculus' },
      ]
    },
    allIds() {
      return [...new Set(metadata.map((item) => item.ids).flat())]
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
  methods: {
    mouseIn(id) {
      console.log('in', id)
    },
    mouseOut(id) {
      console.log('out', id)
    },
    mouseClick(id) {
      this.selectedIds = xor(this.selectedIds, id)
      console.log('click', id)
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
  },
}
</script>

<style lang="scss" scoped></style>
