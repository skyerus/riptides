<template>
    <v-dialog
            v-model="open"
            width="500"
    >
        <v-card>
            <v-card-title>
                <span class="headline">Sign up</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field label="Username" type="username" v-model="username" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Email" type="email" v-model="email" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Password" type="password" v-model="password" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            {{ this.$store.getters.signupError }}
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="open = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="signup()">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import UserApi from '../services/api/user'

  export default {
    name: "Signup",
    props: [
      'popupOpen'
    ],
    computed: {
      username: {
        get() {
          return this.$store.getters.username;
        },
        set(value) {
          this.$store.dispatch('updateUsername', value);
        }
      },
      email: {
        get() {
          return this.$store.getters.email;
        },
        set(value) {
          this.$store.dispatch('updateEmail', value);
        }
      }
    },
    data() {
      return {
        open: this.popupOpen,
        password: ''
      }
    },
    watch: {
      popupOpen(val){
        if (val !== this.open) {
          this.open = val;
        }
      },
      open(val){
        if (this.open !== this.popupOpen) {
          this.$emit('event');
        }
      }
    },
    methods: {
      signup() {
        UserApi.signup(this.password).then((response) => {
          UserApi.login(this.password).then((response) => {
            this.$store.dispatch('toggleLoggedIn', true);
            this.$store.dispatch('updateToken', response.data.token);
            this.$store.dispatch('showSnackbar', 'Welcome ' + this.$store.getters.username);
            this.open = false;
          }).catch(() => {

          });
          this.password = '';
        });
      }
    }
  }
</script>

<style scoped>
</style>