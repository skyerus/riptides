<template>
    <div class="max-height flex-container">
        <div class="vertical-align-top l-sidebar row-1 pl-2 dark-bg-0">
            <QueueSidebar :queue="this.queue"/>
        </div>
        <div class="row-2 pl-2 pr-2">
            <div class="flex-container flex-col-reverse max-height">
                <div>
                    <div class="pb-1">
                        <v-text-field
                            v-model="message"
                            outline
                            single-line
                            :label="inputPlaceholder"
                            append-icon="send"
                            @click:append="handleMessage"
                            @keyup.enter="handleMessage"
                        >
                            <template v-slot:prepend-inner>
                                <v-icon class="pr-1" :class="{ 'riptides-icon': spin }" @click="toggleMessage">
                                    $vuetify.icons.riptides
                                </v-icon>
                            </template>
                        </v-text-field>
                    </div>
                </div>
                <Messages ref="messages" :logsUpdate="logsUpdate" :logs="logs"/>
            </div>
        </div>
        <div class="vertical-align-top r-sidebar row-3 pr-2 dark-bg-0 overflow-auto">
            <ParticipantSidebar :participants="this.participants"/>
        </div>
    </div>
</template>

<script>
  import handler from '../services/api/handler'
  import Messages from '../components/Messages.vue'
  import ParticipantSidebar from '../components/ParticipantSidebar.vue'
  import QueueSidebar from '../components/QueueSidebar.vue'

  export default {
    name: "Tide",
    components: {
      Messages,
      ParticipantSidebar,
      QueueSidebar,
    },
    data() {
      return {
        message: '',
        logs: [],
        participants: {},
        queue: [],
        logsUpdate: false,
        playText: false,
        spin: false,
      }
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
      },
      inputPlaceholder() {
        return this.playText ? 'Enter a song' : 'Enter a message'
      }
    },
    methods: {
      handleMessage() {
        if (this.message === '') {
          return
        }
        if (this.playText) {
          this.$socket.emit('play', this.message)
          this.message = ''
        } else {
          this.$socket.emit('message', this.message)
        }
      },

      joinTide() {
        this.$socket.emit('join', {
          tide: this.$route.params.id,
          user: this.$store.getters.myUser
        })
      },

      // Hack to deal with toolbar inconsistent height
      calculateHeight() {
        let toolbarHeight = document.getElementById('toolbar').getBoundingClientRect().bottom
        let availableHeight = window.innerHeight - toolbarHeight
        let maxHeight = document.getElementsByClassName('max-height')

        for(let i=0; i < maxHeight.length; i++) {
          maxHeight[i].style.height = `${availableHeight}px`
        }
      },

      toggleMessage() {
        if (!this.spin) {
          this.spin = true
          setTimeout(() => { this.spin = false }, 1000)
          this.playText = !this.playText
        }
      }
    },
    sockets: {
      message: function (data) {
        data.message = [data.message]
        if (typeof data.username !== 'undefined') {
          data.avatar = this.participants[data.username].avatar;
          if (data.username === this.$store.getters.username) {
            this.message = ''
          }

          let logsLength = this.logs.length
          if (typeof this.logs[logsLength - 1].username !== 'undefined'
            && this.logs[logsLength - 1].username === data.username
            && this.logs[logsLength - 1].type === data.type) {
            this.logs[logsLength - 1].message.push(data.message[0])
            this.logsUpdate = !this.logsUpdate
            return
          }
        }
        this.logsUpdate = !this.logsUpdate
        this.logs.push(data);
      },

      error: function (data) {
        handler.handleSocketError(data);
      },

      join: function (data) {
        let username = data.user.username;
        if (username.length > 0) {
          this.logs.push({
            type: 'italic',
            message: [`${username} joined`]
          })
          delete data.user.username;
          this.$set(this.participants, username, data.user);
        }
      },

      leave: function (data) {
        if (data.length > 0) {
          this.logs.push({
            type: 'italic',
            message: [`${data} left`]
          })
          this.$delete(this.participants, data);
        }
      },

      participants: function (data) {
        let username;
        data.forEach((participant) => {
          if (participant !== null) {
            username = participant.username
            delete participant.username;
            this.$set(this.participants, username, participant)
          }
        })
      },

      queue: function (data) {
        this.queue = data
      },

      reconnect: function () {
        this.$socket.emit('join', {
          tide: this.$route.params.id,
          user: this.$store.getters.myUser
        })
      }
    },
    watch: {
      isLoggedIn(val) {
        if (val) {
          this.joinTide();
        }
      },
    },
    mounted() {
      this.calculateHeight()
      document.getElementById('nav-drawer').style.backgroundColor = '#303030'
      this.joinTide()
      this.$nextTick(() => {
        window.addEventListener('resize', this.calculateHeight)
      })
    },

    beforeDestroy() {
      document.getElementById('nav-drawer').style.backgroundColor = '#424242'
      window.removeEventListener('resize', this.calculateHeight)
      this.$socket.emit('leave')
    }
  }
</script>

<style scoped>
    .r-sidebar {
        border-left: hsla(0, 0%, 100%,.12) 1px solid;
    }
    .l-sidebar {
        border-right: hsla(0, 0%, 100%,.12) 1px solid;
    }
    .row-1 {
        flex: 2 0 16%;
    }
    .row-2 {
        flex: 8 0 68%;
    }
    .row-3 {
        flex: 2 0 16%;
    }
    @keyframes spin {
        from {
            transform:rotate(0deg);
        }
        to {
            transform:rotate(360deg);
        }
    }
    .riptides-icon {
        animation-name: spin;
        animation-duration: 1000ms;
        animation-iteration-count: infinite;
    }
</style>