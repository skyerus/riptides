<template>
    <div class="pa-4">
        <v-btn @click="popupOpen = !popupOpen">Create tide</v-btn>
        <CreateTide :popupOpen="popupOpen" @popupClose="popupOpen = false"/>
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
        popupOpen: true
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