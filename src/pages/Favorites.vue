<template>
    <div class="pa-2">
        <TidesGrid :tides="tides">
        </TidesGrid>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
</template>

<script>
  import TidesGrid from '../components/TidesGrid.vue'
  import tidesApi from '../services/api/tides'
  import handler from '../services/api/handler'

  export default {
    name: "Favorites",
    components: {
      TidesGrid
    },
    data() {
      return {
        tides: [],
        pageLength: 9,
        page: 0,
      }
    },
    computed: {
      offset() {
        return this.pageLength * (this.page - 1)
      },
    },
    methods: {
      infiniteHandler($state) {
        this.page++
        tidesApi.getFavoriteTides(this.$route.params.username, {
          offset: this.offset,
          limit: this.pageLength,
        }).then((response) => {
          if (response.data.length) {
            this.tides.push(...response.data)
            if (response.data.length !== this.pageLength) {
              return $state.complete()
            }
            $state.loaded()
          } else {
            this.page--
            $state.complete()
          }
        }).catch((err) => {
          this.page--
          handler.handleResponse(err, this.infiniteHandler, [$state])
        })
      }
    }
  }
</script>

<style scoped>

</style>