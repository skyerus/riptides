<template>
    <div id="app">
        <v-app id="keep" dark>
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
