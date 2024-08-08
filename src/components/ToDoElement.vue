<template>
  <li>{{ index + 1 }}. {{ todo.text }}</li>
</template>

<script setup lang="ts">
defineProps(['index', 'todo'])
</script>

<style scoped>

</style>
