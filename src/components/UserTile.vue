<template>
    <v-list-tile
        avatar
    >
        <v-list-tile-avatar class="ml-2" size="50px">
            <img :src="avatar">
        </v-list-tile-avatar>

        <v-list-tile-content class="ml-2">
            <v-list-tile-title v-text="username"></v-list-tile-title>
            <v-list-tile-sub-title v-text="bio"></v-list-tile-sub-title>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>
  export default {
    name: "UserTile",
    props: [
      'avatar',
      'username',
      'bio'
    ]
  }
</script>

<style scoped>

</style>