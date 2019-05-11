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
                            <v-text-field
                                    label="Username"
                                    type="username"
                                    v-model="username"
                                    @input="$v.username.$touch()"
                                    required
                                    :error-messages="usernameErrors"
                            >
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field label="Email"
                                          type="email"
                                          v-model="email"
                                          @input="$v.email.$touch()"
                                          required
                                          :error-messages="emailErrors"
                            >
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    label="Password"
                                    type="password"
                                    v-model="password"
                                    @input="$v.password.$touch()"
                                    required
                                    :error-messages="passwordErrors"
                            >
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field
                                    label="Confirm password"
                                    type="password"
                                    v-model="confirmPassword"
                                    @input="$v.confirmPassword.$touch()"
                                    @keyup.enter="signup"
                                    :error-messages="confirmPasswordErrors"
                                    required
                            >
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <span class="red--text">
                                {{ this.$store.getters.signupError }}
                            </span>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="open = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="signup">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  import UserApi from '../services/api/user'
  import { validationMixin } from 'vuelidate'
  import {required, minLength, maxLength, email, sameAs} from 'vuelidate/lib/validators'

  export default {
    name: "Signup",
    props: [
      'popupOpen'
    ],
    mixins: [validationMixin],
    validations: {
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20)
      },
      email: {
        required,
        email,
        maxLength: maxLength(40)
      },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(255)
      },
      confirmPassword: {
        sameAs: sameAs('password')
      }
    },
    computed: {
      username: {
        get() {
          return this.$store.getters.usernameInput;
        },
        set(value) {
          this.$store.dispatch('updateUsernameInput', value);
        }
      },
      email: {
        get() {
          return this.$store.getters.emailInput;
        },
        set(value) {
          this.$store.dispatch('updateEmailInput', value);
        }
      },
      emailErrors() {
        let errors = []
        if (!this.$v.email.$dirty) {
          return errors
        }
        if (!this.$v.email.email) {
          errors.push('Must be a valid email')
        }
        if (!this.$v.email.required) {
          errors.push('Email is required')
        }
        return errors
      },
      usernameErrors() {
        let errors = []
        if (!this.$v.username.$dirty) {
          return errors
        }
        if (!this.$v.username.minLength || !this.$v.username.maxLength) {
          errors.push(`Username must be between ${this.$v.username.$params.minLength.min} and
            ${this.$v.username.$params.maxLength.max} characters.`
          )
        }
        if (!this.$v.username.required) {
          errors.push('Username is required')
        }
        return errors
      },
      passwordErrors() {
        let errors = []
        if (!this.$v.password.$dirty) {
          return errors
        }
        if (!this.$v.password.minLength) {
          errors.push(`Password must be at least ${this.$v.password.$params.minLength.min} characters.`
          )
        }
        if (!this.$v.password.required) {
          errors.push('Password is required')
        }
        return errors
      },
      confirmPasswordErrors() {
        let errors = []
        if (!this.$v.confirmPassword.$dirty) {
          return errors
        }
        if (!this.$v.confirmPassword.sameAs) {
          errors.push(`Passwords don't match`)
        }
        return errors
      }
    },
    data() {
      return {
        open: this.popupOpen,
        password: '',
        confirmPassword: '',
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
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.$store.dispatch('signupError', 'Please fill in the form correctly')
          setTimeout(() => { this.$store.dispatch('signupError', '') }, 5000)
          return
        }
        UserApi.signup(this.password).then((response) => {
          UserApi.login(this.password).then((response) => {
            this.$store.dispatch('updateToken', response.data.token).then(() => {
              UserApi.getMyConfig().then(() => {
                this.$store.dispatch('toggleLoggedIn', true).then(() => {
                  this.open = false;
                  this.$router.push({path: '/tides'})
                  this.password = '';
                });
              });
            });
            this.$store.dispatch('showSnackbar', 'Welcome ' + this.$store.getters.usernameInput);
          }).catch(() => {
          });
        });
      },
    }
  }
</script>

<style scoped>
</style>