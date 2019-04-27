<template>
    <div>
        <v-list two-line class="mt-3 pa-0">
            <div v-for="(follow, index) in this.followList"
                 :key="index">
                <v-list-tile
                        avatar
                >
                    <v-list-tile-avatar class="ml-3 mr-3" size="50px">
                        <img :src="follow.user.avatar">
                    </v-list-tile-avatar>

                    <v-list-tile-content class="ml-2">
                        <v-list-tile-title>
                            <router-link :to="{ path: `/${follow.user.username}` }">
                                {{follow.user.username}}
                            </router-link>
                        </v-list-tile-title>
                        <v-list-tile-sub-title>{{ follow.user.bio }}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn v-if="!follow.following && follow.user.username !== $store.getters.username"
                               small color="primary"
                               @click="followUser(index, follow.user.username)">
                            follow
                        </v-btn>
                        <v-btn v-if="follow.following && follow.user.username !== $store.getters.username"
                               outline small color="primary"
                               @click="unfollowUser(index, follow.user.username)">
                            following
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
                <v-divider/>
            </div>
        </v-list>
    </div>
</template>

<script>
    import UserApi from '../services/api/user'
    import handler from '../services/api/handler'

  export default {
    name: "FollowList",
    props: [
      'followList',
      'follow'
    ],
    data() {
      return {

      }
    },
    methods: {
      followUser(index, username) {
        let params = {
          index: index,
          bool: true
        };
        UserApi.followUser(username).then(() => {
          if (this.follow === 'following') {
            this.$store.dispatch('setFollowingByIndex', params);
          } else {
            this.$store.dispatch('setFollowerByIndex', params);
          }
        }).catch((error) => {
          handler.handleResponse(error, this.followUser, [index, username]);
        })
      },
      unfollowUser(index, username) {
        let params = {
          index: index,
          bool: false
        };
        UserApi.unfollowUser(username).then(() => {
          if (this.follow === 'following') {
            this.$store.dispatch('setFollowingByIndex', params);
          } else {
            this.$store.dispatch('setFollowerByIndex', params);
          }
        }).catch((error) => {
          handler.handleResponse(error, this.unfollowUser, [index, username]);
        })
      }
    }
  }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: #bebebe;
    }
    a:hover {
        text-decoration: underline;
        cursor: default;
    }
</style>