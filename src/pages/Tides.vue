<template>
    <div class="pa-4">
        <CreateTide v-if="popupOpen"
                    :popupOpen="popupOpen"
                    @popupClose="popupOpen = false"
                    @tideCreated="$router.push(`/${$store.getters.username}/tides`)"
        />
        <TidesGrid :tides="tides">
            <template v-slot:header>
                <v-layout>
                    <v-btn @click="popupOpen = !popupOpen">Create tide</v-btn>
                </v-layout>
            </template>
        </TidesGrid>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
</template>

<script>
  import tidesApi from '../services/api/tides'
  import handler from '../services/api/handler'
  import TidesGrid from '../components/TidesGrid.vue'
  import CreateTide from '../components/CreateTide.vue'

  export default {
    name: "Tides",
    components: {
      CreateTide,
      TidesGrid
    },
    data() {
      return {
        popupOpen: false,
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
        tidesApi.getTides({
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
    },
  }
</script>

<style scoped>
</style>