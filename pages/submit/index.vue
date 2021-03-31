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
          >Regulon prediction</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 3" step="4"
          >Network construction</v-stepper-step
        >
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row>
            <v-col class="mb-2" cols="12">
              <v-tabs v-model="qcTab" color="primary" slider-color="purple">
                <v-tab title font-weight-bold text-center>Sample 1 </v-tab>
                <v-tab v-show="false">Sample 2 </v-tab>
              </v-tabs>
              <v-tabs-items v-model="qcTab">
                <v-tab-item
                  ><qc-form :idx="0" type="single_rna"></qc-form> </v-tab-item
              ></v-tabs-items>
            </v-col>
          </v-row>
          <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-row
            ><cell-cluster-form type="single_rna"></cell-cluster-form
          ></v-row>
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
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import QualityCheck from '@/components/forms/QualityCheckRna.vue'
import CellCluster from '@/components/forms/CellCluster.vue'
import CellAnnotation from '@/components/forms/CellAnnotation.vue'
import CombineRegulon from '@/components/forms/CombineRegulon.vue'
import ProjectInfo from '~/components/forms/ProjectInfo'

export default {
  components: {
    'qc-form': QualityCheck,
    'cell-cluster-form': CellCluster,
    'cell-annotation-form': CellAnnotation,
    'combine-regulon-form': CombineRegulon,
    'project-info': ProjectInfo,
  },
  data() {
    return {
      e1: 1,
      qcTab: null,
    }
  },
}
</script>
