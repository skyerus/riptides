<template>
    <v-container justify-center>
        <v-flex xs12 sm6 offset-sm3 class="dark-text-1">
            <v-card class="dark-bg">
                <v-card-title>
                    <v-layout>
                        <v-flex xs12 md10 offset-md1>
                            <span class="headline">Reset Password</span>
                        </v-flex>
                    </v-layout>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 md10 offset-md1>
                                <v-text-field
                                        label="New password"
                                        type="password"
                                        v-model="password"
                                        @input="$v.password.$touch()"
                                        required
                                        :error-messages="passwordErrors"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 md10 offset-md1>
                                <v-text-field
                                        label="Confirm new password"
                                        type="password"
                                        v-model="confirmPassword"
                                        @input="$v.confirmPassword.$touch()"
                                        @keyup.enter="signup"
                                        :error-messages="confirmPasswordErrors"
                                        required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 md10 offset-md1>
                                <span class="red--text">
                                    {{ this.$store.getters.formError }}
                                </span>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-layout>
                        <v-flex xs12 md10 offset-md1>
                            <v-btn class="float-right" color="blue darken-1" flat @click="save">Save</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {required, minLength, maxLength, sameAs} from 'vuelidate/lib/validators'
  import UserApi from '../services/api/user'

  export default {
    name: "ForgotPassword",
    mixins: [validationMixin],
    validations: {
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(255)
      },
      confirmPassword: {
        required,
        sameAs: sameAs('password')
      }
    },
    data() {
      return {
        password: '',
        confirmPassword: '',
        params: new URL(document.location).searchParams,
      }
    },
    computed: {
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
      },
    },
    methods: {
      save() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          return this.$store.dispatch('formError', {
            message: 'Please fill in the form correctly',
            timeout: 3000
          })
        }
        if (!this.params.has('username') || !this.params.has('token')) {
          return this.$store.dispatch('formError', {
            message: 'This link is invalid',
            timeout: 3000
          })
        }
        UserApi.resetPassword(this.params.get('username'), this.params.get('token'), this.password).then(() => {
          this.$store.dispatch('showSnackbar', 'Password change successful')
          this.$router.push('/tides')
          this.$store.dispatch('switchLoginPopup', true)
        }).catch((error) => {
          if (error.response.status === 401) {
            this.$store.dispatch('formError', {
              message: error.response.data.message,
              timeout: 3000
            })
          } else {
            this.$store.dispatch('showSnackbar', 'Oops, something went wrong. Please try again later');
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>