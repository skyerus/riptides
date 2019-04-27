<template>
    <FollowList :followList="this.$store.getters.following" follow="following"/>
</template>

<script>
    import FollowList from '../components/FollowList.vue';

  export default {
    name: "Following",
    components: {
      FollowList
    },
  }
</script>

<style scoped>

</style>