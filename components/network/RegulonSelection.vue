<template>
  <div>
    <p>Show network based on selected regulons:</p>
    <v-select
      v-model="selected"
      :items="all"
      item-text="value"
      item-value="value"
      label="2. Select regulons"
      return-object
      multiple
      ><template v-slot:selection="{ item, index }">
        <v-chip v-show="index === 0">
          <span>{{ item }}</span>
        </v-chip>
        <span v-show="index === 1" class="grey--text caption">
          (+{{ selected.length - 1 }} others)
        </span>
      </template>
      <template v-slot:prepend-item>
        <v-list-item ripple @click="toggleSelect">
          <v-list-item-action>
            <v-icon :color="all.length > 0 ? 'indigo darken-4' : ''">
              {{ iconSelect() }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Select All </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-2"></v-divider> </template
    ></v-select>

    <div v-show="true">
      <v-range-slider
        v-model="centralityThres"
        :max="centralityMinMax[1]"
        :min="centralityMinMax[0]"
        step="0.05"
        thumb-label
        label="Filter regulons by centrality"
        @change="updateSelectedByCentrality"
      ></v-range-slider>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    regulonList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: [],
      centralityThres: [0.2, 0.8],
    }
  },
  computed: {
    centralityMinMax() {
      let min = Math.min(...this.regulonList.map((i) => i.centrality))
      let max = Math.max(...this.regulonList.map((i) => i.centrality))
      if (min === -Infinity) {
        min = 0
      }
      if (max === Infinity) {
        max = 1
      }
      console.log(this.regulonList)
      return [0, 1]
    },

    all() {
      return this.regulonList.map((i) => i.tf)
    },
    topNumber: {
      get() {
        return this.selected.length
      },
      set(val) {
        this.selected = this.all.slice(0, val)
      },
    },
  },
  watch: {
    selected() {
      this.$emit('update:selected', this.selected)
    },
  },
  mounted() {
    // this.updateSelectedByCentrality()
    setTimeout(
      () =>
        (this.selected =
          this.all.length > 10 ? this.all.slice(0, 5) : this.all),
      600
    )
  },
  methods: {
    iconSelect() {
      if (this.isSelectAll()) return 'mdi-close-box'
      if (this.isSelectSome()) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    isSelectAll() {
      return this.selected.length === this.all.length
    },
    isSelectSome() {
      return this.selected.length > 0 && !this.isSelectAll()
    },
    toggleSelect() {
      this.$nextTick(() => {
        if (this.selected.length > 0) {
          this.selected = []
        } else {
          this.selected = this.all
        }
      })
    },
    updateSelectedByIndex() {
      this.selected = this.all.slice(0, this.topNumber)
    },
    updateSelectedByCentrality() {
      this.selected = this.regulonList
        .filter(
          (item) =>
            item.centrality > this.centralityThres[0] &&
            item.centrality < this.centralityThres[1]
        )
        .map((item) => item.tf)
    },
  },
}
</script>

<style lang="scss" scoped></style>
