<template>
    <div class="overflow-auto" ref="chat">
        <template v-for="(item, index) in logs">
            <v-subheader v-if="item.type === 'standard'" :key="index" class="medium-text">{{ item.message }}</v-subheader>
            <div v-if="item.type === 'italic'" :key="index" class="font-italic pl-3 small-text">{{ item.message }}</div>
            <v-divider class="mb-2 mt-2"/>
        </template>
    </div>
</template>

<script>
  export default {
    name: "Messages",
    props: [
      'logs',
    ],
    data() {
      return {
        scrolled: false,
        maxScrollTop: 0
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
      }
    },
    watch: {
      logs() {
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
</style>