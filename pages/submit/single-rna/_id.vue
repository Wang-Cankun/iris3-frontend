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
        <v-stepper-step :complete="e1 > 3" step="3"
          >Network construction</v-stepper-step
        >
      </v-stepper-header>
      <project-info :jobid="jobid" :type="type"></project-info>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row>
            <v-col class="mb-2" cols="12">
              <v-tabs v-model="qcTab" color="primary" slider-color="purple">
                <v-tab title font-weight-bold text-center>scRNA-seq data</v-tab>
              </v-tabs>
              <v-tabs-items v-model="qcTab">
                <v-tab-item
                  ><qc-form
                    :idx="0"
                    type="single_rna"
                    :jobid="jobid"
                  ></qc-form> </v-tab-item
              ></v-tabs-items>
            </v-col>
          </v-row>
          <v-btn color="primary" @click="afterPage(2)"> Continue </v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-row
            ><cell-cluster-form
              type="single_rna"
              :jobid="jobid"
            ></cell-cluster-form
          ></v-row>
          <v-btn color="primary" @click="afterPage(3)"> Continue </v-btn>
          <v-btn text @click="beforePage(1)">Previous</v-btn>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-row><network-form :jobid="jobid"></network-form></v-row>
          <v-btn text @click="beforePage(2)">Previous</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import QualityCheck from '@/components/forms/QualityCheckRna.vue'
import CellCluster from '@/components/forms/CellCluster.vue'
import NetworkConstruction from '~/components/forms/NetworkConstruction.vue'
import ProjectInfo from '~/components/forms/ProjectInfo'

export default {
  components: {
    'qc-form': QualityCheck,
    'cell-cluster-form': CellCluster,
    'network-form': NetworkConstruction,
    'project-info': ProjectInfo,
  },
  data() {
    return {
      e1: 1,
      qcTab: null,
      type: 'singleRna',
    }
  },
  computed: {
    jobid() {
      return this.$route.params.id
    },
  },
  methods: {
    beforePage(page) {
      this.e1 = page
      this.$store.dispatch('calc/updateFlag', 1)
      this.$store.dispatch('calc/updateFlag', 2)
    },
    afterPage(page) {
      const uniqueFlag = new Set(this.flag).size
      console.log(page)
      if (uniqueFlag >= 1) {
        this.e1 = page
        this.$store.dispatch('calc/resetFlag')
      } else if (page === 2) {
        this.$notifier.showMessage({
          content: 'Please run quality control',
          color: 'error',
        })
      } else if (page === 3) {
        this.$notifier.showMessage({
          content: 'Please run cell clustering',
          color: 'error',
        })
      }
    },
  },
}
</script>
