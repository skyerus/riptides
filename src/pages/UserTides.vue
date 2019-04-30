<template>
    <div>
        <CreateTide v-if="popupOpen"
                    :popupOpen="popupOpen"
                    @popupClose="popupOpen = false"
                    @tideCreated="$refs.infiniteLoading.stateChanger.reset()"
        />
        <TidesGrid :tides="tides">
            <template v-slot:header>
                <v-layout>
                    <v-btn @click="popupOpen = !popupOpen">Create tide</v-btn>
                </v-layout>
            </template>
        </TidesGrid>
        <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading"></infinite-loading>
    </div>
</template>

<script>
  import TidesGrid from '../components/TidesGrid.vue'
  import CreateTide from '../components/CreateTide.vue'
  import tidesApi from '../services/api/tides'
  import handler from '../services/api/handler'

  export default {
    name: "UserTides",
    components: {
      TidesGrid,
      CreateTide
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
        tidesApi.getUserTides(this.$route.params.username, {
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