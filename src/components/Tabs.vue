<template>
    <div class="flex-container">
        <div class="flex-col flex-container justify-end">
            <div class="flex-container pr-5 pt-1 align-center">
                <UserTile :username="this.getUser().username"
                          :bio="this.getUser().bio"
                          :avatar="this.getUser().avatar"
                          style="text-transform: none !important;"
                />
                <div v-if="$route.params.username !== $store.getters.username">
                    <v-btn v-if="$store.getters.isFollowing" class="small-btn" outline color="primary" @click="unfollow(user.username)">
                        following
                    </v-btn>
                    <v-btn v-else color="primary" class="small-btn" @click="follow(user.username)">
                        follow
                    </v-btn>
                </div>
            </div>
        </div>
        <div class="flex-col">
            <v-tabs
                    fixed-tabs
                    icons-and-text
                    color="#303030"
                    class="mt-0 pt-0"
                    height="55px"
                    show-arrows
            >
                <v-tab
                        :key="index"
                        v-for="(tab, index) in tabs"
                        :to="{ path: `/${$route.params.username}${tab.url}` }"
                >
                    <div>{{ tab.text }}</div>
                    <p v-if="tab.number !== null" class="pt-0 pl-0 pr-0 pb-1 ma-0 large-text">{{ tab.number }}</p>
                    <v-icon v-if="tab.number === null">{{ tab.icon }}</v-icon>
                </v-tab>
            </v-tabs>
        </div>
        <div class="flex-col">
        </div>
    </div>
</template>

<script>
    import UserApi from '../services/api/user'
    import handler from '../services/api/handler'
    import UserTile from './UserTile.vue'

  export default {
    name: "Tabs",
    components: {UserTile},
    data() {
      return {
        tabs: [
          {
            number: null,
            text: 'tides',
            icon: 'queue_music',
            url: '/tides'
          },
          {
            number: null,
            text: 'favorites',
            icon: 'favorite',
            url: '/favorites'
          },
          {
            number: this.$store.getters.numberOfFollowing,
            text: 'following',
            icon: 'person',
            url: '/following'
          },
          {
            number: this.$store.getters.numberOfFollowers,
            text: 'followers',
            icon: 'person_outline',
            url: '/followers'
          }
        ],
      }
    },
    computed: {
      numberOfFollowing: {
        get() {
          return this.$store.getters.numberOfFollowing
        }
      },
      numberOfFollowers: {
        get() {
          return this.$store.getters.numberOfFollowers
        }
      },
      user: {
        get() {
          return this.$store.getters.user
        }
      },
      myUser: {
        get() {
          return this.$store.getters.myUser
        }
      }
    },
    watch: {
      numberOfFollowing: function(val) {
        this.tabs[2].number = val;
      },

      numberOfFollowers: function(val) {
        this.tabs[3].number = val;
      },
    },
    methods: {
      getUser() {
        if (this.$route.params.username === this.$store.getters.username) {
          return this.myUser;
        }
        return this.user;
      },

      follow(username) {
        UserApi.followUser(username).then(() => {
          this.$store.dispatch('followUser', true);
          this.tabs[3].number++;
        }).catch((error) => {
          handler.handleResponse(error, this.follow, [username]);
        })
      },

      unfollow(username) {
        UserApi.unfollowUser(username).then(() => {
          this.$store.dispatch('followUser', false);
          this.tabs[3].number--;
        }).catch((error) => {
          handler.handleResponse(error, this.unfollow, [username]);
        })
      }
    },
  }
</script>

<style scoped>
    .flex-col {
        flex: 4 0 33.33%;
    }
</style>