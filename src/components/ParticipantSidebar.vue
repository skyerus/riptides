<template>
    <div>
        <div v-for="(participant, index) in participants" class="pb-3">
            <UserTile :username="index" :bio="participant.bio" :avatar="participant.avatar"/>
        </div>
    </div>
</template>

<script>
  import UserTile from './UserTile.vue'

  export default {
    name: "ParticipantSidebar",
    components: {
      UserTile
    },
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