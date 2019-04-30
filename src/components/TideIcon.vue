<template>
    <v-card class="dark-bg overflow-y-hidden">
        <v-card-title>
            <span class="headline">{{ this.tide.name }}</span>
            <v-spacer/>
            <v-btn small color="primary" round :to="`/tide/${tide.id}`">Join</v-btn>
        </v-card-title>
        <v-card-text v-if="tide.about !== ''">
            <span>{{this.tide.about}}</span>
        </v-card-text>
        <v-card-title v-if="tide.tags.length > 0">
            <span class="headline nice-grey">Tags</span><v-spacer/><span v-for="tag in tide.tags" class="tag">{{ tag.name }}</span>
        </v-card-title>
        <v-card-title class="headline nice-grey">
            <span>Participants</span><span class="ml-auto">{{ participantCount }}</span>
        </v-card-title>
        <v-card-title v-if="tide.participantCount === 0">
            <span class="ma-auto nice-grey">Empty</span>
        </v-card-title>
        <div class="overflow-auto max-height-200 scrollbar">
            <div v-for="participant in this.tide.participants">
                <UserTile margin-left="20px" :username="participant.username" :avatar="participant.avatar"/>
            </div>
        </div>
        <UserToolbar :user="this.tide.user">
            <v-spacer/>
            <span v-for="genre in tide.genres" class="tag">
                {{ genre.name }}
            </span>
            <v-btn icon>
                <v-icon v-if="tide.favorited" color="red" @click="unfavorite">favorite</v-icon>
                <v-icon v-else @click="favorite">favorite</v-icon>
            </v-btn>
        </UserToolbar>
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
    },
    computed: {
      participantCount() {
        if (this.tide.participantCount > 0) {
          return this.tide.participantCount
        }
        return ''
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