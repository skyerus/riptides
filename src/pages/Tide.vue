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
                    <v-divider class="mb-3"/>
                    <div>
                        <v-text-field
                                v-model="message"
                                outline
                                label="Message"
                                append-icon="send"
                                @click:append="sendMessage"
                        ></v-text-field>
                    </div>
                </div>
                <div>
                    {{ this.msg }}
                </div>
            </div>
        </div>
        <div class="d-inline-block vertical-align-top r-sidebar row-3 pr-2 dark-bg-0">
            <div class="pa-2">
                Test
            </div>
        </div>
    </div>
</template>

<script>
  import handler from '../services/api/handler'

  export default {
    name: "Tide",
    data() {
      return {
        message: '',
        msg: '123'
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
        console.log('send');
        this.$socket.emit('message', this.message)
      },

      joinTide() {
        this.$socket.emit('join', 'testing')
      }
    },
    sockets: {
      message: function (data) {
        this.msg = data.msg;
      },
      test: function (data) {
        console.log(`User receives: ${data.msg}`);
      },
      error: function (data) {
        handler.handleSocketError(data);
      },
    },
    watch: {
      isLoggedIn(val) {
        if (val) {
          this.joinTide();
        }
      }
    },
    mounted() {
      this.joinTide();
    }
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
        flex-grow: 2;
    }
    .row-2 {
        flex-grow: 8;
    }
    .row-3 {
        flex-grow: 2;
    }
</style>