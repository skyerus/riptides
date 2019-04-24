<template>
    <div :class="{'text-center': center}" :style="{ marginLeft: marginLeft }">
        <v-avatar class="center-block" :size="imageSize">
            <img :src="avatar">
        </v-avatar>
        <div class="center-block" :style="gapStyle">
            <div :style="usernameStyle" :class="{ 'font-weight-bold': usernameBold }">
                {{ username }}
            </div>
            <div v-if="typeof bio !== 'undefined'">
                {{ bio }}
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "UserTile",
    props: {
      avatar: {
        type: String
      },
      username: {
        type: String
      },
      bio: {
        type: String
      },
      imageSize: {
        type: String,
        default: '50px'
      },
      center: {
        type: Boolean,
        default: false
      },
      usernameSize: {
        type: String,
        default: '16px'
      },
      gap: {
        type: String,
        default: '12px'
      },
      usernameColor: {
        type: String,
        default: '#FFF'
      },
      usernameBold: {
        type: Boolean,
        default: false
      },
      marginLeft: {
        type: String,
        default: '0px'
      }
    },
    data() {
      return {
        usernameStyle: {
          fontSize: this.usernameSize,
          color: this.usernameColor
        },
        gapStyle: {
          marginLeft: this.gap
        },
      }
    }
  }
</script>

<style scoped>

</style>