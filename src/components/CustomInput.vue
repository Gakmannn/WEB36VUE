<template>
  <div>
    <label :for="id">{{ labelText }}</label>
    <input :id="id" type="text" :value="modelValue" @input="$emit('update:modelValue', ($event?.target as HTMLInputElement).value)">
  </div>
</template>

<script setup lang="ts">
defineProps(['id', 'labelText', 'modelValue'])
defineEmits(['update:modelValue'])
</script>

<style scoped></style>
