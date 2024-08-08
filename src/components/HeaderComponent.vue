<template>
  <h1 v-if="bool" @click="str += '!'">{{ str }}</h1>
  <h1 v-else @click="str += '!'">{{ str.split('').reverse().join('') }}</h1>

  <slot></slot>

  <button v-on:click="myFunc" :style="'color:#' + color">Reverse</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const str = ref('Learn vue')
const bool = ref(true)
const color = ref(100000)

const myFunc = () => {
  bool.value = !bool.value
  color.value += 500
}

</script>

<style scoped>
h1 {
  user-select: none;
}
</style>
