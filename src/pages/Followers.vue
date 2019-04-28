<template>
    <div>
        <FollowList :followList="this.$store.getters.followers" follow="follower"/>
        <infinite-loading class="pt-2" @infinite="infiniteHandler"></infinite-loading>
    </div>
</template>

<script>
  import FollowList from '../components/FollowList.vue'
  import UserApi from '../services/api/user'
  import handler from '../services/api/handler'

  export default {
    name: "Followers",
    components: {
      FollowList
    },
    data() {
      return {
        pageLength: 10,
        page: 0,
        followers: [],
      }
    },
    computed: {
      offset() {
        return this.pageLength * (this.page - 1)
      },
    },
    methods: {
      infiniteHandler($state) {
        this.page++
        UserApi.fetchFollowers(this.$route.params.username, {
          offset: this.offset,
          limit: this.pageLength,
        }).then((response) => {
          if (response.data.followers.length) {
            this.followers.push(...response.data.followers)
            if (response.data.followers.length !== this.pageLength) {
              return $state.complete()
            }
            $state.loaded()
          } else {
            this.page--
            $state.complete()
          }
        }).catch((err) => {
          this.page--
          handler.handleResponse(err, this.infiniteHandler, [$state])
        })
      }
    },
  }
</script>

<style scoped>

</style>