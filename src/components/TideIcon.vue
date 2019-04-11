<template>
    <v-card class="dark-bg overflow-y-hidden">
<!--        <v-toolbar-->
<!--            dense-->
<!--            height="37px"-->
<!--        >-->
<!--            {{ this.tide.name }}-->
<!--        </v-toolbar>-->
        <v-card-title>
            <span class="headline">{{ this.tide.name }}</span>
            <v-spacer/><span v-for="genre in tide.genres" class="tag">{{ genre.genre.name }}</span>
        </v-card-title>
        <v-card-text v-if="tide.about !== ''">
            {{this.tide.about}}
        </v-card-text>
        <v-card-title v-if="this.tide.participants.length > 0">
            <span class="headline">Participants</span>
        </v-card-title>
        <div class="overflow-auto max-height-200 scrollbar">
            <div v-for="participant in this.tide.participants">
                <UserTile :username="participant.user.username" :avatar="participant.user.avatar"/>
            </div>
        </div>
        <UserToolbar :user="this.tide.user"/>
    </v-card>
</template>

<script>
  import UserToolbar from './UserToolbar.vue'
  import UserTile from './UserTile.vue'

  export default {
    name: "TideIcon",
    components: {
      UserToolbar,
      UserTile
    },
    props: [
      'tide'
    ],
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
    .max-height-200 {
        display: block;
        max-height: 200px;
    }
</style>