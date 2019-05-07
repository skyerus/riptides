<template>
    <img src="../assets/img/riptides.svg" :class="{ 'float-left': floatLeft }" :style="{ height: height }" alt="riptides">
</template>

<script>
  export default {
    name: "RiptidesIcon",
    props: {
      height: {
        type: String,
        default: "auto"
      },
      floatLeft: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>

</style>