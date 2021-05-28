<template>
  <div>
    <v-stepper v-model="e1" non-linear>
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1"
          >Quality control</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 2" step="2"
          >Cell clustering</v-stepper-step
        >
        <v-divider></v-divider>
        <v-stepper-step :complete="e1 > 3" step="3" text-center
          >Network construction</v-stepper-step
        >
      </v-stepper-header>
      <project-info :jobid="jobid" :type="type"></project-info>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row>
            <v-col class="mb-2" cols="12">
              <v-tabs v-model="qcTab" color="primary" slider-color="purple">
                <v-tab title font-weight-bold text-center
                  >scRNA-seq dataset
                </v-tab>
                <v-tab title font-weight-bold text-center
                  >scATAC-seq dataset
                </v-tab>
              </v-tabs>
              <v-tabs-items v-model="qcTab">
                <v-tab-item
                  ><qc-rna :idx="1" :type="`multiome`" :jobid="jobid"></qc-rna>
                </v-tab-item>
                <v-tab-item
                  ><qc-atac
                    :idx="2"
                    :type="`multiome`"
                    :jobid="jobid"
                  ></qc-atac> </v-tab-item
              ></v-tabs-items>
            </v-col>
          </v-row>
          <v-btn color="primary" @click="changePage(2)"> Continue </v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-row
            ><cell-cluster-form
              :type="`multiome`"
              :jobid="jobid"
            ></cell-cluster-form
          ></v-row>
          <v-btn color="primary" @click="changePage(3)"> Continue </v-btn>
          <v-btn text @click="changePage(1)">Previous</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3"
          ><v-row><network-form></network-form></v-row>
          <v-btn text @click="changePage(2)">Previous</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import QualityCheckRna from '@/components/forms/QualityCheckRna.vue'
import QualityCheckAtac from '@/components/forms/QualityCheckAtac.vue'
import CellCluster from '@/components/forms/CellClusterMultiome.vue'

import NetworkConstruction from '~/components/forms/NetworkConstruction.vue'
import ProjectInfo from '~/components/forms/ProjectInfo'

export default {
  components: {
    'qc-rna': QualityCheckRna,
    'qc-atac': QualityCheckAtac,
    'cell-cluster-form': CellCluster,
    'network-form': NetworkConstruction,
    'project-info': ProjectInfo,
  },
  data() {
    return {
      e1: 1,
      qcTab: null,
      type: 'multiome',
    }
  },
  computed: {
    ...mapState({
      flag: (state) => state.calc.flag,
    }),
    jobid() {
      return this.$route.params.id
    },
  },
  watch: {
    e1() {
      console.log(this.e1)
    },
  },
  methods: {
    changePage(page) {
      if (this.flag === true) {
        console.log(page)
        this.e1 = page
        this.$store.dispatch('calc/updateFlag', true)
      } else {
        this.$notifier.showMessage({
          content: 'Please calculate first',
          color: 'error',
        })
      }
    },
  },
}
</script>
