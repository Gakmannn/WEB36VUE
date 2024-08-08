<template>

  <HeaderComp>
    <p>Вложенный тег</p>
    <hr>
    <p>Вложенный тег 2</p>
  </HeaderComp>

  <p></p>
  <input v-model="message" />

  <HeaderComp />

  <ul>
    <!-- <li v-for="todo, index of todos" :key="index">{{ todo.text }}</li> -->
    <template v-for="todo, index of todos" :key="todo.id">
      <ToDoElement :todo="todo" :index="index"/> 
    </template>
  </ul>

</template>

<script setup lang="ts">
import HeaderComp from './components/HeaderComponent.vue'
import ToDoElement from './components/ToDoElement.vue'
import {ref} from 'vue'

const message = ref('')
const todos = ref([
  { id: 0, text: 'Learn JavaScript' },
  { id: 1, text: 'Learn JavaScript' },
  { id: 2, text: 'Learn Vue' },
  { id: 3, text: 'Build something awesome' }
])

message.value = 'Hello Vue!'

</script>

<style scoped>
h1 {
  user-select: none;
}
</style>
