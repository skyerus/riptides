<template>
    <div class="white--text blue-gradient header">
        <div class="text-xs-center ma-auto icon-height">
            <RiptidesIcon class="vertical-align-middle" height="100%"/>
            <span class="xl-text vertical-align-middle">riptides</span>
        </div>
        <div class="text-xs-center t-padding">
            <h1 class="xl-text">
                Listen together
            </h1>
        </div>
    </div>
</template>

<script>
  import {store} from '../store'
  import RiptidesIcon from '../components/RiptidesIcon.vue'

  export default {
    name: "Home",
    components: {
      RiptidesIcon
    },
    beforeRouteEnter(to, from, next) {
      if (store.getters.isLoggedIn) {
        next('/tides')
      }
      next()
    }
  }
</script>

<style scoped>
    .header {
        height: 30vh;
        padding-top: 5vh;
    }
    .icon-height {
        height: 10vh;
    }
    .t-padding {
        padding-top: 2vh;
    }
</style>