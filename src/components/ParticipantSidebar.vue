<template>
    <div>
        <div v-for="(participant, index) in participants" class="pb-3">
            <v-list-tile
                    avatar
            >
                <v-list-tile-avatar class="ml-2" size="50px">
                    <img :src="participant.avatar">
                </v-list-tile-avatar>

                <v-list-tile-content class="ml-2">
                    <v-list-tile-title v-text="index"></v-list-tile-title>
                    <v-list-tile-sub-title v-text="participant.bio"></v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </div>
    </div>
</template>

<script>
  export default {
    name: "ParticipantSidebar",
    props: [
      'participants'
    ],
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>