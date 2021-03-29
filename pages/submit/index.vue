<template>
  <div>
    <project-info></project-info>
    <v-stepper v-model="e1" alt-labels>
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1"
          >Quality control</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2"
          >Cell clustering</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 3" step="3"
          >Cell annotation</v-stepper-step
        >
        <v-stepper-step :complete="e1 > 3" step="4"
          >Regulon (v1)</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 4" step="5"
          >Regulon (v2)</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 5" step="6">Report</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 6" step="7">Report</v-stepper-step>
        <v-divider></v-divider>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row><qc-form></qc-form></v-row>
          <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-row><cell-cluster-form></cell-cluster-form></v-row>
          <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>
          <v-btn text @click="e1 = 1">Previous</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-row><cell-annotation-form></cell-annotation-form></v-row>
          <v-btn color="primary" @click="e1 = 4"> Continue </v-btn>
          <v-btn text @click="e1 = 1">Previous</v-btn>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-row><combine-regulon-form></combine-regulon-form></v-row>
          <v-btn color="primary" @click="e1 = 5"> Continue </v-btn>
          <v-btn text @click="e1 = 2">Previous</v-btn>
        </v-stepper-content>
        <v-stepper-content step="5">
          <v-row><regulon-form></regulon-form></v-row>
          <v-btn color="primary" @click="e1 = 6"> Continue </v-btn>
          <v-btn text @click="e1 = 3">Previous</v-btn>
        </v-stepper-content>
        <v-stepper-content step="6">
          <v-row></v-row>
          <v-btn color="primary" @click="e1 = 7"> Continue </v-btn>
          <v-btn text @click="e1 = 4">Previous</v-btn>
        </v-stepper-content>
        <v-stepper-content step="7">
          <v-row><regulon-form></regulon-form></v-row>
          <v-btn text @click="e1 = 5">Previous</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import QualityCheck from '@/components/forms/QualityCheck.vue'
import CellCluster from '@/components/forms/CellCluster.vue'
import CellAnnotation from '@/components/forms/CellAnnotation.vue'
import Regulon from '@/components/forms/Regulon.vue'
import CombineRegulon from '@/components/forms/CombineRegulon.vue'
import ProjectInfo from '~/components/forms/ProjectInfo'

export default {
  components: {
    'qc-form': QualityCheck,
    'cell-cluster-form': CellCluster,
    'cell-annotation-form': CellAnnotation,
    'regulon-form': Regulon,
    'combine-regulon-form': CombineRegulon,
    'project-info': ProjectInfo,
  },
  data() {
    return {
      e1: 1,
    }
  },
}
</script>
