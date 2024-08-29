<template>
  <div ref="calc">
    <div style="margin:0 0 10px 20px">
      <div style="font-size: 10px; height:12px; text-align: left;">{{ calcStr }}</div>
      <div style="font-size: 18px; height:20px; text-align: left;">{{ calcCurrentStr }}</div>
    </div>

    <hr>

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
    <div style="display:flex">
      <button>+</button>
      <button>-</button>
      <button>/</button>
      <button>*</button>
      <button>=</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const calc = ref()
const calcStr = ref('')
const calcCurrentStr = ref('')

const calcKeybrd = (e: KeyboardEvent) => {
  if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', '*', '/', '=', '.', ',', 'Enter'].includes(e.key)) {
    let key = e.key
    if (key == ',') key = '.'
    if (key == 'Enter') key = '='
    calcEvents(key)
  }
}

const calcEventListner = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.tagName == 'BUTTON') {
    calcEvents(target.innerHTML)
  }
}

const calcEvents = (char:string) => {
  
  if (char == '.') {
    if (calcCurrentStr.value.includes('.')) return
  }
  if (['+', '-', '*', '/'].includes(char)) {
    calcCurrentStr.value += char
    calcStr.value = calcCurrentStr.value
    calcCurrentStr.value = ''
    return
  }
  if (char == '=') {
    if (calcStr.value.includes('=')) return
    calcStr.value += calcCurrentStr.value
    if (calcStr.value.includes('+')) {
      const arr = calcStr.value.split('+')
      calcCurrentStr.value = (parseFloat(arr[0]) + parseFloat(arr[1])).toString()
    }
    if (calcStr.value.includes('-')) {
      const arr = calcStr.value.split('-')
      calcCurrentStr.value = (parseFloat(arr[0]) - parseFloat(arr[1])).toString()
    }
    if (calcStr.value.includes('*')) {
      const arr = calcStr.value.split('*')
      calcCurrentStr.value = (parseFloat(arr[0]) * parseFloat(arr[1])).toString()
    }
    if (calcStr.value.includes('/')) {
      const arr = calcStr.value.split('/')
      calcCurrentStr.value = (parseFloat(arr[0]) / parseFloat(arr[1])).toString()
    }
    calcStr.value += char
    return
  }
  calcCurrentStr.value += char
  
}

onMounted(() => {
  calc.value.addEventListener('click', calcEventListner)
  document.addEventListener('keydown', calcKeybrd)
})

onBeforeUnmount(() => {
  calc.value.removeEventListener('click', calcEventListner)
  document.removeEventListener('keydown', calcKeybrd)
})

</script>

