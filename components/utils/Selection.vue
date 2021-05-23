<template>
  <div>
    <p class="title-h4">
      Select regulons
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon color="primary" dark v-on="on"
            >mdi-help-circle-outline</v-icon
          >
        </template>
        <p>Select regulons to display</p>
      </v-tooltip>
    </p>
    <v-select
      v-model="selected"
      :items="all"
      item-text="value"
      item-value="value"
      return-object
      single-line
      multiple
      dense
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
      <p class="title-h4">
        Centrality threshold to select regulon
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon color="primary" dark v-on="on"
              >mdi-help-circle-outline</v-icon
            >
          </template>
          <p>TODO</p>
        </v-tooltip>
      </p>
      <v-slider
        v-model="centralityThres"
        :max="centralityMinMax[1]"
        :min="centralityMinMax[0]"
        step="0.05"
        thumb-label="always"
        @change="updateSelectedByCentrality"
      ></v-slider>
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
      centralityThres: 0.5,
    }
  },
  computed: {
    centralityMinMax() {
      const min = Math.min(...this.regulonList.map((i) => i.rss))
      const max = Math.max(...this.regulonList.map((i) => i.rss))
      return [min, max]
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
    const meanCentrality =
      (this.centralityMinMax[0] + this.centralityMinMax[1]) * 0.5
    if (meanCentrality < 0.5 && this.centralityMinMax[1] > 0.5) {
      this.centralityThres = 0.5
    } else {
      this.centralityThres = meanCentrality
    }

    this.updateSelectedByCentrality()
    // this.selected = this.all.length > 10 ? this.all.slice(0, 5) : this.all
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
        .filter((item) => item.rss > this.centralityThres)
        .map((item) => item.tf)
    },
  },
}
</script>

<style lang="scss" scoped></style>
