<template>

  <VueCalc></VueCalc>

  <HeaderComp>
    <p>Вложенный тег</p>
    <hr>
    <p>Вложенный тег 2</p>
  </HeaderComp>

  <p v-bind:style="'color:'+color">{{ color }}</p>
  <input v-model="message" />

  <HeaderComp v-if="toggle" />

  {{ a }}
  <button @click="toggle=!toggle; a++">{{ toggle?'hide':'show' }}</button>

  <div v-html="html"></div>

  <textarea v-model="html" cols="30" rows="10"></textarea>

  <hr>

  <select v-model="select">
    <option value="All">All</option>
    <option value="Learn">Learn</option>
    <option value="Read">Read</option>
    <option value="Build">Build</option>
  </select>

  <ul>
    <!-- <li v-for="todo, index of todos" :key="index">{{ todo.text }}</li> -->
    <template v-for="todo, index of filteredArr" :key="todo.id">
      <ToDoElement :todo="todo" :index="index" />
    </template>
  </ul>

</template>

<script setup lang="ts">
import ToDoElement from './components/ToDoElement.vue'
import VueCalc from './components/DelegatedCalc.vue'
import {ref, computed, watch, onMounted, onBeforeUnmount} from 'vue'
const color = null
const html = ref(`<h1>HTML code</h1>`)

const a = ref(0)
const select = ref('All')
const toggle = ref(true)
const message = ref('')
const todos = ref([
  { id: 0, text: 'Learn JavaScript' },
  { id: 1, text: 'Learn JavaScript' },
  { id: 2, text: 'Learn Vue' },
  { id: 3, text: 'Build something awesome' }
])

const filteredArr = ref([...todos.value])

watch(()=>select.value, (oldVal, newVal)=>{
  if (select.value == 'All') {
    filteredArr.value = todos.value
  } else {
    filteredArr.value = todos.value.filter((el) => el.text.startsWith(select.value))
  }
})

// const filteredArr = computed(()=>{
//   if (select.value == 'All') {
//     return todos.value
//   } else {
//     return todos.value.filter((el) => el.text.startsWith(select.value))
//   }
// })



// let key='apple'
// console.log({
//   [key]:5,
//   key:0
// })

message.value = 'Hello Vue!'

</script>

<style scoped>
h1 {
  user-select: none;
}
</style>
