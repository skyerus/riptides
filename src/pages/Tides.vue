<template>
    <div class="pa-4">
        <CreateTide v-if="popupOpen" :popupOpen="popupOpen" @popupClose="popupOpen = false"/>
        <v-layout>
            <v-flex xs1 md2>

            </v-flex>
            <v-flex xs10 md8>
                <v-layout>
                    <v-btn @click="popupOpen = !popupOpen">Create tide</v-btn>
                </v-layout>
                <v-container grid-list-lg>
                    <v-layout class="pt-3">
                        <v-flex sm12 md4 v-for="tide in tides">
                            <TideIcon :tide="tide"/>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
            <v-flex xs1 md2>

            </v-flex>
        </v-layout>
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
      CreateTide
    },
    data() {
      return {
        popupOpen: false,
        tides: []
      }
    },
    methods: {
      getTides() {
        tidesApi.getTides().then((response) => {
          this.tides = response.data
        }).catch((err) => {
          handler.handleResponse(err, this.getTides)
        })
      }
    },
    mounted() {
      this.getTides()
    }
  }
</script>

<style scoped>
</style>