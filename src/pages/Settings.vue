<template>
    <v-container justify-center>
        <v-flex xs12 sm6 offset-sm3 class="dark-text-1">
            <v-card class="dark-bg">
                <v-card-title>
                    <span class="headline">Account Settings</span>
                </v-card-title>
                <v-card-text>
                    <span>DETAILS</span>
                    <v-divider/>
                </v-card-text>
                <v-card-text>
                    <span>Change email</span>
                </v-card-text>
                <v-card-text>
                    <span>Change username</span>
                </v-card-text>
                <v-card-text>
                    <span>Change password</span>
                </v-card-text>
                <v-card-text>
                    <span>Upload avatar: </span>
                    <input type="file" accept="image/*" id="file-input">
                </v-card-text>
                <v-card-text>
                    <span>CONNECT ACCOUNTS</span>
                    <v-divider/>
                </v-card-text>
                <v-card-text>
                    <v-btn round color="success" :href="spotifyAuthorizeUrl">Spotify</v-btn>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-container>
</template>

<script>
    import SpotifyApi from '../services/api/spotify'

  export default {
    name: "Settings",
    data() {
      return {
        spotifyAuthorizeUrl: process.env.SPOTIFY_AUTHORIZE_URL || '/api/spotify/authorize',
        params: new URL(document.location).searchParams
      }
    },
    methods: {
      sendSpotifyCode() {
        if (this.params.has('error')) {
          this.$store.dispatch('showSnackbar', 'Failed to authorize with Spotify');
        } else if (this.params.has('code')) {
          SpotifyApi.authorize(this.params.get('code'))
        }
      },
    },
    mounted() {
      this.sendSpotifyCode();
    }
  }
</script>

<style scoped>
</style>