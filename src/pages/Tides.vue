<template>
    <div class="pa-4">
        <CreateTide v-if="popupOpen" :popupOpen="popupOpen" @popupClose="popupOpen = false"/>
        <v-layout>
            <v-flex xs1 md3>

            </v-flex>
            <v-flex xs10 md6>
                <v-btn @click="popupOpen = !popupOpen">Create tide</v-btn>
            </v-flex>
            <v-flex xs1 md3>

            </v-flex>
        </v-layout>
    </div>
</template>

<script>
  import CreateTide from '../components/CreateTide.vue'

  export default {
    name: "Tides",
    components: {
      CreateTide
    },
    data() {
      return {
        popupOpen: false
      }
    },
    methods: {
    },
    mounted() {
    }
  }
</script>

<style scoped>
</style>