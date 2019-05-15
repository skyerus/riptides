<template>
    <v-app dark>
        <v-content>
            <section>
                <v-parallax :src="require('../assets/img/home-bg.png')" height="600">
                    <v-layout
                            column
                            align-center
                            justify-center
                            class="white--text"
                    >
                        <RiptidesIcon class="vertical-align-middle" height="100px"/>
                        <v-btn
                                class="blue lighten-2 mt-5"
                                dark
                                large
                                to="/tides"
                        >
                            Listen together
                        </v-btn>
                    </v-layout>
                </v-parallax>
            </section>
            <section id="info-section">
                <v-layout
                        column
                        wrap
                        class="my-5"
                        align-center
                >
                    <v-flex xs12>
                        <v-container grid-list-xl>
                            <v-layout row wrap align-center>
                                <v-flex xs12 md4>
                                    <v-card class="elevation-0 transparent">
                                        <v-card-text class="text-xs-center">
                                            <v-icon x-large class="blue--text text--lighten-2">$vuetify.icons.spotify</v-icon>
                                        </v-card-text>
                                        <v-card-title primary-title class="layout justify-center">
                                            <div class="headline text-xs-center">Spotify</div>
                                        </v-card-title>
                                        <v-card-text class="text-xs-center">
                                            Connect your account to stream alongside others.
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-card class="elevation-0 transparent">
                                        <v-card-text class="text-xs-center">
                                            <v-icon x-large class="blue--text text--lighten-2">group</v-icon>
                                        </v-card-text>
                                        <v-card-title primary-title class="layout justify-center">
                                            <div class="headline">Find a tide</div>
                                        </v-card-title>
                                        <v-card-text class="text-xs-center">
                                            If you can't find a tide to suit your music tastes, create one.
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-card class="elevation-0 transparent">
                                        <v-card-text class="text-xs-center">
                                            <v-icon x-large class="blue--text text--lighten-2">queue</v-icon>
                                        </v-card-text>
                                        <v-card-title primary-title class="layout justify-center">
                                            <div class="headline text-xs-center">Contribute</div>
                                        </v-card-title>
                                        <v-card-text class="text-xs-center">
                                            Add songs to the communal queue & enjoy what others have to share.
                                        </v-card-text>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-flex>
                </v-layout>
            </section>
            <section>
                <div class="flex flex-col">
                    <div class="flex-item">
                        <v-parallax :src="require('../assets/img/home-bg.png')" :height="height">
                        </v-parallax>
                    </div>
                </div>
            </section>
        </v-content>
    </v-app>
</template>

<script>
  import RiptidesIcon from '../components/RiptidesIcon.vue'

  export default {
    name: "Home",
    components: {
      RiptidesIcon
    },
    data() {
      return {
        title: 'Your logo',
        height: '10px'
      }
    },
    mounted() {
      this.height = document.body.clientHeight - document.getElementById('info-section').getBoundingClientRect().bottom
    }
  }
</script>

<style scoped>
    .flex-col {
        flex-direction: column;
    }
    .flex-item {
        flex-grow: 1;
    }
</style>