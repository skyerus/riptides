<template>
    <v-toolbar
            dense
            height="35px"
    >
        <router-link :to="`/${user.username}`">
            <v-avatar size="25px">
                <img :src="this.user.avatar">
            </v-avatar>
        </router-link>
        <span class="ml-1 small-text hover-underline pr-1">
            <router-link :to="`/${user.username}`">
            {{ this.user.username }}
            </router-link>
        </span>
        <slot/>
    </v-toolbar>
</template>

<script>
  export default {
    name: "UserToolbar",
    props: [
      'user'
    ]
  }
</script>

<style scoped>
    div a {
        text-decoration: none;
        color: #fff;
    }
</style>