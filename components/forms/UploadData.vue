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
        <v-tab @click="switchTabs()">10x Genomics single-cell Multiome </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-file-input
            v-model="expFile.singleRna[0]"
            color="primary"
            counter
            chips
            :rules="fileRules"
            label="Support format: *.csv, *.txt, *.h5"
            prepend-icon="mdi-paperclip"
            outlined
            required
            class="mt-5"
          ></v-file-input>
          <v-col cols="3" class="ma-1 pa-1"
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
                <v-list-item>
                  <v-list-item-title>
                    <a
                      class="text-decoration-none"
                      :href="singleExample[3].link"
                    >
                      {{ singleExample[3].item }}</a
                    ></v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <a
                      class="text-decoration-none"
                      :href="singleExample[4].link"
                    >
                      {{ singleExample[4].item }}</a
                    ></v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="12"
            ><v-row>
              <p class="subtitle mt-4">Optional: Custom metadata</p>
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
            label="Support format: *.csv, *.txt"
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
            ></v-file-input>
          </div>
          <v-btn @click="addMultipleDataset">Add a row</v-btn>
          <v-btn @click="removeMultipleDataset">Remove a row</v-btn>

          <p class="subtitle">Optional: custom metadata</p>

          <v-file-input
            v-model="labelFile.multiRna"
            color="primary"
            counter
            chips
            label="Support format: *.csv, *.txt, *.h5"
            prepend-icon="mdi-paperclip"
            outlined
          ></v-file-input>
          <v-col cols="3" class="ma-1 pa-1"
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
                <v-list-item>
                  <v-list-item-title>
                    <a
                      class="text-decoration-none"
                      :href="multiRnaExample[2].link"
                    >
                      {{ multiRnaExample[2].item }}</a
                    ></v-list-item-title
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <a
                      class="text-decoration-none"
                      :href="multiRnaExample[3].link"
                    >
                      {{ multiRnaExample[3].item }}</a
                    ></v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-tab-item>
        <v-tab-item>
          <p class="subtitle ma-0">Feature barcode matrix</p>
          <v-file-input
            v-model="expFile.multiome[0]"
            color="primary"
            counter
            chips
            :rules="fileRules"
            label="Support format: *.h5, *.hdf5"
            prepend-icon="mdi-paperclip"
            outlined
            required
          ></v-file-input>
          <p class="subtitle ma-0">Optional: scATAC-seq fragments</p>
          <v-file-input
            v-model="expFile.multiome[1]"
            color="primary"
            counter
            chips
            :rules="fileRules"
            label="Support format: *fragments.tsv.gz"
            prepend-icon="mdi-paperclip"
            outlined
            required
          ></v-file-input>
          <p class="subtitle ma-0">Optional: scATAC-seq fragments index</p>
          <v-file-input
            v-model="expFile.multiome[2]"
            color="primary"
            counter
            chips
            :rules="fileRules"
            label="Support format: *fragments.tsv.gz.tbi"
            prepend-icon="mdi-paperclip"
            outlined
            required
          ></v-file-input>
          <v-col cols="12"
            ><v-row>
              <p class="subtitle mt-4">Optional: custom metadata</p>
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
            label="Support format: *.csv, *.txt"
            prepend-icon="mdi-paperclip"
            outlined
          ></v-file-input>
          <v-col cols="12"
            ><v-row>
              <p class="subtitle mt-4">Upload scRNA data BAM file (Optional)</p>
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
            label="Support format: .bam"
            prepend-icon="mdi-paperclip"
            outlined
          ></v-file-input>
          <v-col cols="3" class="ma-1 pa-1"
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
                      :href="multiomeExample[1].link"
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
      {
        item: 'Download gene expression matrix (Yan et al, 2013) ',
        link:
          'https://bmbl.bmi.osumc.edu/iris3/storage/Yan_2013_expression.csv',
      },
      {
        item: 'Download cell label file (Yan et al, 2013)',
        link: 'https://bmbl.bmi.osumc.edu/iris3/storage/Yan_2013_label.csv',
      },
    ],
    multiRnaExample: [
      {
        item: 'Load example (Human IFNB PBMCs, 2800 cells)',
      },
      {
        item: 'Download gene expression matrix: Human IFNB (sample 1)',
        link:
          'https://bmbl.bmi.osumc.edu/iris3/storage/human_ifnb_sample1_expr.csv',
      },
      {
        item: 'Download gene expression matrix: Human IFNB (sample 2)',
        link:
          'https://bmbl.bmi.osumc.edu/iris3/storage/human_ifnb_sample2_expr.csv',
      },
      {
        item: 'Download cell label file: Human IFNB',
        link: 'https://bmbl.bmi.osumc.edu/iris3/storage/human_ifnb_label.csv',
      },
    ],
    multiomeExample: [
      { item: 'Load example (10X Human PBMC 10k cells)' },
      {
        item: 'Download data: Human Brain 3k cell',
        link:
          'https://bmbl.bmi.osumc.edu/iris3/storage/human_brain_3k_filtered_feature_bc_matrix.h5',
      },
      {
        item: 'Download data: Human PBMC unsorted 3k cell',
        link:
          'https://bmbl.bmi.osumc.edu/iris3/storage/pbmc_unsorted_3k_filtered_feature_bc_matrix.h5',
      },
      {
        item: 'Download data: Human PBMC granulocyte sorted 3k cell',
        link:
          'https://bmbl.bmi.osumc.edu/iris3/storage/pbmc_granulocyte_sorted_3k_filtered_feature_bc_matrix.h5',
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
    fileRules: [true || 'Field is required'],
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
      this.jobid = 'example'
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
      this.jobid = 'example'
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
      this.jobid = 'example'
      this.expFile.multiome[0] = dataURLtoFile(
        'data:text/plain;base64,aGVsbG8gd29ybGQ=',
        'PBMC scRNA-seq data'
      )
      this.expFile.multiome[1] = dataURLtoFile(
        'data:text/plain;base64,aGVsbG8gd29ybGQ=',
        'PBMC scATAC-seq data'
      )
      this.expFile.multiome[2] = dataURLtoFile(
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
      this.$refs.form.resetValidation()
    },
    async submit() {
      if (!this.$refs.form.validate()) {
        this.$notifier.showMessage({
          content: 'Form validation failed, please check your upload items.',
          color: 'error',
        })
        return
      }
      this.$nuxt.$loading.start()
      this.dialog = true
      this.uploadStatus = 'Uploading ...'
      const formData = new FormData()

      if (this.jobid === 'example') {
        this.$store.commit('SET_UPLOAD_FILES', 'Example data')
      } else {
        this.jobid = new Date().getTime()
        const filenames = [
          ...this.expFile.singleRna.map((file) => file.name),
          ...this.expFile.multiRna.map((file) => file.name),
          ...this.expFile.multiome.map((file) => file.name),
        ]
        this.$store.commit('SET_UPLOAD_FILES', filenames)
      }
      this.$store.commit('SET_JOBID', this.jobid)
      this.$store.commit('SET_SPECIES', this.speciesSelect)

      formData.append('method', 'post')
      formData.append('name', 'list')
      formData.append('title', this.title)
      formData.append('email', this.email)
      formData.append('jobid', this.jobid)
      formData.append('status', 'created')
      formData.append('species', this.speciesSelect)
      formData.append('description', this.description)
      this.expFile.singleRna.forEach((file, index) => {
        formData.append('singleRna', file)
        formData.append('index', index)
      })
      this.expFile.multiRna.forEach((file, index) => {
        formData.append('multiRna', file)
      })
      this.expFile.multiome.forEach((file, index) => {
        formData.append('multiome', file)
        formData.append('index', index)
      })
      formData.append('labelFile-singleRna', this.labelFile.singleRna)
      formData.append('labelFile-multiRna', this.labelFile.multiRna)
      formData.append('labelFile-multiome', this.labelFile.multiome)

      formData.append('status', 'upload')
      this.$notifier.showMessage({
        content: 'Uploading data...',
        color: 'accent',
      })
      const uploadRes = await this.$axios.post(
        'deepmaps/api/file/upload/',
        formData,
        {
          headers: {
            'Content-Type':
              'multipart/form-data; boundary=<calculated when request is sent>',
          },
        }
      )
      this.$nuxt.$loading.finish()
      // eslint-disable-next-line no-constant-condition
      if (uploadRes) {
        setTimeout(() => {
          this.$notifier.showMessage({
            content: 'Jobid: ' + this.jobid + ' Upload success!',
            color: 'success',
          })
          if (this.tab === 2) {
            this.$router.push({
              path: '/submit/multiome/' + this.jobid,
            })
          } else if (this.tab === 1) {
            this.$router.push({
              path: '/submit/multiple-rna/' + this.jobid,
            })
          } else if (this.tab === 0) {
            this.$router.push({ path: '/submit/single-rna/' + this.jobid })
          }
        }, 3000)
      }
    },
    addMultipleDataset() {
      this.multipleDatasetsLength++
    },
    removeMultipleDataset() {
      if (this.multipleDatasetsLength <= 2) return
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
