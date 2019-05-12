<template>
    <div id="app">
        <v-app v-if="$route.fullPath === '/'">
            <div>
                <router-view :key="$route.fullPath"></router-view>
            </div>
        </v-app>
        <v-app v-else id="keep" dark>
            <Layout>
                <router-view :key="$route.fullPath"></router-view>
            </Layout>
        </v-app>
    </div>
</template>

<script>
  import Layout from './components/Layout.vue'

  export default {
    name: 'app',
    components: {
      Layout
    }
  }
</script>

<style>
</style>
