<template>
    <div>
        <v-navigation-drawer
            v-model="drawer"
            app
            fixed
            clipped
            class="max-height"
            id="nav-drawer"
        >
            <router-link v-for="page in pages" :to="{ path: page.url }">
                <div class="grid-container-4 pb-3 pt-3">
                    <div class="col-1 justify-self-center"><v-icon>{{ page.icon }}</v-icon></div>
                    <div class="col-2 align-self-center">{{ page.title }}</div>
                </div>
            </router-link>
        </v-navigation-drawer>
        <v-toolbar app fixed clipped-left dark id="toolbar">
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
            <router-link :to="{ path: '/tides' }">
                <div class="flex-container align-center">
                    <img class="logo ml-3" src="../assets/img/riptides.svg" alt="riptides"><span class="title mr-5 hover-cursor ml-1" >riptides</span>
                </div>
            </router-link>
            <v-text-field
                solo-inverted
                flat
                hide-details
                label="Search"
                prepend-inner-icon="search"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <Login :popupOpen="this.$store.getters.loginPopup" @event="closeLoginPopup"/>
                <Signup :popupOpen="signupPopup" @event="switchSignupPopup"/>
                <v-btn v-if="!this.$store.getters.isLoggedIn" @click="loginPopup" flat>LOG IN</v-btn>
                <v-btn v-if="!this.$store.getters.isLoggedIn" @click="signupPopup = !signupPopup" flat>SIGN UP</v-btn>
                <v-btn
                    icon
                    @click="logout()"
                    v-if="this.$store.getters.isLoggedIn"
                >
                    <v-icon>exit_to_app</v-icon>
                </v-btn>
                <router-link
                    v-if="this.$store.getters.isLoggedIn"
                    :to="{ path: '/' + this.$store.getters.username }">
                    <v-btn
                        icon
                    >
                        <v-avatar size="50px">
                            <img :src="this.$store.getters.myUser.avatar">
                        </v-avatar>
                    </v-btn>
                </router-link>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <v-container dark fluid class="pa-0">
                <slot></slot>
            </v-container>
        </v-content>
        <v-snackbar
                v-model="snackbarActive"
                bottom
                right
                :timeout="timeout"
        >
            {{ snackbarText }}
            <v-btn
                    color="pink"
                    flat
                    @click="closeSnackbar"
            >
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
  import Login from './Login.vue';
  import Signup from './Signup.vue';
  import handler from '../services/api/handler'

  export default {
    name: "Layout",
    components: {
      Login,
      Signup
    },
    data() {
      return {
        drawer: false,
        signupPopup: false,
        timeout: 3000
      }
    },
    computed: {
      snackbarText: {
        get() {
          return this.$store.getters.snackbarText;
        }
      },
      snackbarActive: {
        get() {
          return this.$store.getters.snackbarActive;
        },
        set() {
          this.$store.dispatch('hideSnackbar');
        }
      },
      pages: {
        get() {
          return [
            {
              title: 'Tides',
              icon: 'queue_music',
              url: '/tides'
            },
            {
              title: 'Discover',
              icon: 'my_location',
              url: '/discover'
            },
            {
              title: 'Settings',
              icon: 'settings',
              url: '/settings'
            }
          ]
        }
      }
    },
    methods: {
      loginPopup() {
        this.$store.dispatch('switchLoginPopup', true);
      },
      closeLoginPopup() {
        this.$store.dispatch('switchLoginPopup', false);
      },
      switchSignupPopup() {
        this.signupPopup = !this.signupPopup;
      },
      logout() {
        Promise.all([
          this.$store.dispatch('resetUserState'),
          this.$store.dispatch('resetIndexState')
        ]).then(() => {
          this.$socket.close();
          this.$socket.io.opts.query = {token: this.$store.getters.headers.Authorization};
          this.$socket.open();
          this.$router.push({name: 'home'});
        })
      },
      closeSnackbar() {
        this.$store.dispatch('hideSnackbar');
      }
    },
    sockets: {
      notAuthenticated: function (data) {
        if (this.$store.getters.isLoggedIn) {
          handler.handleSocketError(401);
        }
      },
      notification: function (data) {
        console.log(data)
        this.$store.dispatch('showSnackbar', data)
      },
    }
  }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: #fff;
    }
    .col-1 {
        grid-column-start: 1;
        grid-column-end: 2;
    }
    .col-2 {
        grid-column-start: 2;
        grid-column-end: 5;
    }
</style>