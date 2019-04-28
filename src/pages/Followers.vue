<template>
    <div>
        <FollowList :followList="this.$store.getters.followers" follow="follower"/>
        <div class="flex-container justify-center">
            <v-btn v-if="followersRemaining" icon @click="appendFollowers">
                <v-icon class="large-icon-1">expand_more</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
  import FollowList from '../components/FollowList.vue'
  import UserApi from '../services/api/user'

  export default {
    name: "Followers",
    components: {
      FollowList
    },
    data() {
      return {
        pageLength: 10,
        page: 1,
      }
    },
    computed: {
      followersRemaining() {
        return this.$store.getters.numberOfFollowers > this.$store.getters.followers.length
      },
      offset() {
        return this.pageLength * (this.page - 1)
      },
      limit() {
        return this.pageLength * this.page
      },
    },
    methods: {
      appendFollowers() {
        this.page++
        UserApi.pushFollowers(this.$route.params.username, {
          offset: this.offset,
          limit: this.limit
        })
      }
    },
    mounted() {
      UserApi.getFollowers(this.$route.params.username, {
        offset: this.offset,
        limit: this.limit
      })
    }
  }
</script>

<style scoped>

</style>