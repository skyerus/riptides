<template>
    <div class="pa-4">
        <CreateTide v-if="popupOpen"
                    :popupOpen="popupOpen"
                    @popupClose="popupOpen = false"
                    @tideCreated="getTides"
        />
        <v-layout>
            <v-flex xs1 md2>

            </v-flex>
            <v-flex xs10 md8>
                <v-layout>
                    <v-btn @click="popupOpen = !popupOpen">Create tide</v-btn>
                </v-layout>
                <v-container grid-list-lg>
                    <v-layout class="pt-3" wrap>
                        <v-flex sm12 md4 v-for="tide in tides">
                            <TideIcon :tide="tide"/>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
            <v-flex xs1 md2>

            </v-flex>
        </v-layout>
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
</template>

<script>
  import CreateTide from '../components/CreateTide.vue'
  import TideIcon from '../components/TideIcon.vue'
  import tidesApi from '../services/api/tides'
  import handler from '../services/api/handler'

  export default {
    name: "Tides",
    components: {
      TideIcon,
      CreateTide,
    },
    data() {
      return {
        popupOpen: false,
        tides: [],
        pageLength: 12,
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