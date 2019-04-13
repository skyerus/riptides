<template>
    <v-dialog v-model="open" width="700" persistent>
        <v-card>
            <v-card-title>
                <span class="headline">Tide</span>
            </v-card-title>
            <v-card-text>
                <v-layout wrap>
                    <v-flex xs12 class="pt-3 pb-5">
                        <v-text-field
                                label="Name"
                                v-model="name"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 class="pt-4 pb-4">
                        <multiselect v-model="values" :options="options" :multiple="true" :close-on-select="false" :custom-label="setGenreLabel"
                                     placeholder="Select at least one genre" track-by="name"/>
                    </v-flex>
                    <v-flex xs12 class="pt-4 pb-4">
                        <v-text-field
                                label="About (optional)"
                                v-model="about"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 class="pt-5 pb-4">
                        <multiselect v-model="tagsValues" :options="tagsOptions" :multiple="true" :taggable="true" :close-on-select="false" @tag="addTag"
                             placeholder="Add some optional tags (sub-genres etc.)" track-by="name" :custom-label="setTagLabel" :showNoResults="false"
                        >
                            <template v-slot:noOptions>
                                 <div style="display:none">
                                 </div>
                            </template>
                        </multiselect>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="open = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="create(values, tagsValues, name, about)">Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  import multiselect from 'vue-multiselect'
  import handler from '../services/api/handler'
  import tidesApi from '../services/api/tides'

  export default {
    name: "CreateTide",
    components: {
      multiselect
    },
    props: [
      'popupOpen'
    ],
    data() {
      return {
        values: [],
        options: [],
        tagsOptions: [],
        tagsValues: [],
        name: '',
        about: ''
      }
    },
    computed: {
      open: {
        get() {
          return this.popupOpen
        },
        set() {
          this.$emit('popupClose')
        }
      }
    },
    methods: {
      hydrateGenres() {
        tidesApi.getGenres().then((response) => {
          this.options = response.data
        }).catch((err) => {
          handler.handleResponse(err, this.hydrateGenres);
        })
      },

      setGenreLabel({id, name}) {
        return name
      },

      addTag(newTag) {
        let tag = {
          name: newTag
        }
        this.tagsValues.push(tag)
        this.tagsOptions.push(tag)
      },

      setTagLabel({name}) {
        return name
      },

      create(genreValues, tagValues, name, about) {
        tidesApi.createTide(genreValues, tagValues, name, about).then((response) => {
          this.values = []
          this.tagsValues = []
          this.name = ''
          this.about = ''
          this.open = false
        }).catch((err) => {
          handler.handleResponse(err, this.create, [genreValues, tagValues, name, about])
        })
      },
    },
    mounted() {
      this.hydrateGenres()
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
</style>