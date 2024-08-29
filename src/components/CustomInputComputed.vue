<template>
  <div>
    <label :for="id">{{ labelText }}</label>
    <input :id="id" type="text" v-model="value">
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps(['id', 'labelText', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

console.log(props.id, props.labelText, props.modelValue)

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  }
})

</script>

<style scoped></style>
