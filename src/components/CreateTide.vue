<template>
    <v-dialog v-model="open" width="700">
        <v-card class="min-height-60">
            <v-card-title>
                <span class="headline">Tide</span>
            </v-card-title>
            <v-card-text>
                <v-layout wrap>
                    <v-flex xs12 class="mt-4">
                        <multiselect v-model="values" :options="options" :multiple="true" :close-on-select="false" :custom-label="setGenreLabel"
                                     placeholder="Select at least one genre" track-by="name"/>
                    </v-flex>
                    <v-flex xs12 class="mt-5 pt-2">
                        <v-text-field
                                label="Name"
                        ></v-text-field>
                    </v-flex>
<!--                    <v-flex xs12 class="pb-1 mt-3">-->
<!--                        <label class="typo__label">Genre</label>-->
<!--                    </v-flex>-->
                    <v-flex xs12 class="mt-5 pt-4">
                        <multiselect v-model="tagsValues" :options="tagsOptions" :multiple="true" :taggable="true" :close-on-select="false" @tag="addTag"
                             placeholder="Add some tags (optional)" track-by="name" :custom-label="setTagLabel" :showNoResults="false"
                        >
                            <template v-slot:noOptions>
                                 <div class="dark-bg-1" style="display:none">

                                 </div>
                            </template>
                        </multiselect>
                    </v-flex>
                </v-layout>
            </v-card-text>
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
        tagsValues: []
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
    },
    mounted() {
      this.hydrateGenres()
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
    .min-height-60 {
        min-height: 50vh;
    }
</style>