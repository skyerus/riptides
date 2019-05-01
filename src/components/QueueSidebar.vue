<template>
    <div class="flex-container flex-col-reverse max-height pb-3">
        <div v-for="(song, index) in queue" >
            <v-divider class="pb-2 mr-2"/>
            <h3 v-if="index === 0" class="pb-2 dark-text-3">
                Now playing
            </h3>
            <div class="flex-container align-center justify-start">
                <div class="vertical-align-top col-1">
                    <img :src="song.image.url" :height="song.image.height" :width="song.image.width">
                </div>
                <div class="col-2 ml-3">
                    <h3>{{ song.name }}</h3>
                    <div>{{ song.artist }}</div>
                </div>
            </div>
            <div class="pb-2">
                <UserTile
                        :username="song.user.username"
                        :avatar="song.user.avatar"
                        gap="3px"
                        imageSize="30px"
                        usernameSize="14px"
                        username-color="rgba(6, 6, 6, 0.87)"
                        username-bold
                />
            </div>
        </div>
    </div>
</template>

<script>
  import UserTile from './UserTile.vue'

  export default {
    name: "QueueSidebar",
    components: {
      UserTile
    },
    props: [
      'queue'
    ]
  }
</script>

<style scoped>
    .col-1 {
        flex: 0 auto;
    }
    .col-2 {
        flex: 1 1 auto;
    }
    .center {
        text-align: center;
    }
</style>