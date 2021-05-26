<template>
  <v-col class="mb-2" cols="12">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-tabs v-model="tab" dark grow background-color="primary">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-tab @click="switchTabs('single-rna')" v-on="on"
              >Single scRNA-Seq
            </v-tab>
          </template>
          <span>TODO</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-tab @click="switchTabs('multiple-rna')" v-on="on"
              >Multiple scRNA-Seq
            </v-tab>
          </template>
          <span>TODO</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-tab @click="switchTabs('multiome')" v-on="on"
              >scRNA-Seq and scATAC-seq
            </v-tab>
          </template>
          <span>TODO</span>
        </v-tooltip>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-card-title class="mx-0 my-4 py-0 subtitle-1 font-weight-bold">
          Data upload
          <v-divider class="mx-0 my-0 py-0"></v-divider>
        </v-card-title>
        <v-tab-item>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-file-input
                v-model="expFile.singleRna[0]"
                counter
                chips
                :rules="fileRules"
                label="Gene expression matrix"
                prepend-icon="mdi-paperclip"
                required
                hint="Support format: *.csv, *.txt, *.h5"
                persistent-hint
                @mouseenter.native="on.mouseenter"
                @mouseleave.native="on.mouseleave"
              ></v-file-input>
            </template>
            <span>TODO</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-file-input
                v-model="labelFile.singleRna"
                counter
                chips
                label="Metadata (Optional)"
                hint="Support format: *.csv, *.txt"
                persistent-hint
                prepend-icon="mdi-paperclip"
                @mouseenter.native="on.mouseenter"
                @mouseleave.native="on.mouseleave"
              ></v-file-input>
            </template>
            <span>TODO</span>
          </v-tooltip>

          <v-col cols="3" class="mx-0 my-2 pa-1"
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
        </v-tab-item>
        <v-tab-item>
          <div v-for="(n, i) in multipleDatasetsLength" :key="n">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-file-input
                  v-model="expFile.multiRna[i]"
                  counter
                  chips
                  :rules="fileRules"
                  :label="'Gene expression matrix ' + n"
                  prepend-icon="mdi-paperclip"
                  hint="Support format: *.csv, *.txt, *.h5"
                  persistent-hint
                  required
                  @mouseenter.native="on.mouseenter"
                  @mouseleave.native="on.mouseleave"
                ></v-file-input>
              </template>
              <span>TODO</span>
            </v-tooltip>
          </div>

          <div class="mt-4">
            <v-btn @click="addMultipleDataset">Add a row</v-btn>
            <v-btn @click="removeMultipleDataset">Remove a row</v-btn>
          </div>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-file-input
                v-model="labelFile.multiRna"
                counter
                chips
                label="Metadata (optional)"
                hint="Support format: *.csv, *.txt"
                persistent-hint
                prepend-icon="mdi-paperclip"
                @mouseenter.native="on.mouseenter"
                @mouseleave.native="on.mouseleave"
              ></v-file-input>
            </template>
            <span>TODO</span>
          </v-tooltip>

          <v-col cols="4" class="mx-0 my-2 pa-1"
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
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-file-input
                v-model="expFile.multiome[0]"
                counter
                chips
                :rules="fileRules"
                label="Feature barcode matrix"
                hint="Support format: *.h5, *.hdf5 "
                persistent-hint
                prepend-icon="mdi-paperclip"
                required
                @mouseenter.native="on.mouseenter"
                @mouseleave.native="on.mouseleave"
              ></v-file-input>
            </template>
            <span>TODO</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-file-input
                v-model="expFile.multiome[1]"
                counter
                chips
                :rules="fileRules"
                label="scATAC-seq fragments (optional)"
                hint="Support format: *fragments.tsv.gz"
                persistent-hint
                prepend-icon="mdi-paperclip"
                @mouseenter.native="on.mouseenter"
                @mouseleave.native="on.mouseleave"
              ></v-file-input>
            </template>
            <span>TODO</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-file-input
                v-model="expFile.multiome[2]"
                counter
                chips
                :rules="fileRules"
                label="scATAC-seq fragments index (optional)"
                hint="Support format: *fragments.tsv.gz.tbi"
                persistent-hint
                prepend-icon="mdi-paperclip"
                @mouseenter.native="on.mouseenter"
                @mouseleave.native="on.mouseleave"
              ></v-file-input>
            </template>
            <span>TODO</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-file-input
                v-model="labelFile.multiome"
                counter
                chips
                label="Metadata (optional)"
                hint="Support format: *.csv, *.txt"
                persistent-hint
                prepend-icon="mdi-paperclip"
                @mouseenter.native="on.mouseenter"
                @mouseleave.native="on.mouseleave"
              ></v-file-input>
            </template>
            <span>TODO</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-file-input
                v-model="bamFile"
                counter
                chips
                label="RNA velocity matrix (optional)"
                hint="Support format: *.csv, *.txt"
                persistent-hint
                prepend-icon="mdi-paperclip"
                @mouseenter.native="on.mouseenter"
                @mouseleave.native="on.mouseleave"
              ></v-file-input>
            </template>
            <span>TODO</span>
          </v-tooltip>

          <v-col cols="3" class="mx-0 my-2 pa-1"
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
              </v-list>
            </v-menu>
          </v-col>
        </v-tab-item>
      </v-tabs-items>

      <v-card-title class="mx-0 my-2 py-0 subtitle-1 font-weight-bold">
        Project information
        <v-divider class="mx-0 my-2 py-0"></v-divider>
      </v-card-title>

      <v-col cols="3">
        <v-row>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-switch
                v-model="isPrivateProject"
                :label="isPrivateProject ? 'Private project' : 'Public project'"
                v-on="on"
                @mouseenter.native="on.mouseenter"
                @mouseleave.native="on.mouseleave"
              >
              </v-switch>
            </template>
            <span>TODO</span>
          </v-tooltip>
        </v-row></v-col
      >
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="title"
            :rules="rules"
            counter="100"
            label="Project title"
            required
            clearable
            v-on="on"
          ></v-text-field>
        </template>
        <span>TODO</span>
      </v-tooltip>
      <v-col cols="3">
        <v-row>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-select
                v-model="speciesSelect"
                :items="species"
                label="Species"
                :rules="fileRules"
                required
                @mouseenter.native="on.mouseenter"
                @mouseleave.native="on.mouseleave"
              ></v-select>
            </template>
            <span
              >Specify the species belonging to your gene expression
              matrix.</span
            >
          </v-tooltip>
        </v-row>
      </v-col>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-textarea
            v-model="description"
            label="Project description (optional)"
            clearable
            outlined
            v-on="on"
          >
          </v-textarea>
        </template>
        <span>TODO</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="email"
            label="E-mail"
            hint="Optional: You will be notified by email when the job is done."
            persistent-hint
            v-on="on"
          ></v-text-field>
        </template>
        <span>TODO</span>
      </v-tooltip>
    </v-form>

    <v-row justify="center" class="my-2">
      <v-btn color="primary" width="300" @click="submit()">Start</v-btn>
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
  props: {
    type: { type: String, required: true, default: 'signle-rna' },
  },

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
    tab: null,
    isPrivateProject: true,
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
        item: 'Download metadata file (Zeisel et al, 2015)',
        link: 'https://bmbl.bmi.osumc.edu/iris3/storage/Zeisel_index_label.csv',
      },
      {
        item: 'Download gene expression matrix (Yan et al, 2013) ',
        link:
          'https://bmbl.bmi.osumc.edu/iris3/storage/Yan_2013_expression.csv',
      },
      {
        item: 'Download metadata file (Yan et al, 2013)',
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
        item: 'Download metadata file: Human IFNB',
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
  mounted() {
    switch (this.type) {
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
        'Zeisel metadata'
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
        'IFNB PBMCs metadata'
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
        'PBMC metadata'
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

      const uploadRes = await this.$axios.post(
        'deepmaps/api/file/upload/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            )

            this.$store.commit('socket/SET_UPLOAD_PROGRESS', uploadPercentage)
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
        }, 2000)
      }
    },
    addMultipleDataset() {
      this.multipleDatasetsLength++
    },
    removeMultipleDataset() {
      if (this.multipleDatasetsLength <= 2) return
      this.multipleDatasetsLength--
    },
    switchTabs(uploadType) {
      this.$router.push(`${uploadType}`)
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
