<template>
    <div class="flex-container flex-col-reverse max-height">
        <div v-for="(song, index) in queue">
            <h3>{{ song.name }}</h3>
            <div>{{ song.artist }}</div>
        </div>
    </div>
</template>

<script>
    export default {
      name: "QueueSidebar",
      props: [
        'queue'
      ]
    }
</script>

<style scoped>

</style>