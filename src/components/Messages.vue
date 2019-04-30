<template>
    <div class="overflow-auto scrollbar-light" ref="chat">
        <template v-for="(item, index) in logs">
            <div>
                <router-link v-if="typeof item.username !== 'undefined'" :to="`/${item.username}`">
                    <v-list-tile-avatar
                            v-if="typeof item.avatar !== 'undefined'"
                            class="ml-2 center-block"
                            size="40px"
                    >
                        <img :src="item.avatar">
                    </v-list-tile-avatar>
                </router-link>
                <div class="center-block">
                    <router-link v-if="typeof item.username !== 'undefined'" :to="`/${item.username}`">
                        <h3 class="font-weight-bold dark-text-3 hover-cursor hover-underline">
                            {{ item.username }}
                        </h3>
                    </router-link>
                    <div v-for="message in item.message">
                        <div v-if="item.type === 'standard'" :key="index" class="medium-text">{{ message }}</div>
                        <div v-if="item.type === 'italic'">
                            <div :key="index" :class="{ 'pl-3': typeof item.avatar === 'undefined'}" class="font-italic small-text"
                            >
                                {{ message }}
                            </div>
                        </div>
                    </div>
                </div>
                <v-divider class="mb-2 mt-2"/>
            </div>
        </template>
    </div>
</template>

<script>
  export default {
    name: "Messages",
    props: [
      'logs',
      'logsUpdate'
    ],
    data() {
      return {
        scrolled: false,
        maxScrollTop: 0,
      }
    },
    methods: {
      updateScroll(scrolled) {
        if (!scrolled) {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
        }
        this.maxScrollTop = this.$refs.chat.scrollHeight - this.$refs.chat.clientHeight;
      },

      scroll() {
        if (this.$refs.chat.scrollTop !== this.maxScrollTop) {
          this.scrolled = true;
          return;
        }
        this.scrolled = false;
      },
    },
    watch: {
      logsUpdate() {
        setTimeout(() => this.updateScroll(this.scrolled), 0);
      }
    },
    mounted() {
      this.$refs.chat.addEventListener('scroll', () => this.scroll());
    },
    beforeDestroy() {
      this.$refs.chat.removeEventListener('scroll', () => this.scroll());
    }
  }
</script>

<style scoped>
    div a {
        text-decoration: none;
    }
</style>