import { defineStore } from 'pinia'
import {ref, computed } from 'vue'

export const useCounterStore = defineStore('counter2', () => {
  const count = ref(0)
  const name = ref('Иван')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})