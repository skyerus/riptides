<template>
    <v-layout class="pt-5">
        <v-flex xs6 md4 offset-md2>
            <div class="xl-text">
                Listen to music together
            </div>
            <h2>

            </h2>
        </v-flex>
        <v-flex xs6 md4 offset-md2>

        </v-flex>
    </v-layout>
</template>

<script>
  import {store} from '../store'

  export default {
    name: "Home",
    beforeRouteEnter(to, from, next) {
      if (store.getters.isLoggedIn) {
        next('/tides')
      }
      next()
    }
  }
</script>

<style scoped>

</style>