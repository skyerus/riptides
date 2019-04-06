<template>
    <div id="app">
        <v-app id="keep" dark>
            <router-view :key="$route.fullPath"></router-view>
        </v-app>
    </div>
</template>

<script>

    export default {
      name: 'app',
    }
</script>

<style>
</style>
