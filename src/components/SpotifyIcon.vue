<template>
    <img :src="require('../assets/img/Spotify.png')" :style="{ height: height }" alt="Spotify">
</template>

<script>
  export default {
    name: "SpotifyIcon",
    props: {
      height: {
        type: String,
      },
    }
  }
</script>

<style scoped>

</style>