<template>
  <div>
    <label :for="id">{{ labelText }}</label>
    <input :id="id" type="text" v-model="model">{{ count }}
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
const model = defineModel<string>()
const count = defineModel<number>('count')

watch (()=>model.value, (val:any)=>{
  count.value = val.length
})

defineProps(['id', 'labelText'])
</script>

<style scoped></style>
