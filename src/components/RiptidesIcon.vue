<template>
    <img src="../assets/img/riptides.svg" :class="{ 'float-left': floatLeft }" :style="{ height: height }" alt="riptides">
</template>

<script>
  export default {
    name: "RiptidesIcon",
    props: {
      height: {
        type: String,
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