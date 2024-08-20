<template>

  <Options/>

  <select v-model="select">
    <option value="All">All</option>
    <option value="Learn">Learn</option>
    <option value="Read">Read</option>
    <option value="Build">Build</option>
  </select>

  <form @submit.prevent="addToDo">
    <input v-model="newTodo" type="text">
  </form>

  <transition-group name="list" tag="ul">
    <!-- <li v-for="todo, index of filteredArr" :key="index" class="list-item">{{ todo.text }}</li> -->
    <template v-for="todo, index of filteredArr" :key="todo.id">
      <ToDoElement :todo="todo" :index="index" class="list-item" />
    </template>
  </transition-group>

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

</template>

<script setup lang="ts">
import Options from './components/HeaderOptionsApi.vue'
import ToDoElement from './components/ToDoElement.vue'
import VueCalc from './components/DelegatedCalc.vue'
import {ref, computed, watch, onMounted, onBeforeUnmount} from 'vue'
const color = null
const html = ref(`<h1>HTML code</h1>`)
const newTodo = ref('')

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

const addToDo = ()=>{
  todos.value.push({
    id: todos.value.length,
    text: newTodo.value
  })
  newTodo.value = ''
}


watch(() => select.value, async (newVal, oldVal)=>{
  console.log('old:', oldVal, 'new:', newVal)
})
watch(() => todos.value.length, async  (newVal, oldVal)=>{
  console.log('old:', oldVal, 'new:', newVal)
})

const filteredArr = computed(()=>{
  if (select.value == 'All') {
    return todos.value
  } else {
    return todos.value.filter((el) => el.text.startsWith(select.value))
  }
})



// let key='apple'
// console.log({
//   [key]:5,
//   key:0
// })

message.value = 'Hello Vue!'

</script>

<style scoped>
.list-item {
    display: inline-block;
    margin-right: 10px;
  }

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
h1 {
  user-select: none;
}
</style>
