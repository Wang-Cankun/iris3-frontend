<template>
  <v-col class="mb-2" cols="12">
    <v-form ref="form" v-model="valid" lazy-validation>
      <!-- Title  -->
      <p class="title">Project title</p>
      <v-text-field
        v-model="title"
        :rules="rules"
        counter="25"
        label="Title:"
        outlined
      ></v-text-field>
      <v-select
        v-model="speciesSelect"
        :items="species"
        label="Select species:"
        :rules="fileRules"
        required
      ></v-select>
      <!-- Upload data  -->
      <v-card outlined hover color="primary">
        <v-col cols="12">
          <v-row justify="space-between">
            <p class="title white--text">
              Upload data
            </p>
            <v-btn @click="loadExample()">Load example data</v-btn>
          </v-row>
        </v-col>

        <v-tabs v-model="tab" background-color="white" grow>
          <v-tab>scRNA-Seq data only </v-tab>
          <v-tab>scRNA-Seq + scATAC-seq data </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <p class="title ma-0">
              Upload scRNA-seq data
            </p>
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

            <p class="title">
              Upload metadata (Optional)
            </p>

            <v-file-input
              v-model="labelFile"
              color="primary"
              counter
              chips
              label="Click to upload (txt, tsv, csv)"
              prepend-icon="mdi-paperclip"
              outlined
            ></v-file-input>
          </v-tab-item>
          <v-tab-item>
            <p class="title ma-0">
              Upload scRNA-seq and scATAC-seq data
            </p>
            <v-file-input
              v-model="expFile[0]"
              color="primary"
              counter
              chips
              :rules="fileRules"
              label="Upload scRNA-seq dataset"
              prepend-icon="mdi-paperclip"
              outlined
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
              required
              multiple
            ></v-file-input>
          </v-tab-item>
        </v-tabs-items>
      </v-card>

      <p class="title mt-3">
        Email (Optional)
      </p>

      <v-text-field
        v-model="email"
        outlined
        label="E-mail"
        hint="Optional: You will be notified by email when the job is done."
        persistent-hint
      ></v-text-field>

      <p class="title">
        Project description (Optional)
      </p>
      <v-textarea v-model="description" outlined label="Description:" clearable>
      </v-textarea>
    </v-form>
    <v-row justify="center">
      <v-btn color="Primary" width="300" rounded @click="submit()"
        >Upload</v-btn
      >
    </v-row>

    <p v-if="jobid != ''">Your Job ID: {{ jobid }}, please continue.</p>
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
    tab: null,
    jobid: '',
    valid: true,
    form: {},
    expFile: [],
    labelFile: null,
    species: ['Human', 'Mouse'],
    speciesSelect: '',
    email: '',
    description: '',
    multipleDatasetsLength: 1,
    rules: [(v) => v.length <= 25 || 'Max 25 characters'],
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
      this.$notifier.showMessage({
        content: 'Example dataset loaded: Zeisel et al. 2015.',
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
