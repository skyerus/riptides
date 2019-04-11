<template>
    <v-toolbar
            dense
            height="35px"
    >
        <v-avatar size="25px">
            <img :src="this.user.avatar">
        </v-avatar>
        <span class="ml-1 small-text">
            {{ this.user.username }}
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

</style>