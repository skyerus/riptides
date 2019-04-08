<template>
    <v-container justify-center>
        <v-flex xs12 sm6 offset-sm3 class="dark-text-1">
            <h2 class="mb-4">Account settings</h2>
            <h5>ACCOUNT PREFERENCES</h5>
            <v-divider class="mb-3"/>
            <h3 class="mb-3">Change email</h3>
            <h3 class="mb-3">Change username</h3>
            <h3 class="mb-3">Change password</h3>
            <h5>CONNECTED ACCOUNTS</h5>
            <v-divider class="mb-3"/>
            <v-layout row>
                <v-flex xs6 align-self-center>
                    Connect your Spotify account
                </v-flex>
                <v-flex xs6>
                    <v-btn color="success" :href="spotifyAuthorizeUrl">Spotify</v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-container>
</template>

<script>
    import SpotifyApi from '../services/api/spotify'

  export default {
    name: "Settings",
    data() {
      return {
        spotifyAuthorizeUrl: process.env.SPOTIFY_AUTHORIZE_URL,
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