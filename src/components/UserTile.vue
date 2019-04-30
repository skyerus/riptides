<template>
    <div :class="{'text-center': center}" :style="{ marginLeft: marginLeft }">
        <router-link :to="`/${this.username}`">
            <v-avatar
                    class="center-block"
                    :size="imageSize"
            >
                <img :src="avatar">
            </v-avatar>
        </router-link>
        <div class="center-block" :style="gapStyle">
            <div :style="usernameStyle"
                 :class="{ 'font-weight-bold': usernameBold }"
                 class="hover-underline hover-cursor"
            >
                <router-link :to="`/${this.username}`">
                    {{ username }}
                </router-link>
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
    },
  }
</script>

<style scoped>
    div a {
        text-decoration: none;
        color: #fff;
    }
</style>