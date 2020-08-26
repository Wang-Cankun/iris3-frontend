<template>
  <v-col cols="3">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-card-text class="grey--text body-1 ma-0 text--darken-3">
          Instructions and file format can be found
          <a class="grey--text text--darken-3" href="/tutorial" target="_blank"
            >here</a
          >.</v-card-text
        >
        <v-col cols="12">
          <p class="title">
            Select analysis type
          </p>
          <v-select
            v-model="analysisSelect"
            :items="analysis"
            label="Analysis type"
            :rules="fileRules"
            required
          ></v-select
        ></v-col>
        <v-col v-if="analysisSelect === analysis[0]" cols="12">
          <div class="my-3">
            <p class="title ma-0">
              Upload scRNA-seq dataset.
            </p>
            <p class="ma-0">Supported format:</p>
            <ol>
              <li>Gene expression matrix (txt, tsv, csv).</li>
              <li>HDF5 feature barcode matrix (hdf5).</li>
              <li>
                Gene-barcode matrices (3 gzip files in your 10X output
                directory).
              </li>
            </ol>
          </div>
          <v-file-input
            v-model="expFile[0]"
            color="primary"
            counter
            chips
            :rules="fileRules"
            label="Upload"
            prepend-icon="mdi-paperclip"
            outlined
            :show-size="1000"
            required
            multiple
          ></v-file-input>
        </v-col>
        <v-col v-else-if="analysisSelect === analysis[1]" cols="12">
          <p class="title ma-0">
            Upload multiple scRNA-seq datasets
          </p>
          <p class="ma-0">Supported format:</p>
          <ol>
            <li>HDF5 feature barcode matrix (hdf5).</li>
            <li>
              Gene-barcode matrices (3 gzip files in your 10X output directory).
            </li>
          </ol>
          <div v-for="(n, i) in multipleDatasetsLength" :key="n">
            <v-file-input
              v-model="expFile[i]"
              color="primary"
              counter
              chips
              :rules="fileRules"
              :label="'Upload sample ' + n"
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
              required
              multiple
            ></v-file-input>
          </div>
          <v-btn @click="addMultipleDataset">Add a row</v-btn>
          <v-btn @click="removeMultipleDataset">Remove a row</v-btn>
        </v-col>
        <v-col v-else-if="analysisSelect === analysis[2]" cols="12">
          <p class="title ma-0">
            Upload scRNA-seq and scATAC-seq data
          </p>
          <p class="ma-0">Supported format:</p>
          <ol>
            <li>HDF5 feature barcode matrix (hdf5).</li>
            <li>
              Gene-barcode matrices (3 gzip files in your 10X output directory).
            </li>
          </ol>
          <v-file-input
            v-model="expFile[0]"
            color="primary"
            counter
            chips
            :rules="fileRules"
            label="Upload scRNA-seq dataset"
            prepend-icon="mdi-paperclip"
            outlined
            :show-size="1000"
            required
            multiple
          ></v-file-input>
          <v-file-input
            v-model="expFile[1]"
            color="primary"
            counter
            chips
            :rules="fileRules"
            label="Upload scATAC-seq dataset"
            prepend-icon="mdi-paperclip"
            outlined
            :show-size="1000"
            required
            multiple
          ></v-file-input>
        </v-col>
        <v-col cols="12">
          <p class="title">
            Select species
          </p>
          <v-select
            v-model="speciesSelect"
            :items="species"
            label="Click to select species"
            :rules="fileRules"
            required
          ></v-select
        ></v-col>
        <v-col cols="12">
          <span class="title">Optional: Upload metadata (txt, tsv, csv). </span>
          <v-file-input
            v-model="labelFile"
            color="primary"
            counter
            :rules="fileRules"
            label="Click to upload"
            prepend-icon="mdi-paperclip"
            outlined
            :show-size="1000"
            required
          ></v-file-input>
        </v-col>
        <v-divider></v-divider>
        <v-col cols="12">
          <v-textarea
            v-model="description"
            outlined
            label="Description:"
            clearable
          >
          </v-textarea>
          <v-text-field
            v-model="email"
            label="E-mail"
            hint="Optional: You will be notified by email when the job is done."
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-card-actions
          ><v-btn color="primary" @click.stop.prevent="submit">
            Submit
          </v-btn>
          <v-btn color="primary" @click="reset">
            Reset
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-col>
</template>

<script>
import FormData from 'form-data'

export default {
  name: 'SubmitPredictionForm',
  data: () => ({
    valid: true,
    allowStorage: false,
    email: '',
    jobid: '',
    form: {},
    expFile: [],
    labelFile: null,
    species: ['Human', 'Mouse'],
    analysis: [
      'Single-sample scRNA-seq',
      'Multiple scRNA-seq datasets integration',
      'scATAC-seq + scRNA-seq integration',
    ],
    analysisSelect: '',
    multipleDatasetsLength: 2,
    description: '',
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
    addMultipleDataset() {
      this.multipleDatasetsLength++
    },
    removeMultipleDataset() {
      this.multipleDatasetsLength--
    },
  },
}
</script>

<style lang="scss" scoped></style>
