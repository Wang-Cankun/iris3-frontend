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
        counter="100"
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
      <v-tabs v-model="tab" grow background-color="white">
        <v-tab @click="switchTabs()">scRNA-Seq data </v-tab>
        <v-tab @click="switchTabs()">Multiple scRNA-Seq data </v-tab>
        <v-tab @click="switchTabs()">scRNA-Seq & scATAC-seq data </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-file-input
            v-model="expFile.singleRna[0]"
            color="primary"
            counter
            chips
            :rules="fileRules"
            label="Click to upload (csv, txt, h5)"
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
                <v-list-item @click="loadSingleRnaExample()">
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
              <p class="subtitle mt-4">Upload metadata (Optional)</p>
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
            v-model="labelFile.singleRna"
            color="primary"
            counter
            chips
            label="Click to upload (csv, txt)"
            prepend-icon="mdi-paperclip"
            outlined
          ></v-file-input>
        </v-tab-item>
        <v-tab-item>
          <p class="subtitle ma-0">Upload count matrix</p>
          <div v-for="(n, i) in multipleDatasetsLength" :key="n">
            <v-file-input
              v-model="expFile.multiRna[i]"
              color="primary"
              counter
              chips
              :rules="fileRules"
              :label="'Upload dataset ' + n"
              prepend-icon="mdi-paperclip"
              outlined
              required
              multiple
            ></v-file-input>
          </div>
          <v-btn @click="addMultipleDataset">Add a row</v-btn>
          <v-btn @click="removeMultipleDataset">Remove a row</v-btn>

          <p class="subtitle">Upload metadata (Optional)</p>

          <v-file-input
            v-model="labelFile.multiRna"
            color="primary"
            counter
            chips
            label="Click to upload (csv, txt, h5)"
            prepend-icon="mdi-paperclip"
            outlined
          ></v-file-input>
          <v-col cols="3" class="ma-0 pa-0"
            ><v-menu close-on-click>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on"> Example </v-btn>
              </template>
              <v-list>
                <v-list-item @click="loadMultiRnaExample()">
                  <v-list-item-title>{{
                    multiRnaExample[0].item
                  }}</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <a
                      class="text-decoration-none"
                      :href="multiRnaExample[1].link"
                    >
                      {{ multiRnaExample[1].item }}</a
                    ></v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-tab-item>
        <v-tab-item>
          <p class="subtitle ma-0">Upload scRNA-seq data</p>
          <v-file-input
            v-model="expFile.multiome[0]"
            color="primary"
            counter
            chips
            :rules="fileRules"
            label="Upload count matrix (csv, txt, h5)"
            prepend-icon="mdi-paperclip"
            outlined
            required
          ></v-file-input>
          <p class="subtitle ma-0">Upload scATAC-seq count matrix</p>
          <v-file-input
            v-model="expFile.multiome[1]"
            color="primary"
            counter
            chips
            :rules="fileRules"
            label="Upload ATAC fragment file (csv, txt, h5)"
            prepend-icon="mdi-paperclip"
            outlined
            required
          ></v-file-input>
          <v-col cols="12"
            ><v-row>
              <p class="subtitle mt-4">Upload metadata (Optional)</p>
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
            v-model="labelFile.multiome"
            color="primary"
            counter
            chips
            label="Click to upload (csv, txt)"
            prepend-icon="mdi-paperclip"
            outlined
          ></v-file-input>
          <v-col cols="12"
            ><v-row>
              <p class="subtitle mt-4">Upload scRNA-seq BAM file (Optional)</p>
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
            v-model="bamFile"
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
                <v-list-item @click="loadMultiomeExample()">
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
          <p class="subtitle mt-4">Project description (Optional)</p>
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
        <p class="subtitle mt-4">Email (Optional)</p>
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
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

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
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val
      },
    },
  },

  data: () => ({
    title: '',
    isPrivateProject: true,
    tab: null,
    jobid: '',
    valid: true,
    form: {},
    expFile: {
      singleRna: [],
      multiRna: [],
      multiome: [],
    },
    labelFile: {
      singleRna: null,
      multiRna: null,
      multiome: null,
    },
    bamFile: null,
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
    multiRnaExample: [
      {
        item:
          'Load example (Human IFNB-Stimulated and Control PBMCs, 2800 cells)',
      },
      {
        item: 'Download gene expression matrix and cell label (ifnb_2800.rda)',
        link:
          'https://raw.githubusercontent.com/Wang-Cankun/iris3api/master/data/ifnb_2800.rda',
      },
    ],
    multiomeExample: [
      { item: 'Load example (10X Human PBMC 10k cells)' },
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
    multipleDatasetsLength: 2,
    rules: [
      (v) =>
        (v && v.length <= 100) ||
        'Project tiile is required (Max 100 characters)',
    ],
    nameRules: [
      (v) => !!v || 'Field is required',
      (v) => (v && v.length <= 20) || 'Name must be less than 20 characters',
    ],
    fileRules: [true],
    selectRules: [(v) => !!v || 'Control data is required'],
    emailRules: [
      (v) => (/.+@.+\..+/.test(v) && v.length > 0) || 'E-mail must be valid',
    ],
  }),
  computed: {
    checkboxErrors() {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    selectErrors() {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },
  mounted() {
    switch (this.$route.query.type) {
      case 'single-rna':
        this.tab = 0
        break
      case 'multiple-rna':
        this.tab = 1
        break
      case 'multiome':
        this.tab = 2
        break
      default:
        this.tab = 0
    }
  },
  methods: {
    loadSingleRnaExample() {
      this.multipleDatasetsLength = 1
      this.resetExpFile()
      this.speciesSelect = 'Mouse'
      this.title = 'Mouse brain scRNA-seq dataset (Zeisel et al. 2015)'
      this.expFile.singleRna[0] = dataURLtoFile(
        'data:text/plain;base64,aGVsbG8gd29ybGQ=',
        'Zeisel count matrix'
      )
      this.labelFile.singleRna = dataURLtoFile(
        'data:text/plain;base64,aGVsbG8gd29ybGQ=',
        'Zeisel cell label'
      )

      this.$notifier.showMessage({
        content: 'Example dataset loaded: Zeisel et al. 2015.',
        color: 'success',
      })
    },
    loadMultiRnaExample() {
      this.multipleDatasetsLength = 2
      this.resetExpFile()
      this.speciesSelect = 'Human'
      this.expFile.multiRna[0] = dataURLtoFile(
        'data:text/plain;base64,aGVsbG8gd29ybGQ=',
        'IFNB PBMCs (Dataset 1)'
      )
      this.expFile.multiRna[1] = dataURLtoFile(
        'data:text/plain;base64,aGVsbG8gd29ybGQ=',
        'IFNB PBMCs (Dataset 2)'
      )
      this.labelFile.multiRna = dataURLtoFile(
        'data:text/plain;base64,aGVsbG8gd29ybGQ=',
        'IFNB PBMCs cell label'
      )
      this.title = 'Human IFNB-Stimulated and Control PBMCs, 2800 cells'
      this.$notifier.showMessage({
        content:
          'Example dataset loaded: Human IFNB-Stimulated and Control PBMCs, 2800 cells.',
        color: 'success',
      })
    },
    loadMultiomeExample() {
      this.multipleDatasetsLength = 1
      this.resetExpFile()
      this.speciesSelect = 'Human'
      this.expFile.multiome[0] = dataURLtoFile(
        'data:text/plain;base64,aGVsbG8gd29ybGQ=',
        'PBMC scRNA-seq data'
      )
      this.expFile.multiome[1] = dataURLtoFile(
        'data:text/plain;base64,aGVsbG8gd29ybGQ=',
        'PBMC scATAC-seq data'
      )
      this.labelFile.multiome = dataURLtoFile(
        'data:text/plain;base64,aGVsbG8gd29ybGQ=',
        'PBMC cell label'
      )
      this.bamFile = dataURLtoFile(
        'data:text/plain;base64,aGVsbG8gd29ybGQ=',
        'PBMC scRNA-seq BAM file'
      )
      this.title = 'Human Multiome PBMCs 10k cells'
      this.$notifier.showMessage({
        content: 'Example dataset loaded: Human PBMCs 10k cells',
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
      console.log('reset validation')
      this.$refs.form.resetValidation()
    },
    async submit() {
      if (!this.$refs.form.validate()) {
        this.$notifier.showMessage({
          content: 'Form validation failed, please check your upload items.',
          color: 'error',
        })
        this.$refs.form.resetValidation()
        return
      }
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
      formData.append('expFile', 'exp')
      formData.append('labelFile', 'label')
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
          if (this.title === 'Human Multiome PBMCs 10k cells') {
            this.$router.push({
              path: '/submit/multiome',
            })
          } else if (
            this.title === 'Human IFNB-Stimulated and Control PBMCs, 2800 cells'
          ) {
            this.$router.push({
              path: '/submit/multiple-rna',
            })
          } else {
            this.$router.push({ path: '/submit/single-rna' })
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
    switchTabs() {
      this.resetValidation()
    },
    resetExpFile() {
      this.resetValidation()
      this.expFile = {
        singleRna: [],
        multiRna: [],
        multiome: [],
      }
      this.labelFile = {
        singleRna: null,
        multiRna: null,
        multiome: null,
      }
    },
  },
}
</script>
