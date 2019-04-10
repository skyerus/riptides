<template>
    <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :custom-label="setGenreLabel"/>
</template>

<script>
  import multiselect from 'vue-multiselect'
  import handler from '../services/api/handler'
  import tidesApi from '../services/api/tides'

  export default {
    name: "Tides",
    components: {
      multiselect
    },
    data() {
      return {
        value: [],
        options: [
          'Hip-Hop',
          'Jazz'
        ]
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
      }
    },
    mounted() {
      this.hydrateGenres()
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
</style>