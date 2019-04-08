<template>
    <div class="height-95 flex-container">
        <div class="d-inline-block vertical-align-top l-sidebar row-1 pl-2 dark-bg-0">
            <div class="pa-2">
                Test
            </div>
        </div>
        <div class="d-inline-block row-2 pl-2 pr-2">
            <div class="flex-container flex-col-reverse height-95">
                <div>
                    <div>
                        <v-text-field
                                v-model="message"
                                outline
                                label="Message"
                                append-icon="send"
                                @click:append="sendMessage"
                                @keyup.enter="sendMessage"
                        ></v-text-field>
                    </div>
                </div>
                <Messages ref="messages" :logs="this.logs"/>
            </div>
        </div>
        <div class="d-inline-block vertical-align-top r-sidebar row-3 pr-2 dark-bg-0 overflow-auto">
            <ParticipantSidebar :participants="this.participants" />
        </div>
    </div>
</template>

<script>
  import handler from '../services/api/handler'
  import Messages from '../components/Messages.vue'
  import ParticipantSidebar from '../components/ParticipantSidebar.vue'

  export default {
    name: "Tide",
    components: {
      Messages,
      ParticipantSidebar
    },
    data() {
      return {
        message: '',
        logs: [],
        participants: {}
      }
    },
    computed: {
      isLoggedIn: {
        get() {
          return this.$store.getters.isLoggedIn
        }
      }
    },
    methods: {
      sendMessage() {
        this.$socket.emit('message', this.message)
      },

      joinTide() {
        this.$socket.emit('join', {
          room: 'testing',
          user: this.$store.getters.myUser
        })
      },
    },
    sockets: {
      message: function (data) {
        this.logs.push(data);
        this.message = ''
      },

      error: function (data) {
        handler.handleSocketError(data);
      },

      join: function (data) {
        console.log(data.user.username);
        let username = data.user.username;
        if (username.length > 0) {
          this.logs.push({
            type: 'italic',
            message: `${username} joined`
          })
          delete data.user.username;
          this.$set(this.participants, username, data.user);
        }
      },

      leave: function (data) {
        if (data.length > 0) {
          this.logs.push({
            type: 'italic',
            message: `${data} left`
          })
          this.$delete(this.participants, data);
        }
      },

      participants: function (data) {
        let username;
        data.forEach((participant) => {
          username = participant.username;
          delete participant.username;
          this.$set(this.participants, username, participant)
        })
      },

      reconnect: function () {
        this.$socket.emit('join', {
          room: 'testing',
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
      this.joinTide();
    },
  }
</script>

<style scoped>
    .flex-container {
        display: flex;
    }
    .flex-col-reverse {
        flex-direction: column-reverse;
    }
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
</style>