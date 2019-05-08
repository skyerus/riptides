<template>
    <div>
        <div class="white--text blue-gradient header">
            <div class="text-xs-center ma-auto icon-height">
                <RiptidesIcon class="vertical-align-middle" height="100%"/>
                <span class="pl-1 xl-text vertical-align-middle">riptides</span>
            </div>
            <div class="text-xs-center t-padding">
                <span class="xl-text">
                    Listen together
                </span>
            </div>
        </div>
        <v-layout class="pl-4 pt-5 pr-4 text-xs-center">
            <v-flex sm12 md4>
                <v-icon class="large-icon-2">group</v-icon><br>
                <span class="subheader">rgrgdgdr</span>
            </v-flex>
            <v-flex sm12 md4>
                <v-icon class="large-icon-2">queue</v-icon>
            </v-flex>
            <v-flex sm12 md4>
                <v-icon class="large-icon-2">compare_arrows</v-icon>
            </v-flex>
        </v-layout>
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
    .subheader {
        font-size: 24px;
        line-height: 32px;
        letter-spacing: -0.25px;
        font-weight: 900;
        color: #000;
        margin: 0 0 12px;
    }
</style>