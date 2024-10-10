<template>
  <div>
    <p>{{ x }}, {{ y }}</p>
    <h1>Main</h1>

    <main>
      <app-child>
        <img
          src='https://images.unsplash.com/photo-1520182205149-1e5e4e7329b4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
          alt='image of a woman on a train'>
      </app-child>
    </main>


    <button @click="show = !show">
      Переключить отображение
    </button>

    <div style="height: 152px;margin-top:16px">
      <transition appear name="slide-fade" mode="out-in">
        <p v-if="show">привет</p>
        <p v-else>пока</p>
      </transition>

      <transition name="bounce">
        <p v-if="show">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis
          enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi
          tristique senectus et netus.
        </p>
      </transition>

      <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" :css="false">
        <p v-if="show">
          Демо
        </p>
      </transition>
    </div>

    <transition name="fade" mode="out-in">
      <KeepAlive >
        <component :is="myCount % 2 == 0 ? 'HeaderComp' : VueCalc"></component>
      </KeepAlive>
    </transition>
    <component is="p">Это просто параграф</component>

    <img src="/images/vite.svg" alt="">

    <!-- Options VueCalc-->

    <div id="demo">
      Нажмите кнопку, чтобы сделать то, чего не должны делать:<br />

      <div :class="{ shake: noActivated }">
        <button @click="noActivated = true">Нажми меня</button>
        <span v-if="noActivated">О, нет!</span>
      </div>
    </div>

    {{ myCount }}
    {{ searchText3 }}
    <CustomInputEasy v-model="searchText3" v-model:count="myCount">
      <hr>
      <p>Reds</p>
    </CustomInputEasy>
    {{ searchText2 }} <CustomInputComputed v-model="searchText2"></CustomInputComputed>
    <!-- <CustomInput model-value="searchText"
  @update:model-value="searchText = $event">
  </CustomInput> -->
    {{ searchText }}
    <CustomInput id="search" labelText="Введите текст для поиска" v-model="searchText"></CustomInput>

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
    <button @click="shuffle">shufle</button>

    <transition-group name="list" tag="ul">
      <!-- <li v-for="todo, index of filteredArr" :key="index" class="list-item">{{ todo.text }}</li> -->
      <ToDoElement v-for="todo, index of filteredArr" :key="todo.id" :style="'font-size:' + fontSize + 'px'"
        @textUp="(a, b, c, z) => fontSize += z" @textDown="(n) => fontSize -= n" :todo="todo" :index="index"
        :func="delEl" class="list-item">del</ToDoElement>
    </transition-group>
    <template v-for="value, key, index of forObj">
      <p>{{ index }}. {{ key }} - {{ value }}</p>
    </template>
    <ToDoElement :todo="{ text: 'Learn JavaScript' }" :index="1" class="list-item" />
    <button @click="say('hi', $event)">Скажи hi</button>

    <VueCalc class="staticClass" :class="isActive ? 'myCalc' : ''"></VueCalc>

    <p v-bind:style="'color:' + color">{{ color }}</p>
    <input v-model="message" />
    <p>Этот 👇 {{ counterStore.doubleCount }}</p>

    <header-comp v-if="toggle">
      <h3>Not default</h3>
    </header-comp>

    {{ a }}
    <button @click="toggle = !toggle; a++; isActive = !isActive; hasError = !hasError">{{ toggle ? 'hide' : 'show'
      }}</button>

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

    <transition name="fade">
      <AsyncComp />
    </transition>
  </div>
</template>

<script setup lang="ts">
import CustomInputEasy from '#root/components/CustomInputEasy.vue'
import CustomInputComputed from '#root/components/CustomInputComputed.vue'
import CustomInput from '#root/components/CustomInput.vue'
import Options from '#root/components/HeaderOptionsApi.vue'
import ToDoElement from '#root/components/ToDoElement.vue'
import VueCalc from '#root/components/DelegatedCalc.vue'
import AppChild from '#root/components/AppChild.vue'
import gsap from 'gsap'
import { ref, computed, watch, defineAsyncComponent } from 'vue'
import { useCounterStore } from '#root/stores/counterCompos'
import { useMouse } from '#root/composables/mouse'
const {x,y} = useMouse()
const counterStore = useCounterStore()


const AsyncComp = defineAsyncComponent(() =>
  import('../components/RadioForm.vue')
)



function beforeEnter(el: any) {
  gsap.set(el, {
    scaleX: 0.8,
    scaleY: 1.2
  })
}
function enter(el: any, done: any) {
  gsap.to(el, {
    duration: 1,
    scaleX: 1.5,
    scaleY: 0.7,
    opacity: 1,
    x: 150,
    ease: 'elastic.inOut(2.5, 1)',
    onComplete: done
  })
}
function leave(el: any, done: any) {
  gsap.to(el, {
    duration: 0.7,
    scaleX: 1,
    scaleY: 1,
    x: 300,
    ease: 'elastic.inOut(2.5, 1)'
  })
  gsap.to(el, {
    duration: 0.2,
    delay: 0.5,
    opacity: 0,
    onComplete: done
  })
}




const color = null
const html = ref(`<h1>HTML code</h1>`)
const newTodo = ref('')
const searchText = ref('fdgldkf gjdf g')
const searchText2 = ref('fdgldkf')
const searchText3 = ref('f')
const myCount = ref(1)
const show = ref(false)

const noActivated = ref(false)

const consoleFunc = (...e: any) => {
  console.log(e)
}

const rand = ref(Math.random())
const isActive = ref(true)
const hasError = ref(false)
const picked = ref('')
const fontSize = ref(12)

const say = (text: string, e: Event) => {
  console.log(text, e)
}

const forObj = ref({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})

const divClass = computed(() => {
  return {
    active: isActive.value,
    error: hasError.value
  }
})

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

const delEl = (i: number) => {
  todos.value.splice(i, 1)
}

const addToDo = () => {
  todos.value.push({
    id: todos.value.length,
    text: newTodo.value
  })
  newTodo.value = ''
}

watch(() => select.value, async (newVal, oldVal) => {
  console.log('old:', oldVal, 'new:', newVal)
})
watch(() => todos.value.length, async (newVal, oldVal) => {
  console.log('old:', oldVal, 'new:', newVal)
})

const shuffle = () => {
  todos.value.sort((a, b) => a.text.localeCompare(b.text))
}

const filteredArr = computed(() => {
  if (select.value == 'All') {
    return todos.value
  } else {
    return todos.value.filter((el) => el.text.startsWith(select.value))
  }
})

const q = [
  { order: 1, question: 'why??', answers: ['becouse', 'what', `I dont'n know`], correctAnswer: `I dont'n know` },
  { order: 1, question: 'why??', answers: ['becouse', 'what', `I dont'n know`], correctAnswer: `I dont'n know` },
  { order: 2, question: 'why??!', answers: ['becouse', 'what', `I dont'n know`], correctAnswer: `I dont'n know` },
  { order: 1, question: 'why??', answers: ['becouse', 'what', `I dont'n know`], correctAnswer: `I dont'n know` },
]

const num = ref(0)
const imgs = ['1.png', '2.png', '3.png']
const imgs2 = [
  { src: '1.png', alt: '' },
  { src: '2.png', alt: '' },
  { src: '3.png', alt: '' },
]

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
  transition: all 1s ease;
}

/* 1. объявление transition */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. объявление enter from и leave to состояний */
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. убедитесь, что элементы удалены из потока layout,
      чтобы можно было правильно рассчитать анимацию перемещения */
.list-leave-active {
  position: absolute;
}

h1 {
  user-select: none;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {

  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Анимации появления и исчезновения могут иметь    */
/* различные продолжительности и функции плавности. */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
