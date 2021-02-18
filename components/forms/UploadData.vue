<template>
  <v-col class="mb-2" cols="12">
    <v-form ref="form" v-model="valid" lazy-validation>
      <!-- Title  -->

      <v-col cols="12">
        <v-row justify="space-between">
          <p class="title">Project title</p>
          <v-spacer></v-spacer>
          <v-switch
            v-model="isPrivateProject"
            :label="isPrivateProject ? 'Private project' : 'Public project'"
          ></v-switch>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon color="primary" dark v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <p>Public project: anyone can access project through Job ID.</p>
            <p>Private project: project is only avaiable with shared users.</p>
          </v-tooltip>
        </v-row>
      </v-col>
      <v-text-field
        v-model="title"
        :rules="rules"
        counter="25"
        label="Title:"
        outlined
        required
      ></v-text-field>
      <v-col cols="12">
        <v-row>
          <p class="title mt-4">Upload data</p>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon color="primary" dark v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            A gene expression file with genes as rows and cells as columns.
            Users can provide normalized or non-normalized file (Read counts)
            for the submission. Accept txt, csv, and tsv format for text gene
            expression matrix, 10X hdf5 or gene-barcode matrices.
          </v-tooltip>
        </v-row>
      </v-col>
      <v-col cols="3" class="">
        <v-row
          ><v-select
            v-model="speciesSelect"
            :items="species"
            label="Select species:"
            :rules="fileRules"
            required
          ></v-select>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon color="primary" dark v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            Specify the species belonging to your gene expression matrix.
          </v-tooltip></v-row
        >
      </v-col>
      <v-tabs v-model="tab" background-color="white" grow>
        <v-tab>scRNA-Seq data </v-tab>
        <v-tab>Multiple scRNA-Seq data </v-tab>
        <v-tab>scRNA-Seq & scATAC-seq data </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-file-input
            v-model="expFile[0]"
            color="primary"
            counter
            chips
            :rules="fileRules"
            label="Click to upload (txt, tsv, csv)"
            prepend-icon="mdi-paperclip"
            outlined
            required
            class="mt-5"
          ></v-file-input>
          <v-col cols="3" class="ma-0 pa-0"
            ><v-menu close-on-click>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on"> Example </v-btn>
              </template>
              <v-list>
                <v-list-item @click="loadExample">
                  <v-list-item-title>{{
                    singleExample[0].item
                  }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <a
                      class="text-decoration-none"
                      :href="singleExample[1].link"
                    >
                      {{ singleExample[1].item }}</a
                    ></v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <a
                      class="text-decoration-none"
                      :href="singleExample[2].link"
                    >
                      {{ singleExample[2].item }}</a
                    ></v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="12"
            ><v-row>
              <p class="title mt-4">Upload metadata (Optional)</p>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon color="primary" dark v-on="on"
                    >mdi-help-circle-outline</v-icon
                  >
                </template>
                <p>
                  Provide cell labels for regulon identification (Cell label
                  should be at least two factors).
                </p>
                <p>
                  This file contains two columns: cell names and cell labels.
                  Regulons will be predicted based on the provided cell labels.
                </p>
              </v-tooltip></v-row
            ></v-col
          >
          <v-file-input
            v-model="labelFile"
            color="primary"
            counter
            chips
            label="Click to upload (txt, tsv, csv)"
            prepend-icon="mdi-paperclip"
            outlined
          ></v-file-input>
          <v-col cols="12"
            ><v-row>
              <p class="title mt-4">Upload BAM file (Optional)</p>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon color="primary" dark v-on="on"
                    >mdi-help-circle-outline</v-icon
                  >
                </template>
                <p>Provide BAM files for RNA velocity.</p>
                <p>BAM files are used to calculate RNA velocity.</p>
              </v-tooltip></v-row
            ></v-col
          >
          <v-file-input
            v-model="labelFile"
            color="primary"
            counter
            chips
            label="Click to upload (.bam)"
            prepend-icon="mdi-paperclip"
            outlined
          ></v-file-input>
        </v-tab-item>
        <v-tab-item>
          <p class="title ma-0">Upload scRNA-seq data</p>
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
              required
              multiple
            ></v-file-input>
          </div>
          <v-btn @click="addMultipleDataset">Add a row</v-btn>
          <v-btn @click="removeMultipleDataset">Remove a row</v-btn>

          <p class="title">Upload metadata (Optional)</p>

          <v-file-input
            v-model="labelFile"
            color="primary"
            counter
            chips
            label="Click to upload (txt, tsv, csv)"
            prepend-icon="mdi-paperclip"
            outlined
          ></v-file-input>
          <v-col cols="12"
            ><v-row>
              <p class="title mt-4">Upload BAM file (Optional)</p>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon color="primary" dark v-on="on"
                    >mdi-help-circle-outline</v-icon
                  >
                </template>
                <p>Provide BAM files for RNA velocity.</p>
                <p>BAM files are used to calculate RNA velocity.</p>
              </v-tooltip></v-row
            ></v-col
          >
          <v-file-input
            v-model="labelFile"
            color="primary"
            counter
            chips
            label="Click to upload (.bam)"
            prepend-icon="mdi-paperclip"
            outlined
          ></v-file-input>
        </v-tab-item>
        <v-tab-item>
          <p class="title ma-0">
            Upload scRNA-seq and scATAC-seq data: 10x multiome
          </p>
          <v-file-input
            v-model="expFile[0]"
            color="primary"
            counter
            chips
            :rules="fileRules"
            label="Upload count matrix (.h5)"
            prepend-icon="mdi-paperclip"
            outlined
            required
          ></v-file-input>
          <v-file-input
            v-model="expFile[1]"
            color="primary"
            counter
            chips
            :rules="fileRules"
            label="Upload ATAC fragment file (.tsv.gz)"
            prepend-icon="mdi-paperclip"
            outlined
            required
          ></v-file-input>
          <v-file-input
            v-model="expFile[2]"
            color="primary"
            counter
            chips
            :rules="fileRules"
            label="Upload ATAC fragment file index (.tsv.gz.tbi)"
            prepend-icon="mdi-paperclip"
            outlined
            required
          ></v-file-input>
          <v-col cols="12"
            ><v-row>
              <p class="title mt-4">Upload BAM file (Optional)</p>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon color="primary" dark v-on="on"
                    >mdi-help-circle-outline</v-icon
                  >
                </template>
                <p>Provide BAM files for RNA velocity.</p>
                <p>BAM files are used to calculate RNA velocity.</p>
              </v-tooltip></v-row
            ></v-col
          >
          <v-file-input
            v-model="labelFile"
            color="primary"
            counter
            chips
            label="Click to upload (.bam)"
            prepend-icon="mdi-paperclip"
            outlined
          ></v-file-input>
          <v-col cols="3" class="ma-0 pa-0"
            ><v-menu close-on-click>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on"> Example </v-btn>
              </template>
              <v-list>
                <v-list-item @click="loadMultiomeExample">
                  <v-list-item-title>{{
                    multiomeExample[0].item
                  }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <a
                      class="text-decoration-none"
                      :href="singleExample[1].link"
                    >
                      {{ multiomeExample[1].item }}</a
                    ></v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <a
                      class="text-decoration-none"
                      :href="multiomeExample[2].link"
                    >
                      {{ multiomeExample[2].item }}</a
                    ></v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <a
                      class="text-decoration-none"
                      :href="multiomeExample[3].link"
                    >
                      {{ multiomeExample[3].item }}</a
                    ></v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-tab-item>
      </v-tabs-items>

      <v-col cols="12"
        ><v-row>
          <p class="title mt-4">Project description (Optional)</p>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon color="primary" dark v-on="on"
                >mdi-help-circle-outline</v-icon
              >
            </template>
            <p>Set descripting here</p>
          </v-tooltip></v-row
        ></v-col
      >
      <v-textarea v-model="description" outlined label="Description:" clearable>
      </v-textarea>
    </v-form>

    <v-col cols="12"
      ><v-row>
        <p class="title mt-4">Email (Optional)</p>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon color="primary" dark v-on="on"
              >mdi-help-circle-outline</v-icon
            >
          </template>
          <p>
            The running time usually takes a few hours, and can be more than 10
            hours if there are more than 5000 cells in your data.
          </p>
          <p>
            Hence, we strongly recommend you to leave your email, and you will
            be notified by email when the job is done.
          </p>
        </v-tooltip></v-row
      ></v-col
    >

    <v-text-field
      v-model="email"
      outlined
      label="E-mail"
      hint="Optional: You will be notified by email when the job is done."
      persistent-hint
    ></v-text-field>
    <v-row justify="center">
      <v-btn color="Primary" width="300" rounded @click="submit()"
        >Create project</v-btn
      >
    </v-row>
  </v-col>
</template>

<script>
import FormData from 'form-data'
function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

export default {
  data: () => ({
    title: '',
    isPrivateProject: true,
    tab: null,
    jobid: '',
    valid: true,
    form: {},
    expFile: [],
    labelFile: null,
    species: ['Human', 'Mouse'],
    speciesSelect: '',
    singleExample: [
      { item: 'Load example (Zeisel et al, 2015)' },
      {
        item: 'Download gene expression matrix (Zeisel et al, 2015) ',
        link: 'https://bmbl.bmi.osumc.edu/iris3/storage/Zeisel_expression.csv',
      },
      {
        item: 'Download cell label file (Zeisel et al, 2015)',
        link: 'https://bmbl.bmi.osumc.edu/iris3/storage/Zeisel_index_label.csv',
      },
    ],
    multiomeExample: [
      { item: 'Load example (10X Human PBMC)' },
      {
        item: 'Download 10X Human PBMC count matrix ',
        link:
          'https://cf.10xgenomics.com/samples/cell-arc/1.0.0/pbmc_granulocyte_sorted_10k/pbmc_granulocyte_sorted_10k_filtered_feature_bc_matrix.h5',
      },
      {
        item: 'Download 10X Human PBMC ATAC fragment file ',
        link:
          'https://cf.10xgenomics.com/samples/cell-arc/1.0.0/pbmc_granulocyte_sorted_10k/pbmc_granulocyte_sorted_10k_atac_fragments.tsv.gz',
      },
      {
        item: 'Download 10X Human PBMC ATAC fragment file index',
        link:
          'https://cf.10xgenomics.com/samples/cell-arc/1.0.0/pbmc_granulocyte_sorted_10k/pbmc_granulocyte_sorted_10k_atac_fragments.tsv.gz',
      },
    ],
    email: '',
    description: '',
    multipleDatasetsLength: 1,
    rules: [
      (v) =>
        (v && v.length <= 50) ||
        'Project tiile is required (Max 50 characters)',
    ],
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
    loadExample() {
      this.multipleDatasetsLength = 1
      this.expFile = []
      this.expFile[0] = dataURLtoFile(
        'data:text/plain;base64,aGVsbG8gd29ybGQ=',
        'Zeisel et al. 2015.'
      )
      this.labelFile = dataURLtoFile(
        'data:text/plain;base64,aGVsbG8gd29ybGQ=',
        'Zeisel et al. 2015.'
      )
      this.speciesSelect = 'Mouse'
      this.title = 'Example data (Zeisel et al. 2015.)'
      this.$notifier.showMessage({
        content: 'Example dataset loaded: Zeisel et al. 2015.',
        color: 'success',
      })
    },
    loadMultiomeExample() {
      this.multipleDatasetsLength = 1
      this.expFile = []
      this.expFile[0] = dataURLtoFile(
        'data:text/plain;base64,aGVsbG8gd29ybGQ=',
        'PBMC count matrix'
      )
      this.expFile[1] = dataURLtoFile(
        'data:text/plain;base64,aGVsbG8gd29ybGQ=',
        'ATAC fragment'
      )
      this.expFile[2] = dataURLtoFile(
        'data:text/plain;base64,aGVsbG8gd29ybGQ=',
        'ATAC fragment index'
      )
      this.speciesSelect = 'Human'
      this.title = '10x Genomics for human PBMCs'
      this.$notifier.showMessage({
        content: 'Example dataset loaded: 10x Genomics for human PBMCs',
        color: 'success',
      })
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async submit() {
      if (!this.$refs.form.validate()) return
      this.dialog = true
      this.uploadStatus = 'Uploading ...'
      const formData = new FormData()
      this.jobid = new Date().getTime()
      this.$store.commit('SET_JOBID', this.jobid)
      formData.append('method', 'post')
      formData.append('name', 'list')
      formData.append('title', this.title)
      formData.append('email', this.email)
      formData.append('jobid', this.jobid)
      formData.append('species', this.speciesSelect)
      formData.append('description', this.description)
      formData.append('expFile', this.expFile[0][0])
      formData.append('labelFile', this.labelFile)
      formData.append('status', 'upload')
      this.$notifier.showMessage({
        content: 'Uploading data...',
        color: 'accent',
      })

      const uploadRes = await this.$axios.post(
        'iris3/api/queue/upload/',
        formData,
        {
          headers: {
            'Content-Type':
              'multipart/form-data; boundary=<calculated when request is sent>',
          },
        }
      )
      if (uploadRes) {
        setTimeout(() => {
          this.$notifier.showMessage({
            content: 'Jobid: ' + this.jobid + ' Upload success!',
            color: 'success',
          })
          if (this.title === '10x Genomics for human PBMCs') {
            this.$router.push({
              path: '/submit/multiome',
            })
          } else {
            this.$router.push(`submit/${this.jobid}`)
          }
        }, 3000)
      }
    },
    addMultipleDataset() {
      this.multipleDatasetsLength++
    },
    removeMultipleDataset() {
      if (this.multipleDatasetsLength === 1) return
      this.multipleDatasetsLength--
    },
  },
}
</script>
