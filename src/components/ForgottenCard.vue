<template>
    <v-card>
        <v-card-title>
            <span class="headline">Forgotten password</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field label="Username"
                                      type="username"
                                      v-model="username"
                                      required
                                      :error-messages="usernameErrors"
                                      @input="$v.username.$touch()"
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <span class="red--text">
                            {{ this.$store.getters.formError }}
                        </span>
                    </v-flex>
                    <v-flex xs12>
                        {{ this.resetFeedback }}
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="$emit('back')" flat>Back</v-btn>
            <v-btn color="blue darken-1" flat @click="requestReset">Reset</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {required, minLength, maxLength} from 'vuelidate/lib/validators'
  import UserApi from '../services/api/user'

  export default {
    name: "ForgottenCard",
    mixins: [validationMixin],
    validations: {
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20)
      },
    },
    data() {
      return {
        username: '',
        resetFeedback: ''
      }
    },
    computed: {
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
    },
    methods: {
      requestReset() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          return this.$store.dispatch('formError', {
            message: 'Please fill in the form correctly',
            timeout: 3000
          })
        }
        UserApi.requestResetPassword(this.username).then((res) => {
          this.resetFeedback = res.data.message
        }).catch((err) => {
          this.resetFeedback = err.response.data.message
        })
        setTimeout(this.resetFeedback = '', 6000)
      }
    }
  }
</script>

<style scoped>

</style>