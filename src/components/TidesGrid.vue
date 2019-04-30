<template>
    <v-layout>
        <v-flex xs1 md2></v-flex>
        <v-flex xs10 md8>
            <slot name="header"></slot>
            <v-container grid-list-lg>
                <v-layout class="pt-3" wrap>
                    <v-flex sm12 md4 v-for="tide in tides">
                        <TideIcon :tide="tide"/>
                    </v-flex>
                </v-layout>
            </v-container>
            <slot name="footer"></slot>
        </v-flex>
        <v-flex xs1 md2></v-flex>
    </v-layout>
</template>

<script>
  import TideIcon from '../components/TideIcon.vue'

  export default {
    name: "TidesGrid",
    components: {
      TideIcon
    },
    props: [
      'tides'
    ]
  }
</script>

<style scoped>

</style>