<template>
  <div>
    <template v-if="!id">
      <h1>Books</h1>
      <div v-for="el of arr" :key="el.id">
        <RouterLink :to="'/books/'+el.id">{{el.title}}</RouterLink>
      </div>
    </template>
    <template v-else-if="isTrue">
      <h1>{{ arr[+id].title }}</h1>
      <p>{{ arr[+id].author }}</p>
      <button>Buy</button>
      <button>Order</button>
    </template>
    <template v-else>
      <h1>Not found</h1>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  id: String
})


const arr = [
  { title: "Гроза", author:'Александр Островский', id:0},
  {
    title: "Морфий", author:'Михаил Булгаков', id:1},
  {
    title: "Капитанская дочка", author: 'Александр Пушкин', id:2},
  {
    title: "Скандал на драконьем факультете", author: 'Тальяна Орлова', id:3},
  {
    title: "Братья Карамазовы", author: 'Федор Достоевский', id:4},
  {
    title: "Люди сороковой мили (спектакль)", author: 'Джек Лондон', id:5},
]
const isTrue = computed(()=>{
  const id = props.id
  if (id && (+id).toString()!=id) {
    return false
  }
  if (id && (+id<arr.length)) {
    return true
  }
  return false
})
</script>

<style scoped></style>