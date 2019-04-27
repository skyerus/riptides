<template>
    <div>
        <Tabs/>
        <div class="width-40 ma-auto">
            <router-view/>
        </div>
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
        this.$store.dispatch('setFollowing', null);
        this.$store.dispatch('setNumberOfFollowing', null);
        this.$store.dispatch('setFollowers', null);
        this.$store.dispatch('setNumberOfFollowers', null);
        this.$store.dispatch('setUser', null);
        this.$store.dispatch('setUserFollowing', null);
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        ApiUser.getFollowing(to.params.username);
        ApiUser.getFollowers(to.params.username);
        if (to.params.username !== store.getters.username) {
          ApiUser.getUser(to.params.username);
        }
      });
    },
    beforeRouteUpdate(to, from, next) {
      if (from.params.username !== to.params.username) {
        ApiUser.getFollowing(to.params.username);
        ApiUser.getFollowers(to.params.username);
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