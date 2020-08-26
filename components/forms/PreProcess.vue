<template>
  <v-row no-gutters>
    <v-col xs="12" lg="3">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card class="overflow-hidden">
          <v-card-text class="mt-4 grey--text body-1 text--darken-3">
            For more information please visit our
            <a
              class="grey--text text--darken-3"
              href="/tutorial"
              target="_blank"
              >FAQ</a
            >.</v-card-text
          >
          <v-col cols="12"
            ><v-text-field
              v-model="nMitoGenes"
              label="Mitochondrial Fraction"
              hint="The fraction (between 0 and 1) of mitochondrial gene counts in a cell to be included in normalization and clustering analyses. For example, for whole cell scRNA-seq use 0 to 0.2, or for nuclei-seq use 0 to 0.05."
              persistent-hint
            ></v-text-field
          ></v-col>
          <v-col cols="12"
            ><v-switch v-model="isImputation" value="false" right
              ><template v-slot:label>
                <div>
                  Enable imputation
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    Enable imputation step using DrImpute with all default
                    parameters in the pre-processing step. Default: disabled.
                  </v-tooltip>
                </div>
              </template></v-switch
            ><v-switch v-model="isRemoveRibosome" value="false" right
              ><template v-slot:label>
                <div>
                  Remove ribosome genes.
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" dark v-on="on"
                        >mdi-help-circle-outline</v-icon
                      >
                    </template>
                    Determine whether you want to remove ribosome genes in
                    pre-processing step. Default: disabled.
                  </v-tooltip>
                </div>
              </template></v-switch
            ></v-col
          >

          <v-col cols="12"
            ><v-text-field
              v-model="nVariableGenes"
              label="Variable genes"
              hint="The number of variable gene counts in a cell to be included in normalization and clustering analyses. Default is 2000."
              persistent-hint
            ></v-text-field
          ></v-col>
          <v-col cols="12"
            ><v-text-field
              v-model="nPCs"
              label="Number of PCs"
              hint="The number of principle components used. Default: 10."
              persistent-hint
            ></v-text-field
          ></v-col>
          <v-col cols="12"
            ><v-text-field
              v-model="nResolution"
              label="Cell clustering resolution"
              hint="Resolution for clustering in Seurat (form 0-1). Larger number will generate more clusters and smaller number will generate less clusters. Default: 0.8."
              persistent-hint
            ></v-text-field
          ></v-col>

          <v-card-actions
            ><v-btn color="primary" @click.stop.prevent="submit">
              Run
            </v-btn>
            <v-btn color="primary" @click="reset">
              Reset
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import FormData from 'form-data'

export default {
  name: 'PreProcessForm',
  data: () => ({
    form: {},
    isRemoveRibosome: false,
    nPCs: 10,
    nResolution: 0.8,
    isImputation: false,
    nVariableGenes: '2000',
    expFile: null,
    speciesSelect: '',
    nameRules: [
      (v) => !!v || 'Field is required',
      (v) => (v && v.length <= 20) || 'Name must be less than 20 characters',
    ],
    fileRules: [(v) => !!v || 'Field is required'],
    selectRules: [(v) => !!v || 'Control data is required'],
    emailRules: [
      (v) => (/.+@.+\..+/.test(v) && v.length > 0) || 'E-mail must be valid',
    ],
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    submit() {
      if (!this.$refs.form.validate()) return
      this.dialog = true
      this.uploadStatus = 'Uploading ...'
      const formData = new FormData()
      formData.append('method', 'post')
      formData.append('name', 'list')
      formData.append('Content-Type', 'multipart/form-data')
      formData.append('email', this.email)

      // this.form.submit()
    },
    openJob(id) {
      this.$router.push('submit/' + id)
    },
  },
}
</script>

<style lang="scss" scoped></style>
