<template>
  <div>
  <h1 v-highlight>About</h1>
  <p>local {{ localCount }} <button @click="localCount++">incr</button></p>
  <p v-color="'#' + globalCount.toString().padStart(6,'0')" style="color: white;">global {{ globalCount }} <button @click="globalCount+=50">incr</button></p>
  </div>
</template>

<script setup lang="ts">
import { useCount } from '#root/composables/counter'

const { globalCount, localCount } = useCount()



</script>

<style scoped></style>