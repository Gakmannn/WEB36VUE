<template>
  <li>{{ index + 1 }}. {{ todo.text }} 
    <button v-if="func" @click="func(index)">
      <slot></slot>
    </button>
    <button @click="$emit('textUp',2,12,3,1,3543)">+</button>
    <button @click="$emit('textDown',1)">-</button>
  </li>
</template>

<script setup lang="ts">
defineProps(['index', 'todo', 'func'])
defineEmits(['textUp', 'textDown'])
</script>

<style scoped>

</style>
