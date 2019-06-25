<template>
    <div>
        <FollowList :followList.sync="following" @handleFollow="handleFollow"/>
        <infinite-loading class="pt-2" @infinite="infiniteHandler"></infinite-loading>
    </div>
</template>

<script>
  import FollowList from '../components/FollowList.vue'
  import UserApi from '../services/api/user'
  import handler from '../services/api/handler'

  export default {
    name: "Following",
    components: {
      FollowList
    },
    data() {
      return {
        pageLength: 10,
        page: 0,
        following: [],
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
        UserApi.fetchFollowing(this.$route.params.username, {
          offset: this.offset,
          limit: this.pageLength,
        }).then((response) => {
          if (response.data !== null) {
            this.following.push(...response.data)
            if (response.data.length !== this.pageLength) {
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
      },
      handleFollow({index, bool}) {
        this.following[index].following = bool
      },
    },
  }
</script>

<style scoped>

</style>