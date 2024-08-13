<template>

  <div>
    <div style="display:flex">
      <button>1</button>
      <button>2</button>
      <button>3</button>
    </div>
    <div style="display:flex">
      <button>4</button>
      <button>5</button>
      <button>6</button>
    </div>
    <div style="display:flex">
      <button>7</button>
      <button>8</button>
      <button>9</button>
    </div>
    <div style="display:flex">
      <button>.</button>
      <button>0</button>
    </div>
  </div>


  <HeaderComp>
    <p>Вложенный тег</p>
    <hr>
    <p>Вложенный тег 2</p>
  </HeaderComp>

  <p v-bind:style="'color:'+color">{{ color }}</p>
  <input v-model="message" />

  <HeaderComp v-if="toggle" />

  {{ a }}
  <button @click="toggle=!toggle; a++" >{{ toggle?'hide':'show' }}</button>

  <div v-html="html"></div>

  <textarea v-model="html" cols="30" rows="10"></textarea>

  <ul>
    <!-- <li v-for="todo, index of todos" :key="index">{{ todo.text }}</li> -->
    <template v-for="todo, index of todos" :key="todo.id">
      <ToDoElement :todo="todo" :index="index" />
    </template>
  </ul>

</template>

<script setup lang="ts">
import ToDoElement from './components/ToDoElement.vue'
import {ref} from 'vue'
const color = null
const html = ref(`<h1>HTML code</h1>`)

const a = ref(0)

// let key='apple'
// console.log({
//   [key]:5,
//   key:0
// })

const toggle = ref(true)
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
