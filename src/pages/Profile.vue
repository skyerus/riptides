<template>
    <div>
        <Tabs/>
        <v-flex md5 xs10 class="ma-auto">
            <router-view/>
        </v-flex>
    </div>
</template>

<script>
    import Tabs from '../components/Tabs.vue'
    import ApiUser from '../services/api/user'
    import {store} from '../store'

  export default {
    name: "Profile",
    components: {
      Tabs
    },
    methods: {
      clearProfileStore() {
        this.$store.dispatch('setFollowing', []);
        this.$store.dispatch('setNumberOfFollowing', 0);
        this.$store.dispatch('setFollowers', []);
        this.$store.dispatch('setNumberOfFollowers', 0);
        this.$store.dispatch('setUser', {});
        this.$store.dispatch('setUserFollowing', null);
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        ApiUser.getFollowingCount(to.params.username);
        ApiUser.getFollowersCount(to.params.username);
        if (to.params.username !== store.getters.username) {
          ApiUser.getUser(to.params.username);
        }
      });
    },
    beforeRouteUpdate(to, from, next) {
      if (from.params.username !== to.params.username) {
        ApiUser.getFollowingCount(to.params.username);
        ApiUser.getFollowersCount(to.params.username);
        if (to.params.username !== store.getters.username) {
          ApiUser.getUser(to.params.username);
        }
      }
      next()
    },
    beforeRouteLeave(to, from, next) {
      this.clearProfileStore();
      next()
    },
  }
</script>

<style scoped>
</style>