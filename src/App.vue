<template>

  <div v-show="rand > 0.7">
    Сейчас меня видно
  </div>
  <!-- <div v-else-if="rand > 0.4">
    Something else
  </div>
  <div v-else>
    А теперь — нет
  </div> -->

  <Options />


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
  <template v-for="value, key, index of forObj">
    <p>{{ index }}. {{ key }} - {{ value }}</p>
  </template>
  <ToDoElement :todo="{ text: 'Learn JavaScript' }" :index="1" class="list-item" />
  <button @click="say('hi', $event)">Скажи hi</button>

  <VueCalc class="staticClass" :class="isActive ? 'myCalc' : ''"></VueCalc>

  <HeaderComp class="staticClass" :class="isActive ? 'myButton' : ''">
    <p>Вложенный тег</p>
    <hr>
    <p>Вложенный тег 2</p>
  </HeaderComp>

  <p v-bind:style="'color:'+color">{{ color }}</p>
  <input v-model="message" />

  <HeaderComp v-if="toggle" />

  {{ a }}
  <button @click="toggle = !toggle; a++; isActive = !isActive; hasError = !hasError">{{ toggle?'hide':'show' }}</button>

  <div class="h1" :class="divClass" v-html="html"></div>

  <textarea :class="isActive ? 'class1' : ''" v-model="html" cols="30" rows="10"></textarea>

  <hr>

  <!-- <span>Многострочное сообщение:</span>
  <p style="white-space: pre-line;">{{ message1 }}</p>
  <br />
  <textarea v-model="message1" placeholder="введите несколько строчек"></textarea> -->

  <div id="v-model-multiple-checkboxes">
    <input type="checkbox" id="jack" value="Джек" v-model="checkedNames" />
    <label for="jack">Джек</label>
    <input type="checkbox" id="john" value="Джон" v-model="checkedNames" />
    <label for="john">Джон</label>
    <input type="checkbox" id="mike" value="Майк" v-model="checkedNames" />
    <label for="mike">Майк</label>
    <br />
    <span>Отмеченные имена: {{ checkedNames }}</span>
  </div>

  <div id="v-model-radiobutton">
    <input type="radio" id="one" value="Один" v-model="picked" />
    <label for="one">Один</label>
    <br />
    <input type="radio" id="two" value="Два" v-model="picked" />
    <label for="two">Два</label>
    <br />
    <span>Выбрано: {{ picked }}</span>
  </div>

</template>

<script setup lang="ts">
import Options from './components/HeaderOptionsApi.vue'
import ToDoElement from './components/ToDoElement.vue'
import VueCalc from './components/DelegatedCalc.vue'
import {ref, computed, watch, onMounted, onBeforeUnmount} from 'vue'
const color = null
const html = ref(`<h1>HTML code</h1>`)
const newTodo = ref('')

const rand = ref(Math.random())
const isActive = ref(true)
const hasError = ref(false)
const picked = ref('')


const say = (text: string, e: Event) => {
  console.log(text, e)
}

const forObj = ref({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})

const divClass = computed(()=> {return {
  active: isActive.value, 
  error: hasError.value
}})

const a = ref(0)
const select = ref('All')
const toggle = ref(true)
const message = ref('')
const message1 = ref('')
const checkedNames = ref([])
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
